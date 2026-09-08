import { StatusChip } from "@/components/ui/StatusChip";
import type { ProductStatus } from "@/lib/content/types";
import { hasContestedStatus, toBands } from "../portfolio";
import { Item, Lines, Rise, SlideMark, Stagger } from "./primitives";
import type { SlideProps } from "./types";

/**
 * Slide 10 — what Qeet is building.
 *
 * The only slide that makes factual claims about products, so it is the only
 * slide whose content is derived rather than written: the products, their
 * order and their statuses all come from the same collection that renders
 * qeet.in. There is no second list here to fall out of date.
 *
 * Three decisions worth recording.
 *
 * GROUPED BY ROLE, NOT BY STATUS. Grouping by status would put a number on
 * the slide whether or not one was printed — four rows under a heading is a
 * count, and the eye does the arithmetic the copy declined to do.
 *
 * NO AGGREGATE WHILE A STATUS IS CONTESTED. See ../portfolio.ts. One product's
 * public status is currently disputed by its own documentation, and a total
 * built from a disputed input is a fabricated number with a citation.
 *
 * ONE CHIP PER BAND WHERE THE BAND AGREES. Seven consecutive "PLANNED" chips
 * stop being information and become texture. Where every product in a band
 * shares a status the chip is hoisted to the band; where they differ each
 * product carries its own. Either way the status shown is the one the site
 * publishes, never a summary of it.
 */

function sharedStatus(statuses: ProductStatus[]): ProductStatus | null {
  const first = statuses[0];
  return statuses.every((s) => s === first) ? first : null;
}

export function S10Portfolio({ index, products }: SlideProps) {
  const bands = toBands(products);
  const gated = hasContestedStatus(products);

  const counts = {
    available: products.filter((p) => p.status === "available").length,
    development: products.filter((p) => p.status === "development").length,
    planned: products.filter((p) => p.status === "planned").length,
  };

  return (
    <div className="deck-slide justify-between">
      <SlideMark index={index} label="What Qeet is building" />

      <div className="grid-editorial items-baseline">
        <Lines
          as="h2"
          lines={["Products that", "compose each other."]}
          className="col-aside deck-display-s font-display text-ink"
        />
        <Rise delay={0.28} className="col-figure">
          <p className="deck-body font-sans text-ink-muted">
            Qeet Group is one technology organisation building a connected
            ecosystem of products — not a collection of separate ventures. Each
            carries the lifecycle status Qeet publishes for it, and nothing
            here is dressed up as further along than that.
          </p>
        </Rise>
      </div>

      <div className="grid grid-cols-3 gap-[3.4cqw]">
        {bands.map((band, bandIndex) => {
          const uniform = sharedStatus(band.items.map((p) => p.status));
          return (
            <div key={band.label}>
              <div className="flex items-baseline justify-between gap-[1.2cqw] border-t border-rule-strong pt-[1.4cqw]">
                <p className="deck-label font-mono text-ink">{band.label}</p>
                {uniform ? <StatusChip status={uniform} /> : null}
              </div>
              <p className="deck-body-s mt-[1cqw] font-sans text-ink-subtle">{band.note}</p>

              <Stagger as="ul" delay={0.4 + bandIndex * 0.1} className="mt-[1.6cqw]">
                {band.items.map((product) => (
                  <Item
                    as="li"
                    key={product.slug}
                    className="flex items-baseline justify-between gap-[1.2cqw] border-t border-rule py-[0.85cqw] last:border-b"
                  >
                    <span className="deck-body-s font-display text-ink">{product.name}</span>
                    {uniform ? null : <StatusChip status={product.status} />}
                  </Item>
                ))}
              </Stagger>
            </div>
          );
        })}
      </div>

      <Rise delay={0.9}>
        {gated ? (
          /*
           * The structural claim, which is true and verifiable, in place of a
           * numeric one that currently is not.
           */
          <p className="deck-body font-sans text-ink-muted">
            Almost nothing here stands alone. Every product signs in through the
            same identity layer, and every product interface is built from the
            same design foundation.
          </p>
        ) : (
          <p className="deck-body font-sans text-ink-muted">
            <span className="tabular-figures font-mono text-ink">
              {counts.available}
            </span>{" "}
            available ·{" "}
            <span className="tabular-figures font-mono text-ink">
              {counts.development}
            </span>{" "}
            in development ·{" "}
            <span className="tabular-figures font-mono text-ink">
              {counts.planned}
            </span>{" "}
            planned. Every product signs in through the same identity layer, and
            every product interface is built from the same design foundation.
          </p>
        )}
      </Rise>
    </div>
  );
}
