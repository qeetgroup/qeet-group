import { Item, Lines, Rise, SlideMark, Stagger } from "./primitives";
import type { SlideProps } from "./types";

/**
 * Slide 05 — Question.
 *
 * Asymmetric 5/7 rather than an even split, on the site's own reasoning that
 * an even split has no subject. The headline and its four postures sit in the
 * narrower column; the principle sits in the wider one, which is where the eye
 * lands second and stays.
 *
 * ---------------------------------------------------------------------------
 * The principle, not the mechanism
 * ---------------------------------------------------------------------------
 * An earlier draft of this slide used the organisation's own example — that it
 * keeps a register of the places its documentation disagrees with its code.
 * That is a genuinely unusual practice and it is tempting on a slide, but it
 * is internal machinery, and an audience hearing it cold spends its attention
 * on the mechanism rather than the posture. The general form is stronger in
 * the room and the specific example is better told out loud, so the example
 * moved into the speaker notes.
 */
const POSTURES = [
  "Challenge the conventional answer.",
  "Isolate the problem that actually matters, not the one that is convenient.",
  "Ask whether the category itself is right.",
  "Be willing to question ourselves.",
];

export function S05Question({ index }: SlideProps) {
  return (
    <div className="deck-slide justify-between">
      <SlideMark index={index} label="Question" />

      <div className="grid-editorial items-start">
        <div className="col-aside">
          <Lines
            as="h2"
            lines={["Progress begins", "with the right", "question."]}
            className="deck-display-s font-display text-ink"
          />

          <Stagger as="ul" delay={0.34} className="mt-[2.8cqw]">
            {POSTURES.map((posture) => (
              <Item
                as="li"
                key={posture}
                className="border-t border-rule py-[1.15cqw] last:border-b"
              >
                <span className="deck-body-s font-sans text-ink-muted">{posture}</span>
              </Item>
            ))}
          </Stagger>
        </div>

        <div className="col-figure">
          <Rise delay={0.5}>
            <p className="deck-label font-mono text-ink-subtle">The working consequence</p>
            <p className="deck-heading mt-[1.6cqw] font-display text-ink">
              When evidence contradicts a claim, Qeet corrects{" "}
              <span className="text-accent-text-display">the claim</span> rather
              than defending it.
            </p>
          </Rise>

          <Rise delay={0.66} className="mt-[3cqw]">
            <p className="deck-body-s font-sans text-ink-subtle">
              It applies to industry assumptions, product assumptions, technical
              assumptions and customer assumptions — and to Qeet&rsquo;s own
              earlier decisions, which are the hardest of the five to reopen.
            </p>
            <p className="deck-body-s mt-[1.4cqw] font-sans text-ink-subtle">
              Qeet ID began this way. The first question was not which login
              system to build. It was what identity has to become.
            </p>
          </Rise>
        </div>
      </div>

      <Rise delay={0.86}>
        <p className="deck-body font-display text-ink-muted">
          Before we build, we ask whether we are solving the right problem.
        </p>
      </Rise>
    </div>
  );
}
