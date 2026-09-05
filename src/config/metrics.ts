/**
 * ============================================================================
 * Organisation metrics
 * ============================================================================
 *
 * Enterprise sites lead with numbers. Most of those numbers are unfalsifiable
 * ("trusted by thousands"), and a site that prints one has quietly told the
 * reader which of its other claims to discount.
 *
 * So a metric here cannot exist without saying where it came from. `evidence`
 * and `source` are required fields, not optional metadata, and MetricBand
 * refuses to render a metric lacking them. There is no path through this
 * module that produces an unattributed number.
 *
 * Anything DERIVABLE from content is derived, never typed — see
 * `portfolioMetrics()`. A hardcoded "16 products" is correct exactly until
 * someone adds the seventeenth.
 */

export type Evidence =
  /** Verifiable from a named source that is checked, not asserted. */
  | "verified"
  /** Illustrative. Must render a DemoBadge and never reaches a machine surface. */
  | "demo"
  /** A stated intention, not an achievement. Must read as future tense. */
  | "planned";

export type Metric = {
  value: string;
  label: string;
  /** Optional clarifier — a date, a scope, a qualification. */
  note?: string;
  evidence: Evidence;
  /** Where the number comes from. Required even when `evidence` is "demo". */
  source: string;
};

/**
 * The verification date carried by the organisation context repository. Shown
 * alongside counts because "16 products" without a date is a claim, while
 * "16 products, verified 28 August 2026" is a fact with a shelf life — and
 * lets a reader judge how stale it might be.
 */
export const PORTFOLIO_VERIFIED_ON = "2026-08-28";

const CONTEXT_SOURCE = `qeet-context/PRODUCT-PORTFOLIO.md, verified against the GitHub API on ${PORTFOLIO_VERIFIED_ON}`;

/**
 * Counts derived from the live content collection.
 *
 * There is a reason this takes the collection rather than reading a constant.
 * The portfolio document states 16 products, but its own status breakdown
 * lists 4 active + 4 in development + 7 planned = 15, and its summary says
 * 8 specification-only where the table beneath lists 7. Two of its numbers
 * disagree with the third, so none of them can be printed on trust. Deriving
 * from the files means the site states what is actually there, and the
 * discrepancy stays a documentation problem instead of becoming a public one.
 */
export function portfolioMetrics(counts: {
  total: number;
  available: number;
  development: number;
  planned: number;
}): Metric[] {
  return [
    {
      value: String(counts.total),
      label: "Products",
      note: "Across the portfolio",
      evidence: "verified",
      source: "Derived from the product collection at build time",
    },
    {
      value: String(counts.available),
      label: "Available today",
      note: "Running in production",
      evidence: "verified",
      source: CONTEXT_SOURCE,
    },
    {
      value: String(counts.development),
      label: "In development",
      note: "Building now",
      evidence: "verified",
      source: CONTEXT_SOURCE,
    },
    {
      value: String(counts.planned),
      label: "Planned",
      note: "Specified, not yet built",
      evidence: "verified",
      source: CONTEXT_SOURCE,
    },
  ];
}

/**
 * Non-derivable organisational facts.
 *
 * Everything absent from this list is absent deliberately. There are no
 * customer counts, no revenue, no headcount, no uptime figure and no
 * certifications, because none of those is verified anywhere in the
 * organisation's own records. An enterprise buyer who checks one claim and
 * finds it hollow stops checking and starts discounting.
 */
export const ORGANISATION_METRICS: Metric[] = [
  {
    value: "67",
    label: "Repositories",
    note: "The engineering surface behind the portfolio",
    evidence: "verified",
    source: CONTEXT_SOURCE,
  },
  {
    value: "1",
    label: "Identity layer",
    note: "Every product authenticates the same way",
    evidence: "verified",
    source: "qeet-context/PRODUCT-PORTFOLIO.md — the platform model",
  },
  {
    value: "1",
    label: "Design foundation",
    note: "Every interface is built from it",
    evidence: "verified",
    source: "qeet-context/PRODUCT-PORTFOLIO.md — Qeetrix",
  },
];
