"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";

/**
 * The signature mark of the group, drawn as a precision instrument: an
 * abstract orbital system resolving into one glowing identity core. A
 * chronograph tick ring frames the figure, hairline concentric orbits give it
 * depth, a few satellites drift along the orbits, and a slow brand-coloured
 * sweep plus inward identity pulses give it life — "a family of products on
 * one identity graph," rendered like a watch face rather than a network
 * diagram. Orange stays reserved for the core, the sweep and the pulses;
 * everything else is hairline-quiet.
 *
 * Deliberately abstract: the satellites are a fixed decorative few, NOT
 * one-per-product, so the figure never encodes the portfolio size and never
 * changes shape as products are added. The hero's monospace fact line carries
 * the real count.
 *
 * Two registers:
 *  - decorative backdrop (default) — aria-hidden, no caption.
 *  - real figure (`coreLabel` + `decorative={false}`) — monospace "identity"
 *    caption under the core, used in the hero.
 *
 * Motion is the page's one orchestrated moment: orbits settle in, satellites
 * fade up, then the sweep and pulses run on a slow loop. All of it collapses
 * to the final static state under `prefers-reduced-motion`.
 */

const CENTER = { x: 280, y: 280 };
const ORBIT = 186; // outer orbit radius.
const TICK_COUNT = 60; // chronograph ticks on the outer ring.

/**
 * Round to 3 decimals. Math.sin/cos are allowed to differ by 1 ulp across JS
 * engines, so raw values hydrate differently between the Node server and the
 * browser — rounding makes both sides render identical coordinates.
 */
const r3 = (v: number) => Math.round(v * 1000) / 1000;

/** Point on a circle around CENTER at `deg` degrees (0° = 3 o'clock). */
const toXY = (r: number, deg: number) => ({
  x: r3(CENTER.x + r * Math.cos((deg * Math.PI) / 180)),
  y: r3(CENTER.y + r * Math.sin((deg * Math.PI) / 180)),
});

/**
 * Satellites drifting on the orbits — a fixed, deliberately asymmetric few.
 * Not one-per-product, so the figure stays stable as the portfolio grows.
 */
const SATELLITE_ORBITS = [
  { r: ORBIT, angles: [-75, 55, 170], size: 8, dot: 2.5, dur: 120, reverse: false },
  { r: 126, angles: [-20, 135], size: 5.5, dot: 2, dur: 90, reverse: true },
];

/** Runner dot on the micro orbit. */
const MICRO_RUNNER = toXY(66, -140);

/** Fixed origins for the inward identity pulses (angles kept irregular). */
const PULSE_POINTS = [-60, 35, 140, 255].map((deg) => toXY(ORBIT, deg));

type IdentityGraphProps = {
  className?: string;
  /** Show the monospace "identity" caption under the core. */
  coreLabel?: boolean;
  /** Decorative backdrop (aria-hidden). Default true. */
  decorative?: boolean;
};

export function IdentityGraph({
  className,
  coreLabel = false,
  decorative = true,
}: IdentityGraphProps) {
  const reduce = useReducedMotion();

  // Chronograph tick ring — every 5th tick is a hair longer and darker.
  const ticks = Array.from({ length: TICK_COUNT }, (_, i) => {
    const a = (i * 2 * Math.PI) / TICK_COUNT;
    const major = i % 5 === 0;
    const r1 = 249;
    const r2 = major ? 258 : 254;
    return {
      major,
      x1: r3(CENTER.x + r1 * Math.cos(a)),
      y1: r3(CENTER.y + r1 * Math.sin(a)),
      x2: r3(CENTER.x + r2 * Math.cos(a)),
      y2: r3(CENTER.y + r2 * Math.sin(a)),
    };
  });

  // Sweep arc on the node orbit: 70° of trail fading in toward the head.
  const sweepEnd = {
    x: r3(CENTER.x + ORBIT * Math.cos(-Math.PI / 9)),
    y: r3(CENTER.y + ORBIT * Math.sin(-Math.PI / 9)),
  };
  const sweepPath = `M ${CENTER.x} ${CENTER.y - ORBIT} A ${ORBIT} ${ORBIT} 0 0 1 ${sweepEnd.x.toFixed(1)} ${sweepEnd.y.toFixed(1)}`;

  const settle = (delay: number) =>
    reduce
      ? { initial: false as const, animate: { scale: 1, opacity: 1 } }
      : {
          initial: { scale: 0.94, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { duration: 1.1, delay, ease: EASE_OUT },
        };

  const fade = (delay: number) =>
    reduce
      ? { initial: false as const, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 1, delay, ease: EASE_OUT },
        };

  const origin = { transformOrigin: `${CENTER.x}px ${CENTER.y}px` };

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
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? "true" : undefined}
      aria-label={decorative ? undefined : "Qeet platforms orbiting one shared identity core"}
      fill="none"
    >
      <defs>
        <radialGradient id="ig-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.55" />
          <stop offset="50%" stopColor="var(--color-brand)" stopOpacity="0.14" />
          <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="ig-sweep"
          gradientUnits="userSpaceOnUse"
          x1={CENTER.x}
          y1={CENTER.y - ORBIT}
          x2={sweepEnd.x}
          y2={sweepEnd.y}
        >
          <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0" />
          <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      {/* Soft glow behind the identity core. */}
      <circle cx={CENTER.x} cy={CENTER.y} r="140" fill="url(#ig-core)" />

      {/* Chronograph tick ring. */}
      <motion.g {...fade(0.2)}>
        {ticks.map((t, i) => (
          <line
            key={`tick-${i}`}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke={t.major ? "var(--color-rule-strong)" : "var(--color-rule)"}
            strokeWidth={t.major ? 1.25 : 1}
          />
        ))}
      </motion.g>

      {/* Concentric orbits — hairline-quiet. */}
      <motion.circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={ORBIT}
        stroke="var(--color-rule)"
        strokeWidth="1"
        style={origin}
        {...settle(0.15)}
      />
      <motion.circle
        cx={CENTER.x}
        cy={CENTER.y}
        r="126"
        stroke="var(--color-rule)"
        strokeWidth="1"
        opacity="0.7"
        style={origin}
        {...settle(0.3)}
      />
      {/* Dashed micro orbit, counter-rotating slowly. */}
      <motion.g {...fade(0.45)}>
        <circle
          cx={CENTER.x}
          cy={CENTER.y}
          r="66"
          stroke="var(--color-rule-strong)"
          strokeWidth="1"
          strokeDasharray="1.5 7"
          strokeLinecap="round"
        >
          {!reduce && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`360 ${CENTER.x} ${CENTER.y}`}
              to={`0 ${CENTER.x} ${CENTER.y}`}
              dur="80s"
              repeatCount="indefinite"
            />
          )}
        </circle>
      </motion.g>

      {/* Brand sweep travelling the outer orbit — the figure's slow heartbeat. */}
      <motion.g {...fade(0.9)}>
        <g>
          {!reduce && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 ${CENTER.x} ${CENTER.y}`}
              to={`360 ${CENTER.x} ${CENTER.y}`}
              dur="26s"
              repeatCount="indefinite"
            />
          )}
          <path d={sweepPath} stroke="url(#ig-sweep)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx={sweepEnd.x} cy={sweepEnd.y} r="3" fill="var(--color-brand)" opacity="0.9" />
        </g>
      </motion.g>

      {/* Identity pulses flowing inward (edge → core). The signature motion. */}
      {!reduce &&
        PULSE_POINTS.map((p, i) => (
          <motion.circle
            key={`pulse-${i}`}
            r="3"
            fill="var(--color-brand)"
            initial={{ cx: p.x, cy: p.y, opacity: 0 }}
            animate={{ cx: [p.x, CENTER.x], cy: [p.y, CENTER.y], opacity: [0, 0.9, 0] }}
            transition={{
              duration: 2.6,
              delay: 1.4 + i * 0.5,
              repeat: Infinity,
              repeatDelay: 3.2,
              ease: "easeIn",
            }}
          />
        ))}

      {/* Satellites drifting along the orbits — decorative, deliberately few
          and asymmetric so nothing reads as a per-product count. */}
      {SATELLITE_ORBITS.map((orbit, oi) => (
        <motion.g key={`orbit-${oi}`} {...fade(0.55 + oi * 0.15)}>
          <g>
            {!reduce && (
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`${orbit.reverse ? 360 : 0} ${CENTER.x} ${CENTER.y}`}
                to={`${orbit.reverse ? 0 : 360} ${CENTER.x} ${CENTER.y}`}
                dur={`${orbit.dur}s`}
                repeatCount="indefinite"
              />
            )}
            {orbit.angles.map((deg) => {
              const p = toXY(orbit.r, deg);
              return (
                <g key={`sat-${oi}-${deg}`}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={orbit.size}
                    fill="var(--color-surface)"
                    stroke="var(--color-rule-strong)"
                    strokeWidth="1.5"
                  />
                  <circle cx={p.x} cy={p.y} r={orbit.dot} fill="var(--color-ink-subtle)" />
                </g>
              );
            })}
          </g>
        </motion.g>
      ))}

      {/* Runner dot on the micro orbit. */}
      <motion.g {...fade(0.7)}>
        <g>
          {!reduce && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 ${CENTER.x} ${CENTER.y}`}
              to={`360 ${CENTER.x} ${CENTER.y}`}
              dur="48s"
              repeatCount="indefinite"
            />
          )}
          <circle cx={MICRO_RUNNER.x} cy={MICRO_RUNNER.y} r="2.5" fill="var(--color-ink-subtle)" />
        </g>
      </motion.g>

      {/* Identity core. */}
      <motion.g {...pop(0.4)} style={origin}>
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
        {coreLabel && (
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
