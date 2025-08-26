'use client'

import { useState } from 'react'
import { CheckCircle2, TrendingUp, Mail, Users, Shield, Zap, Code2 } from 'lucide-react'

export default function Home() {
  const [waitlistName, setWaitlistName] = useState('')
  const [waitlistEmail, setWaitlistEmail] = useState('')
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false)
  const [waitlistSubmitting, setWaitlistSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!waitlistName || !waitlistEmail) return
    
    setWaitlistSubmitting(true)
    setSubmitError('')
    
    try {
      // Google Apps Script web app URL for Eddie waitlist
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzuVzCGeriGGoKgbRBebPUQtjOsyZa-plEklcLVMH88gar8y6RV6KTtltrtNBZsi6S2/exec'
      
      // Create a timeout promise (8 seconds for Google Apps Script)
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 8000)
      })
      
      // Create the fetch promise
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
      
      // Race between fetch and timeout
      await Promise.race([fetchPromise, timeoutPromise])
      
      // Success! Update state and show confirmation
      setWaitlistSubmitted(true)
      setWaitlistName('')
      setWaitlistEmail('')
      console.log('Name and email submitted successfully to Google Apps Script')
      
    } catch (error) {
      console.error('Error submitting to waitlist:', error)
      
      // Store name and email locally as fallback
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
      // Always stop the loading state
      setWaitlistSubmitting(false)
    }
  }

  const skills = [
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Market Research",
      description: "Based on a description of a service to sell, find companies that match the service's addressable market (SAM)."
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Sales Outreach", 
      description: "Based on a list of companies and a description of a service to sell, find email addresses of relevant employees, research the company profiles, craft and send customized cold emails."
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Lead Enrichment",
      description: "Follow up on cold emails after set intervals, answer initial customer questions, and forward cultivated leads to the sales team."
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Procurement", 
      description: "Based on inventory and sales forecast data, contact suppliers, negotiate prices, and place orders."
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      title: "Finance",
      description: "Classify emails with invoices, expenses, and disbursals sent to accounting, and store them in the accounting system."
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Customer Support",
      description: "Based on existing support databases and end-user tutorials; triage, answer, or escalate incoming customer requests to the appropriate support team."
    },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A161C', color: '#F6F5E8' }}>
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 border-b" style={{ borderColor: 'rgba(246, 245, 232, 0.1)' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <img src="/eddie-wordmark.svg" alt="eddie" className="h-8 sm:h-10" />
          </div>
          <button
            onClick={() => document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm font-medium rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: '#7DFA85',
              color: '#0A161C'
            }}
          >
            Join waitlist
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero */}
          <section className="py-16 sm:py-20 lg:py-28 xl:py-32">
            <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 xl:gap-24 items-center">
              
              {/* Left Column - Content */}
              <div className="space-y-8 sm:space-y-10 lg:space-y-12">
                
                <div className="space-y-8 sm:space-y-10 lg:space-y-12">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-light tracking-wide leading-[1.1]" style={{ fontFamily: 'Geist Sans, system-ui, sans-serif' }}>
                    <span style={{ color: '#F6F5E8' }}>Email.</span>
                    <br /><span style={{ color: '#F6F5E8' }}>Conversations.</span>
                    <br /><span style={{ color: '#7DFA85' }}>Upgraded.</span>
                  </h1>
                  
                  <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-2xl" style={{ color: 'rgba(246, 245, 232, 0.8)' }}>
                    We're building the infrastructure for fast-growing companies to run agents and automations securely on their email and proprietary data.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
                  <button
                    onClick={() => document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 sm:px-10 py-4 sm:py-5 rounded-full text-base sm:text-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{
                      backgroundColor: '#7DFA85',
                      color: '#0A161C'
                    }}
                  >
                    Get early access
                  </button>
                </div>
              </div>
              
              {/* Right Column - Visual */}
              <div className="relative">
                <div 
                  className="rounded-2xl p-6 sm:p-8 lg:p-10 xl:p-14 border"
                  style={{ 
                    backgroundColor: 'rgba(246, 245, 232, 0.02)',
                    borderColor: 'rgba(246, 245, 232, 0.1)'
                  }}
                >
                  <div className="space-y-6 sm:space-y-8">
                    <div className="text-lg sm:text-xl font-medium" style={{ color: '#F6F5E8' }}>Eddie is an email client that delivers</div>
                    <div className="space-y-4 sm:space-y-5">
                      <div className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-lg hover:bg-white/5 transition-colors">
                        <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full flex-shrink-0" style={{ backgroundColor: '#7DFA85' }}></div>
                        <span className="text-sm sm:text-base font-medium" style={{ color: 'rgba(246, 245, 232, 0.8)' }}>Communication superpowers</span>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-lg hover:bg-white/5 transition-colors">
                        <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full flex-shrink-0" style={{ backgroundColor: '#5437FB' }}></div>
                        <span className="text-sm sm:text-base font-medium" style={{ color: 'rgba(246, 245, 232, 0.8)' }}>Automations that actually work</span>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-lg hover:bg-white/5 transition-colors">
                        <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full flex-shrink-0" style={{ backgroundColor: '#7DFA85' }}></div>
                        <span className="text-sm sm:text-base font-medium" style={{ color: 'rgba(246, 245, 232, 0.8)' }}>Open Source & Agent-Native</span>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-lg hover:bg-white/5 transition-colors">
                        <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full flex-shrink-0" style={{ backgroundColor: '#5437FB' }}></div>
                        <span className="text-sm sm:text-base font-medium" style={{ color: 'rgba(246, 245, 232, 0.8)' }}>Backward Compatible with anyone who has an email address</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </section>

          {/* Skills Section */}
          <section className="py-20 sm:py-24 lg:py-32">
            <div className="text-center mb-16 sm:mb-20">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light px-4 leading-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Example Skills for <span style={{ color: '#7DFA85' }}>Fast-Growing Companies</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-16 sm:mb-20">
              {skills.map((skill, index) => (
                <div 
                  key={skill.title}
                  className="p-6 sm:p-8 lg:p-10 rounded-xl border hover:scale-105 transition-all duration-300 cursor-pointer group"
                  style={{ 
                    borderColor: 'rgba(246, 245, 232, 0.1)',
                    backgroundColor: 'rgba(246, 245, 232, 0.02)'
                  }}
                >
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                    <div className="flex-shrink-0 p-3 sm:p-4 rounded-lg" style={{ backgroundColor: 'rgba(125, 250, 133, 0.1)' }}>
                      <div style={{ color: '#7DFA85' }} className="group-hover:scale-110 transition-transform">
                        {skill.icon}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4" style={{ color: '#F6F5E8' }}>
                        {skill.title}
                      </h3>
                      <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'rgba(246, 245, 232, 0.7)' }}>
                        {skill.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Workflow */}
            <div className="text-center">
              <div className="max-w-5xl mx-auto p-8 sm:p-10 lg:p-12 rounded-2xl border" style={{
                backgroundColor: 'rgba(246, 245, 232, 0.02)',
                borderColor: 'rgba(246, 245, 232, 0.1)'
              }}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-6 sm:mb-8">
                  <div className="p-4 sm:p-5 rounded-xl" style={{ backgroundColor: 'rgba(125, 250, 133, 0.1)' }}>
                    <Code2 className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: '#7DFA85' }} />
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-light text-center sm:text-left" style={{ color: '#F6F5E8', fontFamily: 'Inter, system-ui, sans-serif' }}>
                    Custom Workflow
                  </h3>
                </div>
                <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto" style={{ color: 'rgba(246, 245, 232, 0.8)' }}>
                  Businesses, Agencies and Developers can create custom automations tailored to their unique workflows. Build once, scale infinitely.
                </p>
                <button
                  onClick={() => document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 sm:px-10 py-4 sm:py-5 rounded-lg text-base sm:text-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: '#7DFA85',
                    color: '#0A161C'
                  }}
                >
                  Build Your Workflow →
                </button>
              </div>
            </div>
          </section>

          {/* Waitlist Section */}
          <section id="waitlist-section" className="py-24 sm:py-28 lg:py-32">
            <div className="max-w-3xl mx-auto">
              <div className="p-8 sm:p-10 lg:p-14 rounded-2xl border" style={{
                backgroundColor: 'rgba(246, 245, 232, 0.02)',
                borderColor: 'rgba(246, 245, 232, 0.1)'
              }}>
                <div className="text-center mb-10 sm:mb-14">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4 sm:mb-6" style={{ color: '#F6F5E8', fontFamily: 'Inter, system-ui, sans-serif' }}>
                    Ready to transform your email?
                  </h3>
                  <p className="text-lg sm:text-xl font-medium mb-3" style={{ color: '#7DFA85' }}>
                    Join the waitlist for exclusive early access
                  </p>
                </div>
                
                                {!waitlistSubmitted ? (
                  <form onSubmit={handleWaitlistSubmit} className="space-y-6 sm:space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-base font-semibold mb-3" style={{ color: '#F6F5E8' }}>
                          Your name
                        </label>
                        <input
                          type="text"
                          value={waitlistName}
                          onChange={(e) => setWaitlistName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full px-6 py-4 rounded-lg text-base border focus:outline-none transition-all duration-200 focus:border-[#7DFA85]"
                          style={{
                            backgroundColor: 'rgba(246, 245, 232, 0.05)',
                            color: '#F6F5E8',
                            borderColor: 'rgba(246, 245, 232, 0.2)'
                          }}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-base font-semibold mb-3" style={{ color: '#F6F5E8' }}>
                          Your email
                        </label>
                        <input
                          type="email"
                          value={waitlistEmail}
                          onChange={(e) => setWaitlistEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full px-6 py-4 rounded-lg text-base border focus:outline-none transition-all duration-200 focus:border-[#7DFA85]"
                          style={{
                            backgroundColor: 'rgba(246, 245, 232, 0.05)',
                            color: '#F6F5E8',
                            borderColor: 'rgba(246, 245, 232, 0.2)'
                          }}
                          required
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm sm:text-base mb-6" style={{ color: 'rgba(246, 245, 232, 0.7)' }}>
                        We'll only use this to send product updates and your invite.
                      </p>
                    </div>
                    
                                        <button
                      type="submit"
                      disabled={waitlistSubmitting || !waitlistName || !waitlistEmail}
                      className="w-full py-5 sm:py-6 px-8 sm:px-10 rounded-full text-lg sm:text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: waitlistSubmitting ? '#5437FB' : '#7DFA85',
                        color: '#0A161C'
                      }}
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
                          className="px-6 py-3 rounded-full text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                          style={{
                            background: 'rgba(84, 55, 251, 0.2)',
                            border: '2px solid #5437FB',
                            color: '#F6F5E8'
                          }}
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
                    <div className="pt-4">
                      <button
                        onClick={() => {
                          setWaitlistSubmitted(false)
                          setWaitlistName('')
                          setWaitlistEmail('')
                          setSubmitError('')
                        }}
                        className="px-6 py-3 rounded-full text-base font-medium transition-all duration-200 hover:scale-105"
                        style={{
                          background: 'rgba(84, 55, 251, 0.2)',
                          border: '2px solid #5437FB',
                          color: '#F6F5E8'
                        }}
                      >
                        Add Another Email
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 text-center">
                  <p className="text-xs sm:text-sm opacity-50">
                    No ads. No resale. You can unsubscribe anytime.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>


    </div>
  )
}