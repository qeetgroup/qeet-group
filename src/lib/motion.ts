import type { Transition, Variants } from "motion/react";

/**
 * ============================================================================
 * The Qeet motion vocabulary
 * ============================================================================
 *
 * One file, one language. Every animation on qeet.in is a NAMED motion from
 * this module — a component that reaches for a bespoke `animate={{ y: -14 }}`
 * is drift, in the same way that a literal hex in a component is drift.
 *
 * The register is deliberately corporate rather than product. Those are two
 * different dialects and mixing them is what makes a site feel like a startup
 * wearing an enterprise suit:
 *
 *                    UI motion (a product)      Content motion (an institution)
 *   duration         120–320ms                  600–1400ms
 *   displacement     large travel, small things small travel, large things
 *   trigger          hover, cursor position     scroll position, viewport entry
 *   purpose          acknowledge an input       reveal structure, sequence an argument
 *
 * The right-hand column is what this site is built from. Cursor-following,
 * tilting and spotlight effects are absent on purpose: they animate the
 * pointer, which is nobody's content.
 *
 * Every value mirrors a token in globals.css so CSS-driven and JS-driven
 * motion cannot drift apart. `motion-tokens.test.ts` asserts that mirror.
 */

/* ==========================================================================
 * Primitives — mirrors of --ease-* and --duration-*
 * ======================================================================== */

export const EASE = {
  /** Signature. Long tail, hard arrival — the expressive default. */
  expo: [0.16, 1, 0.3, 1],
  /** Slightly gentler landing. Media and large surfaces. */
  quart: [0.25, 1, 0.5, 1],
  /** Symmetric. Colour, opacity and other non-spatial changes. */
  soft: [0.4, 0, 0.2, 1],
  /** Entrances that need a fraction more overshoot than expo. */
  entrance: [0.22, 1, 0.36, 1],
} as const satisfies Record<string, [number, number, number, number]>;

/** Retained alias — the original name, still used across the chrome. */
export const EASE_OUT = EASE.expo;

/** Seconds, because that is what `motion` takes. Milliseconds in CSS. */
export const DURATION = {
  instant: 0.12,
  fast: 0.2,
  base: 0.32,
  slow: 0.52,
  slower: 0.9,
  /** The content register. See the note above. */
  cinematic: 1.2,
} as const;

/**
 * Springs, for the two places physics beats a curve: a panel that should feel
 * weightless as it opens, and a scroll value that should lag its input
 * slightly rather than track it rigidly.
 */
export const SPRING: Record<"soft" | "snappy" | "scroll", Transition> = {
  soft: { type: "spring", stiffness: 150, damping: 18, mass: 0.6 },
  snappy: { type: "spring", stiffness: 300, damping: 26 },
  /** Smooths a raw scroll progress value. Heavily damped — no bounce. */
  scroll: { type: "spring", stiffness: 90, damping: 30, mass: 0.4, restDelta: 0.0005 },
};

/**
 * The viewport trigger every entrance shares. `once` because a section that
 * re-animates each time it scrolls back into view is a section that never
 * settles, and `amount: 0.25` so a tall section starts moving when a quarter
 * of it is committed rather than waiting for the whole thing.
 */
export const IN_VIEW = { once: true, amount: 0.25 } as const;

/* ==========================================================================
 * Named motions
 *
 * Each is a `Variants` object with the same two states, so any of them can be
 * driven by the same `initial="hidden" whileInView="visible"` pair and swapped
 * at a call site without touching anything else.
 * ======================================================================== */

/**
 * `revealLine` — display type rises out of a clip mask, line by line.
 *
 * The signature headline motion. Two parts: the container staggers, and each
 * line translates up from behind `overflow: hidden`. The mask is what makes it
 * read as typography arriving rather than as a div fading in — the letters
 * emerge from an edge instead of materialising in place.
 *
 * Requires each child to sit in a wrapper with `overflow: hidden`.
 */
export const revealLine = {
  container: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  },
  line: {
    hidden: { y: "110%" },
    visible: {
      y: "0%",
      transition: { duration: DURATION.cinematic * 0.75, ease: EASE.expo },
    },
  },
} as const satisfies Record<string, Variants>;

/**
 * `revealBlock` — the workhorse. Body copy, figures, list items, cards.
 *
 * 20px of travel and nothing else. Deliberately small: at this scale the eye
 * reads it as the content settling into position, not as an element flying in.
 */
export const revealBlock: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slower * 0.78, ease: EASE.expo },
  },
};

/** `revealBlock`, staggered across a set of siblings. */
export const revealStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

/**
 * `clipReveal` — media revealed by an animated wipe rather than a fade.
 *
 * A fade says "this image is loading". A wipe says "this image is being
 * presented". Same asset, entirely different register, and it costs one
 * animated property.
 */
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: DURATION.cinematic, ease: EASE.quart },
  },
};

/**
 * `drawPath` — an SVG stroke draws itself in.
 *
 * Used by the ecosystem map, the identity flow and the observability figure.
 * In each case the drawing IS the explanation: the line travelling from one
 * node to another is the point being made, so the motion carries meaning
 * rather than decorating it.
 *
 * The element must be a `motion.path` with `pathLength` animated.
 */
export const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: DURATION.cinematic * 1.15, ease: EASE.quart },
      opacity: { duration: DURATION.fast },
    },
  },
};

/** Nodes appearing on a drawn diagram, after their connecting lines land. */
export const nodeSettle: Variants = {
  hidden: { opacity: 0, scale: 0.86 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.slow, ease: EASE.entrance },
  },
};

/**
 * `carouselAdvance` — story-to-story transition for featured content.
 *
 * Directional: the outgoing story leaves the way the incoming one arrives, so
 * the carousel has a sense of travel and the viewer keeps their place. Takes
 * `1` for forward and `-1` for back as the custom prop.
 */
export const carouselAdvance: Variants = {
  hidden: (direction: number) => ({ opacity: 0, x: direction * 24 }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.slower * 0.7, ease: EASE.expo },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -24,
    transition: { duration: DURATION.base, ease: EASE.soft },
  }),
};

/**
 * `chromeSettle` — the mega panel opening.
 *
 * Scales from 0.98 rather than 0.9. A panel that grows visibly has been
 * animated at you; a panel that resolves the last two per cent simply arrives.
 */
export const chromeSettle: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: DURATION.base, ease: EASE.expo },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.98,
    transition: { duration: DURATION.fast, ease: EASE.soft },
  },
};

/* ==========================================================================
 * Scroll-linked constants
 *
 * These are not variants — they are the inputs to `useScroll`/`useTransform`
 * inside the media primitives. They live here so the amount of parallax on the
 * site is one number in one place, which is the only way it stays subtle.
 * ======================================================================== */

export const SCROLL = {
  /**
   * `mediaScale` — an image de-zooms as it passes through the viewport.
   *
   * 8% over a full pass. Enough that the frame is quietly alive; small enough
   * that nobody can point at it and say "that's an animation", which is the
   * correct bar for a corporate site.
   */
  mediaScale: [1.08, 1] as const,

  /**
   * `mediaParallax` — media travels slower than its frame.
   *
   * Expressed as a percentage of the frame's own height, so the effect is
   * identical on a 21:9 hero and a 4:5 portrait instead of being tuned per
   * component. The frame must overflow-hidden and the media must be oversized
   * by at least this much, or parallax exposes an edge.
   */
  mediaParallax: ["-6%", "6%"] as const,

  /** How far a horizontal rail travels across its pinned scroll distance. */
  railTravel: ["0%", "-62%"] as const,
} as const;

/**
 * Progress-driven motion is the one place where a raw scroll value is worse
 * than a smoothed one — unsmoothed, a trackpad's discrete deltas show up as
 * visible stepping in anything being scrubbed. Pass `SPRING.scroll` to
 * `useSpring` around any `useScroll` progress that drives a transform.
 */
export const SCRUB_SPRING = SPRING.scroll;
