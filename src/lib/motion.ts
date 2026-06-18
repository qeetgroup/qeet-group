import type { Transition } from "motion/react";

/**
 * Centralised motion vocabulary. Components import these rather than
 * re-declaring magic numbers, so the whole site shares one feel. Mirrors the
 * `--ease-out-expo` / `--animate-*` tokens in globals.css.
 */

/** Signature expressive ease-out. Used by every entrance/transition. */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Standard durations in seconds. */
export const DURATION = {
  fast: 0.4,
  base: 0.6,
  slow: 0.9,
} as const;

/** Spring presets for gesture-driven motion (magnetic pull, card tilt). */
export const SPRING: Record<"soft" | "snappy", Transition> = {
  soft: { type: "spring", stiffness: 150, damping: 18, mass: 0.6 },
  snappy: { type: "spring", stiffness: 300, damping: 26 },
};
