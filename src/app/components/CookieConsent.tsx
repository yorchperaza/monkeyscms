'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'
import { motion, AnimatePresence } from 'framer-motion'

const GA_ID = 'G-GFK41CNCFS'

type Consent = 'accepted' | 'declined' | null

export default function CookieConsent() {
    const [consent, setConsent] = useState<Consent>(null)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const stored = localStorage.getItem('cookie_consent') as Consent
        setConsent(stored)
        setLoaded(true)
    }, [])

    const accept = () => {
        localStorage.setItem('cookie_consent', 'accepted')
        setConsent('accepted')
        // Signal consent update if gtag already exists
        if (typeof window !== 'undefined' && (window as any).gtag) {
            ; (window as any).gtag('consent', 'update', {
                analytics_storage: 'granted',
            })
        }
    }

    const decline = () => {
        localStorage.setItem('cookie_consent', 'declined')
        setConsent('declined')
    }

    const showBanner = loaded && consent === null

    return (
        <>
            {/* Only load GA scripts when consent is accepted */}
            {consent === 'accepted' && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                        strategy="afterInteractive"
                    />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
                    </Script>
                </>
            )}

            {/* Cookie consent banner */}
            <AnimatePresence>
                {showBanner && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6"
                    >
                        <div className="mx-auto max-w-4xl rounded-2xl border border-dark-600/50 bg-dark-800/80 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                {/* Message */}
                                <div className="flex items-start sm:items-center">
                                    <p className="text-sm leading-relaxed text-dark-200 sm:text-base">
                                        We use cookies to analyze site traffic and improve your
                                        experience. By accepting, you consent to our use of
                                        analytics cookies.{' '}
                                        <a
                                            href="/privacy"
                                            className="font-medium text-monkey-orange underline underline-offset-2 transition-colors hover:text-monkey-orange-light"
                                        >
                                            Privacy Policy
                                        </a>
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex shrink-0 gap-3">
                                    <button
                                        onClick={decline}
                                        className="btn-secondary px-5 py-2.5 text-sm"
                                    >
                                        Decline
                                    </button>
                                    <button
                                        onClick={accept}
                                        className="btn-primary px-5 py-2.5 text-sm"
                                    >
                                        Accept
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
