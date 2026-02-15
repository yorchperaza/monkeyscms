'use client'

export function ResetCookieButton() {
    const handleReset = () => {
        localStorage.removeItem('cookie_consent')
        window.location.reload()
    }

    return (
        <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl border border-dark-500 bg-dark-700 text-dark-100 transition-all duration-300 hover:bg-dark-600 hover:border-monkey-orange/50 hover:text-white"
        >
            Reset Cookie Preferences
        </button>
    )
}
