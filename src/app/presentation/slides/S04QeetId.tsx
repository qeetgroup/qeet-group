import { StatusChip } from "@/components/ui/StatusChip";
import { Item, PullQuote, Rise, Rule, SlideMark, Stagger } from "./primitives";
import type { SlideProps } from "./types";

/**
 * Slide 04 — Qeet ID, as the method applied.
 *
 * This slide is deliberately early. A deck that spends eight slides on
 * philosophy before showing anything real is asking an enterprise audience to
 * extend credit it has no reason to extend; putting the proof at position four
 * means the four letters are already attached to something that exists by the
 * time they are unpacked.
 *
 * ---------------------------------------------------------------------------
 * What this slide does NOT say, and why
 * ---------------------------------------------------------------------------
 * It carries one status: the chip below, rendering the same `available` label
 * the site publishes. It does not say generally available, GA, 1.0,
 * production, mature or enterprise-ready — the organisation's own records
 * treat that maturity question as open, and a corporate deck is the worst
 * possible venue for resolving it in Qeet's favour.
 *
 * It also carries no feature list. The point being made is that the method
 * produced a real product, and a list of capabilities argues a different case
 * to a different audience.
 */
const JOURNEY = [
  {
    letter: "Q",
    stage: "Question",
    body:
      "What should digital identity become as people, organisations, applications, machines and autonomous software become steadily more interconnected?",
  },
  {
    letter: "E",
    stage: "Explore",
    body:
      "Identity, trust, authentication and authorisation. Machine and agent identity. The standards arriving now, and the cryptographic models arriving behind them.",
  },
  {
    letter: "E",
    stage: "Envision",
    body:
      "Not another login system. A trust foundation the rest of a portfolio could be built on — and that an organisation could own outright.",
  },
  {
    letter: "T",
    stage: "Transform",
    body:
      "Qeet ID. The first thing Qeet Group built, and the layer every other Qeet product signs in through.",
  },
];

export function S04QeetId({ index }: SlideProps) {
  return (
    <div className="deck-slide justify-between">
      <SlideMark index={index} label="Qeet ID — the method applied" />

      <Rise>
        <div className="flex items-baseline gap-[2.4cqw]">
          <h2 className="deck-display-s font-display text-ink">Qeet ID</h2>
          {/* The deck's only status claim, rendered by the site's own
              component so the label cannot be paraphrased into something
              stronger. */}
          <StatusChip status="available" className="translate-y-[-0.4cqw]" />
        </div>
        <p className="deck-body mt-[1.2cqw] max-w-[58cqw] font-sans text-ink-muted">
          The single secure front door to everything an organisation runs.
        </p>
      </Rise>

      <Stagger as="ol" delay={0.28} className="grid grid-cols-4 gap-[2.4cqw]">
        {JOURNEY.map((step, i) => (
          <Item as="li" key={`${step.letter}-${i}`} className="border-t border-rule pt-[1.6cqw]">
            <p className="deck-label font-mono text-ink-subtle">
              <span aria-hidden="true" className="text-ink">
                {step.letter}
              </span>
              <span aria-hidden="true" className="mx-[0.6cqw] text-rule-strong">
                —
              </span>
              {step.stage}
            </p>
            <p className="deck-body-s mt-[1.2cqw] font-sans text-ink-muted">{step.body}</p>
          </Item>
        ))}
      </Stagger>

      <div>
        <Rule delay={0.6} />
        <PullQuote delay={0.72} className="mt-[2cqw] max-w-[76cqw]">
          Identity is the part of an organisation&rsquo;s software that is
          invisible until it fails, and then it is the only thing anyone can
          see.
        </PullQuote>
      </div>
    </div>
  );
}
