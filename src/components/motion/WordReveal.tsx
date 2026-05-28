"use client";

import { motion, useReducedMotion } from "motion/react";

type WordRevealProps = {
  text: string;
  className?: string;
  /** Per-word stagger in seconds. */
  staggerDelay?: number;
  /** Delay before the first word begins. */
  initialDelay?: number;
  /** Per-word animation duration. */
  duration?: number;
  /** Pixel distance each word translates from. */
  distance?: number;
};

/**
 * Word-by-word reveal for serif display headlines. Each non-whitespace token
 * fades + rises into place with a small stagger. The full sentence is also
 * rendered visually-hidden so screen readers read it as a single phrase rather
 * than enumerating individual word spans.
 */
export function WordReveal({
  text,
  className,
  staggerDelay = 0.06,
  initialDelay = 0.15,
  duration = 0.7,
  distance = 18,
}: WordRevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  const tokens = text.split(/(\s+)/);
  let wordIndex = 0;

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {tokens.map((tok, i) => {
          if (/^\s+$/.test(tok)) {
            return <span key={i}>{tok}</span>;
          }
          const myIndex = wordIndex++;
          return (
            <motion.span
              key={i}
              className="inline-block will-change-transform"
              initial={{ opacity: 0, y: distance }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration,
                delay: initialDelay + myIndex * staggerDelay,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {tok}
            </motion.span>
          );
        })}
      </span>
    </span>
  );
}
