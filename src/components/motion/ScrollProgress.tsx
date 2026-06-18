"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/**
 * Thin reading-progress bar pinned to the very top of the viewport, above the
 * nav. Brand gradient, scaleX driven by document scroll. The bar reflects
 * position rather than animating on its own, so it's kept for reduced-motion
 * users too — just without the spring smoothing.
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
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r from-brand to-brand-deep"
    />
  );
}
