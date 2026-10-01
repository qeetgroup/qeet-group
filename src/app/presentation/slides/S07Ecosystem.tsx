import { cn } from "@/lib/utils";
import { STATUS_DEFINITION, byRole, type OrgStatus, type PortfolioRole } from "../portfolio";
import {
  Item,
  Rise,
  Slide,
  SlideBody,
  SlideHeader,
  Stagger,
  StatusBadge,
  StatusGlyph,
} from "./primitives";
import type { SlideProps } from "./types";

/**
 * Slide 07 — the Qeet ecosystem.
 *
 * The whole portfolio on one slide, and the one slide where status has to be
 * legible from the back of the room. Three tiers hang from a single spine
 * headed "Qeet Group", and each tier steps DOWN in presence — name size, ink,
 * and the weight of the rule above it (solid, plain, dashed) — so an active
 * foundation and a planned product can never be mistaken for equals, even in
 * greyscale.
 *
 * Every tier carries its status as a word and its canonical definition from
 * the organisation's schema, and every product carries the status glyph, so
 * colour is never the only signal.
 *
 * There is no total anywhere on this slide, and that is deliberate: the
 * organisation's portfolio summary and its own detailed lists do not yet
 * reconcile, so the deck names every verified product and counts none.
 */
type Tier = {
  role: PortfolioRole;
  label: string;
  status: OrgStatus;
  rule: string;
  name: string;
};

const TIERS: Tier[] = [
  {
    role: "foundation",
    label: "Shared foundations",
    status: "active",
    rule: "border-ink-subtle",
    name: "deck-heading-s font-display text-ink",
  },
  {
    role: "domain",
    label: "Domain products",
    status: "development",
    rule: "border-rule-strong",
    name: "deck-body font-display text-ink-muted",
  },
  {
    role: "productivity",
    label: "Productivity suite",
    status: "planned",
    rule: "border-dashed border-rule-strong",
    name: "deck-body-s font-sans text-ink-subtle",
  },
];

export function S07Ecosystem({ index }: SlideProps) {
  return (
    <Slide>
      <SlideHeader
        index={index}
        label="The Qeet ecosystem"
        title={["What Qeet is building."]}
        lede="Our portfolio spans active, in-development and planned products."
      />

      <SlideBody>
        <Rise delay={0.2} className="flex items-center gap-[1.2cqw]">
          <span aria-hidden="true" className="size-[0.9cqw] bg-ink" />
          <p className="deck-label font-mono text-ink">Qeet Group</p>
        </Rise>

        <Stagger
          delay={0.3}
          className="ml-[0.42cqw] mt-[0.6cqw] border-l border-rule-strong pl-[2.4cqw]"
        >
          {TIERS.map((tier) => (
            <Item
              key={tier.role}
              className={cn("deck-grid relative border-t py-[1.15cqw]", tier.rule)}
            >
              <span
                aria-hidden="true"
                className="absolute left-[-2.4cqw] top-[2.2cqw] h-px w-[1.8cqw] bg-rule-strong"
              />
              <div className="col-span-3">
                <p className="deck-label font-mono text-ink">{tier.label}</p>
                <StatusBadge status={tier.status} className="mt-[0.6cqw]" />
              </div>
              <div className="col-span-9">
                <ul className="grid grid-cols-4 gap-x-[1.6cqw] gap-y-[0.5cqw]">
                  {byRole(tier.role).map((product) => (
                    <li key={product.slug} className="flex items-center gap-[0.8cqw]">
                      <StatusGlyph status={product.status} />
                      <span className={cn("whitespace-nowrap", tier.name)}>{product.name}</span>
                    </li>
                  ))}
                </ul>
                <p className="deck-body-s mt-[0.6cqw] font-sans text-ink-subtle">
                  {STATUS_DEFINITION[tier.status]}
                </p>
              </div>
            </Item>
          ))}
        </Stagger>
      </SlideBody>
    </Slide>
  );
}
