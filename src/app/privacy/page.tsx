import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ResetCookieButton } from './ResetCookieButton'

export const metadata: Metadata = {
    title: 'Privacy Policy — MonkeysCMS',
    description:
        'Privacy Policy for MonkeysCMS. Learn how we handle cookies, analytics, AI features, and your data.',
}

export default function PrivacyPolicyPage() {
    const lastUpdated = 'February 15, 2025'

    return (
        <main className="min-h-screen">
            {/* Minimal nav */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-dark-700/50 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/monkeyscms-logo.png"
                            alt="MonkeysCMS"
                            width={180}
                            height={40}
                            className="h-8 w-auto"
                        />
                    </Link>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-dark-400 hover:text-monkey-orange transition-colors font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </nav>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-16">
                <header className="mb-12">
                    <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-dark-400">Last updated: {lastUpdated}</p>
                </header>

                <div className="space-y-10 text-dark-200 leading-relaxed">
                    {/* Intro */}
                    <section>
                        <p>
                            MonkeysCMS (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
                            operates the{' '}
                            <a
                                href="https://monkeyscms.com"
                                className="text-monkey-orange hover:text-monkey-orange-light underline underline-offset-2 transition-colors"
                            >
                                monkeyscms.com
                            </a>{' '}
                            website. This Privacy Policy explains how we collect, use, and
                            protect information when you visit our site or interact with our
                            services, including our AI-powered features.
                        </p>
                    </section>

                    {/* 1 — Information We Collect */}
                    <section>
                        <h2 className="font-display text-2xl font-semibold text-white mb-4">
                            1. Information We Collect
                        </h2>
                        <p className="mb-4">
                            We aim to collect the minimum data necessary to provide and
                            improve our services. The information we collect falls into the
                            following categories:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-dark-300">
                            <li>
                                <strong className="text-white">Usage data</strong> — pages
                                visited, time on site, referring URL, browser type, device
                                information, and general geographic region (country/city level).
                            </li>
                            <li>
                                <strong className="text-white">AI Playground inputs</strong> —
                                content you type into the AI Playground feature (see Section 3
                                for details).
                            </li>
                            <li>
                                <strong className="text-white">Cookie preferences</strong> —
                                your consent choice stored locally in your browser.
                            </li>
                        </ul>
                        <p className="mt-4">
                            We do <strong className="text-white">not</strong> collect your
                            name, email address, or other personally identifiable information
                            through this website unless you voluntarily provide it (e.g., by
                            contacting us).
                        </p>
                    </section>

                    {/* 2 — Cookies & Analytics */}
                    <section>
                        <h2 className="font-display text-2xl font-semibold text-white mb-4">
                            2. Cookies &amp; Analytics
                        </h2>
                        <p className="mb-4">
                            We use <strong className="text-white">Google Analytics 4</strong>{' '}
                            (measurement ID:{' '}
                            <code className="font-mono text-sm text-monkey-orange bg-dark-800 px-2 py-0.5 rounded">
                                G-GFK41CNCFS
                            </code>
                            ) to understand how visitors use our website. Google Analytics
                            sets cookies on your device to collect anonymized usage data.
                        </p>

                        <h3 className="font-display text-lg font-semibold text-white mb-3">
                            What cookies are used?
                        </h3>
                        <div className="overflow-x-auto mb-6">
                            <table className="w-full text-sm border border-dark-700 rounded-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-dark-800">
                                        <th className="text-left px-4 py-3 text-white font-semibold border-b border-dark-700">
                                            Cookie
                                        </th>
                                        <th className="text-left px-4 py-3 text-white font-semibold border-b border-dark-700">
                                            Purpose
                                        </th>
                                        <th className="text-left px-4 py-3 text-white font-semibold border-b border-dark-700">
                                            Duration
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-dark-300">
                                    <tr className="border-b border-dark-700/50">
                                        <td className="px-4 py-3 font-mono text-monkey-orange">
                                            _ga
                                        </td>
                                        <td className="px-4 py-3">
                                            Distinguishes unique visitors
                                        </td>
                                        <td className="px-4 py-3">2 years</td>
                                    </tr>
                                    <tr className="border-b border-dark-700/50">
                                        <td className="px-4 py-3 font-mono text-monkey-orange">
                                            _ga_*
                                        </td>
                                        <td className="px-4 py-3">Maintains session state</td>
                                        <td className="px-4 py-3">2 years</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="font-display text-lg font-semibold text-white mb-3">
                            Your consent
                        </h3>
                        <p>
                            Analytics cookies are loaded{' '}
                            <strong className="text-white">only after you accept</strong> the
                            cookie consent banner. If you decline, no analytics cookies are
                            set and no data is sent to Google. You can change your preference
                            at any time by clearing your browser&apos;s local storage or
                            clicking the &quot;Reset Cookie Preferences&quot; option below.
                        </p>
                    </section>

                    {/* 3 — Use of AI */}
                    <section>
                        <h2 className="font-display text-2xl font-semibold text-white mb-4">
                            3. Use of Artificial Intelligence
                        </h2>
                        <p className="mb-4">
                            Our website includes an{' '}
                            <strong className="text-white">AI Playground</strong> feature
                            that lets you generate sample CMS content structures. This
                            feature is powered by{' '}
                            <strong className="text-white">self-hosted AI models</strong>,
                            including DeepSeek and Llama 3.1, running on our own
                            infrastructure.
                        </p>

                        <h3 className="font-display text-lg font-semibold text-white mb-3">
                            How AI data is handled
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-dark-300 mb-4">
                            <li>
                                When you use the AI Playground, the text you enter is
                                processed by our self-hosted AI models. No third-party AI
                                services are involved.
                            </li>
                            <li>
                                We do <strong className="text-white">not</strong> store,
                                log, or retain any inputs or outputs from the AI Playground.
                            </li>
                            <li>
                                Inputs are processed in real time and discarded immediately
                                after the response is generated.
                            </li>
                            <li>
                                Your data never leaves our infrastructure — it is{' '}
                                <strong className="text-white">not</strong> sent to any
                                external AI provider.
                            </li>
                        </ul>

                        <h3 className="font-display text-lg font-semibold text-white mb-3">
                            AI training
                        </h3>
                        <p>
                            We do <strong className="text-white">not</strong> use your AI
                            Playground inputs to train, fine-tune, or improve any AI models.
                            The feature is provided as a demonstration tool only.
                        </p>
                    </section>

                    {/* 4 — How We Use Your Information */}
                    <section>
                        <h2 className="font-display text-2xl font-semibold text-white mb-4">
                            4. How We Use Your Information
                        </h2>
                        <p className="mb-4">
                            We use the information collected through analytics to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-dark-300">
                            <li>Understand which pages and features are most useful</li>
                            <li>Improve website performance and content</li>
                            <li>
                                Monitor general traffic patterns and geographic distribution
                            </li>
                            <li>Identify and fix technical issues</li>
                        </ul>
                    </section>

                    {/* 5 — Data Sharing */}
                    <section>
                        <h2 className="font-display text-2xl font-semibold text-white mb-4">
                            5. Data Sharing &amp; Third Parties
                        </h2>
                        <p className="mb-4">
                            We share data only with the following third-party service,
                            strictly for the purposes described above:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-dark-300 mb-4">
                            <li>
                                <strong className="text-white">Google Analytics</strong> —
                                anonymized website usage data (only when you consent to
                                cookies).
                            </li>
                        </ul>
                        <p className="mb-4">
                            The AI Playground runs entirely on our own self-hosted models
                            (DeepSeek and Llama 3.1). Your AI inputs are{' '}
                            <strong className="text-white">not</strong> sent to any
                            third-party service.
                        </p>
                        <p>
                            We do not sell, rent, or trade your data to any third parties.
                        </p>
                    </section>

                    {/* 6 — Your Rights */}
                    <section>
                        <h2 className="font-display text-2xl font-semibold text-white mb-4">
                            6. Your Rights &amp; Choices
                        </h2>
                        <p className="mb-4">You have the right to:</p>
                        <ul className="list-disc list-inside space-y-2 text-dark-300 mb-6">
                            <li>
                                <strong className="text-white">Decline cookies</strong> — use
                                the consent banner to refuse analytics tracking.
                            </li>
                            <li>
                                <strong className="text-white">
                                    Reset cookie preferences
                                </strong>{' '}
                                — clear your choice and see the consent banner again.
                            </li>
                            <li>
                                <strong className="text-white">Opt out of Google Analytics</strong>{' '}
                                — install the{' '}
                                <a
                                    href="https://tools.google.com/dlpage/gaoptout"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-monkey-orange hover:text-monkey-orange-light underline underline-offset-2 transition-colors"
                                >
                                    Google Analytics Opt-out Browser Add-on
                                </a>
                                .
                            </li>
                            <li>
                                <strong className="text-white">Not use the AI Playground</strong>{' '}
                                — the feature is entirely optional.
                            </li>
                        </ul>

                        {/* Reset cookie preferences button */}
                        <ResetCookieButton />
                    </section>

                    {/* 7 — Data Retention */}
                    <section>
                        <h2 className="font-display text-2xl font-semibold text-white mb-4">
                            7. Data Retention
                        </h2>
                        <p>
                            Google Analytics data is retained for 14 months, after which it
                            is automatically deleted. We do not maintain any additional data
                            stores for visitor information. Cookie consent preferences are
                            stored only in your browser&apos;s local storage and can be
                            cleared at any time.
                        </p>
                    </section>

                    {/* 8 — Children */}
                    <section>
                        <h2 className="font-display text-2xl font-semibold text-white mb-4">
                            8. Children&apos;s Privacy
                        </h2>
                        <p>
                            This website is not directed at children under 13. We do not
                            knowingly collect personal information from children. If you
                            believe a child has provided us with personal information, please
                            contact us so we can address the situation.
                        </p>
                    </section>

                    {/* 9 — Changes */}
                    <section>
                        <h2 className="font-display text-2xl font-semibold text-white mb-4">
                            9. Changes to This Policy
                        </h2>
                        <p>
                            We may update this Privacy Policy from time to time. Changes will
                            be posted on this page with an updated &quot;Last updated&quot;
                            date. We encourage you to review this page periodically.
                        </p>
                    </section>

                    {/* 10 — Contact */}
                    <section>
                        <h2 className="font-display text-2xl font-semibold text-white mb-4">
                            10. Contact
                        </h2>
                        <p>
                            If you have questions about this Privacy Policy, you can reach us
                            at:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-dark-300 mt-4">
                            <li>
                                GitHub:{' '}
                                <a
                                    href="https://github.com/MonkeysCloud/MonkeysCMS/issues"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-monkey-orange hover:text-monkey-orange-light underline underline-offset-2 transition-colors"
                                >
                                    MonkeysCMS Issues
                                </a>
                            </li>
                            <li>
                                Website:{' '}
                                <a
                                    href="https://monkeyscms.com"
                                    className="text-monkey-orange hover:text-monkey-orange-light underline underline-offset-2 transition-colors"
                                >
                                    monkeyscms.com
                                </a>
                            </li>
                        </ul>
                    </section>
                </div>

                {/* Back to top */}
                <div className="mt-16 pt-8 border-t border-dark-700/50 text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-dark-400 hover:text-monkey-orange transition-colors font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to MonkeysCMS
                    </Link>
                </div>
            </div>
        </main>
    )
}
