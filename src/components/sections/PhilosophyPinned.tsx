"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Eyebrow } from "../ui/Eyebrow";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";

export type PhilosophyEntry = {
  letter: "Q" | "E" | "T";
  word: string;
  headline: string;
  body: string;
};

/**
 * Pinned philosophy sequence. A sticky left rail tracks the four principles
 * (Q-E-E-T) while the blocks scroll past on the right; an IntersectionObserver
 * promotes the active principle, and the big rail letter cross-fades to match.
 * On small screens the rail isn't sticky and each block carries its own letter
 * chip. Reduced-motion users lose only the letter cross-fade — the layout and
 * active-state highlighting still work.
 */
export function PhilosophyPinned({ blocks }: { blocks: PhilosophyEntry[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observers = refs.current.map((el, i) => {
      if (!el) return null;
      const o = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(i);
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
      );
      o.observe(el);
      return o;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
      {/* Sticky rail */}
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <Eyebrow>The Philosophy</Eyebrow>
          <div className="mt-8 hidden lg:block">
            <div className="relative h-[12rem] overflow-hidden">
              <motion.span
                key={active}
                aria-hidden="true"
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                className="block font-serif font-normal leading-[0.8] text-ink text-[11rem]"
              >
                {blocks[active].letter}
              </motion.span>
            </div>
            <ul className="mt-6 space-y-4">
              {blocks.map((b, i) => (
                <li key={b.word}>
                  <span
                    className={cn(
                      "flex items-center gap-4 font-sans text-body transition-colors duration-300",
                      i === active ? "text-ink" : "text-ink-subtle",
                    )}
                  >
                    <span
                      className={cn(
                        "h-px transition-all duration-300",
                        i === active ? "w-10 bg-brand" : "w-5 bg-rule-strong",
                      )}
                    />
                    {b.word}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Scrolling blocks */}
      <div className="lg:col-span-8">
        {blocks.map((b, i) => (
          <article
            key={b.word}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={cn(
              "py-14 md:py-20 lg:py-24",
              i !== 0 && "border-t border-rule",
            )}
          >
            <span
              aria-hidden="true"
              className="mb-6 block font-serif font-normal leading-none text-ink text-[3.5rem] lg:hidden"
            >
              {b.letter}
            </span>
            <Eyebrow className="mb-4 md:mb-5">{b.word}</Eyebrow>
            <h3 className="mb-5 font-serif font-normal text-balance tracking-[-0.01em] text-ink text-[1.75rem] leading-[1.15] md:mb-6 md:text-[2.25rem] md:leading-[1.18] lg:text-[2.75rem] lg:leading-[1.16]">
              {b.headline}
            </h3>
            <p className="max-w-[40rem] text-body-l text-ink-muted">{b.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
