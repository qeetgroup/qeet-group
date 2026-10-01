import { Item, Rise, Slide, SlideBody, SlideHeader, Stagger } from "./primitives";
import type { SlideProps } from "./types";

/**
 * Slide 12 — what Qeet standardises.
 *
 * Two columns, taken row for row from the table in ORGANIZATION.md
 * ("What the organization standardises — and what it does not"). The left
 * column is in full ink with accent ticks because it is the commitment; the
 * right is muted because it is a freedom, and freedoms do not need emphasis.
 *
 * This replaces a "common shortcut / Qeet discipline" comparison. That framing
 * defined Qeet against other organisations; this one describes Qeet's own
 * operating model, which is both more accurate and more useful to a reader
 * trying to understand why the stacks differ.
 */
const STANDARDISED = [
  "Identity and sessions",
  "Security baseline and tenancy",
  "API conventions",
  "Domain and hostname architecture",
  "Design system for front-ends",
  "Environment tiers",
  "Observability and audit expectations",
];

const CHOSEN = [
  "Backend language and runtime",
  "Architectural style",
  "Datastore",
  "Messaging, cache and search",
  "Deployment topology",
  "Internal structure",
  "Testing approach",
];

export function S12Standards({ index }: SlideProps) {
  return (
    <Slide>
      <SlideHeader
        index={index}
        label="What Qeet standardises"
        title={["Interfaces and guarantees —", "not identical implementations."]}
        accentIndex={0}
        lede="The stack follows the domain’s hardest problem, not a house default."
      />

      <SlideBody>
        <div className="grid grid-cols-2 gap-[4.8cqw]">
          <div>
            <Rise delay={0.25}>
              <p className="deck-label border-b border-ink-subtle pb-[0.9cqw] font-mono text-ink">
                Standardised across Qeet
              </p>
            </Rise>
            <Stagger as="ul" delay={0.35}>
              {STANDARDISED.map((item) => (
                <Item
                  as="li"
                  key={item}
                  className="flex items-center gap-[1.2cqw] border-b border-rule py-[0.5cqw]"
                >
                  <span aria-hidden="true" className="h-[max(1px,0.12cqw)] w-[1.4cqw] shrink-0 bg-accent" />
                  <span className="deck-body-s font-display text-ink">{item}</span>
                </Item>
              ))}
            </Stagger>
          </div>

          <div>
            <Rise delay={0.4}>
              <p className="deck-label border-b border-rule-strong pb-[0.9cqw] font-mono text-ink-muted">
                Chosen by each product
              </p>
            </Rise>
            <Stagger as="ul" delay={0.5}>
              {CHOSEN.map((item) => (
                <Item
                  as="li"
                  key={item}
                  className="flex items-center gap-[1.2cqw] border-b border-rule py-[0.5cqw]"
                >
                  <span aria-hidden="true" className="h-[max(1px,0.12cqw)] w-[1.4cqw] shrink-0 bg-rule-strong" />
                  <span className="deck-body-s font-sans text-ink-muted">{item}</span>
                </Item>
              ))}
            </Stagger>
          </div>
        </div>
      </SlideBody>
    </Slide>
  );
}
