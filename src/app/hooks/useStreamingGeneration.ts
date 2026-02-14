'use client'

import { useState, useRef, useCallback } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ProgressEvent {
    phase: string
    message: string
}

export interface StreamingState {
    progress: ProgressEvent[]
    reasoning: string
    delta: string
    result: any | null
    error: string | null
    isStreaming: boolean
}

interface SSEFrame {
    event: string
    data: string
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useStreamingGeneration() {
    const [progress, setProgress] = useState<ProgressEvent[]>([])
    const [reasoning, setReasoning] = useState('')
    const [delta, setDelta] = useState('')
    const [result, setResult] = useState<any | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isStreaming, setIsStreaming] = useState(false)

    const abortRef = useRef<AbortController | null>(null)

    const reset = useCallback(() => {
        setProgress([])
        setReasoning('')
        setDelta('')
        setResult(null)
        setError(null)
        setIsStreaming(false)
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

        const controller = new AbortController()
        abortRef.current = controller

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

            // Parse SSE frames from buffer
            const parseFrames = (raw: string): { frames: SSEFrame[]; remainder: string } => {
                const frames: SSEFrame[] = []
                // SSE frames are separated by double newlines
                const parts = raw.split('\n\n')
                // Last part might be incomplete
                const remainder = parts.pop() || ''

                for (const part of parts) {
                    const trimmed = part.trim()
                    if (!trimmed) continue

                    let event = 'message'
                    let data = ''

                    for (const line of trimmed.split('\n')) {
                        if (line.startsWith('event:')) {
                            event = line.slice(6).trim()
                        } else if (line.startsWith('data:')) {
                            data = line.slice(5).trim()
                        }
                    }

                    if (data) {
                        frames.push({ event, data })
                    }
                }

                return { frames, remainder }
            }

            // Process a single SSE frame
            const processFrame = (frame: SSEFrame) => {
                try {
                    const parsed = JSON.parse(frame.data)

                    switch (frame.event) {
                        case 'progress':
                            setProgress(prev => [...prev, {
                                phase: parsed.phase,
                                message: parsed.message,
                            }])
                            break

                        case 'reasoning':
                            setReasoning(prev => prev + (parsed.content || ''))
                            break

                        case 'delta':
                            setDelta(prev => prev + (parsed.content || ''))
                            break

                        case 'complete':
                            setResult(parsed)
                            setIsStreaming(false)
                            break

                        case 'error':
                            setError(parsed.message || parsed.error || 'Stream error')
                            setIsStreaming(false)
                            break

                        default:
                            // Unknown event type — ignore
                            break
                    }
                } catch {
                    // Non-JSON data line — ignore
                }
            }

            // Read loop
            while (true) {
                const { done, value } = await reader.read()

                if (done) {
                    // Process any remaining buffer
                    if (buffer.trim()) {
                        const { frames } = parseFrames(buffer + '\n\n')
                        frames.forEach(processFrame)
                    }
                    setIsStreaming(false)
                    break
                }

                buffer += decoder.decode(value, { stream: true })
                const { frames, remainder } = parseFrames(buffer)
                buffer = remainder
                frames.forEach(processFrame)
            }
        } catch (err: any) {
            if (err.name === 'AbortError') {
                // User cancelled — not an error
                setIsStreaming(false)
                return
            }
            setError(err.message || 'Something went wrong')
            setIsStreaming(false)
        } finally {
            abortRef.current = null
        }
    }, [reset])

    return {
        // State
        progress,
        reasoning,
        delta,
        result,
        error,
        isStreaming,
        // Actions
        startStream,
        cancelStream,
        reset,
    }
}
