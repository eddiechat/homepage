"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { useActionState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { submitWaitlistAction, type WaitlistActionState } from '@/app/actions'

export default function ContactForm() {
    const [waitlistName, setWaitlistName] = useState('')
    const [waitlistEmail, setWaitlistEmail] = useState('')
    const [waitlistSubmitted, setWaitlistSubmitted] = useState(false)
    const [submitError, setSubmitError] = useState('')

    const initialActionState: WaitlistActionState = useMemo(() => ({ success: false }), [])
    const [actionState, formAction, isPending] = useActionState<WaitlistActionState, FormData>(submitWaitlistAction, initialActionState)

    useEffect(() => {
        console.info('[Eddie] Component render: ContactForm mounted')
    }, [])

    useEffect(() => {
        if (!actionState) return
        if (actionState.success) {
            console.info('[Eddie] UI state: waitlist submission successful')
            setWaitlistSubmitted(true)
            setWaitlistName('')
            setWaitlistEmail('')
            setSubmitError('')
        } else if (actionState.error) {
            console.warn('[Eddie] UI state: waitlist submission failed', actionState.error)
            setSubmitError(
                actionState.error
            )
            try {
                if (typeof window !== 'undefined') {
                    const savedSubmissions = JSON.parse(localStorage.getItem('eddie-waitlist') || '[]')
                    savedSubmissions.push({
                        name: waitlistName,
                        email: waitlistEmail,
                    })
                    localStorage.setItem('eddie-waitlist', JSON.stringify(savedSubmissions))
                    console.debug('[Eddie] Local fallback: saved waitlist submission to localStorage')
                }
            } catch (e) {
                console.error('[Eddie] Local fallback error', e)
            }
        }
    }, [actionState, waitlistEmail, waitlistName])

    return (
        <>
            {!waitlistSubmitted && (
                <div className="text-center mb-10 sm:mb-14">
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4 sm:mb-6">
                        Ready to transform your email?
                    </h3>
                    <p className="text-lg sm:text-xl font-medium mb-3 text-accent">
                        Join the waitlist for exclusive early access
                    </p>
                </div>
            )}

            {!waitlistSubmitted ? (
                <form action={formAction} className="space-y-6 sm:space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-base font-semibold mb-3">
                                Your name
                            </label>
                            <input
                                type="text"
                                name="name"
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
                                name="email"
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
                        disabled={isPending || !waitlistName || !waitlistEmail}
                        className={`w-full py-5 sm:py-6 px-8 sm:px-10 rounded-full text-lg sm:text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 disabled:hover:scale-100 ${isPending ? 'btn-brand-ghost' : 'btn-accent'}`}
                    >
                        {isPending ? (
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


