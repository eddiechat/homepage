'use client'

import ContactForm from '@/components/ContactForm'

export default function Home() {
  const scrollToWaitlist = () => {
    console.debug('[Eddie] UI action: scroll to waitlist')
    document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen">

      <main className="px-4 sm:px-6 lg:px-8 py-2 sm:py-4 lg:py-6 max-w-5xl mx-auto space-y-12">
        <section>
          <h1>the eddie manifesto</h1>
          <div>
            communication is humanity’s most precious commons. communication builds trust, communities, and solutions to our greatest challenges. and cities, cultures, democracy, and future scientific breakthroughs all depend on our free exchange of ideas.
          </div>
          <div>
            email, the one open channel we all still use, has ossified into a junkyard of newsletters, noise, and phishing attempts, forcing our actual communication elsewhere. but ironically, the platforms that promised to connect us are tearing us apart. they harvest our conversations, profile our identities, control what we see, and distort our view of reality. our thoughts are hijacked, monetized, and molded into rage and despair.
          </div>
          <div>
            we have hope. we believe that the future is open and collaborative, and that ai can help us reclaim our freedom, if used right. but to do that, we first need to reclaim our data.
          </div>
        </section>

        <section>
          <h2>what is eddie?</h2>
          <div>
            eddie is an open source, privacy-first, collaborative conversational interface built on top of email. eddie has a client-centric and fully transparent ai infrastructure, and a marketplace of community-driven, remixable agent skills, that individuals and organizations can share freely or monetize.
          </div>
          <div>
            we believe that an open and shared repository of agent skills, and the ability for anyone to easily use, improve, and reshare skills, will help humanity communicate better, spark creativity, learn faster, and automate repetitive processes.
          </div>
        </section>

        <section>
          <h2>why it matters</h2>
          <div>
            our communication layer is not a feature. it’s civic infrastructure for the next century. communication is the central nervous system of all discovery, creativity, and collaboration.
          </div>
          <div>
            we believe that conversations in natural language will remain the primary interface for services that need to seamlessly blend into our societies. the world revolves around human conversations, and we need an open platform with an ecosystem that can ensure the evolution of agentic skills that we all find useful. we are on a mission to restore the world’s conversational layer and build a human-centered platform for artificial intelligence that ensures alignment with humanity through mutual co-evolution.
          </div>
          <div>
            <a onClick={scrollToWaitlist}>sign up</a> for early access, <a href="https://discord.gg/hd7jyej98Q">join</a> the community, <a href="https://github.com/eddiechat">contribute</a> to the codebase and spread the word.
          </div>
        </section>

        <section id="waitlist-section" className="mb-16">
          <div className="max-w-3xl mx-auto">
            <div className="p-8 sm:p-10 lg:p-14 rounded-2xl border card">
              <ContactForm />
            </div>
          </div>
        </section>

        <h1>our conviction</h1>
        <section>
          <h2>conversational: a better platform for communication. </h2>
          <div>we want the simplicity of chat, with the privacy of email. we want a new type of email client, fully compatible with all existing email services, but redesigned for faster and simpler communication, and optimized for automation.</div>
          <p>we are building a distraction-free chat client on an open platform that everyone is already using. rather than invent a new platform, we’ll improve email but stay fully compatible with anyone still using traditional email clients. we will build a clean and simple chat interface, with instant delivery, groups, typing indicators, presence, reactions, and everything we have come to expect from chat, delivered through the existing open standards and a decentralized peer-to-peer mesh.</p>
        </section>

        <section>
          <h2>private: on-device intelligence</h2>
          <div>email is our past, it’s who we are, and who we trust. we want to use on-device intelligence to manage our inboxes, and provide a calmer, cleaner, and more efficient interface to communicate privately with the people we know and have trusted in the past.</div>
          <p>we will use lightweight classification models to leverage the implicit trust networks of our message history and surface meaningful conversations and actionable messages, hiding everything else until it’s needed. we are committed to sovereignty by design, and privacy beyond compliance. communication must be owned by its participants, not by service vendors. gdpr is the floor, not the ceiling. nothing should leave your control unless you say so. no telemetry, no shadow profiles. your data can never become someone else’s product.</p>
        </section>

        <section>
          <h2>remixable: sharing automations</h2>
          <div>we need a developer community and a marketplace for automation, that will allow us to learn from each other, share, and remix the latest prompts and agents. and we need help to find the safest and smartest automations, based on our communication patterns.</div>
          <p>we will build a platform for community‑driven intelligence, where users can browse, remix, and share agentic skills and automations. we want to empower creators to build sharable skills for inbox management, scheduling, translation, and automation of recurring tasks, without touching a line of code. our needs are unique, and our software should be too. technology should empower anyone to extend their capabilities easily and intuitively, and share those new abilities with the world.</p>
        </section>
      </main>

      <section id="waitlist-cta" className="py-4 sm:py-6 lg:py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center">
            <button
              onClick={scrollToWaitlist}
              className="px-8 sm:px-10 py-5 sm:py-6 rounded-full text-lg sm:text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 btn-accent"
            >
              Get early access
            </button>
          </div>
        </div>
      </section>
    </div >

  )
}
