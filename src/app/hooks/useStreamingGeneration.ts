'use client'

import { useState, useRef, useCallback } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface StreamingState {
    reasoning: string
    delta: string
    result: any | null
    error: string | null
    isStreaming: boolean
    phase: 'connecting' | 'thinking' | 'generating' | 'parsing' | 'complete' | 'error' | null
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Strip markdown code fences that models wrap around JSON.
 * Handles ```json, ```, leading/trailing whitespace and newlines.
 */
function stripCodeFences(s: string): string {
    let cleaned = s.trim()
    // Remove opening ```json or ``` (with optional language tag and whitespace)
    cleaned = cleaned.replace(/^```\w*\s*\n?/i, '')
    // Remove closing ```
    cleaned = cleaned.replace(/\n?```\s*$/, '')
    return cleaned.trim()
}

/**
 * Try to extract JSON from accumulated stream content.
 * Handles code fences, extra whitespace, etc.
 */
function tryParseJSON(accumulated: string): any | null {
    if (!accumulated.trim()) return null

    const cleaned = stripCodeFences(accumulated)
    if (!cleaned) return null

    try {
        return JSON.parse(cleaned)
    } catch {
        return null
    }
}

// ─── Hook ────────────────────────────────────────────────────────────────────

/**
 * Streams from the MonkeysAI API which returns raw SSE `data:` lines:
 *
 *   data: <think>\n\n
 *   data: reasoning tokens…\n\n
 *   data: </think>\n\n
 *   data: ```json\n\n
 *   data: { json tokens… }\n\n
 *   data: ```\n\n
 *   data: [DONE]\n\n
 *
 * Reasoning is wrapped in <think>…</think> tags.
 * After </think>, the remaining tokens form the JSON result wrapped in code fences.
 * [DONE] signals the stream is finished.
 */
export function useStreamingGeneration() {
    const [reasoning, setReasoning] = useState('')
    const [delta, setDelta] = useState('')
    const [result, setResult] = useState<any | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isStreaming, setIsStreaming] = useState(false)
    const [phase, setPhase] = useState<StreamingState['phase']>(null)

    const abortRef = useRef<AbortController | null>(null)

    // Track state outside of React batching for the parsing logic
    const stateRef = useRef({
        inThink: false,
        thinkDone: false,
        accumulated: '',
    })

    const reset = useCallback(() => {
        setReasoning('')
        setDelta('')
        setResult(null)
        setError(null)
        setIsStreaming(false)
        setPhase(null)
        stateRef.current = { inThink: false, thinkDone: false, accumulated: '' }
    }, [])

    const cancelStream = useCallback(() => {
        abortRef.current?.abort()
        abortRef.current = null
        setIsStreaming(false)
    }, [])

    const startStream = useCallback(async (url: string, body: unknown) => {
        // Reset previous state
        reset()
        setIsStreaming(true)
        setPhase('connecting')

        const controller = new AbortController()
        abortRef.current = controller
        const state = stateRef.current

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
                signal: controller.signal,
            })

            if (!response.ok) {
                const err = await response.json().catch(() => ({ detail: response.statusText }))
                throw new Error(err.detail?.message || err.detail || `API error: ${response.status}`)
            }

            const reader = response.body?.getReader()
            if (!reader) {
                throw new Error('No readable stream in response')
            }

            const decoder = new TextDecoder()
            let buffer = ''

            // Process a single data value from a `data: xxx` line
            const processDataLine = (data: string) => {
                // End of stream
                if (data === '[DONE]') {
                    const parsed = tryParseJSON(state.accumulated)
                    if (parsed) {
                        setResult(parsed)
                    }
                    setPhase('complete')
                    setIsStreaming(false)
                    return
                }

                // ── Think tags ──

                // Check for <think> open tag
                if (data.includes('<think>')) {
                    state.inThink = true
                    setPhase('thinking')
                    const afterTag = data.replace('<think>', '')
                    if (afterTag) {
                        setReasoning(prev => prev + afterTag)
                    }
                    return
                }

                // Check for </think> close tag
                if (data.includes('</think>')) {
                    state.inThink = false
                    state.thinkDone = true
                    setPhase('generating')
                    const afterTag = data.replace('</think>', '')
                    if (afterTag.trim()) {
                        state.accumulated += afterTag
                        setDelta(prev => prev + afterTag)
                    }
                    return
                }

                // ── Content ──

                // Inside thinking — accumulate reasoning
                if (state.inThink) {
                    setReasoning(prev => prev + data)
                    return
                }

                // After thinking — accumulate content tokens
                state.accumulated += data
                setDelta(prev => prev + data)

                // Set phase to generating if not already
                if (phase !== 'generating') {
                    setPhase('generating')
                }
            }

            // ── Read loop ──
            while (true) {
                const { done, value } = await reader.read()

                if (done) {
                    // Process any remaining buffer
                    if (buffer.trim()) {
                        const lines = buffer.split('\n')
                        for (const line of lines) {
                            if (line.startsWith('data:')) {
                                const raw = line.slice(5)
                                const data = raw.startsWith(' ') ? raw.slice(1) : raw
                                processDataLine(data)
                            }
                        }
                    }
                    // If we never got [DONE], try to parse what we have
                    if (!result) {
                        const parsed = tryParseJSON(state.accumulated)
                        if (parsed) {
                            setResult(parsed)
                        }
                    }
                    setPhase('complete')
                    setIsStreaming(false)
                    break
                }

                buffer += decoder.decode(value, { stream: true })

                // Process complete lines (lines ending with \n)
                const lines = buffer.split('\n')
                buffer = lines.pop() || ''

                for (const line of lines) {
                    if (!line.trim()) continue // skip empty SSE separator lines

                    if (line.startsWith('data:')) {
                        // SSE spec: strip exactly one leading space after "data:"
                        const raw = line.slice(5)
                        const data = raw.startsWith(' ') ? raw.slice(1) : raw
                        processDataLine(data)
                    }
                }
            }
        } catch (err: any) {
            if (err.name === 'AbortError') {
                setIsStreaming(false)
                return
            }
            setError(err.message || 'Something went wrong')
            setPhase('error')
            setIsStreaming(false)
        } finally {
            abortRef.current = null
        }
    }, [reset])

    return {
        // State
        reasoning,
        delta,
        result,
        error,
        isStreaming,
        phase,
        // Actions
        startStream,
        cancelStream,
        reset,
    }
}
