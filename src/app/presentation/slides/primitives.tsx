"use client";

import { createContext, useContext, type ReactNode } from "react";
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
 * `StillProvider` is how the print tree opts out. Under `still`, each
 * primitive renders its final state as plain markup: no motion components, no
 * transitions to race with the print rasteriser, and no reduced-motion
 * special-casing needed further down.
 */

const StillContext = createContext(false);

export function StillProvider({ still, children }: { still: boolean; children: ReactNode }) {
  return <StillContext.Provider value={still}>{children}</StillContext.Provider>;
}

/** True when motion must resolve instantly — printing, or reduced motion. */
function useStill(): boolean {
  const printing = useContext(StillContext);
  const reduce = useReducedMotion();
  return printing || Boolean(reduce);
}

/* ==========================================================================
 * Structure
 * ======================================================================== */

/**
 * The slide marker, top-left of every slide except the two bookends. Borrowed
 * wholesale from the site's SectionHeader rhythm — accent tick, two-digit
 * index, em-dash, label — because a presentation and the site it belongs to
 * should mark their sections the same way.
 *
 * This tick is usually the slide's entire accent budget.
 */
export function SlideMark({ index, label }: { index: number; label: string }) {
  return (
    <div className="flex items-center gap-[1.4cqw]">
      <span aria-hidden="true" className="h-px w-[2.6cqw] bg-accent" />
      <p className="deck-label font-mono text-ink-subtle">
        <span className="tabular-figures text-ink">
          {String(index).padStart(2, "0")}
        </span>
        <span className="mx-[0.7cqw] text-rule-strong">—</span>
        {label}
      </p>
    </div>
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
      className={cn("block", i === accentIndex && "text-accent-text-display")}
    >
      {text}
    </span>
  );

  /*
   * Under `still` the mask wrappers are dropped rather than animated to their
   * end state: `overflow: hidden` on a line box clips descenders on some
   * faces, and degrading the typography for reduced-motion readers would be a
   * strange way to accommodate them.
   */
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
          <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
            <motion.span
              variants={revealLine.line}
              className={cn("block", i === accentIndex && "text-accent-text-display")}
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

/**
 * A quotation set as the slide's evidence rather than its decoration: a
 * hairline down the left, the words at heading scale, attribution in mono
 * beneath. No quote marks — at this size they read as ornament.
 *
 * The rule is `rule-strong`, not accent. Most slides spend their accent on one
 * emphasised word or one status dot, and a quotation that also claimed it
 * would put two competing signal surfaces on the same slide — which the
 * design system's ~2% accent budget exists to prevent.
 */
export function PullQuote({
  children,
  source,
  className,
  delay = 0,
}: {
  children: ReactNode;
  source?: string;
  className?: string;
  delay?: number;
}) {
  return (
    <Rise className={className} delay={delay}>
      <figure className="border-l border-rule-strong pl-[2cqw]">
        <blockquote className="deck-heading-s font-display text-ink">{children}</blockquote>
        {source ? (
          <figcaption className="deck-label mt-[1.4cqw] font-mono text-ink-subtle">
            {source}
          </figcaption>
        ) : null}
      </figure>
    </Rise>
  );
}

/* ==========================================================================
 * Diagram
 * ======================================================================== */

/**
 * An SVG whose strokes draw themselves and whose nodes settle after their
 * connectors land, so the figure explains itself in the order the argument
 * runs. Decorative by definition — the slide states the same thing in text —
 * so the whole carrier is hidden from assistive technology.
 */
export function Figure({
  viewBox,
  className,
  children,
}: {
  viewBox: string;
  className?: string;
  children: ReactNode;
}) {
  const still = useStill();

  return (
    <svg
      aria-hidden="true"
      viewBox={viewBox}
      className={className}
      fill="none"
      role="presentation"
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

/** A connector inside <Figure> that draws itself in. */
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
    className: cn("stroke-rule-strong", className),
    ...(dashed ? { strokeDasharray: "2 6" } : {}),
  };

  if (still) return <path {...shared} />;

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
export function Node({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const still = useStill();
  if (still) return <g>{children}</g>;

  return (
    <motion.g variants={nodeSettle} transition={{ delay }} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
      {children}
    </motion.g>
  );
}

/**
 * The deck's one repeated diagram idiom: a horizontal chain of labelled
 * stages joined by a drawn rule, with an optional threshold marking the point
 * where something changes state.
 *
 * Presence carries the meaning, in the same ladder the site's lifecycle
 * colours use — faint ink before a threshold, full ink after it, and the
 * accent on the threshold itself. It reads correctly in greyscale because the
 * ladder is one of prominence, not hue.
 */
export function Chain({
  stages,
  thresholdAfter,
  className,
}: {
  stages: Array<{ label: string; note?: string }>;
  /** Zero-based index after which the threshold rule is drawn. */
  thresholdAfter?: number;
  className?: string;
}) {
  return (
    <Stagger
      as="ol"
      className={cn("flex items-stretch", className)}
    >
      {stages.map((stage, i) => {
        const past = thresholdAfter !== undefined && i > thresholdAfter;
        const isThreshold = thresholdAfter !== undefined && i === thresholdAfter + 1;
        return (
          <Item
            as="li"
            key={stage.label}
            className={cn(
              "relative flex-1 pt-[1.6cqw] pr-[1.6cqw]",
              // The threshold is a full-height rule in the accent, not a
              // label — the change of state should be visible before it is
              // read.
              isThreshold && "border-l border-accent pl-[1.6cqw]",
              !isThreshold && "border-t border-rule",
            )}
          >
            {isThreshold ? (
              <span aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-rule-strong" />
            ) : null}
            <p
              className={cn(
                "deck-body font-display",
                thresholdAfter === undefined || past ? "text-ink" : "text-ink-subtle",
              )}
            >
              {stage.label}
            </p>
            {stage.note ? (
              <p className="deck-body-s mt-[0.7cqw] font-sans text-ink-subtle">{stage.note}</p>
            ) : null}
          </Item>
        );
      })}
    </Stagger>
  );
}
