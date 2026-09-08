import { StatusChip } from "@/components/ui/StatusChip";
import { Item, Lines, Rise, SlideMark, Stagger } from "./primitives";
import type { SlideProps } from "./types";

/**
 * Slide 11 — truth in lifecycle.
 *
 * ---------------------------------------------------------------------------
 * Two systems, and the discipline is in refusing to merge them
 * ---------------------------------------------------------------------------
 * Qeet keeps two separate vocabularies, and this slide's only job is to make
 * clear that they answer different questions:
 *
 *   PRODUCT STATUS    Planned · In development · Available
 *                     "Can I use this product?" — public, and deliberately
 *                     three words wide.
 *
 *   PRODUCT MATURITY  Research · Concept · Prototype · Development ·
 *                     Preview · Production · Mature
 *                     "How far has this product or capability progressed?"
 *
 * They are not two views of one ladder. Nothing here maps `Planned` onto
 * "Research", or `Available` onto "Production" — a product can be Available
 * while one capability inside it is at Preview and its core is at Production,
 * and that precision is the entire reason for keeping two systems instead of
 * one. Collapsing them would quietly re-import the problem both exist to
 * solve.
 *
 * NO PRODUCT IS NAMED ON THIS SLIDE. Placing a real product at a maturity
 * stage would be an assertion nothing currently supports, and this is the one
 * slide that cannot afford an unsupported assertion.
 *
 * The maturity scale is the primary visual and the statuses are secondary,
 * small, and stated as what they are. The graduated ticks and the ink ladder
 * carry the progression; no accent appears on either scale, because tinting
 * the far end would imply a maturity stage had been promoted to a public
 * status.
 */
const MATURITY = [
  { stage: "Research", definition: "An area or problem being investigated." },
  { stage: "Concept", definition: "A defined idea, with a clear problem and a hypothesis." },
  { stage: "Prototype", definition: "Something exists, to test whether the idea works." },
  { stage: "Development", definition: "The capability is actively being engineered." },
  { stage: "Preview", definition: "Usable by a limited audience while validation continues." },
  { stage: "Production", definition: "Deployed for real-world use." },
  { stage: "Mature", definition: "Operational evidence, stability, learning and sustained use." },
];

/** Faint to full across the scale. Presence, not hue — it reads in greyscale. */
const INK = [
  "text-ink-subtle",
  "text-ink-subtle",
  "text-ink-muted",
  "text-ink-muted",
  "text-ink-muted",
  "text-ink",
  "text-ink",
];

const BAR = [
  "bg-rule-strong",
  "bg-rule-strong",
  "bg-ink-subtle",
  "bg-ink-subtle",
  "bg-ink-muted",
  "bg-ink-muted",
  "bg-ink",
];

export function S11Lifecycle({ index }: SlideProps) {
  return (
    <div className="deck-slide justify-between">
      <SlideMark index={index} label="Truth in lifecycle" />

      <div className="grid-editorial items-baseline">
        <Lines
          as="h2"
          lines={["Ambition should", "never masquerade", "as achievement."]}
          className="col-aside deck-display-s font-display text-ink"
        />
        <Rise delay={0.28} className="col-figure">
          <p className="deck-label font-mono text-ink-subtle">Product maturity</p>
          <p className="deck-body mt-[1.2cqw] font-sans text-ink-muted">
            How far a product or a capability has actually progressed. Seven
            states, because the difference between a prototype and a preview is
            a real difference and collapsing it is how organisations end up
            believing their own roadmaps.
          </p>
        </Rise>
      </div>

      {/* The primary visual: a graduated scale. The bars grow because the
          progression is the content. */}
      <Stagger as="ol" delay={0.44} className="grid grid-cols-7 gap-[1.6cqw]">
        {MATURITY.map((entry, i) => (
          <Item as="li" key={entry.stage}>
            <div className="flex h-[5cqw] items-end">
              <span
                aria-hidden="true"
                className={`w-full ${BAR[i]}`}
                style={{ height: `${0.14 + i * 0.16}cqw` }}
              />
            </div>
            <p className="deck-label mt-[1.2cqw] tabular-figures font-mono text-ink-subtle">
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className={`deck-heading-s mt-[0.5cqw] font-display ${INK[i]}`}>{entry.stage}</p>
            <p className="deck-body-s mt-[0.7cqw] font-sans text-ink-subtle">
              {entry.definition}
            </p>
          </Item>
        ))}
      </Stagger>

      {/* Secondary, and explicitly a different question. */}
      <Rise delay={0.95}>
        <div className="grid-editorial items-baseline border-t border-rule pt-[1.8cqw]">
          <div className="col-aside">
            <p className="deck-label font-mono text-ink-subtle">Public product status</p>
            <div className="mt-[1.2cqw] flex flex-wrap items-center gap-[2cqw]">
              <StatusChip status="planned" />
              <StatusChip status="development" />
              <StatusChip status="available" />
            </div>
          </div>
          <p className="col-figure deck-body-s font-sans text-ink-subtle">
            Status answers whether you can use a product. Maturity answers how
            far a capability has progressed. Neither is inferred from the
            other, and{" "}
            <span className="text-ink">Available does not mean mature</span> —
            it means available.
          </p>
        </div>
      </Rise>
    </div>
  );
}
