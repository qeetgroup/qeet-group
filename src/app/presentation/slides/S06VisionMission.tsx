import { MISSION, PROFILE_SOURCE, VISION } from "./canon";
import { Item, Rise, Slide, SlideBody, SlideMark, Stagger } from "./primitives";
import type { SlideProps } from "./types";

/**
 * Slide 06 — vision and mission.
 *
 * The organisation's published wording, verbatim, given room. No headline:
 * any headline written above these two sentences would be a paraphrase of
 * them, and the point of the slide is that they are NOT paraphrased.
 *
 * Two editorial rows on the deck grid — the label in a narrow column, the
 * statement across the rest at heading scale. The accent is spent on the two
 * label ticks and nothing else, so neither statement is emphasised over the
 * other.
 */
const STATEMENTS = [
  { label: "Vision", text: VISION },
  { label: "Mission", text: MISSION },
];

export function S06VisionMission({ index }: SlideProps) {
  return (
    <Slide>
      <SlideMark index={index} label="Vision & mission" />

      <SlideBody>
        <Stagger as="dl" delay={0.15}>
          {STATEMENTS.map((s) => (
            <Item
              key={s.label}
              className="deck-grid border-t border-rule-strong py-[2.4cqw] last:border-b"
            >
              <dt className="col-span-3 flex items-center gap-[1.2cqw] self-start pt-[1.1cqw]">
                <span aria-hidden="true" className="h-[max(1px,0.12cqw)] w-[1.8cqw] bg-accent" />
                <span className="deck-label font-mono text-ink">{s.label}</span>
              </dt>
              <dd className="deck-heading col-span-9 font-display text-ink">{s.text}</dd>
            </Item>
          ))}
        </Stagger>
      </SlideBody>

      <Rise delay={0.7} className="shrink-0">
        <p className="deck-label font-mono text-ink-subtle">Published wording — {PROFILE_SOURCE}</p>
      </Rise>
    </Slide>
  );
}
