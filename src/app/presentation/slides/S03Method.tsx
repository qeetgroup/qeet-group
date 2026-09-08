import { Item, Lines, Rise, SlideMark, Stagger } from "./primitives";
import type { SlideProps } from "./types";

/**
 * Slide 03 — the name is the method.
 *
 * The one thing this slide has to make unmistakable is that Q, E, E and T are
 * a SEQUENCE and not four values on a wall. Two devices do that and nothing
 * else has to:
 *
 *   • a single continuous rule down the left of all four rows, so the eye
 *     reads one object rather than four cards;
 *   • the rows arriving in order, top to bottom, at the stagger interval the
 *     site uses everywhere else.
 *
 * The claims are the organisation's own published wording, unedited. They are
 * better than anything written for a slide, and using them means the deck and
 * the site cannot say different things about what the letters mean.
 */
const LETTERS = [
  { letter: "Q", word: "Question", claim: "Progress begins with the right question." },
  { letter: "E", word: "Explore", claim: "Curiosity, made operational." },
  { letter: "E", word: "Envision", claim: "Designing for what compounds." },
  { letter: "T", word: "Transform", claim: "Vision is decoration until it ships." },
];

export function S03Method({ index }: SlideProps) {
  return (
    <div className="deck-slide justify-between">
      <SlideMark index={index} label="The name is the method" />

      <div className="grid-editorial items-end">
        <div className="col-aside">
          <Lines
            as="h2"
            lines={["Qeet is", "an acronym", "before it is", "a name."]}
            className="deck-display-s font-display text-ink"
          />
        </div>

        {/* The continuous rule lives on the list, not on each row, which is
            the entire reason the four read as one sequence. */}
        <Stagger
          as="ol"
          delay={0.3}
          className="col-wide border-l border-rule-strong"
        >
          {LETTERS.map((entry, i) => (
            <Item
              as="li"
              key={`${entry.letter}-${i}`}
              className="flex items-baseline gap-[2.6cqw] py-[1.5cqw] pl-[2.4cqw]"
            >
              <span
                aria-hidden="true"
                className="deck-heading w-[3cqw] shrink-0 font-mono text-ink-subtle"
              >
                {entry.letter}
              </span>
              <span className="deck-heading w-[16cqw] shrink-0 font-display text-ink">
                {entry.word}
              </span>
              <span className="deck-body font-sans text-ink-muted">{entry.claim}</span>
            </Item>
          ))}
        </Stagger>
      </div>

      <Rise delay={0.75}>
        <p className="deck-body font-sans text-ink-subtle">
          The order is not presentational.{" "}
          <span className="text-accent-text">The sequence is the argument.</span>
        </p>
      </Rise>
    </div>
  );
}
