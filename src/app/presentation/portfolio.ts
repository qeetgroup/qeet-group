import type { ProductSummary } from "@/lib/content/types";

/**
 * ============================================================================
 * The portfolio slide's data, and the gate on it
 * ============================================================================
 *
 * Slide 10 is the one slide that makes factual claims about products, so it is
 * the one slide that needs a rule rather than an author's judgement.
 *
 * ---------------------------------------------------------------------------
 * The contested-status gate
 * ---------------------------------------------------------------------------
 * A product's public status can be disputed: the site publishes one thing and
 * the product's own documentation says another. Qeet Notify is in exactly that
 * position today — the site publishes `available`; the product's own
 * documentation describes it as pre-development.
 *
 * A deck has three ways to handle that, and two of them are wrong. It can pick
 * the flattering version, which is how an organisation ends up defending a
 * claim it never consciously made. It can invent a fourth label — "under
 * review" — which quietly tells an enterprise audience that Qeet's lifecycle
 * vocabulary has an escape hatch, and the vocabulary's whole value is that it
 * does not. Or it can decline to publish the AGGREGATE and let each product
 * carry the status the site already publishes for it.
 *
 * The third is what happens below. While `CONTESTED` is non-empty:
 *
 *   • no count of any kind is rendered — not a total, not a per-status
 *     subtotal, not "four of these are available";
 *   • products are grouped by their role in the portfolio rather than by
 *     status, so no total is implied by the shape of the slide either.
 *
 * Per-product chips still render, because those are already published on
 * qeet.in — repeating a published status is not a new claim. Manufacturing a
 * total out of one disputed input would be.
 *
 * Resolving the dispute is a one-line change: remove the slug. The aggregate
 * comes back on its own, and `slides.test.ts` asserts both states.
 */
export const CONTESTED: ReadonlySet<string> = new Set(["qeet-notify"]);

export function hasContestedStatus(products: ProductSummary[]): boolean {
  return products.some((p) => CONTESTED.has(p.slug));
}

/**
 * The two products every other product depends on. Taken from the same source
 * the site's ecosystem map uses, because "which of these is a foundation" is a
 * structural fact about the portfolio and should not be re-decided per surface.
 */
const FOUNDATION_SLUGS = new Set(["qeet-id", "qeetrix"]);

export type PortfolioBand = {
  /** Mono label above the band. */
  label: string;
  /** One line explaining what the band IS, not how many things are in it. */
  note: string;
  items: ProductSummary[];
};

/**
 * Grouped by role, then by capability area — never by status.
 *
 * Grouping by status would put a number on the slide whether or not one was
 * printed: four rows under a heading is a count, and the eye does the
 * arithmetic the copy declined to do.
 */
export function toBands(products: ProductSummary[]): PortfolioBand[] {
  const foundations = products.filter((p) => FOUNDATION_SLUGS.has(p.slug));
  const rest = products.filter((p) => !FOUNDATION_SLUGS.has(p.slug));

  // `group` already carries the site's own capability taxonomy, and
  // `listProductSummaries` returns products pre-sorted by `order`, so the
  // sequence inside each band is the portfolio's own ordering.
  const productivity = rest.filter((p) => p.group === "productivity");
  const operating = rest.filter((p) => p.group !== "productivity");

  return [
    {
      label: "Shared foundations",
      note: "Every product authenticates through the same identity layer and is built from the same design foundation.",
      items: foundations,
    },
    {
      label: "Operating products",
      note: "Built for a specific domain, composed from the foundations rather than rebuilding them.",
      items: operating,
    },
    {
      label: "Specified",
      note: "Documented in detail and not yet built. There is nothing to try.",
      items: productivity,
    },
  ].filter((band) => band.items.length > 0);
}
