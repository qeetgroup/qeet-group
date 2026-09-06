"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DURATION, EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * ============================================================================
 * TextLoop — one slot in a sentence, cycling through a list
 * ============================================================================
 *
 * Used to say "one way into ⟨every product⟩" without listing sixteen names in
 * a line nobody would read. The sentence stays still; only the slot moves.
 *
 * ---------------------------------------------------------------------------
 * The accessibility problem this has to solve
 * ---------------------------------------------------------------------------
 * A naive implementation of this pattern is hostile in three separate ways, and
 * all three are handled here rather than accepted:
 *
 * 1. IT IS UNSTOPPABLE MOTION IN THE READING PATH. Under reduced motion this
 *    renders the full list as static text instead — the same information, no
 *    animation, and crucially not just the first item. A reduced-motion reader
 *    should not get less content than everyone else.
 *
 * 2. IT CHANGES CONTENT UNDER A SCREEN READER. The animated slot is
 *    aria-hidden and a visually-hidden complete list sits beside it, so
 *    assistive technology reads a stable sentence naming every product once,
 *    and never announces a word swapping mid-read.
 *
 * 3. IT REFLOWS THE LINE. Items differ in width, so the container animates its
 *    width alongside the swap. Without that, the words after the slot jitter
 *    on every cycle, which is far more distracting than the swap itself.
 *
 * It also stops when the tab is hidden — an off-screen animation is pure
 * battery cost.
 */

type TextLoopProps = {
  items: string[];
  /** Milliseconds each item is held. */
  interval?: number;
  className?: string;
  /** Sentence context for assistive technology, e.g. "Products include". */
  srLabel?: string;
};

export function TextLoop({
  items,
  interval = 2200,
  className,
  srLabel,
}: TextLoopProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || items.length < 2) return;
    let timer: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      timer ??= setInterval(() => setIndex((i) => (i + 1) % items.length), interval);
    };
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };
    // Cycling in a background tab burns battery for nobody's benefit.
    const onVisibility = () => (document.hidden ? stop() : start());

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [items.length, interval, reduce]);

  if (items.length === 0) return null;

  /*
   * Reduced motion gets the whole list, not a frozen first item. Serial commas
   * and a closing "and" so it reads as a sentence rather than as a data dump.
   */
  if (reduce) {
    return (
      <span className={className}>
        {items.length === 1
          ? items[0]
          : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`}
      </span>
    );
  }

  return (
    <>
      {/* The stable, complete sentence for assistive technology. */}
      {/* One interpolated string, not two adjacent expressions — React inserts
          a comment node between adjacent text children during SSR, which lands
          in the middle of the sentence a screen reader is about to read. */}
      <span className="sr-only">{`${srLabel ? `${srLabel} ` : ""}${items.join(", ")}`}</span>

      <motion.span
        aria-hidden="true"
        layout
        transition={{ layout: { duration: DURATION.base, ease: EASE.expo } }}
        className={cn("relative inline-flex overflow-hidden align-bottom", className)}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={items[index]}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: DURATION.slow, ease: EASE.expo }}
            className="inline-block whitespace-nowrap"
          >
            {items[index]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
}
