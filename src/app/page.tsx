import Typewriter from "@/components/Typewriter";

export default function Home() {
  const messages = [
    "We were promised connection. We got chaos.",
    "A thousand apps. A million pings. No peace.",
    "Every message scattered. Every platform wants your data, your time, your mind.",
    "But there's one thing they all still rely on...",
    "Email.",
    "Eddie is bringing it back — smarter, faster, private.",
    "Messaging built on email. For you. Not for ads. Not for algorithms.",
    "It cuts the noise. Handles the boring stuff. And lets you actually talk again.",
    "No walled gardens. No forced platforms. Just people — connected on their terms.",
    "Open source. Privacy-first. Built on the one protocol Big Tech can't own.",
    "Eddie. Take back your inbox. Take back control."
  ];

  const tempos = [
    // "We were promised connection. We got chaos."
    {
      typing: { minMs: 40, maxMs: 80 },
      deleting: { minMs: 15, maxMs: 25 },
      pauseAfterTypingMs: 2000,
      pauseAfterDeletingMs: 500,
    },
    // "A thousand apps. A million pings. No peace."
    {
      typing: { minMs: 35, maxMs: 70 },
      deleting: { minMs: 12, maxMs: 20 },
      pauseAfterTypingMs: 1800,
      pauseAfterDeletingMs: 400,
    },
    // "Every message scattered..."
    {
      typing: { minMs: 25, maxMs: 60 },
      deleting: { minMs: 10, maxMs: 18 },
      pauseAfterTypingMs: 2500,
      pauseAfterDeletingMs: 600,
    },
    // "But there's one thing they all still rely on..."
    {
      typing: { minMs: 50, maxMs: 90 },
      deleting: { minMs: 20, maxMs: 30 },
      pauseAfterTypingMs: 1500,
      pauseAfterDeletingMs: 800,
    },
    // "Email."
    {
      typing: { minMs: 120, maxMs: 200 },
      deleting: { minMs: 40, maxMs: 60 },
      pauseAfterTypingMs: 3000,
      pauseAfterDeletingMs: 1000,
    },
    // "Eddie is bringing it back..."
    {
      typing: { minMs: 30, maxMs: 65 },
      deleting: { minMs: 12, maxMs: 22 },
      pauseAfterTypingMs: 2200,
      pauseAfterDeletingMs: 500,
    },
    // "Messaging built on email..."
    {
      typing: { minMs: 35, maxMs: 75 },
      deleting: { minMs: 15, maxMs: 25 },
      pauseAfterTypingMs: 2000,
      pauseAfterDeletingMs: 450,
    },
    // "It cuts the noise..."
    {
      typing: { minMs: 40, maxMs: 80 },
      deleting: { minMs: 18, maxMs: 28 },
      pauseAfterTypingMs: 1900,
      pauseAfterDeletingMs: 500,
    },
    // "No walled gardens..."
    {
      typing: { minMs: 45, maxMs: 85 },
      deleting: { minMs: 20, maxMs: 30 },
      pauseAfterTypingMs: 2100,
      pauseAfterDeletingMs: 550,
    },
    // "Open source. Privacy-first..."
    {
      typing: { minMs: 50, maxMs: 95 },
      deleting: { minMs: 22, maxMs: 35 },
      pauseAfterTypingMs: 2300,
      pauseAfterDeletingMs: 600,
    },
    // "Eddie. Take back your inbox..."
    {
      typing: { minMs: 60, maxMs: 110 },
      deleting: { minMs: 25, maxMs: 40 },
      pauseAfterTypingMs: 4000,
      pauseAfterDeletingMs: 1200,
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 text-white">
            Eddie
          </h1>
          <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-8"></div>
        </div>

        <div className="min-h-[120px] flex items-center justify-center">
          <Typewriter
            messages={messages}
            tempos={tempos}
            loop={true}
            className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-gray-100 max-w-3xl"
          />
        </div>
      </div>
    </div>
  );
}
