import { cn } from "@/lib/utils";
import { entry } from "../portfolio";
import {
  Figure,
  Item,
  Rise,
  Slide,
  SlideBody,
  SlideFooter,
  SlideHeader,
  Stagger,
  StatusBadge,
  Stroke,
} from "./primitives";
import type { SlideProps } from "./types";

/**
 * Slide 11 — how the ecosystem connects.
 *
 * The foundations from the inside of one product. A single node on the left —
 * any Qeet product, existing or not — and one-way connectors fanning out to
 * the capabilities it composes, each crossing a published contract.
 *
 * Billing is the deliberate exception in the drawing. The platform model
 * (PRODUCT-PORTFOLIO.md) lists billing → Qeet Pay, but ARCHITECTURE.md places
 * Pay among the business products and it is in development. So its connector
 * is dashed, its row is dimmer, and it carries its own status badge: an
 * expectation, drawn as one.
 *
 * No arrow returns. No connector touches another product's datastore — the
 * footer says so in words, because a diagram cannot draw an absence.
 *
 * Geometry: on the 12-column deck grid (5.1cqw columns, 2.4cqw gaps) the
 * two-column connector cell is exactly 12.6cqw wide; five 4.4cqw rows make it
 * 22cqw tall. The viewBox is that box at ×10, so the figure scales uniformly.
 */
type Link = {
  capability: string;
  slug: string;
  contract: string;
  conditional?: boolean;
};

const LINKS: Link[] = [
  { capability: "Authentication", slug: "qeet-id", contract: "OIDC" },
  { capability: "Interface", slug: "qeetrix", contract: "Packages" },
  { capability: "Notifications", slug: "qeet-notify", contract: "API" },
  { capability: "Audit & observability", slug: "qeet-logs", contract: "Ingest API" },
  { capability: "Billing, where needed", slug: "qeet-pay", contract: "API", conditional: true },
];

const ROW_CENTRES = [22, 66, 110, 154, 198];

export function S11Connects({ index }: SlideProps) {
  return (
    <Slide>
      <SlideHeader
        index={index}
        label="How the ecosystem connects"
        title={["The next product should benefit", "from what has already been built."]}
      />

      <SlideBody>
        <div className="deck-grid items-center">
          <Rise delay={0.2} className="col-span-3">
            <div className="border border-ink-muted px-[1.6cqw] py-[1.6cqw]">
              <p className="deck-label font-mono text-ink-subtle">Any</p>
              <p className="deck-heading-s mt-[0.4cqw] font-display text-ink">Qeet product</p>
              <p className="deck-body-s mt-[0.6cqw] font-sans text-ink-muted">
                Existing, or not yet started.
              </p>
            </div>
          </Rise>

          <Figure viewBox="0 0 126 220" className="col-span-2 h-[22cqw] w-full">
            {ROW_CENTRES.map((y, i) => {
              const conditional = LINKS[i].conditional;
              return (
                <g key={y}>
                  <Stroke
                    d={`M 0 110 C 64 110, 56 ${y}, 118 ${y}`}
                    className={conditional ? "stroke-ink-subtle" : "stroke-ink-muted"}
                    dashed={conditional}
                    delay={0.35 + i * 0.08}
                  />
                  <Stroke
                    d={`M 112 ${y - 5} L 119 ${y} L 112 ${y + 5}`}
                    className={conditional ? "stroke-ink-subtle" : "stroke-accent"}
                    delay={0.8 + i * 0.08}
                  />
                </g>
              );
            })}
          </Figure>

          <Stagger as="ul" delay={0.45} className="col-span-7">
            {LINKS.map((link) => {
              const product = entry(link.slug);
              return (
                <Item
                  as="li"
                  key={link.slug}
                  className={cn(
                    "flex h-[4.4cqw] items-center gap-[1.2cqw] border-b",
                    link.conditional ? "border-dashed border-rule-strong" : "border-rule-strong",
                  )}
                >
                  <span className="deck-body-s w-[17cqw] shrink-0 font-sans text-ink-muted">
                    {link.capability}
                  </span>
                  <span aria-hidden="true" className="deck-body-s text-ink-subtle">
                    →
                  </span>
                  <span
                    className={cn(
                      "deck-heading-s whitespace-nowrap font-display",
                      link.conditional ? "text-ink-muted" : "text-ink",
                    )}
                  >
                    {product.name}
                  </span>
                  {link.conditional ? <StatusBadge status={product.status} /> : null}
                  <span className="deck-label ml-auto whitespace-nowrap font-mono text-ink-subtle">
                    {link.contract}
                  </span>
                </Item>
              );
            })}
          </Stagger>
        </div>
      </SlideBody>

      <SlideFooter delay={1.1}>
        One direction only — and always through a published contract, never another
        product&rsquo;s database.
      </SlideFooter>
    </Slide>
  );
}
