"use client";

import { useMemo, useRef, useState } from "react";
import NextLink from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { StatusChip } from "@/components/ui/StatusChip";
import type { ProductSummary } from "@/lib/content/types";
import { drawPath, IN_VIEW, nodeSettle } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * ============================================================================
 * The ecosystem map — Qeet's signature interaction
 * ============================================================================
 *
 * A grid of product cards tells a visitor that Qeet has products. It cannot
 * tell them that the products COMPOSE one another, which is the single most
 * important thing about this portfolio and the reason it is an ecosystem
 * rather than a catalogue.
 *
 * So: a radial figure. Qeet Group at the centre, products on a ring grouped by
 * domain, and lines drawn from the two organisation-wide dependencies —
 * identity and the design foundation — to everything that depends on them.
 * Selecting a product brightens its dependencies and reveals what it does.
 *
 * ---------------------------------------------------------------------------
 * Three constraints shaped this more than the visual did.
 * ---------------------------------------------------------------------------
 *
 * 1. IT MUST NOT ENCODE A COUNT IT CANNOT KEEP. Positions are computed from
 *    the live collection, so the ring redistributes as products are added. No
 *    hand-placed coordinates, and nothing to redraw for product seventeen.
 *
 * 2. IT MUST BE OPERABLE WITHOUT A MOUSE. Nodes form a single roving-tabindex
 *    group: one tab stop, arrow keys to move around the ring. Tabbing through
 *    fifteen SVG nodes to reach the footer would be its own accessibility
 *    failure.
 *
 * 3. THE INFORMATION MUST EXIST WITHOUT THE PICTURE. A visually-hidden table
 *    carries every product, its status and its role — so a screen reader gets
 *    the content rather than a description of a diagram, and reduced-motion
 *    users get a figure that simply does not move.
 */

/** The two things everything else depends on. Verified in qeet-context. */
const FOUNDATIONS = new Set(["qeet-id", "qeetrix"]);

const SIZE = 720;
const CENTER = SIZE / 2;
const RING = 258;

/** Math.sin/cos may differ by 1 ulp across engines; rounding keeps SSR and
 *  client hydration byte-identical. Same trick as the original IdentityGraph. */
const r3 = (v: number) => Math.round(v * 1000) / 1000;

function nodeAt(index: number, total: number) {
  // Start at 12 o'clock and go clockwise, so the first product reads as first.
  const deg = -90 + (360 / total) * index;
  const rad = (deg * Math.PI) / 180;
  return { x: r3(CENTER + RING * Math.cos(rad)), y: r3(CENTER + RING * Math.sin(rad)) };
}

const STATUS_STROKE: Record<string, string> = {
  available: "var(--color-status-available)",
  development: "var(--color-status-development)",
  planned: "var(--color-status-planned)",
};

export function EcosystemMap({
  products,
  headingLevel = 3,
}: {
  products: ProductSummary[];
  /**
   * Heading level for the detail panel's product name.
   *
   * Configurable because the map appears at two depths. On the homepage it sits
   * inside a section that already has an h2, so the panel is an h3. On
   * /ecosystem it follows the page h1 directly, and leaving it at h3 skipped a
   * level — a WCAG 1.3.1 failure that is invisible on screen and obvious to
   * anyone navigating by headings.
   */
  headingLevel?: 2 | 3;
}) {
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [focusIndex, setFocusIndex] = useState(0);
  const nodeRefs = useRef<Array<SVGGElement | null>>([]);
  const PanelHeading = headingLevel === 2 ? "h2" : "h3";

  const nodes = useMemo(
    () => products.map((p, i) => ({ ...p, ...nodeAt(i, products.length) })),
    [products],
  );

  const active = nodes[activeIndex];

  /*
   * Which connections to highlight. A foundation product lights up everything
   * that depends on it; anything else lights up the foundations it composes.
   * The relationship is read from the portfolio's platform model, not invented
   * per-node.
   */
  const highlighted = useMemo(() => {
    if (!active) return new Set<string>();
    if (FOUNDATIONS.has(active.slug)) {
      return new Set(nodes.filter((n) => !FOUNDATIONS.has(n.slug)).map((n) => n.slug));
    }
    return new Set([...FOUNDATIONS].filter((f) => nodes.some((n) => n.slug === f)));
  }, [active, nodes]);

  const move = (delta: number) => {
    const next = (focusIndex + delta + nodes.length) % nodes.length;
    setFocusIndex(next);
    setActiveIndex(next);
    nodeRefs.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        move(1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        move(-1);
        break;
      case "Home":
        e.preventDefault();
        setFocusIndex(0);
        setActiveIndex(0);
        nodeRefs.current[0]?.focus();
        break;
      case "End":
        e.preventDefault();
        setFocusIndex(nodes.length - 1);
        setActiveIndex(nodes.length - 1);
        nodeRefs.current[nodes.length - 1]?.focus();
        break;
    }
  };

  if (nodes.length === 0) return null;

  return (
    <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-7">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="mx-auto h-auto w-full max-w-[42rem]"
          role="group"
          aria-label="Qeet Group product ecosystem. Use arrow keys to explore."
          onKeyDown={onKeyDown}
        >
          {/* Hairline ring. Structure, not decoration — it is what makes the
              nodes read as one system rather than as scattered points. */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RING}
            fill="none"
            stroke="var(--color-rule)"
            strokeWidth="1"
          />

          {/* Connections. Drawn beneath the nodes so lines never cross a label. */}
          <g>
            {nodes.map((n) => {
              const on = highlighted.has(n.slug);
              return (
                <motion.line
                  key={`line-${n.slug}`}
                  x1={CENTER}
                  y1={CENTER}
                  x2={n.x}
                  y2={n.y}
                  stroke={on ? "var(--color-accent)" : "var(--color-rule)"}
                  strokeWidth={on ? 1.5 : 1}
                  opacity={on ? 0.9 : 0.35}
                  variants={reduce ? undefined : drawPath}
                  initial={reduce ? false : "hidden"}
                  whileInView="visible"
                  viewport={IN_VIEW}
                  style={{ transition: "stroke 240ms, opacity 240ms, stroke-width 240ms" }}
                />
              );
            })}
          </g>

          {/* The centre. Qeet Group itself. */}
          <g>
            <circle cx={CENTER} cy={CENTER} r="52" fill="var(--color-surface)" />
            <circle
              cx={CENTER}
              cy={CENTER}
              r="52"
              fill="none"
              stroke="var(--color-rule-strong)"
              strokeWidth="1"
            />
            <text
              x={CENTER}
              y={CENTER - 4}
              textAnchor="middle"
              className="fill-ink font-sans text-[15px] font-medium"
            >
              Qeet
            </text>
            <text
              x={CENTER}
              y={CENTER + 14}
              textAnchor="middle"
              className="fill-ink-subtle font-mono text-[10px] uppercase tracking-[0.14em]"
            >
              Group
            </text>
          </g>

          {/* Product nodes. One tab stop for the whole group (roving tabindex). */}
          <g>
            {nodes.map((n, i) => {
              const isActive = i === activeIndex;
              return (
                <motion.g
                  key={n.slug}
                  ref={(el: SVGGElement | null) => {
                    nodeRefs.current[i] = el;
                  }}
                  tabIndex={i === focusIndex ? 0 : -1}
                  role="button"
                  aria-pressed={isActive}
                  aria-label={`${n.name}. ${n.statusLabel}. ${n.oneLiner}`}
                  onMouseEnter={() => setActiveIndex(i)}
                  onFocus={() => {
                    setFocusIndex(i);
                    setActiveIndex(i);
                  }}
                  onClick={() => setActiveIndex(i)}
                  className="cursor-pointer outline-none [&:focus-visible>circle]:stroke-focus [&:focus-visible>circle]:stroke-[3]"
                  variants={reduce ? undefined : nodeSettle}
                  initial={reduce ? false : "hidden"}
                  whileInView="visible"
                  viewport={IN_VIEW}
                >
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={isActive ? 13 : 9}
                    fill={isActive ? "var(--color-accent)" : "var(--color-surface-raised)"}
                    stroke={STATUS_STROKE[n.status] ?? "var(--color-rule-strong)"}
                    strokeWidth="1.5"
                    style={{ transition: "r 200ms, fill 200ms" }}
                  />
                  <text
                    x={n.x}
                    y={n.y > CENTER ? n.y + 30 : n.y - 20}
                    textAnchor="middle"
                    className={cn(
                      "font-sans text-[13px]",
                      isActive ? "fill-ink font-medium" : "fill-ink-muted",
                    )}
                  >
                    {n.short}
                  </text>
                </motion.g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* The detail panel. Reads as a caption to the figure, and is what makes
          the interaction informative rather than merely responsive. */}
      <div className="lg:col-span-5">
        {active && (
          <div
            aria-live="polite"
            className="border-l-2 border-accent pl-6 md:pl-8"
          >
            <StatusChip status={active.status} />
            <PanelHeading className="mt-4 font-display text-ink text-display-m">
              {active.name}
            </PanelHeading>
            <p className="mt-4 max-w-prose text-body-l text-ink-muted">{active.oneLiner}</p>
            <p className="mt-6 font-mono text-label uppercase text-ink-subtle">
              {FOUNDATIONS.has(active.slug)
                ? "Every product depends on this"
                : `Builds on ${[...FOUNDATIONS]
                    .map((f) => products.find((p) => p.slug === f)?.name)
                    .filter(Boolean)
                    .join(" and ")}`}
            </p>
            <NextLink
              href={active.href}
              className="mt-8 inline-flex items-center gap-2 rounded-sm text-body text-ink transition-colors duration-fast hover:text-accent-text-hover focus-ring"
            >
              Explore {active.name}
              <span aria-hidden="true">→</span>
            </NextLink>
          </div>
        )}
      </div>

      {/*
        The same information, as data. Not a fallback bolted on afterwards —
        this is the accessible representation of the figure, and the SVG above
        is the visual one. A screen-reader user gets the portfolio; they do not
        get a description of a drawing.
      */}
      <table className="sr-only">
        <caption>Qeet Group products, their status and their role</caption>
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Status</th>
            <th scope="col">What it does</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.slug}>
              <th scope="row">
                <NextLink href={p.href}>{p.name}</NextLink>
              </th>
              <td>{p.statusLabel}</td>
              <td>{p.oneLiner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
