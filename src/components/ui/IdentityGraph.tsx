"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";

/**
 * The signature mark of the group: every platform resolving into one central
 * identity core. It's the brief made visual — "a family of products on one
 * identity graph." Orange is reserved for the core and the identity pulses that
 * travel inward along each edge; everything else stays hairline-quiet.
 *
 * Scales to any portfolio size: pass `nodes` (one per product) and the layout
 * distributes them evenly around the circle — add a product and a node appears,
 * no fixed count anywhere. Falls back to `count` placeholder nodes when used as
 * a pure decoration.
 *
 * Two registers:
 *  - decorative backdrop (default) — aria-hidden, no labels.
 *  - labelled diagram (`labels`) — monospace node labels + an "identity" core,
 *    used as a real figure (e.g. the hero).
 *
 * Motion is the page's one orchestrated moment: edges draw out, nodes settle,
 * then slow pulses flow into the core. All of it collapses to the final static
 * state under `prefers-reduced-motion`.
 */

const CENTER = { x: 280, y: 280 };
const RADIUS = 186; // node ring radius; labels sit just outside it.

type NodeInput = { label?: string };

type IdentityGraphProps = {
  className?: string;
  /** One entry per product. Order is preserved; labels render when `labels`. */
  nodes?: NodeInput[];
  /** Placeholder node count when `nodes` isn't supplied (decorative use). */
  count?: number;
  /** Show monospace node labels and the "identity" core label. */
  labels?: boolean;
  /** Decorative backdrop (aria-hidden). Default true. */
  decorative?: boolean;
};

export function IdentityGraph({
  className,
  nodes,
  count = 6,
  labels = false,
  decorative = true,
}: IdentityGraphProps) {
  const reduce = useReducedMotion();

  const items: NodeInput[] =
    nodes && nodes.length ? nodes : Array.from({ length: Math.max(count, 1) }, () => ({}));
  const n = items.length;

  // Even radial distribution, first node at top, clockwise — works for any N.
  const pts = items.map((it, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return {
      label: it.label,
      a,
      x: CENTER.x + RADIUS * Math.cos(a),
      y: CENTER.y + RADIUS * Math.sin(a),
    };
  });

  // Constellation ring connecting adjacent nodes (the faint N-gon outline).
  const ring = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ") + " Z";

  // Cap the inward pulses so the motion stays calm as the portfolio grows.
  const pulseCount = Math.min(n, 8);

  const draw = (delay: number) =>
    reduce
      ? { initial: false as const, animate: { pathLength: 1, opacity: 1 } }
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { duration: 1.1, delay, ease: EASE_OUT },
        };

  const pop = (delay: number) =>
    reduce
      ? { initial: false as const, animate: { scale: 1, opacity: 1 } }
      : {
          initial: { scale: 0, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { duration: 0.5, delay, ease: EASE_OUT },
        };

  return (
    <svg
      viewBox="0 0 560 560"
      className={cn("h-full w-full", className)}
      style={{ filter: "drop-shadow(0 0 20px color-mix(in oklab, var(--color-brand) 30%, transparent))" }}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? "true" : undefined}
      aria-label={decorative ? undefined : `${n} Qeet platforms connected to one shared identity core`}
      fill="none"
    >
      <defs>
        <radialGradient id="ig-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.65" />
          <stop offset="50%" stopColor="var(--color-brand)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ig-edge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="var(--color-rule-strong)" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Soft glow behind the identity core. */}
      <circle cx={CENTER.x} cy={CENTER.y} r="150" fill="url(#ig-core)" />

      {/* Constellation ring (faint). */}
      <motion.path d={ring} stroke="var(--color-rule)" strokeWidth="1" {...draw(0.15)} />

      {/* Edges: core → each node. */}
      {pts.map((p, i) => (
        <motion.line
          key={`edge-${i}`}
          x1={CENTER.x}
          y1={CENTER.y}
          x2={p.x}
          y2={p.y}
          stroke="url(#ig-edge)"
          strokeWidth="1.25"
          {...draw(0.25 + i * (0.5 / n))}
        />
      ))}

      {/* Identity pulses flowing inward (node → core). The signature motion. */}
      {!reduce &&
        pts.slice(0, pulseCount).map((p, i) => (
          <motion.circle
            key={`pulse-${i}`}
            r="3.5"
            fill="var(--color-brand)"
            initial={{ cx: p.x, cy: p.y, opacity: 0 }}
            animate={{ cx: [p.x, CENTER.x], cy: [p.y, CENTER.y], opacity: [0, 1, 0] }}
            transition={{
              duration: 2.6,
              delay: 1.4 + i * 0.45,
              repeat: Infinity,
              repeatDelay: 2.8,
              ease: "easeIn",
            }}
          />
        ))}

      {/* Outer product nodes + optional labels. */}
      {pts.map((p, i) => {
        const cos = Math.cos(p.a);
        const sin = Math.sin(p.a);
        const lr = RADIUS + 32;
        const lx = CENTER.x + lr * cos;
        const ly = CENTER.y + lr * sin + (sin > 0.35 ? 10 : sin < -0.35 ? -4 : 4);
        const anchor = cos > 0.35 ? "start" : cos < -0.35 ? "end" : "middle";
        return (
          <motion.g key={`node-${i}`} {...pop(0.5 + i * (0.5 / n))} style={{ transformOrigin: `${p.x}px ${p.y}px` }}>
            <circle cx={p.x} cy={p.y} r="9" fill="var(--color-surface)" stroke="var(--color-rule-strong)" strokeWidth="1.5" />
            <circle cx={p.x} cy={p.y} r="3" fill="var(--color-ink-subtle)" />
            {labels && p.label && (
              <text
                x={lx}
                y={ly}
                textAnchor={anchor}
                className="fill-ink-subtle font-mono"
                style={{ fontSize: "13px", letterSpacing: "0.04em" }}
              >
                {p.label}
              </text>
            )}
          </motion.g>
        );
      })}

      {/* Identity core. */}
      <motion.g {...pop(0.4)} style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}>
        <circle cx={CENTER.x} cy={CENTER.y} r="16" fill="var(--color-brand)" />
        {/* Outer halo — a second ring that pulses out and fades */}
        <circle cx={CENTER.x} cy={CENTER.y} r="16" fill="none" stroke="var(--color-brand)" strokeWidth="0.75" opacity="0.2">
          {!reduce && <animate attributeName="r" values="16;38;16" dur="3.4s" repeatCount="indefinite" />}
          {!reduce && <animate attributeName="opacity" values="0.2;0;0.2" dur="3.4s" repeatCount="indefinite" />}
        </circle>
        {/* Inner pulse ring */}
        <circle cx={CENTER.x} cy={CENTER.y} r="16" fill="none" stroke="var(--color-brand)" strokeWidth="1" opacity="0.4">
          {!reduce && <animate attributeName="r" values="16;26;16" dur="3.4s" repeatCount="indefinite" />}
        </circle>
        {labels && (
          <text
            x={CENTER.x}
            y={CENTER.y + 38}
            textAnchor="middle"
            className="fill-ink font-mono"
            style={{ fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase" }}
          >
            identity
          </text>
        )}
      </motion.g>
    </svg>
  );
}
