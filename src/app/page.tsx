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
    {
      typing: { minMs: 40, maxMs: 80 },
      deleting: { minMs: 15, maxMs: 25 },
      pauseAfterTypingMs: 2000,
      pauseAfterDeletingMs: 500,
    },
    {
      typing: { minMs: 35, maxMs: 70 },
      deleting: { minMs: 12, maxMs: 20 },
      pauseAfterTypingMs: 1800,
      pauseAfterDeletingMs: 400,
    },
    {
      typing: { minMs: 25, maxMs: 60 },
      deleting: { minMs: 10, maxMs: 18 },
      pauseAfterTypingMs: 2500,
      pauseAfterDeletingMs: 600,
    },
    {
      typing: { minMs: 50, maxMs: 90 },
      deleting: { minMs: 20, maxMs: 30 },
      pauseAfterTypingMs: 1500,
      pauseAfterDeletingMs: 800,
    },
    {
      typing: { minMs: 120, maxMs: 200 },
      deleting: { minMs: 40, maxMs: 60 },
      pauseAfterTypingMs: 3000,
      pauseAfterDeletingMs: 1000,
    },
    {
      typing: { minMs: 30, maxMs: 65 },
      deleting: { minMs: 12, maxMs: 22 },
      pauseAfterTypingMs: 2200,
      pauseAfterDeletingMs: 500,
    },
    {
      typing: { minMs: 35, maxMs: 75 },
      deleting: { minMs: 15, maxMs: 25 },
      pauseAfterTypingMs: 2000,
      pauseAfterDeletingMs: 450,
    },
    {
      typing: { minMs: 40, maxMs: 80 },
      deleting: { minMs: 18, maxMs: 28 },
      pauseAfterTypingMs: 1900,
      pauseAfterDeletingMs: 500,
    },
    {
      typing: { minMs: 45, maxMs: 85 },
      deleting: { minMs: 20, maxMs: 30 },
      pauseAfterTypingMs: 2100,
      pauseAfterDeletingMs: 550,
    },
    {
      typing: { minMs: 50, maxMs: 95 },
      deleting: { minMs: 22, maxMs: 35 },
      pauseAfterTypingMs: 2300,
      pauseAfterDeletingMs: 600,
    },
    {
      typing: { minMs: 60, maxMs: 110 },
      deleting: { minMs: 25, maxMs: 40 },
      pauseAfterTypingMs: 4000,
      pauseAfterDeletingMs: 1200,
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-center p-8 relative">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <div className="min-h-[200px] flex items-center justify-center">
            <Typewriter
              messages={messages}
              tempos={tempos}
              loop={true}
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-center"
            />
          </div>

          <div className="w-80 h-2 bg-yellow-400 mt-12 mx-auto"></div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8">
        <p className="text-2xl md:text-3xl font-normal">
          eddie.chat
        </p>
      </div>
    </div>
  );
}
