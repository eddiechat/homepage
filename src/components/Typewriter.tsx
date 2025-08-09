"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type TempoRange = {
    minMs: number;
    maxMs: number;
};

type MessageTempo = {
    typing: TempoRange;
    deleting: TempoRange;
    pauseAfterTypingMs: number;
    pauseAfterDeletingMs: number;
};

type TypewriterProps = {
    messages: string[];
    tempos?: MessageTempo[];
    loop?: boolean;
    className?: string;
};

function randomDelayMs(range: TempoRange): number {
    const span = Math.max(0, range.maxMs - range.minMs);
    const value = range.minMs + Math.random() * span;
    return Math.max(0, Math.round(value));
}

export default function Typewriter({
    messages,
    tempos,
    loop = true,
    className,
}: TypewriterProps) {
    const [displayText, setDisplayText] = useState("");
    const [messageIndex, setMessageIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const cancelledRef = useRef(false);
    const stepIdRef = useRef(0);
    const activeStepRef = useRef(0);

    const tempoProfiles: MessageTempo[] = useMemo(() => {
        if (tempos && tempos.length === messages.length) return tempos;
        const defaults: MessageTempo[] = messages.map((_, idx) => {
            const base = 26 + idx * 3;
            return {
                typing: { minMs: base, maxMs: base + 120 },
                deleting: { minMs: 12, maxMs: 60 },
                pauseAfterTypingMs: 800 + idx * 80,
                pauseAfterDeletingMs: 260,
            } as MessageTempo;
        });
        return defaults;
    }, [messages, tempos]);

    useEffect(() => {
        console.info("[Typewriter] init", { totalMessages: messages.length });
        cancelledRef.current = false;
        const localStepId = ++stepIdRef.current;
        activeStepRef.current = localStepId;
        setDisplayText("");

        async function run() {
            console.info("[Typewriter] start sequence", { step: localStepId });
            let currentIndex = 0;
            while (!cancelledRef.current) {
                const currentMessage = messages[currentIndex] ?? "";
                const tempo = tempoProfiles[currentIndex % tempoProfiles.length];
                console.info("[Typewriter] message begin", {
                    index: currentIndex,
                    length: currentMessage.length,
                    tempo,
                });

                if (activeStepRef.current !== localStepId) break;
                setIsDeleting(false);
                await typeOut(currentMessage, tempo.typing, localStepId);
                if (cancelledRef.current) break;

                await pause(tempo.pauseAfterTypingMs, "afterTyping");
                if (cancelledRef.current) break;

                if (activeStepRef.current !== localStepId) break;
                setIsDeleting(true);
                await deleteAll(currentMessage.length, tempo.deleting, localStepId);
                if (cancelledRef.current) break;

                await pause(tempo.pauseAfterDeletingMs, "afterDeleting");
                if (cancelledRef.current) break;

                currentIndex += 1;
                if (currentIndex >= messages.length) {
                    if (!loop) {
                        console.info("[Typewriter] sequence complete (no loop)");
                        break;
                    }
                    currentIndex = 0;
                    console.info("[Typewriter] loop restart");
                }
                if (activeStepRef.current !== localStepId) break;
                setMessageIndex(currentIndex);
            }
            console.info("[Typewriter] stop sequence", {
                cancelled: cancelledRef.current,
                step: localStepId,
            });
        }

        run().catch((error) => {
            console.error("[Typewriter] run error", error);
        });

        return () => {
            cancelledRef.current = true;
            console.warn("[Typewriter] unmount: cancelling sequence", {
                step: localStepId,
            });
        };
    }, [messages, tempoProfiles, loop]);

    async function typeOut(message: string, speedRange: TempoRange, stepId: number) {
        if (activeStepRef.current !== stepId) return;
        setDisplayText("");
        for (let i = 0; i < message.length; i += 1) {
            if (cancelledRef.current || activeStepRef.current !== stepId) {
                console.warn("[Typewriter] typeOut cancelled", { i, step: stepId });
                return;
            }
            const nextChar = message[i];
            setDisplayText((prev) => {
                if (activeStepRef.current !== stepId) return prev;
                return prev + nextChar;
            });

            const baseDelay = randomDelayMs(speedRange);
            const punctuationSlowdown = /[.,;:!?]/.test(nextChar) ? 220 : 0;
            const whitespacePause = /\s/.test(nextChar) ? 40 : 0;
            const jitter = Math.round(Math.random() * 30);
            const delay = baseDelay + punctuationSlowdown + whitespacePause + jitter;

            console.debug("[Typewriter] type", {
                char: nextChar,
                at: i,
                delay,
                step: stepId,
            });
            await sleep(delay);
        }
        console.info("[Typewriter] typeOut complete", { step: stepId });
    }

    async function deleteAll(length: number, speedRange: TempoRange, stepId: number) {
        for (let i = length; i > 0; i -= 1) {
            if (cancelledRef.current || activeStepRef.current !== stepId) {
                console.warn("[Typewriter] deleteAll cancelled", { i, step: stepId });
                return;
            }
            setDisplayText((prev) => {
                if (activeStepRef.current !== stepId) return prev;
                return prev.slice(0, -1);
            });

            const baseDelay = randomDelayMs(speedRange);
            const ramp = Math.max(0, Math.round((1 - i / length) * 45));
            const jitter = Math.round(Math.random() * 25);
            const delay = Math.max(8, baseDelay - ramp + jitter);

            console.debug("[Typewriter] backspace", { remaining: i - 1, delay, step: stepId });
            await sleep(delay);
        }
        if (activeStepRef.current === stepId) setDisplayText("");
        console.info("[Typewriter] deleteAll complete", { step: stepId });
    }

    async function pause(ms: number, reason: string) {
        console.debug("[Typewriter] pause", { ms, reason });
        await sleep(ms);
    }

    return (
        <span className={className} aria-live="polite" aria-atomic>
            {displayText}
            <span className="inline-block w-[0.6ch] -translate-y-0.5 animate-pulse">|</span>
        </span>
    );
}

function sleep(ms: number) {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

