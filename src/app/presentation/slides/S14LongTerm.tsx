import { VISION } from "./canon";
import { Item, Rise, Rule, Slide, SlideBody, SlideMark, Stagger } from "./primitives";
import type { SlideProps } from "./types";

/**
 * Slide 14 — the long-term Qeet.
 *
 * Ambition and restraint in the same breath. Three statements that everything
 * will change, in faint ink, then the one that will not, in full ink —
 * ambition is in the scope of the change, restraint is in claiming only one
 * thing survives it.
 *
 * What it is anchored to is the vision, not a list of future markets. An
 * earlier version listed "possible domains of exploration"; even labelled as
 * possibilities, five category names on a long-term slide read as five
 * product lines, and the deck has no basis for any of them. The vision is the
 * organisation's own statement of direction, and it is the only one used.
 *
 * The vision is quoted with its opening infinitive dropped — "A future of
 * limitless possibilities…" rather than "To create a future…" — so it reads
 * as a destination. Nothing else in it is changed.
 */
const DECLARATIVES = [
  { text: "The portfolio will change.", strong: false },
  { text: "The technologies will change.", strong: false },
  { text: "The questions will change.", strong: false },
  { text: "The method should remain.", strong: true },
];

const DESTINATION = VISION.replace(/^To create a/, "A");

export function S14LongTerm({ index }: SlideProps) {
  return (
    <Slide>
      <SlideMark index={index} label="The long-term Qeet" />

      <SlideBody>
        <Stagger as="ul" delay={0.1}>
          {DECLARATIVES.map((line) => (
            <Item as="li" key={line.text}>
              <p
                className={`deck-display-s py-[0.35cqw] font-display ${
                  line.strong ? "text-ink" : "text-ink-subtle"
                }`}
              >
                {line.text}
              </p>
            </Item>
          ))}
        </Stagger>

        <div className="mt-[3cqw] max-w-[74cqw]">
          <Rule delay={0.7} className="bg-rule-strong" />
          <Rise delay={0.85} className="mt-[1.8cqw] flex items-baseline gap-[2.4cqw]">
            <p className="deck-label shrink-0 font-mono text-accent-text">Vision</p>
            <p className="deck-heading-s font-display text-ink-muted">{DESTINATION}</p>
          </Rise>
        </div>
      </SlideBody>
    </Slide>
  );
}
