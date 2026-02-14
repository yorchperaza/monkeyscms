'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import {
    CheckCircle2,
    Loader2,
    ChevronDown,
    ChevronUp,
    Brain,
    Eye,
    XCircle,
    StopCircle,
    Wifi,
    Cpu,
    Sparkles,
} from 'lucide-react'
import type { StreamingState } from '../hooks/useStreamingGeneration'

// ─── Phase Stepper ───────────────────────────────────────────────────────────

interface PhaseConfig {
    label: string
    icon: React.ReactNode
    key: string
}

const PHASES: PhaseConfig[] = [
    { key: 'connecting', label: 'Connecting', icon: <Wifi className="w-4 h-4" /> },
    { key: 'thinking', label: 'Thinking', icon: <Brain className="w-4 h-4" /> },
    { key: 'generating', label: 'Generating', icon: <Cpu className="w-4 h-4" /> },
    { key: 'complete', label: 'Complete', icon: <Sparkles className="w-4 h-4" /> },
]

function getPhaseIndex(phase: string | null): number {
    if (!phase) return -1
    const idx = PHASES.findIndex(p => p.key === phase)
    return idx === -1 ? -1 : idx
}

function PhaseStepper({
    phase,
    hasError,
}: {
    phase: StreamingState['phase']
    hasError: boolean
}) {
    const currentIdx = getPhaseIndex(phase)

    return (
        <div className="flex items-center gap-0 w-full">
            {PHASES.map((p, i) => {
                const isCompleted = currentIdx > i
                const isCurrent = currentIdx === i && !hasError
                const isFailed = hasError && currentIdx === i

                return (
                    <div key={p.key} className="flex items-center flex-1 last:flex-initial">
                        {/* Step circle */}
                        <div className="flex flex-col items-center gap-1.5">
                            <div
                                className={`
                                    w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500
                                    ${isFailed
                                        ? 'bg-red-500/20 border-2 border-red-500/40 text-red-400'
                                        : isCompleted
                                            ? 'bg-green-500/20 border-2 border-green-500/40 text-green-400'
                                            : isCurrent
                                                ? 'bg-monkey-orange/20 border-2 border-monkey-orange/40 text-monkey-orange animate-pulse-glow-sm'
                                                : 'bg-dark-800 border-2 border-dark-600/50 text-dark-500'
                                    }
                                `}
                            >
                                {isFailed ? (
                                    <XCircle className="w-4 h-4" />
                                ) : isCompleted ? (
                                    <CheckCircle2 className="w-4 h-4" />
                                ) : isCurrent ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    p.icon
                                )}
                            </div>
                            <span
                                className={`text-[10px] font-medium whitespace-nowrap transition-colors duration-300 ${isFailed
                                    ? 'text-red-400'
                                    : isCompleted
                                        ? 'text-green-400'
                                        : isCurrent
                                            ? 'text-monkey-orange'
                                            : 'text-dark-500'
                                    }`}
                            >
                                {p.label}
                            </span>
                        </div>

                        {/* Connector line */}
                        {i < PHASES.length - 1 && (
                            <div className="flex-1 mx-2 mb-5">
                                <div
                                    className={`h-0.5 rounded-full transition-all duration-700 ${isCompleted
                                        ? 'bg-green-500/40'
                                        : isCurrent
                                            ? 'bg-gradient-to-r from-monkey-orange/40 to-dark-600/30'
                                            : 'bg-dark-600/30'
                                        }`}
                                />
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

// ─── Reasoning Panel ─────────────────────────────────────────────────────────

function ReasoningPanel({
    reasoning,
    isThinking,
}: {
    reasoning: string
    isThinking: boolean
}) {
    const [isOpen, setIsOpen] = useState(true)
    const scrollRef = useRef<HTMLDivElement>(null)

    // Auto-scroll reasoning content
    useEffect(() => {
        if (scrollRef.current && isOpen) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [reasoning, isOpen])

    // Auto-collapse once thinking finishes
    useEffect(() => {
        if (!isThinking && reasoning) {
            const timer = setTimeout(() => setIsOpen(false), 1500)
            return () => clearTimeout(timer)
        }
    }, [isThinking, reasoning])

    if (!reasoning) return null

    return (
        <div className="rounded-xl border border-dark-600/50 overflow-hidden transition-all duration-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center gap-2.5 px-4 py-3 bg-dark-800/80 hover:bg-dark-800 transition-colors text-left"
            >
                <Brain className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-dark-200 flex-1">
                    AI Reasoning
                    {isThinking && (
                        <span className="ml-2 text-xs text-purple-400 font-normal">
                            thinking…
                        </span>
                    )}
                </span>
                {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-dark-400" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-dark-400" />
                )}
            </button>

            {isOpen && (
                <div
                    ref={scrollRef}
                    className="px-4 py-3 bg-dark-900/60 max-h-48 overflow-y-auto"
                >
                    <p className="text-sm text-dark-400 leading-relaxed whitespace-pre-wrap font-mono">
                        {reasoning}
                        {isThinking && (
                            <span className="inline-block w-1.5 h-4 ml-0.5 bg-purple-400 animate-cursor-blink align-middle" />
                        )}
                    </p>
                </div>
            )}
        </div>
    )
}

// ─── Content Extraction ──────────────────────────────────────────────────────

/**
 * Extract readable HTML content from the raw delta stream.
 * The delta contains code-fenced JSON like:
 *   ```json\n{"title":"...","sections":[{"heading":"...","content":"<p>HTML here</p>"},...]}
 *
 * We extract and concatenate all "content" field values to display
 * a readable HTML preview, even when the JSON is incomplete mid-stream.
 */
function extractContentFromDelta(delta: string): {
    title: string
    htmlParts: string[]
} {
    let title = ''
    const htmlParts: string[] = []

    // Extract title (from "title":"..." pattern)
    const titleMatch = delta.match(/"title"\s*:\s*"((?:[^"\\]|\\.)*)"/);
    if (titleMatch) {
        title = titleMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '\n')
    }

    // Extract all content field values (from "content":"..." patterns)
    // This regex handles escaped quotes within the content strings
    const contentRegex = /"content"\s*:\s*"((?:[^"\\]|\\.)*)"/g
    let match
    while ((match = contentRegex.exec(delta)) !== null) {
        const content = match[1]
            .replace(/\\"/g, '"')
            .replace(/\\n/g, '\n')
            .replace(/\\t/g, '\t')
            .replace(/\\\\/g, '\\')
        htmlParts.push(content)
    }

    // If we have a partial content field still being streamed,
    // try to capture it too (last "content":" without closing ")
    const partialContentMatch = delta.match(/"content"\s*:\s*"((?:[^"\\]|\\.)*)$/)
    if (partialContentMatch) {
        // Check it's not already captured by the complete regex above
        const partialContent = partialContentMatch[1]
            .replace(/\\"/g, '"')
            .replace(/\\n/g, '\n')
            .replace(/\\t/g, '\t')
            .replace(/\\\\/g, '\\')
        if (!htmlParts.includes(partialContent) && partialContent.length > 10) {
            htmlParts.push(partialContent)
        }
    }

    return { title, htmlParts }
}

// ─── Delta Preview ───────────────────────────────────────────────────────────

function DeltaPreview({ delta, isStreaming }: { delta: string; isStreaming: boolean }) {
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [delta])

    // Extract readable content from the raw delta
    const extracted = useMemo(() => extractContentFromDelta(delta), [delta])
    const hasContent = extracted.title || extracted.htmlParts.length > 0

    if (!delta) return null

    return (
        <div className="rounded-xl border border-dark-600/50 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-dark-800/80 border-b border-dark-700/30">
                <Eye className="w-3.5 h-3.5 text-monkey-orange" />
                <span className="text-xs font-medium text-dark-300">Live Preview</span>
                {isStreaming && (
                    <span className="ml-auto flex items-center gap-1.5 text-xs text-monkey-orange">
                        <span className="w-1.5 h-1.5 rounded-full bg-monkey-orange animate-pulse" />
                        streaming
                    </span>
                )}
            </div>
            <div
                ref={scrollRef}
                className="px-4 py-3 bg-dark-900/40 max-h-64 overflow-y-auto"
            >
                {hasContent ? (
                    <div className="space-y-3">
                        {/* Title */}
                        {extracted.title && (
                            <h3 className="text-base font-semibold text-dark-100">
                                {extracted.title}
                            </h3>
                        )}

                        {/* Rendered HTML content sections */}
                        {extracted.htmlParts.map((html, i) => (
                            <div
                                key={i}
                                className="text-sm text-dark-300 leading-relaxed [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1 [&_a]:text-monkey-orange [&_strong]:text-dark-200 [&_h2]:text-dark-100 [&_h2]:font-semibold [&_h2]:text-base [&_h2]:mt-3 [&_h2]:mb-1 [&_h3]:text-dark-200 [&_h3]:font-medium [&_h3]:mt-2"
                                dangerouslySetInnerHTML={{ __html: html }}
                            />
                        ))}

                        {/* Streaming cursor */}
                        {isStreaming && (
                            <span className="inline-block w-1.5 h-4 bg-monkey-orange/70 animate-cursor-blink align-middle" />
                        )}
                    </div>
                ) : (
                    /* Fallback: raw text when nothing extractable yet */
                    <pre className="text-sm text-dark-300 leading-relaxed whitespace-pre-wrap font-mono break-words">
                        {delta.length > 200 ? '…' + delta.slice(-200) : delta}
                        {isStreaming && (
                            <span className="inline-block w-1.5 h-4 ml-0.5 bg-monkey-orange/70 animate-cursor-blink align-middle" />
                        )}
                    </pre>
                )}
            </div>
        </div>
    )
}

// ─── Main StreamingResponse Component ────────────────────────────────────────

export default function StreamingResponse({
    reasoning,
    delta,
    error,
    isStreaming,
    phase,
    onCancel,
}: {
    reasoning: string
    delta: string
    error: string | null
    isStreaming: boolean
    phase: StreamingState['phase']
    onCancel: () => void
}) {
    return (
        <div className="mx-5 sm:mx-6 mb-5 p-5 sm:p-6 rounded-xl bg-dark-900/40 border border-dark-700/30 space-y-5 animate-slide-up">
            {/* Phase Stepper */}
            <PhaseStepper phase={phase} hasError={!!error} />

            {/* Reasoning panel */}
            <ReasoningPanel reasoning={reasoning} isThinking={phase === 'thinking'} />

            {/* Live delta preview */}
            <DeltaPreview delta={delta} isStreaming={isStreaming && phase === 'generating'} />

            {/* Error display */}
            {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-red-400 font-semibold text-sm">Stream Error</p>
                        <p className="text-dark-300 text-sm mt-1">{error}</p>
                    </div>
                </div>
            )}

            {/* Cancel button */}
            {isStreaming && (
                <div className="flex justify-center pt-1">
                    <button
                        onClick={onCancel}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-dark-400 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/5"
                    >
                        <StopCircle className="w-4 h-4" />
                        Cancel
                    </button>
                </div>
            )}
        </div>
    )
}
