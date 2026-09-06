"use client";

import { useMemo, useRef, useState } from "react";
import NextLink from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Icon } from "@/components/ui/Icon";
import { StatusChip } from "@/components/ui/StatusChip";
import { productIcon } from "@/config/product-icons";
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

/*
 * Node radii, sized by the glyph rather than by taste. The nodes were 9px
 * dots, which is below the floor at which a 24-unit icon stays readable — so
 * adding icons meant growing the nodes, and growing the nodes meant pushing
 * the labels out from under them. All four numbers move together; changing one
 * alone reintroduces the overlap, which is why the label offset below is
 * computed from the radius instead of being its own hardcoded constant.
 *
 * 15 nodes on a 258 ring leaves ~108 units of arc between centres, so a 48px
 * active node still clears its neighbours with room for the label beneath.
 */
const NODE_R = 19;
const NODE_R_ACTIVE = 24;
const GLYPH = 18;
const GLYPH_ACTIVE = 22;

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
  const activeGlyph = active ? productIcon(active.slug) : undefined;

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
      {/*
        The ring is DESKTOP ONLY, and that is a measurement rather than a
        preference. The figure is a 720-unit square that scales to its
        container: at 360px wide it renders at 0.43x, which puts the 13px node
        labels at roughly 5px and the node hit areas at 8px — a third of the
        24px minimum target size. Worse, the whole interaction is hover-driven,
        so on a touch device fourteen of the fifteen products were unreachable
        and the panel only ever showed the default one.

        Below md it is replaced by the list further down, which carries the
        same information at a size people can read and tap.
      */}
      <div className="hidden lg:col-span-7 md:block">
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
              className="fill-ink-subtle font-mono text-[12px] uppercase tracking-[0.14em]"
            >
              Group
            </text>
          </g>

          {/* Product nodes. One tab stop for the whole group (roving tabindex). */}
          <g>
            {nodes.map((n, i) => {
              const isActive = i === activeIndex;
              const Glyph = productIcon(n.slug);
              const r = isActive ? NODE_R_ACTIVE : NODE_R;
              const g = isActive ? GLYPH_ACTIVE : GLYPH;
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
                    r={r}
                    fill={isActive ? "var(--color-accent)" : "var(--color-surface-raised)"}
                    stroke={STATUS_STROKE[n.status] ?? "var(--color-rule-strong)"}
                    strokeWidth="1.5"
                    style={{ transition: "r 200ms, fill 200ms" }}
                  />
                  {/*
                    The glyph, as a nested <svg> positioned by x/y in the
                    parent's coordinate system. Icon forces
                    `color="currentColor"`, so the class below is what actually
                    paints it.

                    Hovered or focused, the glyph goes white on the brand fill.
                    That measures 2.89:1, under the 3:1 non-text bar, and is
                    recorded as an accepted exception in check-contrast.ts
                    rather than left to be discovered: the glyph is aria-hidden
                    and decorative, the product name is rendered at full
                    strength beside it, and the node also grows from 19 to 24
                    on the same interaction — so colour is never the only thing
                    telling you which node you are on.
                  */}
                  {Glyph && (
                    <Icon
                      icon={Glyph}
                      size={g}
                      x={n.x - g / 2}
                      y={n.y - g / 2}
                      className={cn(
                        // `block` is not cosmetic: Icon's default class is
                        // `inline-block`, an HTML layout value with no meaning
                        // on a nested <svg>. tailwind-merge drops it in favour
                        // of this one, so the glyph carries no dead CSS.
                        "block transition-colors duration-base",
                        isActive ? "text-white" : "text-ink-muted",
                      )}
                    />
                  )}
                  <text
                    x={n.x}
                    y={n.y > CENTER ? n.y + r + 18 : n.y - r - 13}
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
          the interaction informative rather than merely responsive. Hidden
          with the figure it captions — on its own it is a single product with
          no way to change which one. */}
      <div className="hidden lg:col-span-5 md:block">
        {active && (
          <div
            aria-live="polite"
            className="border-l-2 border-accent pl-6 md:pl-8"
          >
            {/* The same glyph, at a size where it can actually be read — so
                the panel and the node it came from are visibly the same thing,
                which is what makes moving around the ring feel connected to
                the text rather than merely adjacent to it. */}
            {activeGlyph && (
              <div className="mb-6 inline-flex size-14 items-center justify-center border border-rule-strong bg-surface text-accent-text">
                <Icon icon={activeGlyph} size={26} />
              </div>
            )}
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
        ======================================================================
        The same portfolio, as a list. One element doing two jobs.
        ======================================================================

        BELOW md it is the visible content, because the ring is not usable at
        that size. FROM md it becomes `sr-only` — the accessible
        representation of the figure beside it, so a screen-reader user gets
        the portfolio itself rather than a description of a drawing.

        Writing it once, and letting the breakpoint decide whether it is seen
        or only heard, is what keeps the two from drifting. The previous
        version had a separate sr-only <table> that only ever ran on desktop,
        and mobile got nothing.

        It also fixes a real layout bug. `sr-only` works by pinning an element
        to 1px with `overflow: hidden` — but `display: table` treats width as a
        MINIMUM and grows to fit its content regardless, so that table was 918px
        wide on a 360px screen and gave every page a horizontal scrollbar. A
        grid container honours the 1px; a table does not.
      */}
      <div className="col-span-full md:sr-only">
        {/*
          Said once, above the list, instead of on all fifteen rows. The first
          pass repeated "Builds on Qeet ID and Qeetrix" under thirteen of them,
          which is the same sentence thirteen times and reads as noise rather
          than as the point. Stated once it is the point.
        */}
        <p className="mb-6 text-body text-ink-muted">
          Every product below signs in through{" "}
          {products.find((p) => p.slug === "qeet-id")?.name ?? "Qeet ID"} and is
          built from{" "}
          {products.find((p) => p.slug === "qeetrix")?.name ?? "Qeetrix"}.
        </p>
        <ul className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
        {products.map((p) => {
          const Glyph = productIcon(p.slug);
          const foundation = FOUNDATIONS.has(p.slug);
          return (
            <li key={p.slug} className="bg-canvas">
              <NextLink
                href={p.href}
                /* min-h-16 keeps every row above the 24px target floor with
                   room to spare, which the 8px ring nodes never were. */
                className="flex min-h-16 items-center gap-4 p-4 transition-colors duration-fast hover:bg-surface focus-ring"
              >
                {Glyph && (
                  <span className="flex size-11 shrink-0 items-center justify-center border border-rule-strong bg-surface text-accent-text">
                    <Icon icon={Glyph} size={20} />
                  </span>
                )}
                {/* min-w-0 is load-bearing: without it a flex child refuses to
                    shrink below its content and the one-liner pushes the row
                    past the viewport. */}
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-body font-medium text-ink">{p.name}</span>
                    <span className="font-mono text-label uppercase text-ink-subtle">
                      {p.statusLabel}
                    </span>
                  </span>
                  <span className="mt-1 block text-caption text-ink-muted">{p.oneLiner}</span>
                  {/* Only the two foundations say anything further — that IS
                      the distinction the section exists to draw. */}
                  {foundation && (
                    <span className="mt-1 block font-mono text-label uppercase text-accent-text">
                      Every product depends on this
                    </span>
                  )}
                </span>
              </NextLink>
            </li>
          );
        })}
        </ul>
      </div>
    </div>
  );
}
