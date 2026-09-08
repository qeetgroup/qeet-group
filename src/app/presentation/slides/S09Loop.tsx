import { Figure, Item, Lines, Node, Rise, SlideMark, Stagger, Stroke } from "./primitives";
import type { SlideProps } from "./types";

/**
 * Slide 09 — QEET as a loop.
 *
 * The correction this slide exists to make: the four letters are a sequence,
 * but they are not a project plan that terminates. What shipping produces is
 * evidence, and evidence produces the next question — so the method's output
 * is its own input.
 *
 * Drawn as an instrument rather than a flow chart. Sixty chronograph ticks,
 * six positions on a true circle, arcs that draw themselves in order. The
 * register is borrowed from the site's identity figure on the same reasoning
 * that applies there: a diagram that looks measured is read as a description
 * of how something works, and a diagram that looks illustrated is read as
 * decoration.
 *
 * All coordinates are literals rather than computed, and the ticks are rounded
 * to three decimal places, so the server and the client render byte-identical
 * geometry. A hydration mismatch inside an SVG is invisible until it isn't.
 */

/* Six positions on a circle of r=210 about (320,320), starting at 12 o'clock
   and running clockwise at 60° intervals. */
const POINTS = [
  { x: 320, y: 110 }, // 01 Question
  { x: 501.865, y: 215 }, // 02 Explore
  { x: 501.865, y: 425 }, // 03 Envision
  { x: 320, y: 530 }, // 04 Transform
  { x: 138.135, y: 425 }, // 05 Real-world evidence
  { x: 138.135, y: 215 }, // 06 New questions
];

const STEPS = [
  { label: "Question", note: "Is this the problem that matters?" },
  { label: "Explore", note: "What is actually true here?" },
  { label: "Envision", note: "What should exist once we know?" },
  { label: "Transform", note: "Build it, deploy it, and stand behind it." },
  { label: "Real-world evidence", note: "What using it taught us." },
  { label: "New questions", note: "Better ones than we could have asked before." },
];

/** `A r r 0 0 1 x y` — 60° of arc, always the minor sweep, always clockwise. */
function arcTo(from: { x: number; y: number }, to: { x: number; y: number }) {
  return `M ${from.x} ${from.y} A 210 210 0 0 1 ${to.x} ${to.y}`;
}

function ticks() {
  const out: Array<{ key: number; x1: number; y1: number; x2: number; y2: number; major: boolean }> = [];
  const r3 = (n: number) => Math.round(n * 1000) / 1000;
  for (let i = 0; i < 60; i += 1) {
    const angle = (i / 60) * Math.PI * 2 - Math.PI / 2;
    const major = i % 10 === 0;
    const inner = major ? 246 : 254;
    out.push({
      key: i,
      x1: r3(320 + Math.cos(angle) * inner),
      y1: r3(320 + Math.sin(angle) * inner),
      x2: r3(320 + Math.cos(angle) * 262),
      y2: r3(320 + Math.sin(angle) * 262),
      major,
    });
  }
  return out;
}

const TICKS = ticks();

export function S09Loop({ index }: SlideProps) {
  return (
    <div className="deck-slide justify-between">
      <SlideMark index={index} label="QEET as a loop" />

      <div className="grid-editorial items-center">
        <div className="col-aside">
          <Lines
            as="h2"
            lines={["The method", "does not", "terminate."]}
            className="deck-display-s font-display text-ink"
          />

          <Stagger as="ol" delay={0.34} className="mt-[2.6cqw]">
            {STEPS.map((step, i) => (
              <Item
                as="li"
                key={step.label}
                className="flex items-baseline gap-[1.6cqw] border-t border-rule py-[1.05cqw] last:border-b"
              >
                <span className="deck-label tabular-figures shrink-0 font-mono text-ink-subtle">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="deck-body-s shrink-0 font-display text-ink">{step.label}</span>
                <span className="deck-body-s font-sans text-ink-subtle">{step.note}</span>
              </Item>
            ))}
          </Stagger>
        </div>

        <div className="col-figure flex justify-center">
          <Figure viewBox="0 0 640 640" className="h-[44cqw] w-[44cqw]">
            {/* Chronograph ticks. Static — they are the instrument's face, not
                part of the argument, so they do not draw themselves. */}
            <g className="opacity-70">
              {TICKS.map((t) => (
                <line
                  key={t.key}
                  x1={t.x1}
                  y1={t.y1}
                  x2={t.x2}
                  y2={t.y2}
                  strokeWidth={1}
                  className={t.major ? "stroke-rule-strong" : "stroke-rule"}
                />
              ))}
            </g>

            {/* Five arcs of the cycle, in order. */}
            {POINTS.slice(0, 5).map((from, i) => (
              <Stroke
                key={`arc-${i}`}
                d={arcTo(from, POINTS[i + 1])}
                strokeWidth={1.5}
                className="stroke-ink-subtle"
                delay={0.2 + i * 0.16}
              />
            ))}

            {/* The sixth closes the loop, and is the slide's one accent. It
                arrives last, so the figure resolves into a circle rather than
                being presented as one. */}
            <Stroke
              d={arcTo(POINTS[5], POINTS[0])}
              strokeWidth={1.5}
              className="stroke-accent"
              delay={1.06}
            />

            {POINTS.map((p, i) => (
              <Node key={`node-${i}`} delay={1.2 + i * 0.05}>
                <circle cx={p.x} cy={p.y} r={7} className="fill-canvas" />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={7}
                  strokeWidth={1.5}
                  className={i === 0 ? "stroke-accent" : "stroke-ink-subtle"}
                />
              </Node>
            ))}
          </Figure>
        </div>
      </div>

      <Rise delay={1.5}>
        <p className="deck-body font-sans text-ink-muted">
          Shipping is not the end of the method. It is what generates the
          evidence the next question is built from.
        </p>
      </Rise>
    </div>
  );
}
