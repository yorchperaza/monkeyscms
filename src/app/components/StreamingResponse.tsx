'use client'

import { useState, useEffect, useRef } from 'react'
import {
    CheckCircle2,
    Loader2,
    ChevronDown,
    ChevronUp,
    Brain,
    Eye,
    Sparkles,
    Database,
    Cpu,
    FileCheck,
    XCircle,
    StopCircle,
} from 'lucide-react'
import type { ProgressEvent } from '../hooks/useStreamingGeneration'

// ─── Phase config ────────────────────────────────────────────────────────────

interface PhaseConfig {
    label: string
    icon: React.ReactNode
}

const PHASE_MAP: Record<string, PhaseConfig> = {
    rag_retrieval: { label: 'Retrieving Context', icon: <Database className="w-4 h-4" /> },
    generating: { label: 'Generating Content', icon: <Cpu className="w-4 h-4" /> },
    parsing: { label: 'Parsing Response', icon: <FileCheck className="w-4 h-4" /> },
}

const PHASE_ORDER = ['rag_retrieval', 'generating', 'parsing']

function getPhaseIndex(phase: string): number {
    const idx = PHASE_ORDER.indexOf(phase)
    return idx === -1 ? PHASE_ORDER.length : idx
}

// ─── Progress Stepper ────────────────────────────────────────────────────────

function ProgressStepper({
    progress,
    isComplete,
    hasError,
}: {
    progress: ProgressEvent[]
    isComplete: boolean
    hasError: boolean
}) {
    // Determine which phases have been seen
    const seenPhases = new Set(progress.map(p => p.phase))
    const currentPhase = progress.length > 0 ? progress[progress.length - 1].phase : null
    const currentPhaseIndex = currentPhase ? getPhaseIndex(currentPhase) : -1

    return (
        <div className="flex items-center gap-0 w-full">
            {PHASE_ORDER.map((phase, i) => {
                const config = PHASE_MAP[phase]
                const isSeen = seenPhases.has(phase)
                const isCurrent = phase === currentPhase && !isComplete
                const isCompleted = isComplete || (isSeen && currentPhaseIndex > i)
                const isFailed = hasError && isCurrent

                return (
                    <div key={phase} className="flex items-center flex-1 last:flex-initial">
                        {/* Step */}
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
                                    config.icon
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
                                {config.label}
                            </span>
                        </div>

                        {/* Connector line */}
                        {i < PHASE_ORDER.length - 1 && (
                            <div className="flex-1 mx-2 mb-5">
                                <div
                                    className={`h-0.5 rounded-full transition-all duration-700 ${isCompleted || (isSeen && currentPhaseIndex > i)
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
    isStreaming,
}: {
    reasoning: string
    isStreaming: boolean
}) {
    const [isOpen, setIsOpen] = useState(true)
    const scrollRef = useRef<HTMLDivElement>(null)

    // Auto-scroll reasoning content
    useEffect(() => {
        if (scrollRef.current && isOpen) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [reasoning, isOpen])

    // Auto-collapse when streaming finishes
    useEffect(() => {
        if (!isStreaming && reasoning) {
            const timer = setTimeout(() => setIsOpen(false), 1500)
            return () => clearTimeout(timer)
        }
    }, [isStreaming, reasoning])

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
                    {isStreaming && (
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
                        {isStreaming && (
                            <span className="inline-block w-1.5 h-4 ml-0.5 bg-purple-400 animate-cursor-blink align-middle" />
                        )}
                    </p>
                </div>
            )}
        </div>
    )
}

// ─── Delta Preview ───────────────────────────────────────────────────────────

function DeltaPreview({ delta, isStreaming }: { delta: string; isStreaming: boolean }) {
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [delta])

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
                <pre className="text-sm text-dark-300 leading-relaxed whitespace-pre-wrap font-mono break-words">
                    {delta}
                    {isStreaming && (
                        <span className="inline-block w-1.5 h-4 ml-0.5 bg-monkey-orange/70 animate-cursor-blink align-middle" />
                    )}
                </pre>
            </div>
        </div>
    )
}

// ─── Latest Progress Message ─────────────────────────────────────────────────

function ProgressMessage({ progress }: { progress: ProgressEvent[] }) {
    const latest = progress.length > 0 ? progress[progress.length - 1] : null
    if (!latest) return null

    return (
        <div className="flex items-center gap-2 text-sm text-dark-400">
            <Sparkles className="w-3.5 h-3.5 text-monkey-orange animate-pulse" />
            <span>{latest.message}</span>
        </div>
    )
}

// ─── Main StreamingResponse Component ────────────────────────────────────────

export default function StreamingResponse({
    progress,
    reasoning,
    delta,
    error,
    isStreaming,
    onCancel,
}: {
    progress: ProgressEvent[]
    reasoning: string
    delta: string
    error: string | null
    isStreaming: boolean
    onCancel: () => void
}) {
    const isComplete = !isStreaming && !error && progress.length > 0

    return (
        <div className="mx-5 sm:mx-6 mb-5 p-5 sm:p-6 rounded-xl bg-dark-900/40 border border-dark-700/30 space-y-5 animate-slide-up">
            {/* Progress Stepper */}
            <ProgressStepper
                progress={progress}
                isComplete={isComplete}
                hasError={!!error}
            />

            {/* Current progress message */}
            {isStreaming && <ProgressMessage progress={progress} />}

            {/* Reasoning panel */}
            <ReasoningPanel reasoning={reasoning} isStreaming={isStreaming} />

            {/* Live delta preview */}
            <DeltaPreview delta={delta} isStreaming={isStreaming} />

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
