import { Item, Lines, Rise, SlideMark, Stagger } from "./primitives";
import type { SlideProps } from "./types";

/**
 * Slide 13 — what makes Qeet different.
 *
 * ---------------------------------------------------------------------------
 * The framing matters more than the content here
 * ---------------------------------------------------------------------------
 * The obvious version of this slide is "Conventional / Qeet", and it is a trap.
 * In front of enterprise leaders — several of whom will run organisations that
 * do the thing in the left column, for good reasons — a comparison against
 * "conventional" reads as a young company explaining the industry to people
 * who have operated in it for thirty years.
 *
 * So the left column is "Common shortcut", and every entry is written as a
 * PRESSURE rather than a failure: each one genuinely works in the short term,
 * which is exactly why it is common. The right column is what Qeet has
 * committed to instead. The difference then emerges from Qeet's own discipline
 * rather than from anyone else's shortcomings, which is both more accurate and
 * considerably more persuasive.
 *
 * No boxes. Four hairline rows, two columns, presence doing the separation.
 */
const PAIRS = [
  {
    shortcut: "Ship first; find the question afterwards.",
    discipline: "Establish the question before committing to the build.",
  },
  {
    shortcut: "Optimise for the next release.",
    discipline: "Design for what compounds.",
  },
  {
    shortcut: "Let roadmap language stand in for the present tense.",
    discipline: "Status describes reality, or it is not published.",
  },
  {
    shortcut: "Accept the category as it is given.",
    discipline: "Ask whether the category itself is right.",
  },
];

export function S13Difference({ index }: SlideProps) {
  return (
    <div className="deck-slide justify-between">
      <SlideMark index={index} label="What makes Qeet different" />

      <div className="grid-editorial items-baseline">
        <Lines
          as="h2"
          lines={["The difference", "is in the", "deciding."]}
          className="col-aside deck-display-s font-display text-ink"
        />
        <Rise delay={0.28} className="col-figure">
          <p className="deck-body font-sans text-ink-muted">
            Every shortcut on the left works, which is why it is common — and
            every one of them is a pressure we feel too. The right-hand column
            is what we have committed to instead. It is a discipline rather
            than a talent, and it regularly costs us speed.
          </p>
        </Rise>
      </div>

      <div>
        <Rise delay={0.4} className="grid grid-cols-2 gap-[4cqw] pb-[1cqw]">
          <p className="deck-label font-mono text-ink-subtle">Common shortcut</p>
          <p className="deck-label font-mono text-ink-subtle">Qeet discipline</p>
        </Rise>

        {/* A `div` wrapping each dt/dd pair is valid inside a `dl`, and it is
            what lets each ROW arrive as one unit rather than the terms and
            the definitions arriving as two separate columns. */}
        <Stagger as="dl" delay={0.5}>
          {PAIRS.map((pair) => (
            <Item
              key={pair.shortcut}
              className="grid grid-cols-2 gap-[4cqw] border-t border-rule py-[1.5cqw] last:border-b"
            >
              <dt className="deck-body font-sans text-ink-subtle">{pair.shortcut}</dt>
              <dd className="deck-body flex items-start gap-[1.2cqw] font-display text-ink">
                <span
                  aria-hidden="true"
                  className="mt-[0.75em] h-px w-[1.6cqw] shrink-0 bg-accent"
                />
                <span>{pair.discipline}</span>
              </dd>
            </Item>
          ))}
        </Stagger>
      </div>

      <Rise delay={0.95}>
        <p className="deck-body font-sans text-ink-muted">
          Qeet would rather be known for how it decides what deserves to be
          built than for the length of the list it has built so far.
        </p>
      </Rise>
    </div>
  );
}
