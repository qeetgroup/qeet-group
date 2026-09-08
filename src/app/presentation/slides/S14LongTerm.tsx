import { Item, Rise, SlideMark, Stagger } from "./primitives";
import type { SlideProps } from "./types";

/**
 * Slide 14 — the long-term group.
 *
 * Ambition and restraint have to arrive in the same breath here, and the
 * ordering of the four declaratives does most of that work: three statements
 * that everything will change, set in faint ink, and then the one that will
 * not, in full ink. Ambition is in the scope of the change; restraint is in
 * only claiming one thing survives it.
 *
 * The domains are labelled as domains. Listing "identity, intelligence,
 * infrastructure, security, emerging computing" without that label would read
 * as five product lines, which would be five claims this deck has no basis
 * for. The label is not a disclaimer bolted on — it is the accurate
 * description, and it is set at the same size as the domains rather than
 * shrunk beneath them.
 *
 * The self-diminishing version of this slide — "we will not pretend the group
 * is bigger than it is; we are early" — is a true and good sentence that
 * belongs in the speaker's mouth rather than projected at ten times life size.
 * It is in the notes.
 */
const DECLARATIVES = [
  { text: "The portfolio will change.", strong: false },
  { text: "The technologies will change.", strong: false },
  { text: "The questions will change.", strong: false },
  { text: "The method should remain.", strong: true },
];

const DOMAINS = [
  "Identity",
  "Intelligence",
  "Infrastructure",
  "Security",
  "Emerging computing",
];

export function S14LongTerm({ index }: SlideProps) {
  return (
    <div className="deck-slide justify-between">
      <SlideMark index={index} label="The long-term Qeet Group" />

      <Stagger as="ul" delay={0.1} className="max-w-[70cqw]">
        {DECLARATIVES.map((line) => (
          <Item as="li" key={line.text}>
            <p
              className={`deck-heading py-[0.5cqw] font-display ${
                line.strong ? "text-ink" : "text-ink-subtle"
              }`}
            >
              {line.text}
            </p>
          </Item>
        ))}
      </Stagger>

      <div>
        <Rise delay={0.6}>
          <p className="deck-body-s font-sans text-ink-subtle">
            Possible domains of exploration. Not committed product lines, and
            not a roadmap.
          </p>
        </Rise>
        <Stagger as="ul" delay={0.7} className="mt-[1.6cqw] grid grid-cols-5 gap-[2cqw]">
          {DOMAINS.map((domain) => (
            <Item as="li" key={domain} className="border-t border-rule pt-[1.2cqw]">
              <span className="deck-body-s font-display text-ink-muted">{domain}</span>
            </Item>
          ))}
        </Stagger>
      </div>

      <Rise delay={0.95}>
        <p className="deck-heading-s max-w-[66cqw] font-display text-ink">
          The ambition is long-term. The claims remain grounded in what exists
          today.
        </p>
      </Rise>
    </div>
  );
}
