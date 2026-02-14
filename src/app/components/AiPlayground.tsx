'use client'

import { useState, useEffect } from 'react'
import {
    Sparkles,
    Wand2,
    Search,
    Send,
    Loader2,
    AlertCircle,
    CheckCircle2,
    XCircle,
    ChevronDown,
    ChevronUp,
    RotateCcw,
    Copy,
    Check,
    FileText,
    Zap,
    Brain,
    Bot
} from 'lucide-react'
import { useStreamingGeneration } from '../hooks/useStreamingGeneration'
import StreamingResponse from './StreamingResponse'

// ─── Constants ───────────────────────────────────────────────────────────────

const API_BASE = 'https://ai-api.monkeyscms.com'

const CONTENT_TYPES = [
    { value: 'article', label: 'Article' },
    { value: 'blog_post', label: 'Blog Post' },
    { value: 'product_description', label: 'Product Description' },
    { value: 'landing_page', label: 'Landing Page' },
    { value: 'faq', label: 'FAQ' },
    { value: 'email', label: 'Email' }
]

const TASK_TYPES = [
    { value: 'rewrite', label: 'Rewrite' },
    { value: 'expand', label: 'Expand' },
    { value: 'shorten', label: 'Shorten' },
    { value: 'seo', label: 'SEO Optimize' },
    { value: 'tone', label: 'Change Tone' },
    { value: 'translate', label: 'Translate' }
]

const TONES = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'formal', label: 'Formal' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'authoritative', label: 'Authoritative' },
    { value: 'conversational', label: 'Conversational' }
]

const LENGTHS = [
    { value: 'short', label: 'Short' },
    { value: 'medium', label: 'Medium' },
    { value: 'long', label: 'Long' }
]

const MODELS = [
    { value: 'auto', label: 'Auto', desc: 'Best model for the task', icon: <Bot className="w-4 h-4" /> },
    { value: 'fast', label: 'Fast', desc: 'Optimized for speed', icon: <Zap className="w-4 h-4" /> },
    { value: 'reasoning', label: 'Reasoning', desc: 'Complex problem solving', icon: <Brain className="w-4 h-4" /> }
]

type Action = 'generate' | 'improve' | 'critique'

// ─── Sub-components ──────────────────────────────────────────────────────────

function SelectField({
    label,
    value,
    onChange,
    options
}: {
    label: string
    value: string
    onChange: (v: string) => void
    options: { value: string; label: string }[]
}) {
    return (
        <div>
            <label className="block text-xs font-medium text-dark-400 mb-1.5 uppercase tracking-wider">{label}</label>
            <select
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-full bg-dark-800 border border-dark-600/50 rounded-xl px-3 py-2.5 text-sm text-dark-100 focus:outline-none focus:border-monkey-orange/50 focus:ring-1 focus:ring-monkey-orange/20 transition-colors appearance-none cursor-pointer"
            >
                {options.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                ))}
            </select>
        </div>
    )
}

function Toggle({
    label,
    checked,
    onChange
}: {
    label: string
    checked: boolean
    onChange: (v: boolean) => void
}) {
    return (
        <label className="flex items-center justify-between gap-3 cursor-pointer group">
            <span className="text-sm text-dark-300 group-hover:text-dark-200 transition-colors">{label}</span>
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={() => onChange(!checked)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${checked ? 'bg-monkey-orange' : 'bg-dark-600'
                    }`}
            >
                <span
                    className={`inline-block h-4 w-4 rounded-full bg-white transition-transform duration-200 ${checked ? 'translate-x-6' : 'translate-x-1'
                        }`}
                />
            </button>
        </label>
    )
}

function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false)
    const handleCopy = () => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }
    return (
        <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-700/80 text-dark-400 hover:text-monkey-orange text-xs transition-colors"
        >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied' : 'Copy'}
        </button>
    )
}

// ─── Response renderers ──────────────────────────────────────────────────────

function GenerateResponseView({ data }: { data: any }) {
    const [showHtml, setShowHtml] = useState(false)

    return (
        <div className="space-y-6">
            {/* Title & meta */}
            <div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">{data.title}</h3>
                {data.meta_description && (
                    <p className="text-dark-400 text-sm italic">{data.meta_description}</p>
                )}
            </div>

            {/* Sections */}
            {data.sections?.length > 0 && (
                <div className="space-y-4">
                    {data.sections.map((s: any, i: number) => (
                        <div key={i} className="p-4 rounded-xl bg-dark-800/40 border border-dark-700/30">
                            <h4 className="font-display font-semibold text-white mb-2">{s.heading}</h4>
                            <div
                                className="text-dark-300 text-sm leading-relaxed prose-invert max-w-none [&_p]:mb-2 [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_li]:mb-1"
                                dangerouslySetInnerHTML={{ __html: s.content }}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* FAQ */}
            {data.faq?.length > 0 && (
                <div>
                    <h4 className="font-display font-semibold text-monkey-orange mb-3">FAQ</h4>
                    <div className="space-y-3">
                        {data.faq.map((f: any, i: number) => (
                            <div key={i} className="p-4 rounded-xl bg-dark-800/40 border border-dark-700/30">
                                <p className="font-semibold text-white text-sm mb-1">{f.question}</p>
                                <p className="text-dark-300 text-sm">{f.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* CTA */}
            {data.cta && (
                <div className="p-4 rounded-xl bg-monkey-orange/10 border border-monkey-orange/20">
                    <p className="text-monkey-orange font-medium text-sm">{data.cta}</p>
                </div>
            )}

            {/* Full HTML toggle */}
            {data.full_html && (
                <div>
                    <button
                        onClick={() => setShowHtml(!showHtml)}
                        className="flex items-center gap-2 text-xs text-dark-400 hover:text-monkey-orange transition-colors mb-2"
                    >
                        <FileText className="w-3 h-3" />
                        {showHtml ? 'Hide' : 'Show'} full HTML
                        {showHtml ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                    {showHtml && (
                        <div className="relative">
                            <div className="absolute top-3 right-3">
                                <CopyButton text={data.full_html} />
                            </div>
                            <pre className="bg-dark-900 border border-dark-700/60 rounded-xl p-5 font-mono text-dark-300 text-xs overflow-x-auto max-h-80 overflow-y-auto">
                                {data.full_html}
                            </pre>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

function ImproveResponseView({ data }: { data: any }) {
    return (
        <div className="space-y-6">
            {/* Metadata */}
            {data.metadata && (
                <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-700 text-xs">
                        <span className="text-dark-400">Task:</span>
                        <span className="text-monkey-orange font-medium">{data.metadata.task}</span>
                    </span>
                    {data.metadata.confidence_score != null && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-700 text-xs">
                            <span className="text-dark-400">Confidence:</span>
                            <span className="text-green-400 font-medium">{(data.metadata.confidence_score * 100).toFixed(0)}%</span>
                        </span>
                    )}
                </div>
            )}

            {/* Improved content */}
            <div>
                <h4 className="font-display font-semibold text-white mb-3">Improved Content</h4>
                <div className="relative">
                    <div className="absolute top-3 right-3">
                        <CopyButton text={data.improved_content} />
                    </div>
                    <div
                        className="p-5 rounded-xl bg-dark-800/40 border border-dark-700/30 text-dark-200 text-sm leading-relaxed prose-invert max-w-none [&_p]:mb-2 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mt-4 [&_h2]:mb-2 [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_li]:mb-1"
                        dangerouslySetInnerHTML={{ __html: data.improved_content }}
                    />
                </div>
            </div>

            {/* Diff */}
            {data.diff && (
                <div>
                    <h4 className="font-display font-semibold text-white mb-3">Changes</h4>
                    <div className="space-y-2">
                        {data.diff.added?.length > 0 && (
                            <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                                <p className="text-green-400 text-xs font-semibold mb-1">Added</p>
                                {data.diff.added.map((t: string, i: number) => (
                                    <p key={i} className="text-dark-300 text-sm">+ {t}</p>
                                ))}
                            </div>
                        )}
                        {data.diff.removed?.length > 0 && (
                            <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                                <p className="text-red-400 text-xs font-semibold mb-1">Removed</p>
                                {data.diff.removed.map((t: string, i: number) => (
                                    <p key={i} className="text-dark-300 text-sm">- {t}</p>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Changes summary */}
            {data.metadata?.changes_summary && (
                <div className="p-4 rounded-xl bg-dark-800/40 border border-dark-700/30">
                    <p className="text-dark-400 text-xs font-semibold mb-1">Summary</p>
                    <p className="text-dark-300 text-sm">{data.metadata.changes_summary}</p>
                </div>
            )}
        </div>
    )
}

function CritiqueResponseView({
    data,
    onRefine
}: {
    data: any
    onRefine: () => void
}) {
    return (
        <div className="space-y-6">
            {/* Score */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    {data.passed ? (
                        <CheckCircle2 className="w-6 h-6 text-green-400" />
                    ) : (
                        <XCircle className="w-6 h-6 text-red-400" />
                    )}
                    <span className={`font-display text-2xl font-bold ${data.passed ? 'text-green-400' : 'text-red-400'}`}>
                        {data.score}/10
                    </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${data.passed
                    ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                    : 'bg-red-500/10 border border-red-500/20 text-red-400'
                    }`}>
                    {data.passed ? 'Passed' : 'Failed'}
                </span>
            </div>

            {/* Critique text */}
            <div className="p-5 rounded-xl bg-dark-800/40 border border-dark-700/30">
                <p className="text-dark-300 text-sm leading-relaxed whitespace-pre-line">{data.critique}</p>
            </div>

            {/* Refine button */}
            {!data.passed && (
                <button
                    onClick={onRefine}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-monkey-orange text-dark-900 font-semibold rounded-xl transition-all duration-300 hover:bg-monkey-orange-light hover:scale-105 hover:shadow-lg hover:shadow-monkey-orange/25"
                >
                    <Wand2 className="w-4 h-4" />
                    Auto-Refine Content
                </button>
            )}
        </div>
    )
}

function RefineResponseView({ data }: { data: any }) {
    return (
        <div className="space-y-6">
            <div>
                <h4 className="font-display font-semibold text-white mb-3">Refined Content</h4>
                <div className="relative">
                    <div className="absolute top-3 right-3">
                        <CopyButton text={data.refined_content} />
                    </div>
                    <div
                        className="p-5 rounded-xl bg-dark-800/40 border border-dark-700/30 text-dark-200 text-sm leading-relaxed prose-invert max-w-none [&_p]:mb-2 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mt-4 [&_h2]:mb-2 [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_li]:mb-1"
                        dangerouslySetInnerHTML={{ __html: data.refined_content }}
                    />
                </div>
            </div>
            {data.changes_summary && (
                <div className="p-4 rounded-xl bg-dark-800/40 border border-dark-700/30">
                    <p className="text-dark-400 text-xs font-semibold mb-1">Changes Summary</p>
                    <p className="text-dark-300 text-sm">{data.changes_summary}</p>
                </div>
            )}
        </div>
    )
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function AiPlayground() {
    // Action
    const [action, setAction] = useState<Action>('generate')

    // Options
    const [model, setModel] = useState('auto')
    const [contentType, setContentType] = useState('article')
    const [taskType, setTaskType] = useState('rewrite')
    const [tone, setTone] = useState('professional')
    const [targetLength, setTargetLength] = useState('medium')
    const [includeFaq, setIncludeFaq] = useState(false)
    const [includeCta, setIncludeCta] = useState(false)
    const [preserveLinks, setPreserveLinks] = useState(true)
    const [useRag, setUseRag] = useState(false)
    const [language, setLanguage] = useState('en')
    const [keywords, setKeywords] = useState('')
    const [customInstructions, setCustomInstructions] = useState('')

    // Input
    const [input, setInput] = useState('')
    const [guidelines, setGuidelines] = useState('')

    // Options panel visibility
    const [optionsOpen, setOptionsOpen] = useState(false)

    // State
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [result, setResult] = useState<any>(null)
    const [resultType, setResultType] = useState<'generate' | 'improve' | 'critique' | 'refine' | null>(null)

    // For refine flow
    const [critiqueData, setCritiqueData] = useState<any>(null)

    // Streaming hook
    const streaming = useStreamingGeneration()

    // When stream completes, populate the result
    useEffect(() => {
        if (streaming.result && !streaming.isStreaming) {
            setResult(streaming.result)
            // Determine result type based on current action
            setResultType(action === 'generate' ? 'generate' : 'improve')
            setLoading(false)
        }
    }, [streaming.result, streaming.isStreaming, action])

    // When stream errors, populate error state
    useEffect(() => {
        if (streaming.error && !streaming.isStreaming) {
            setError(streaming.error)
            setLoading(false)
        }
    }, [streaming.error, streaming.isStreaming])

    // ── API calls ──

    async function apiPost(endpoint: string, body: unknown) {
        const res = await fetch(`${API_BASE}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        if (!res.ok) {
            const err = await res.json().catch(() => ({ detail: res.statusText }))
            throw new Error(err.detail?.message || err.detail || `API error: ${res.status}`)
        }
        return res.json()
    }

    async function handleSubmit() {
        if (!input.trim()) return
        setLoading(true)
        setError(null)
        setResult(null)
        setResultType(null)
        setCritiqueData(null)
        streaming.reset()

        try {
            if (action === 'generate') {
                const kw = keywords.split(',').map(k => k.trim()).filter(Boolean)
                const body: any = {
                    action: 'generate',
                    model: model,
                    generate_params: {
                        brief: input,
                        content_type: contentType,
                        options: {
                            tone,
                            target_length: targetLength,
                            include_faq: includeFaq,
                            include_cta: includeCta,
                            use_rag: useRag,
                            language,
                            stream: true
                        }
                    }
                }
                if (kw.length > 0) body.generate_params.options.keywords = kw
                if (customInstructions.trim()) body.generate_params.options.custom_instructions = customInstructions

                // Use streaming — result is populated via useEffect
                streaming.startStream(`${API_BASE}/v1/unified`, body)
            } else if (action === 'improve') {
                const body: any = {
                    action: 'improve',
                    model: model,
                    improve_params: {
                        content: input,
                        task: taskType,
                        options: {
                            tone,
                            target_length: targetLength,
                            preserve_links: preserveLinks,
                            use_rag: useRag,
                            language,
                            stream: true
                        }
                    }
                }
                if (customInstructions.trim()) body.improve_params.options.custom_instructions = customInstructions

                // Use streaming — result is populated via useEffect
                streaming.startStream(`${API_BASE}/v1/unified`, body)
            } else if (action === 'critique') {
                const body = {
                    content: input,
                    guidelines: guidelines || 'General quality check'
                }
                const data = await apiPost('/v1/critique', body)
                setResult(data)
                setResultType('critique')
                setCritiqueData({ content: input, critique: data.critique, guidelines: guidelines || 'General quality check' })
                setLoading(false)
            }
        } catch (err: any) {
            setError(err.message || 'Something went wrong')
            setLoading(false)
        }
    }

    async function handleRefine() {
        if (!critiqueData) return
        setLoading(true)
        setError(null)

        try {
            const data = await apiPost('/v1/refine', {
                content: critiqueData.content,
                critique: critiqueData.critique,
                guidelines: critiqueData.guidelines
            })
            setResult(data)
            setResultType('refine')
        } catch (err: any) {
            setError(err.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    function handleReset() {
        setResult(null)
        setResultType(null)
        setError(null)
        setCritiqueData(null)
        streaming.reset()
    }

    // ── Placeholders ──

    const placeholders: Record<Action, string> = {
        generate: 'Describe the content you want to generate…\n\nExample: "Write a comprehensive article about sustainable energy solutions for small businesses, covering solar panels, wind energy, and government incentives."',
        improve: 'Paste the HTML content you want to improve…\n\nExample: "<p>Our company does things. We are good at stuff. Contact us for more info about our services.</p>"',
        critique: 'Paste the content you want analyzed…\n\nExample: "<h1>Our Services</h1><p>We provide many services that are very good and helpful for customers who need help.</p>"'
    }

    const actionLabels: Record<Action, { label: string; desc: string }> = {
        generate: { label: 'Generate', desc: 'Create new content from a brief' },
        improve: { label: 'Improve', desc: 'Enhance existing content' },
        critique: { label: 'Critique & Refine', desc: 'Analyze and auto-fix content' }
    }

    return (
        <section id="ai-playground" className="py-20">
            <div className="max-w-5xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-800 border border-dark-600 text-sm text-dark-200 mb-6">
                        <Sparkles className="w-4 h-4 text-monkey-orange" />
                        <span>MonkeysAI — Live Playground</span>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                        Try the <span className="bg-gradient-to-r from-monkey-orange via-monkey-orange-light to-monkey-orange bg-clip-text text-transparent">AI API</span> now
                    </h2>
                    <p className="text-lg text-dark-300 max-w-2xl mx-auto mb-8">
                        Generate, improve, or critique content using smart model routing — directly from this page.
                    </p>

                    {/* Development Disclaimer */}
                    <div className="flex items-start gap-3 p-4 text-left rounded-xl bg-monkey-orange/10 border border-monkey-orange/20 max-w-2xl mx-auto">
                        <AlertCircle className="w-5 h-5 text-monkey-orange flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-monkey-orange font-semibold text-sm">Development Preview</p>
                            <p className="text-dark-300 text-sm mt-1 leading-relaxed">
                                Please note: This feature is currently in active development. We are continuously working to improve response quality, verify crawling accuracy, and optimize performance.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main card */}
                <div className="bg-dark-800/60 backdrop-blur-xl border border-dark-600/50 rounded-2xl overflow-hidden">

                    {/* ── Action tabs ── */}
                    <div className="flex border-b border-dark-700/50">
                        {(['generate', 'improve', 'critique'] as Action[]).map(a => (
                            <button
                                key={a}
                                onClick={() => { setAction(a); handleReset() }}
                                className={`flex-1 px-4 py-4 text-sm font-medium transition-all duration-200 relative ${action === a
                                    ? 'text-monkey-orange'
                                    : 'text-dark-400 hover:text-dark-200'
                                    }`}
                            >
                                <span className="flex items-center justify-center gap-2">
                                    {a === 'generate' && <Sparkles className="w-4 h-4" />}
                                    {a === 'improve' && <Wand2 className="w-4 h-4" />}
                                    {a === 'critique' && <Search className="w-4 h-4" />}
                                    {actionLabels[a].label}
                                </span>
                                <span className="hidden sm:block text-xs text-dark-500 mt-0.5">{actionLabels[a].desc}</span>
                                {action === a && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-monkey-orange" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="p-5 sm:p-6 space-y-5">

                        {/* ── Model selector ── */}
                        {action !== 'critique' && (
                            <div>
                                <label className="block text-xs font-medium text-dark-400 mb-2 uppercase tracking-wider">Model</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {MODELS.map(m => (
                                        <button
                                            key={m.value}
                                            onClick={() => setModel(m.value)}
                                            className={`flex items-center gap-2 p-3 rounded-xl text-left transition-all duration-200 border ${model === m.value
                                                ? 'bg-monkey-orange/10 border-monkey-orange/30 text-monkey-orange'
                                                : 'bg-dark-800/40 border-dark-700/30 text-dark-400 hover:border-dark-600 hover:text-dark-200'
                                                }`}
                                        >
                                            {m.icon}
                                            <div>
                                                <p className="text-sm font-medium">{m.label}</p>
                                                <p className="text-xs opacity-60">{m.desc}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ── Options panel ── */}
                        <div>
                            <button
                                onClick={() => setOptionsOpen(!optionsOpen)}
                                className="flex items-center gap-2 text-sm text-dark-400 hover:text-monkey-orange transition-colors"
                            >
                                {optionsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                {optionsOpen ? 'Hide' : 'Show'} options
                            </button>

                            {optionsOpen && (
                                <div className="mt-4 p-4 rounded-xl bg-dark-900/50 border border-dark-700/30 space-y-5">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {action === 'generate' && (
                                            <SelectField label="Content Type" value={contentType} onChange={setContentType} options={CONTENT_TYPES} />
                                        )}
                                        {action === 'improve' && (
                                            <SelectField label="Task" value={taskType} onChange={setTaskType} options={TASK_TYPES} />
                                        )}
                                        {action !== 'critique' && (
                                            <>
                                                <SelectField label="Tone" value={tone} onChange={setTone} options={TONES} />
                                                <SelectField label="Length" value={targetLength} onChange={setTargetLength} options={LENGTHS} />
                                            </>
                                        )}
                                        {action !== 'critique' && (
                                            <div>
                                                <label className="block text-xs font-medium text-dark-400 mb-1.5 uppercase tracking-wider">Language</label>
                                                <input
                                                    type="text"
                                                    value={language}
                                                    onChange={e => setLanguage(e.target.value)}
                                                    className="w-full bg-dark-800 border border-dark-600/50 rounded-xl px-3 py-2.5 text-sm text-dark-100 focus:outline-none focus:border-monkey-orange/50 focus:ring-1 focus:ring-monkey-orange/20 transition-colors"
                                                    placeholder="en"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {action !== 'critique' && (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
                                            {action === 'generate' && (
                                                <>
                                                    <Toggle label="Include FAQ" checked={includeFaq} onChange={setIncludeFaq} />
                                                    <Toggle label="Include CTA" checked={includeCta} onChange={setIncludeCta} />
                                                </>
                                            )}
                                            {action === 'improve' && (
                                                <Toggle label="Preserve links" checked={preserveLinks} onChange={setPreserveLinks} />
                                            )}
                                            <Toggle label="Use RAG" checked={useRag} onChange={setUseRag} />
                                        </div>
                                    )}

                                    {action === 'generate' && (
                                        <div>
                                            <label className="block text-xs font-medium text-dark-400 mb-1.5 uppercase tracking-wider">Keywords (comma-separated)</label>
                                            <input
                                                type="text"
                                                value={keywords}
                                                onChange={e => setKeywords(e.target.value)}
                                                className="w-full bg-dark-800 border border-dark-600/50 rounded-xl px-3 py-2.5 text-sm text-dark-100 focus:outline-none focus:border-monkey-orange/50 focus:ring-1 focus:ring-monkey-orange/20 transition-colors"
                                                placeholder="AI, CMS, content management"
                                            />
                                        </div>
                                    )}

                                    {action !== 'critique' && (
                                        <div>
                                            <label className="block text-xs font-medium text-dark-400 mb-1.5 uppercase tracking-wider">Custom Instructions</label>
                                            <input
                                                type="text"
                                                value={customInstructions}
                                                onChange={e => setCustomInstructions(e.target.value)}
                                                className="w-full bg-dark-800 border border-dark-600/50 rounded-xl px-3 py-2.5 text-sm text-dark-100 focus:outline-none focus:border-monkey-orange/50 focus:ring-1 focus:ring-monkey-orange/20 transition-colors"
                                                placeholder="Any additional instructions for the AI..."
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* ── Input area ── */}
                        <div>
                            <textarea
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder={placeholders[action]}
                                rows={5}
                                className="w-full bg-dark-900/60 border border-dark-700/50 rounded-xl px-4 py-3 text-sm text-dark-100 placeholder-dark-500 resize-y focus:outline-none focus:border-monkey-orange/50 focus:ring-1 focus:ring-monkey-orange/20 transition-colors font-mono leading-relaxed"
                            />
                        </div>

                        {/* ── Guidelines (critique only) ── */}
                        {action === 'critique' && (
                            <div>
                                <label className="block text-xs font-medium text-dark-400 mb-1.5 uppercase tracking-wider">Guidelines</label>
                                <input
                                    type="text"
                                    value={guidelines}
                                    onChange={e => setGuidelines(e.target.value)}
                                    className="w-full bg-dark-900/60 border border-dark-700/50 rounded-xl px-4 py-2.5 text-sm text-dark-100 placeholder-dark-500 focus:outline-none focus:border-monkey-orange/50 focus:ring-1 focus:ring-monkey-orange/20 transition-colors"
                                    placeholder="e.g. Must include H2 headings, be under 500 words, and use active voice"
                                />
                            </div>
                        )}

                        {/* ── Submit ── */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleSubmit}
                                disabled={loading || streaming.isStreaming || !input.trim()}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-monkey-orange text-dark-900 font-semibold rounded-xl transition-all duration-300 hover:bg-monkey-orange-light hover:scale-105 hover:shadow-lg hover:shadow-monkey-orange/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                            >
                                {loading || streaming.isStreaming ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        {streaming.isStreaming ? 'Streaming…' : 'Processing…'}
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        {action === 'generate' ? 'Generate' : action === 'improve' ? 'Improve' : 'Critique'}
                                    </>
                                )}
                            </button>
                            {(result || streaming.isStreaming) && (
                                <button
                                    onClick={() => { streaming.cancelStream(); handleReset() }}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 text-dark-400 hover:text-dark-200 transition-colors text-sm"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    Reset
                                </button>
                            )}
                        </div>
                    </div>

                    {/* ── Error ── */}
                    {error && (
                        <div className="mx-5 sm:mx-6 mb-5 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-red-400 font-semibold text-sm">Error</p>
                                <p className="text-dark-300 text-sm mt-1">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* ── Streaming UI ── */}
                    {(streaming.isStreaming || (streaming.phase && streaming.phase !== 'complete' && !result)) && (
                        <StreamingResponse
                            reasoning={streaming.reasoning}
                            delta={streaming.delta}
                            error={streaming.error}
                            isStreaming={streaming.isStreaming}
                            phase={streaming.phase}
                            onCancel={() => { streaming.cancelStream(); handleReset() }}
                        />
                    )}

                    {/* ── Response ── */}
                    {result && (
                        <div className="mx-5 sm:mx-6 mb-5 p-5 sm:p-6 rounded-xl bg-dark-900/40 border border-dark-700/30">
                            <div className="flex items-center gap-2 mb-5">
                                <CheckCircle2 className="w-5 h-5 text-green-400" />
                                <span className="text-sm font-semibold text-dark-200">Response</span>
                            </div>

                            {resultType === 'generate' && <GenerateResponseView data={result} />}
                            {resultType === 'improve' && <ImproveResponseView data={result} />}
                            {resultType === 'critique' && <CritiqueResponseView data={result} onRefine={handleRefine} />}
                            {resultType === 'refine' && <RefineResponseView data={result} />}
                        </div>
                    )}

                    {/* ── Loading overlay (critique/refine only) ── */}
                    {loading && !streaming.isStreaming && (
                        <div className="mx-5 sm:mx-6 mb-5 p-8 rounded-xl bg-dark-900/40 border border-dark-700/30 flex flex-col items-center gap-3">
                            <Loader2 className="w-8 h-8 text-monkey-orange animate-spin" />
                            <p className="text-dark-300 text-sm">
                                {action === 'critique' || resultType === 'critique' ? 'Analyzing content…' : 'Refining content…'}
                            </p>
                            <p className="text-dark-500 text-xs">This may take 10–30 seconds depending on complexity</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
