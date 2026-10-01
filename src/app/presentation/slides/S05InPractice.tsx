import { entry } from "../portfolio";
import { Item, Slide, SlideBody, SlideHeader, Stagger, StatusBadge } from "./primitives";
import type { SlideProps } from "./types";

/**
 * Slide 05 — Q.E.E.T in practice.
 *
 * The method attached to something that exists, immediately after it is
 * introduced, so the four words are never left floating as a diagram.
 *
 * ---------------------------------------------------------------------------
 * What this slide does NOT say, and why
 * ---------------------------------------------------------------------------
 * It carries one status — Active, the organisation's word, from the
 * portfolio registry. It does not say GA, 1.0 or a launch date: the
 * organisation's profile and Qeet ID's own roadmap disagree about general
 * availability (DRIFT-REGISTER QC-007), so that status is `unknown`, and a
 * corporate deck is the worst possible venue for resolving it in Qeet's
 * favour.
 *
 * It also carries no feature list. The point is that the method produced a
 * real foundation; protocol names belong in the speaker's mouth, where they
 * can be qualified.
 */
const JOURNEY = [
  {
    letter: "Q",
    word: "Question",
    body: "What should digital identity become as people, organisations, applications, machines and autonomous systems become interconnected?",
  },
  {
    letter: "E",
    word: "Explore",
    body: "Identity and trust. Authentication and authorisation. Machine identity. Modern standards, and the cryptographic models behind them.",
  },
  {
    letter: "E",
    word: "Envision",
    body: "Not another isolated login system — a shared identity foundation that every other product can depend on.",
  },
  {
    letter: "T",
    word: "Transform",
    body: "Qeet ID: the identity substrate Qeet products authenticate against, through OIDC.",
  },
];

export function S05InPractice({ index }: SlideProps) {
  const id = entry("qeet-id");

  return (
    <Slide>
      <SlideHeader
        index={index}
        label="Q.E.E.T in practice"
        title={[`${id.name}: the method, applied.`]}
        aside={<StatusBadge status={id.status} />}
        lede="Passkeys-first identity and access — the identity foundation for the whole group."
      />

      <SlideBody>
        <Stagger as="ol" delay={0.32} className="grid grid-cols-4 gap-[2.4cqw]">
          {JOURNEY.map((step, i) => (
            <Item
              as="li"
              key={`${step.letter}-${i}`}
              className={
                i === JOURNEY.length - 1
                  ? "border-t border-accent pt-[1.6cqw]"
                  : "border-t border-rule-strong pt-[1.6cqw]"
              }
            >
              <p className="deck-label font-mono text-ink-muted">
                <span aria-hidden="true" className="text-ink">
                  {step.letter}
                </span>
                <span aria-hidden="true" className="mx-[0.6cqw] text-ink-subtle">
                  —
                </span>
                {step.word}
              </p>
              <p
                className={
                  i === JOURNEY.length - 1
                    ? "deck-body mt-[1.2cqw] font-display text-ink"
                    : "deck-body-s mt-[1.2cqw] font-sans text-ink-muted"
                }
              >
                {step.body}
              </p>
            </Item>
          ))}
        </Stagger>
      </SlideBody>
    </Slide>
  );
}
