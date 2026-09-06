"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { SCRUB_SPRING } from "@/lib/motion";

/**
 * A hairline showing how far through an article you are.
 *
 * The one piece of scroll-linked motion on the site that is genuinely
 * functional rather than expressive: on a long piece, knowing whether there
 * are two minutes left or twelve changes whether someone keeps reading.
 *
 * Two details:
 *
 *   • The raw scroll value is smoothed through a heavily damped spring. A
 *     trackpad delivers scroll in discrete jumps, and an unsmoothed progress
 *     bar visibly steps rather than travelling.
 *   • Under reduced motion it renders nothing at all rather than snapping to
 *     position. A bar that jumps in increments is more distracting than no bar,
 *     and the reading time in the article header already gives the same
 *     information in a static form.
 *
 * `transformOrigin: 0` scales from the left; scaleX is compositor-only, so
 * this never triggers layout.
 */
export function ReadingProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, SCRUB_SPRING);

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: 0 }}
      className="fixed inset-x-0 top-0 z-nav h-0.5 bg-accent"
    />
  );
}
