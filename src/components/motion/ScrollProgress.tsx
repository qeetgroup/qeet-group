"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/**
 * Thin reading-progress bar pinned to the very top of the viewport, above the
 * nav. scaleX is driven by document scroll. The bar reflects position rather
 * than animating on its own, so it is kept for reduced-motion users too — just
 * without the spring smoothing.
 *
 * A flat accent fill. This previously ran `from-accent to-brand-700`, which
 * stopped resolving entirely when the palette moved off the orange ramp —
 * `brand-700` no longer exists, so the bar was rendering a gradient to nothing.
 */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: reduce ? scrollYProgress : smooth }}
      className="fixed inset-x-0 top-0 z-nav h-0.5 origin-left bg-accent"
    />
  );
}
