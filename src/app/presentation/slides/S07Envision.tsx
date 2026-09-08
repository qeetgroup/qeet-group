import { Chain, Lines, Rise, SlideMark } from "./primitives";
import type { SlideProps } from "./types";

/**
 * Slide 07 — Envision.
 *
 * The contrast here is between two planning horizons, so the two questions sit
 * side by side at the same size rather than stacked. Slide 02 already used the
 * stacked form for a different comparison; repeating it would make the two
 * slides read as the same argument twice.
 *
 * The chain beneath is drawn without a threshold — nothing changes state
 * along it. It is a statement about ORDER: each stage is only cheap because
 * the one before it exists, which is the entire reason identity and the design
 * foundation were built before there was a portfolio to justify either.
 */
const STAGES = [
  { label: "Foundation", note: "Built once, on purpose." },
  { label: "Capability", note: "What the foundation makes possible." },
  { label: "Product", note: "A capability someone can use." },
  { label: "Platform", note: "Products that compose each other." },
  { label: "Ecosystem", note: "Where the next thing is cheaper than the last." },
];

export function S07Envision({ index }: SlideProps) {
  return (
    <div className="deck-slide justify-between">
      <SlideMark index={index} label="Envision" />

      <Lines
        as="h2"
        lines={["Designing for", "what compounds."]}
        className="deck-display-s max-w-[52cqw] font-display text-ink"
      />

      <div className="grid grid-cols-2 gap-[6cqw]">
        <Rise delay={0.3}>
          <p className="deck-label font-mono text-ink-subtle">The usual horizon</p>
          <p className="deck-heading-s mt-[1.4cqw] font-display text-ink-subtle">
            What can we build this year?
          </p>
        </Rise>
        <Rise delay={0.44}>
          <p className="deck-label font-mono text-ink-subtle">The question Qeet asks</p>
          <p className="deck-heading-s mt-[1.4cqw] font-display text-ink">
            What becomes possible once the right foundation exists?
          </p>
        </Rise>
      </div>

      <div>
        <Chain stages={STAGES} />
        <Rise delay={0.9} className="mt-[2.4cqw]">
          <p className="deck-body font-sans text-ink-muted">
            It is why identity and the design foundation were built first,
            before there was a portfolio to justify either of them.
          </p>
        </Rise>
      </div>
    </div>
  );
}
