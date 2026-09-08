import { Figure, Lines, Node, Rise, Stroke, SlideMark } from "./primitives";
import type { SlideProps } from "./types";

/**
 * Slide 06 — Explore.
 *
 * One diagram, and it has to carry an idea that is easy to say and hard to
 * draw: exploration is not the collecting of interesting ideas, it is the
 * removal of uncertainty.
 *
 * So the figure fans nine candidate directions out of a single question and
 * lets six of them stop. The three that continue converge. The six that
 * stopped are still drawn — in faint ink, with a terminal tick rather than
 * nothing — because an exploration that produced a dead end produced
 * knowledge, and erasing it would make the picture a story about being right.
 *
 * The strokes draw themselves in sequence: the fan first, then the surviving
 * paths, then the convergence. The drawing IS the argument, which is the test
 * for whether a diagram has earned its place on a slide.
 */
const FAN_Y = [16, 52, 88, 124, 160, 196, 232, 268, 304];
/** The three that go on. Indices into FAN_Y. */
const SURVIVORS = [2, 4, 6];
const CONVERGE_Y = [132, 160, 188];

const ORIGIN_X = 56;
const FAN_X = 430;
const MID_X = 760;
const END_X = 944;

export function S06Explore({ index }: SlideProps) {
  return (
    <div className="deck-slide justify-between">
      <SlideMark index={index} label="Explore" />

      <div className="grid-editorial items-baseline">
        <Lines
          as="h2"
          lines={["Curiosity,", "made operational."]}
          className="col-aside deck-display-s font-display text-ink"
        />
        <Rise delay={0.3} className="col-figure">
          <p className="deck-body font-sans text-ink-muted">
            Research, experimentation, and the patient discovery of methods
            nobody has tried yet — sustained past the point where it stops
            being interesting.
          </p>
        </Rise>
      </div>

      <Figure viewBox="0 0 1000 320" className="h-[30cqw] w-full">
        {/* The fan: every direction the question could be taken. */}
        {FAN_Y.map((y, i) => (
          <Stroke
            key={`fan-${i}`}
            d={`M ${ORIGIN_X} 160 C 200 160, 260 ${y}, ${FAN_X} ${y}`}
            className={SURVIVORS.includes(i) ? "stroke-rule-strong" : "stroke-rule"}
            delay={0.1 + i * 0.04}
          />
        ))}

        {/* The six that stop. A tick, not an absence. */}
        {FAN_Y.filter((_, i) => !SURVIVORS.includes(i)).map((y) => (
          <Stroke
            key={`stop-${y}`}
            d={`M ${FAN_X + 14} ${y - 9} L ${FAN_X + 14} ${y + 9}`}
            className="stroke-rule"
            delay={0.62}
          />
        ))}

        {/* The three that continue, converging as uncertainty falls. */}
        {SURVIVORS.map((fanIndex, i) => (
          <Stroke
            key={`survive-${fanIndex}`}
            d={`M ${FAN_X} ${FAN_Y[fanIndex]} C 580 ${FAN_Y[fanIndex]}, 620 ${CONVERGE_Y[i]}, ${MID_X} ${CONVERGE_Y[i]}`}
            className="stroke-rule-strong"
            delay={0.7 + i * 0.06}
          />
        ))}

        {CONVERGE_Y.map((y, i) => (
          <Stroke
            key={`join-${y}`}
            d={`M ${MID_X} ${y} C 860 ${y}, 880 160, ${END_X} 160`}
            className="stroke-ink-subtle"
            delay={0.95 + i * 0.05}
          />
        ))}

        <Node delay={1.35}>
          <circle cx={ORIGIN_X} cy={160} r={5} className="fill-ink-subtle" />
        </Node>
        {/* The slide's single accent: what the exploration resolved to. */}
        <Node delay={1.45}>
          <circle cx={END_X} cy={160} r={6} className="fill-accent" />
        </Node>
      </Figure>

      <Rise delay={1.1}>
        <dl className="grid grid-cols-3 gap-[2.4cqw]">
          {[
            ["A question worth answering", "Chosen because the answer would matter for a long time."],
            ["Directions worth testing", "Some will work. Some will not. Both produce knowledge."],
            ["Uncertainty, reduced", "Not an idea collected — a possibility ruled in or out."],
          ].map(([term, detail]) => (
            <div key={term} className="border-t border-rule pt-[1.4cqw]">
              <dt className="deck-label font-mono text-ink">{term}</dt>
              <dd className="deck-body-s mt-[0.9cqw] font-sans text-ink-subtle">{detail}</dd>
            </div>
          ))}
        </dl>
      </Rise>
    </div>
  );
}
