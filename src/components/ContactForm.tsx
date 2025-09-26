"use client"

import React, { useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

export default function ContactForm() {
    const [waitlistName, setWaitlistName] = useState('')
    const [waitlistEmail, setWaitlistEmail] = useState('')
    const [waitlistSubmitted, setWaitlistSubmitted] = useState(false)
    const [waitlistSubmitting, setWaitlistSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState('')

    useEffect(() => {
        console.info('[Eddie] Component render: ContactForm mounted')
    }, [])

    const handleWaitlistSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!waitlistEmail) return

        setWaitlistSubmitting(true)
        setSubmitError('')

        try {
            const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzuVzCGeriGGoKgbRBebPUQtjOsyZa-plEklcLVMH88gar8y6RV6KTtltrtNBZsi6S2/exec'

            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Request timeout')), 30000)
            })

            const fetchPromise = fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: JSON.stringify({
                    name: waitlistName,
                    email: waitlistEmail,
                    timestamp: new Date().toISOString(),
                    source: 'Eddie Landing Page'
                })
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                return response
            })

            await Promise.race([fetchPromise, timeoutPromise])

            setWaitlistSubmitted(true)
            setWaitlistName('')
            setWaitlistEmail('')
            console.log('Email submitted successfully to Google Apps Script')

        } catch (error) {
            console.error('Error submitting to waitlist:', error)

            if (typeof window !== 'undefined') {
                const savedSubmissions = JSON.parse(localStorage.getItem('eddie-waitlist') || '[]')
                savedSubmissions.push({
                    name: waitlistName,
                    email: waitlistEmail,
                    timestamp: new Date().toISOString(),
                    source: 'Eddie Landing Page'
                })
                localStorage.setItem('eddie-waitlist', JSON.stringify(savedSubmissions))
                console.log('Name and email saved locally as fallback')
            }

            if (error instanceof Error) {
                if (error.message === 'Request timeout') {
                    setSubmitError('Google Apps Script is taking longer than expected. Your email has been saved locally. Please try again later or contact support.')
                } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                    setSubmitError('Network error. Your email has been saved locally. Please check your connection and try again.')
                } else if (error.message.includes('HTTP error!')) {
                    setSubmitError('Server error. Your email has been saved locally. Please try again in a few moments.')
                } else {
                    setSubmitError('Submission failed but your email has been saved locally. Please try again.')
                }
            } else {
                setSubmitError('An unexpected error occurred. Your email has been saved locally.')
            }
        } finally {
            setWaitlistSubmitting(false)
        }
    }

    return (
        <>
            <div className="text-center mb-10 sm:mb-14">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4 sm:mb-6">
                    Ready to transform your email?
                </h3>
                <p className="text-lg sm:text-xl font-medium mb-3 text-accent">
                    Join the waitlist for exclusive early access
                </p>
            </div>

            {!waitlistSubmitted ? (
                <form onSubmit={handleWaitlistSubmit} className="space-y-6 sm:space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-base font-semibold mb-3">
                                Your name
                            </label>
                            <input
                                type="text"
                                value={waitlistName}
                                onChange={(e) => setWaitlistName(e.target.value)}
                                placeholder="John Doe"
                                className="w-full px-6 py-4 rounded-lg text-base border transition-all duration-200"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-base font-semibold mb-3">
                                Your email
                            </label>
                            <input
                                type="email"
                                value={waitlistEmail}
                                onChange={(e) => setWaitlistEmail(e.target.value)}
                                placeholder="your@email.com"
                                className="w-full px-6 py-4 rounded-lg text-base border transition-all duration-200"
                                required
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-sm sm:text-base mb-6 text-muted-70">
                            We'll only use this to send product updates and your invite.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={waitlistSubmitting || !waitlistName || !waitlistEmail}
                        className={`w-full py-5 sm:py-6 px-8 sm:px-10 rounded-full text-lg sm:text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 disabled:hover:scale-100 ${waitlistSubmitting ? 'btn-brand-ghost' : 'btn-accent'}`}
                    >
                        {waitlistSubmitting ? (
                            <div className="flex items-center justify-center gap-3">
                                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                <span>Submitting...</span>
                            </div>
                        ) : (
                            'Get Early Access'
                        )}
                    </button>

                    {submitError && (
                        <div className="text-center space-y-4">
                            <p className="text-red-400 text-base font-medium">{submitError}</p>
                            <button
                                onClick={() => {
                                    setSubmitError('')
                                    setWaitlistName('')
                                    setWaitlistEmail('')
                                }}
                                className="px-6 py-3 rounded-full text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg btn-brand-ghost"
                            >
                                Try Again
                            </button>
                        </div>
                    )}
                </form>
            ) : (
                <div className="text-center space-y-4">
                    <div className="flex justify-center">
                        <div className="p-4 rounded-full bg-gradient-to-r from-[#5437FB]/20 to-[#7DFA85]/20">
                            <CheckCircle2 className="w-12 h-12" style={{ color: '#7DFA85' }} />
                        </div>
                    </div>
                    <h4 className="text-2xl sm:text-3xl font-bold">
                        Welcome to Eddie! 🎉
                    </h4>
                    <p className="text-lg opacity-80 max-w-md mx-auto">
                        Your email has been added to our waitlist. We'll notify you as soon as Eddie is ready for early access.
                    </p>
                    <button
                        onClick={() => {
                            setWaitlistSubmitted(false)
                            setWaitlistName('')
                            setWaitlistEmail('')
                            setSubmitError('')
                        }}
                        className="mt-4 px-6 py-3 rounded-full text-base font-medium transition-all duration-200 hover:scale-105 btn-brand-ghost"
                    >
                        Add Another Email
                    </button>
                </div>
            )}

            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-subtle text-center">
                <p className="text-xs sm:text-sm opacity-50">
                    No ads. No resale. You can unsubscribe anytime.
                </p>
            </div>
        </>
    )
}


