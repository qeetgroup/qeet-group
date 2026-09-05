"use client";

import { motion, useReducedMotion } from "motion/react";
import { IN_VIEW, revealLine } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * ============================================================================
 * RevealLines — the signature headline motion
 * ============================================================================
 *
 * Display type rises out of a clip mask, line by line. This is the one piece
 * of motion that appears on nearly every page, so it carries most of the
 * site's motion character.
 *
 * Why a MASK and not a fade: a fade says "this is loading". Type emerging from
 * behind an edge says "this is being presented". Same one animated property,
 * completely different register — and the register is the whole reason a
 * corporate site reads as institutional rather than as a product page.
 *
 * ---------------------------------------------------------------------------
 * Lines are authored, not measured.
 * ---------------------------------------------------------------------------
 * The caller passes an array of strings, one per visual line. The tempting
 * alternative — splitting on words and letting them wrap — cannot work here:
 * the mask has to be per-LINE, and a browser only knows where lines break
 * after layout. Measuring that would mean a client-side layout pass before the
 * headline could appear, which is precisely the wrong trade for the largest
 * text on the page.
 *
 * The cost is that the author controls the line breaks. At display sizes that
 * is a feature — where a corporate headline breaks is a typographic decision,
 * not something to leave to the viewport.
 *
 * The `lines` prop is also what makes this accessible: the heading's text
 * content is the joined string, present in the server-rendered HTML, so it is
 * readable with JavaScript disabled and announced as one heading rather than
 * as a stack of fragments.
 */

type RevealLinesProps = {
  /** One entry per visual line. Joined with spaces for assistive technology. */
  lines: string[];
  as?: "h1" | "h2" | "p" | "div";
  className?: string;
  /** Applied to the accent line, if any. */
  accentIndex?: number;
  /** Delay before the first line, in seconds. */
  delay?: number;
};

export function RevealLines({
  lines,
  as: Tag = "h2",
  className,
  accentIndex,
  delay = 0,
}: RevealLinesProps) {
  const reduce = useReducedMotion();

  /*
   * Under reduced motion the mask wrappers are dropped entirely rather than
   * animated to their final state. `overflow: hidden` on a line box clips
   * descenders on some faces, so leaving the wrappers in place would degrade
   * the typography for exactly the users who gain nothing from it.
   */
  if (reduce) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span
            key={i}
            className={cn("block", i === accentIndex && "text-accent-text-display")}
          >
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <motion.div
      variants={revealLine.container}
      initial="hidden"
      whileInView="visible"
      viewport={IN_VIEW}
      transition={{ delayChildren: delay }}
    >
      <Tag className={className}>
        {lines.map((line, i) => (
          // The mask. Padding-bottom gives descenders room inside the clip;
          // the matching negative margin keeps the leading unchanged.
          <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
            <motion.span
              variants={revealLine.line}
              className={cn("block", i === accentIndex && "text-accent-text-display")}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  );
}
