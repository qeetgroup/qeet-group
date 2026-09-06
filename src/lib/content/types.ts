/**
 * Frontmatter and loaded-document shapes for every MDX content collection.
 * Pure types — importable from client and server code alike.
 */

/**
 * ============================================================================
 * Product lifecycle
 * ============================================================================
 *
 * A closed union, replacing the previous free-text `stage` field.
 *
 * `stage` accepted any string and was compared against a lookup table that
 * fell through to the raw value, so a typo — "Generally Available" for
 * "Generally available" — would render as a status label and nobody would
 * notice. With sixteen products across three lifecycle stages, that matters
 * more than it did with six: presenting something planned as though it shipped
 * is the single most damaging error this site can make.
 *
 * The vocabulary maps onto qeet-context/PRODUCT-PORTFOLIO.md, with one
 * deliberate change. The portfolio says `active`; the site says `available`,
 * because "active" describes the state of the TEAM and a visitor reads it as
 * describing the state of the PRODUCT.
 */
export type ProductStatus = "available" | "development" | "planned";

/**
 * The one place a lifecycle status becomes words.
 *
 * Lives in types.ts rather than loaders.ts for a concrete reason: StatusChip is
 * rendered inside the navigation, which is a client component. Importing this
 * from the loaders would pull `node:fs` into the client bundle through the
 * barrel and fail the build — which is exactly how it failed the first time.
 * Anything a client component needs belongs in this module.
 *
 * Two labels are load-bearing:
 *
 *   `available` NOT "generally available". The organisation's drift register
 *   (QC-007) records that Qeet ID's GA claim is contested — the published
 *   profile says GA on 2026-05-27 while the server roadmap describes it as
 *   pre-1.0. "Available" is true of the shipped capabilities either way; a
 *   corporate site is the wrong place to resolve that in Qeet's favour.
 *
 *   `planned` NOT "coming soon". "Soon" is a date, and there is not one.
 */
const STATUS_LABEL: Record<ProductStatus, string> = {
  available: "Available",
  development: "In development",
  planned: "Planned",
};

export function statusLabel(status: ProductStatus): string {
  return STATUS_LABEL[status];
}

/**
 * Grouping for the products mega panel and the ecosystem map. Sixteen items in
 * a flat list is a wall; grouped, it is scannable.
 */
export type ProductGroup =
  | "identity"
  | "foundation"
  | "business"
  | "intelligence"
  | "visibility"
  | "communications"
  | "media"
  | "productivity";

export type ProductFrontmatter = {
  name: string;
  /** Headline claim. Short enough to set at display size. */
  tagline: string;
  /** One sentence of plain-language explanation. Used in listings and panels. */
  oneLiner: string;
  sector: string;
  group: ProductGroup;
  status: ProductStatus;
  /**
   * Omitted for planned products — there is nothing to link to, and a link to
   * a parked domain is worse than no link. The type enforces nothing here, but
   * the loader refuses to emit a CTA without it.
   */
  externalUrl?: string;
  /** Display order across the portfolio and listings. Lower sorts first. */
  order?: number;
  description: string;
  demo?: boolean;
};

/**
 * ============================================================================
 * Insights
 * ============================================================================
 *
 * One collection replacing the previous `newsroom` and `memos` split. That
 * split was structural rather than editorial — both were dated, authored,
 * long-form documents — and it meant the site's thinking was spread across two
 * low-traffic sections instead of concentrated in one that could carry weight.
 *
 * `kind` preserves the distinction where it matters (an announcement and an
 * essay want different treatments) without splitting the route.
 */
export type InsightKind = "announcement" | "perspective" | "engineering" | "research";

export type InsightFrontmatter = {
  title: string;
  date: string;
  kind: InsightKind;
  /** Editorial topic, drives /insights/topic/[topic]. */
  topic: string;
  /** Standfirst. */
  dek: string;
  author?: string;
  /** At most one may be true; the hub leads with it. */
  featured?: boolean;
  demo?: boolean;
};

export type LegalFrontmatter = {
  title: string;
  lastUpdated: string;
  description: string;
};

/** Capability pages under /technology. */
export type TechnologyFrontmatter = {
  title: string;
  eyebrow: string;
  dek: string;
  order?: number;
  /** Product slugs this capability is delivered by. Renders the cross-links. */
  products?: string[];
  demo?: boolean;
};

/** Long-form company pages — about, principles, and so on. */
export type CompanyFrontmatter = {
  title: string;
  dek: string;
  description: string;
  order?: number;
  demo?: boolean;
};

export type LoadedProduct = {
  slug: string;
  data: ProductFrontmatter;
  content: string;
};

export type LoadedInsight = {
  slug: string;
  data: InsightFrontmatter;
  content: string;
  /** Estimated reading time in whole minutes (220 wpm). Min 1. */
  readingTime: number;
};

export type LoadedLegal = {
  slug: string;
  data: LegalFrontmatter;
  content: string;
};

export type LoadedTechnology = {
  slug: string;
  data: TechnologyFrontmatter;
  content: string;
};

export type LoadedCompany = {
  slug: string;
  data: CompanyFrontmatter;
  content: string;
};

/**
 * Compact, serializable product list — the single source of truth for chrome
 * (nav mega panel, footer, ecosystem map). Derived from the MDX files, so the
 * portfolio scales automatically: drop in a new product and it appears
 * everywhere, with no hardcoded count or list to maintain.
 */
export type ProductSummary = {
  slug: string;
  name: string;
  /** Short node label for the ecosystem map — "Qeet ID" → "ID". */
  short: string;
  oneLiner: string;
  sector: string;
  group: ProductGroup;
  href: string;
  status: ProductStatus;
  /** Human label for `status`. Derived, never authored. */
  statusLabel: string;
  /** Present only where the product actually has somewhere to go. */
  externalUrl?: string;
};

/** Counts for the metric band. Derived, never authored — see config/metrics.ts. */
export type PortfolioCounts = {
  total: number;
  available: number;
  development: number;
  planned: number;
};
