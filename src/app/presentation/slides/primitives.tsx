"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  DURATION,
  EASE,
  drawPath,
  nodeSettle,
  revealBlock,
  revealLine,
  revealStagger,
} from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { OrgStatus } from "../portfolio";

/**
 * ============================================================================
 * Deck primitives
 * ============================================================================
 *
 * The slides are built from these and nothing else, which is what keeps
 * fifteen slides reading as one system rather than fifteen decisions.
 *
 * ---------------------------------------------------------------------------
 * Motion here is DETERMINISTIC, not scroll-triggered.
 * ---------------------------------------------------------------------------
 * The site animates on `whileInView`, because on a page the viewport is the
 * only honest signal for "the reader has arrived at this". A deck has a better
 * signal: the slide is mounted or it is not. So every primitive below runs
 * `initial="hidden" animate="visible"` on mount, and Deck.tsx mounts exactly
 * one slide at a time.
 *
 * That is a deliberate difference from `components/motion/*`, and it is the
 * only one: every easing curve, duration and variant below is IMPORTED from
 * lib/motion.ts. There are no bespoke values in this file, so the deck cannot
 * drift from the site's motion vocabulary — it can only sequence it
 * differently.
 *
 * `StillProvider` is how the print tree — and the claim tests, which render
 * every slide to static markup — opt out. Under `still`, each primitive
 * renders its final state as plain markup: no motion components, no
 * transitions to race with the print rasteriser, and no reduced-motion
 * special-casing needed further down.
 */

const StillContext = createContext(false);

export function StillProvider({ still, children }: { still: boolean; children: ReactNode }) {
  return <StillContext.Provider value={still}>{children}</StillContext.Provider>;
}

const subscribeNever = () => () => {};

/**
 * False on the server and during hydration, true afterwards.
 *
 * The reduced-motion preference only exists in the browser, so the server
 * always renders the animated tree. If the client switched to the still tree
 * on its FIRST render, the two would disagree and React would throw away the
 * server markup (minified error #418). Reading the preference only once
 * hydration has finished keeps the first client render identical to the
 * server's; the switch to the still tree is an ordinary re-render after it.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );
}

/** True when the visitor prefers reduced motion — once it is safe to know. */
export function usePrefersStill(): boolean {
  const reduce = useReducedMotion();
  const hydrated = useHydrated();
  return hydrated && Boolean(reduce);
}

/** True when motion must resolve instantly — printing, or reduced motion. */
function useStill(): boolean {
  const printing = useContext(StillContext);
  const reduce = usePrefersStill();
  return printing || reduce;
}

/* ==========================================================================
 * Frame
 * ======================================================================== */

/**
 * A slide: header, body and footer stacked inside the safe area (deck.css).
 * Every slide renders inside exactly one of these, so every slide shares one
 * margin — and the layout audit measures every slide against the same box.
 */
export function Slide({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("deck-slide", className)}>{children}</div>;
}

/** The flexible middle of a slide. Takes the height the header and footer leave. */
export function SlideBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("deck-slide-body", className)}>{children}</div>;
}

/**
 * The slide marker, top-left of every slide except the two bookends. Borrowed
 * wholesale from the site's SectionHeader rhythm — accent tick, two-digit
 * index, em-dash, label — because a presentation and the site it belongs to
 * should mark their sections the same way.
 */
export function SlideMark({ index, label }: { index: number; label: string }) {
  return (
    <div className="flex items-center gap-[1.4cqw]">
      <span aria-hidden="true" className="h-[max(1px,0.12cqw)] w-[2.6cqw] bg-accent" />
      <p className="deck-label font-mono text-ink-subtle">
        <span className="tabular-figures text-ink">{String(index).padStart(2, "0")}</span>
        <span aria-hidden="true" className="mx-[0.7cqw] text-rule-strong">
          —
        </span>
        {label}
      </p>
    </div>
  );
}

/**
 * Marker, headline and an optional one-sentence lede, in the same place on
 * every content slide.
 *
 * The headline spans the full measure. The deck used to set multi-line
 * display headlines in a four-column aside, where a single long word was
 * enough to push a line past its column — and the reveal mask clipped it
 * rather than letting anyone see. A full-width headline of at most two
 * authored lines removes the conditions for that, and `Lines` now refuses to
 * hide an overflow if one happens anyway.
 */
export function SlideHeader({
  index,
  label,
  title,
  accentIndex,
  lede,
  aside,
}: {
  index: number;
  label: string;
  /** Authored lines. Two at most: a third is a paragraph, not a headline. */
  title: string[];
  accentIndex?: number;
  lede?: ReactNode;
  /** Sits on the headline's baseline at the right — a status badge, usually. */
  aside?: ReactNode;
}) {
  return (
    <header className="shrink-0">
      <SlideMark index={index} label={label} />
      <div className="mt-[1.7cqw] flex items-end gap-[2.6cqw]">
        <Lines
          as="h2"
          lines={title}
          accentIndex={accentIndex}
          className="deck-display-s font-display text-ink"
        />
        {aside ? (
          <Rise delay={0.3} className="shrink-0 pb-[0.6cqw]">
            {aside}
          </Rise>
        ) : null}
      </div>
      {lede ? (
        <Rise delay={0.22}>
          <p className="deck-body mt-[1.3cqw] max-w-[66cqw] font-sans text-ink-muted">{lede}</p>
        </Rise>
      ) : null}
    </header>
  );
}

/** The one closing line a slide may carry, beneath its figure. */
export function SlideFooter({
  children,
  delay = 0.9,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <Rise delay={delay} className={cn("shrink-0", className)}>
      <p className="deck-body font-sans text-ink-muted">{children}</p>
    </Rise>
  );
}

/** A hairline that draws itself across its container. */
export function Rule({ className, delay = 0 }: { className?: string; delay?: number }) {
  const still = useStill();
  const classes = cn("h-px w-full origin-left bg-rule", className);

  if (still) return <div aria-hidden="true" className={classes} />;

  return (
    <motion.div
      aria-hidden="true"
      className={classes}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: DURATION.slow, ease: EASE.expo, delay }}
    />
  );
}

/* ==========================================================================
 * Type
 * ======================================================================== */

/**
 * The signature headline motion: display type rising out of a clip mask, one
 * authored line at a time.
 *
 * Lines are authored rather than measured, for the same reason the site
 * authors them — where a display headline breaks is a typographic decision,
 * and a browser only knows where it broke after layout. On a slide that
 * matters more, not less: the break is part of the composition.
 *
 * Two properties make an authored line honest:
 *
 *   `whitespace-nowrap`  an authored line stays one line. If it is too long
 *                        for the measure it overflows visibly, instead of
 *                        wrapping into a break nobody chose.
 *   `overflow-y-clip`    the mask clips VERTICALLY only, which is all the
 *                        rise needs. It used to be `overflow: hidden`, which
 *                        also clipped horizontally — so a line too long for
 *                        its column was silently cut off mid-word. Now an
 *                        overflow is visible, and the layout audit fails it.
 */
export function Lines({
  lines,
  as: Tag = "h2",
  className,
  accentIndex,
  delay = 0,
}: {
  lines: string[];
  as?: "h1" | "h2" | "p" | "div";
  className?: string;
  /** Index of the one line allowed to carry the accent. */
  accentIndex?: number;
  delay?: number;
}) {
  const still = useStill();

  const line = (text: string, i: number) => (
    <span
      key={i}
      data-deck-line=""
      className={cn("block whitespace-nowrap", i === accentIndex && "text-accent-text-display")}
    >
      {text}
    </span>
  );

  if (still) {
    return <Tag className={className}>{lines.map(line)}</Tag>;
  }

  return (
    <motion.div
      variants={revealLine.container}
      initial="hidden"
      animate="visible"
      transition={{ delayChildren: delay }}
    >
      <Tag className={className}>
        {lines.map((text, i) => (
          <span key={i} className="block overflow-y-clip pb-[0.12em] mb-[-0.12em]">
            <motion.span
              variants={revealLine.line}
              data-deck-line=""
              className={cn(
                "block whitespace-nowrap",
                i === accentIndex && "text-accent-text-display",
              )}
            >
              {text}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  );
}

/** The workhorse entrance: 20px of travel and an opacity change. */
export function Rise({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const still = useStill();
  if (still) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={revealBlock}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/** A set of siblings arriving in sequence. Children must be <Item>. */
export function Stagger({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "ol" | "ul" | "dl";
}) {
  const still = useStill();
  if (still) return <Tag className={className}>{children}</Tag>;

  const Motion = motion[Tag] as typeof motion.div;
  return (
    <Motion
      className={className}
      variants={revealStagger}
      initial="hidden"
      animate="visible"
      transition={{ delayChildren: delay }}
    >
      {children}
    </Motion>
  );
}

export function Item({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "dt" | "dd";
}) {
  const still = useStill();
  if (still) return <Tag className={className}>{children}</Tag>;

  const Motion = motion[Tag] as typeof motion.div;
  return (
    <Motion className={className} variants={revealBlock}>
      {children}
    </Motion>
  );
}

/* ==========================================================================
 * Status
 * ======================================================================== */

/**
 * The organisation's status vocabulary, rendered — and the reason the deck
 * does not reuse the site's StatusChip.
 *
 * StatusChip speaks the site's vocabulary ("Available") at the site's rem
 * size. The deck speaks the organisation's (`active`, context.yaml
 * `vocabularies.status`) at a size that scales with the stage.
 *
 * Colour is never the only carrier. Every badge prints its word, and the
 * glyph's SHAPE encodes the state, so it survives greyscale, a colour-blind
 * reader and a projector with a broken colour profile:
 *
 *   ●  active       filled, in the accent
 *   ◐  development  half-filled
 *   ○  planned      an empty ring
 */
const GLYPH: Record<OrgStatus, string> = {
  active: "border-accent bg-accent",
  development:
    "border-ink-muted bg-[linear-gradient(90deg,var(--color-ink-muted)_50%,transparent_50%)]",
  planned: "border-ink-subtle",
};

const STATUS_TEXT: Record<OrgStatus, string> = {
  active: "text-accent-text",
  development: "text-ink-muted",
  planned: "text-ink-subtle",
};

const STATUS_WORD: Record<OrgStatus, string> = {
  active: "Active",
  development: "Development",
  planned: "Planned",
};

/** Just the glyph — for per-product marks in a list that has a badge above it. */
export function StatusGlyph({ status, className }: { status: OrgStatus; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block size-[0.8cqw] shrink-0 rounded-full border-[0.14cqw]",
        GLYPH[status],
        className,
      )}
    />
  );
}

export function StatusBadge({ status, className }: { status: OrgStatus; className?: string }) {
  return (
    <span
      className={cn(
        "deck-label inline-flex items-center gap-[0.7cqw] font-mono",
        STATUS_TEXT[status],
        className,
      )}
    >
      <StatusGlyph status={status} />
      {STATUS_WORD[status]}
    </span>
  );
}

/* ==========================================================================
 * Diagram
 * ======================================================================== */

/**
 * An SVG whose strokes draw themselves and whose nodes settle after their
 * connectors land, so the figure explains itself in the order the argument
 * runs. Decorative by definition — every slide states the same thing in text
 * — so the whole carrier is hidden from assistive technology.
 */
export function Figure({
  viewBox,
  className,
  children,
  preserveAspectRatio,
}: {
  viewBox: string;
  className?: string;
  children: ReactNode;
  preserveAspectRatio?: string;
}) {
  const still = useStill();

  return (
    <svg
      aria-hidden="true"
      viewBox={viewBox}
      className={className}
      fill="none"
      role="presentation"
      preserveAspectRatio={preserveAspectRatio}
    >
      {still ? (
        <g>{children}</g>
      ) : (
        <motion.g initial="hidden" animate="visible">
          {children}
        </motion.g>
      )}
    </svg>
  );
}

/**
 * A connector inside <Figure> that draws itself in.
 *
 * A dashed stroke fades rather than draws: `pathLength` is implemented with
 * the dash array, so drawing a dashed line would erase its dashes.
 */
export function Stroke({
  d,
  className,
  delay = 0,
  strokeWidth = 1,
  dashed = false,
}: {
  d: string;
  className?: string;
  delay?: number;
  strokeWidth?: number;
  dashed?: boolean;
}) {
  const still = useStill();
  const shared = {
    d,
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: cn("stroke-rule-strong", className),
    ...(dashed ? { strokeDasharray: "3 5" } : {}),
  };

  if (still) return <path {...shared} />;

  if (dashed) {
    return (
      <motion.path
        {...shared}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DURATION.slow, delay }}
      />
    );
  }

  return (
    <motion.path
      {...shared}
      variants={drawPath}
      transition={{
        pathLength: { duration: DURATION.cinematic * 1.15, ease: EASE.quart, delay },
        opacity: { duration: DURATION.fast, delay },
      }}
    />
  );
}

/** A node inside <Figure>, arriving after its connectors. */
export function Node({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const still = useStill();
  if (still) return <g>{children}</g>;

  return (
    <motion.g
      variants={nodeSettle}
      transition={{ delay }}
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
    >
      {children}
    </motion.g>
  );
}
