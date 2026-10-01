import { QEET } from "./canon";
import {
  Figure,
  Item,
  Node,
  Rise,
  Slide,
  SlideBody,
  SlideHeader,
  Stagger,
  Stroke,
} from "./primitives";
import type { SlideProps } from "./types";

/**
 * Slide 04 — the name is the method.
 *
 * Two things have to be unmistakable: that Q, E, E and T are a SEQUENCE, not
 * four values on a wall, and that the sequence does not terminate. So the four
 * principles sit on one drawn line, left to right, and a single return path in
 * the accent runs underneath from Transform back to Question — what shipping
 * produces is evidence, and evidence produces the next question.
 *
 * The words and claims come from `canon.ts`, which quotes the organisation's
 * profile verbatim. The glosses beneath them are the deck's own plain-language
 * restatement, set smaller and dimmer so the two are never confused.
 *
 * Geometry: the figures share the content box's width (87.6cqw) and a 1:10
 * viewBox (876 units), so a column start at 22.5cqw is x=225. The four columns
 * are a 4-up grid with a 2.4cqw gap — starts at 0, 22.5, 45 and 67.5cqw.
 */
const STARTS = [5, 230, 455, 680];

export function S04Method({ index }: SlideProps) {
  return (
    <Slide>
      <SlideHeader
        index={index}
        label="The name is the method"
        title={["The name is the method."]}
        lede="Q.E.E.T is not only what the name stands for. It is how we approach progress."
      />

      <SlideBody>
        {/* The sequence: four nodes, joined left to right. */}
        <Figure viewBox="0 0 876 24" className="h-[2.4cqw] w-full">
          {STARTS.slice(0, 3).map((x, i) => (
            <g key={x}>
              <Stroke d={`M ${x + 16} 12 L ${STARTS[i + 1] - 18} 12`} delay={0.2 + i * 0.14} />
              <Stroke
                d={`M ${STARTS[i + 1] - 25} 7 L ${STARTS[i + 1] - 18} 12 L ${STARTS[i + 1] - 25} 17`}
                delay={0.5 + i * 0.14}
              />
            </g>
          ))}
          {STARTS.map((x, i) => (
            <Node key={x} delay={0.15 + i * 0.12}>
              <circle cx={x} cy={12} r={5} className="fill-canvas stroke-ink-muted" strokeWidth={1.5} />
            </Node>
          ))}
        </Figure>

        <Stagger as="ol" delay={0.3} className="mt-[1.4cqw] grid grid-cols-4 gap-[2.4cqw]">
          {QEET.map((p) => (
            <Item as="li" key={p.word}>
              <p className="flex items-baseline gap-[1cqw]">
                <span aria-hidden="true" className="deck-heading font-mono text-ink-subtle">
                  {p.letter}
                </span>
                <span className="deck-heading font-display text-ink">{p.word}</span>
              </p>
              <p className="deck-body-s mt-[0.9cqw] font-display text-ink">{p.claim}</p>
              <p className="deck-body-s mt-[0.5cqw] font-sans text-ink-muted">{p.gloss}</p>
            </Item>
          ))}
        </Stagger>

        {/* The return: from Transform back to Question. The slide's accent. */}
        <div className="relative mt-[1.2cqw]">
          <Figure viewBox="0 0 876 60" className="h-[6cqw] w-full">
            <Stroke
              d="M 680 2 L 680 30 Q 680 46 664 46 L 21 46 Q 5 46 5 30 L 5 6"
              className="stroke-accent"
              strokeWidth={1.5}
              delay={1.0}
            />
            <Stroke d="M 0 12 L 5 5 L 10 12" className="stroke-accent" strokeWidth={1.5} delay={1.6} />
          </Figure>
          <Rise
            delay={1.4}
            className="absolute left-1/2 top-[4.6cqw] -translate-x-1/2 -translate-y-1/2 bg-canvas px-[1.4cqw]"
          >
            <p className="deck-label whitespace-nowrap font-mono text-ink-muted">
              Real-world evidence → new questions
            </p>
          </Rise>
        </div>
      </SlideBody>
    </Slide>
  );
}
