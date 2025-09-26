'use client'

import { useCallback, useEffect } from 'react'

export default function Header() {
    const scrollToWaitlist = useCallback(() => {
        console.debug('[Eddie] UI action: scroll to waitlist')
        document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })
    }, [])

    return (
        <header className="py-2 sm:py-4 lg:py-6 border-b border-subtle">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <img src="/eddie-swirl-green.svg" alt="eddie" className="h-6 sm:h-6" />
                    <img src="/eddie-wordmark.svg" alt="eddie" className="h-8 sm:h-10" />
                </div>
                <button
                    onClick={scrollToWaitlist}
                    className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm font-medium rounded-full transition-all duration-200 hover:scale-105 active:scale-95 btn-accent"
                >
                    Get early access
                </button>
            </div>
        </header>
    )
}


