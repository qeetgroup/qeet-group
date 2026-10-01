import { PROFILE_SOURCE, SELF_DESCRIPTION } from "./canon";
import { Item, Slide, SlideBody, SlideHeader, Stagger } from "./primitives";
import type { SlideProps } from "./types";

/**
 * Slide 02 — who we are.
 *
 * The question an audience has before any other: what IS this? Answered in
 * the headline, in the organisation's own self-description, and in three
 * columns that carry the shape of the group — before a single product is
 * named.
 *
 * The self-description is quoted, not adapted. The organisation calls itself
 * "a multi-company holding", and an earlier version of this deck said the
 * opposite ("one technology organisation… not a collection of ventures"),
 * which is the kind of contradiction a deck exists to avoid.
 */
const PILLARS = [
  {
    term: "Independent domains",
    detail: "Each venture owns its problem, its architecture and its technology choices.",
  },
  {
    term: "Shared foundations",
    detail: "Identity, design system, notifications and observability — built once, used across ventures.",
  },
  {
    term: "One philosophy",
    detail: "Question, Explore, Envision, Transform — one way of deciding what deserves to be built.",
  },
];

export function S02WhoWeAre({ index }: SlideProps) {
  return (
    <Slide>
      <SlideHeader
        index={index}
        label="Who we are"
        title={["A group of ventures,", "built on one philosophy."]}
        accentIndex={1}
        lede={
          <>
            &ldquo;{SELF_DESCRIPTION}&rdquo;
            <span className="deck-label mt-[0.8cqw] block font-mono text-ink-subtle">
              {PROFILE_SOURCE}
            </span>
          </>
        }
      />

      <SlideBody>
        <Stagger as="dl" delay={0.4} className="grid grid-cols-3 gap-[2.4cqw]">
          {PILLARS.map((pillar) => (
            <Item key={pillar.term} className="border-t border-rule-strong pt-[1.6cqw]">
              <dt className="deck-heading-s font-display text-ink">{pillar.term}</dt>
              <dd className="deck-body-s mt-[0.9cqw] font-sans text-ink-muted">{pillar.detail}</dd>
            </Item>
          ))}
        </Stagger>
      </SlideBody>
    </Slide>
  );
}
