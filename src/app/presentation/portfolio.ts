/**
 * ============================================================================
 * The portfolio, as the organisation records it
 * ============================================================================
 *
 * Source: qeet-context/PRODUCT-PORTFOLIO.md (L0, verified 2026-08-28) for
 * every name, status and purpose below, and schemas/context-schema.yaml for
 * what each status means.
 *
 * ---------------------------------------------------------------------------
 * Why the deck keeps its own list instead of reading the site's MDX
 * ---------------------------------------------------------------------------
 * It used to read src/content/products, so that the deck could not drift from
 * qeet.in. Two things made that the wrong source for this artefact:
 *
 *   1. VOCABULARY. The site publishes `available`; the organisation's status
 *      vocabulary is `active` (context.yaml `vocabularies.status`). A
 *      corporate overview speaks the organisation's language, and "available"
 *      reads as a commercial-release claim that `active` does not make.
 *   2. ROLE. The deck's whole argument is the relationship between shared
 *      foundations and the products built on them. That is a structural fact
 *      from the organisation's records, and the MDX does not carry it.
 *
 * The drift guarantee did not go away; it moved into a test. `slides.test.tsx`
 * asserts that this list names exactly the products the site publishes, that
 * the statuses agree once the two vocabularies are mapped, and that every
 * status here matches PRODUCT-PORTFOLIO.md. A change to either side that the
 * other does not follow fails the build.
 *
 * ---------------------------------------------------------------------------
 * What is deliberately absent: any total
 * ---------------------------------------------------------------------------
 * PRODUCT-PORTFOLIO.md's summary says sixteen products, eight code-backed and
 * eight specification-only. Its own status lists name fifteen. Until the
 * context is reconciled, the deck names every verified product and counts
 * none of them — no total, no per-status subtotal. The tests enforce that on
 * the rendered slides, not just on this file.
 *
 * Data only. No React, and nothing from `@/lib/content`, whose barrel pulls
 * `node:fs` into anything that imports it.
 */

/** The organisation's status vocabulary — the three states the portfolio uses today. */
export type OrgStatus = "active" | "development" | "planned";

/** schemas/context-schema.yaml `vocabularies.status`, verbatim. */
export const STATUS_DEFINITION: Record<OrgStatus, string> = {
  active: "Shipped and in use.",
  development: "Substantive code exists; not yet complete or launched.",
  planned: "Specified or intended; no implementation.",
};

/**
 * The role a product plays in the ecosystem — never a synonym for status.
 *
 *   foundation    composed by other products (ARCHITECTURE.md §5, "platform")
 *   domain        a business product built on the foundations
 *   productivity  the planned productivity suite
 */
export type PortfolioRole = "foundation" | "domain" | "productivity";

export type PortfolioEntry = {
  /** Matches the slug of the product's page on qeet.in. */
  slug: string;
  name: string;
  /** The name without the "Qeet " prefix, for dense figures. */
  short: string;
  status: OrgStatus;
  role: PortfolioRole;
  /** For foundations: the capability other products compose it for. */
  capability?: string;
  /**
   * One line, from the product's Purpose in PRODUCT-PORTFOLIO.md. Absent for
   * planned products: the registry gives them a specification and a status,
   * not a purpose line, and the deck does not write one for them.
   */
  purpose?: string;
};

export const PORTFOLIO: readonly PortfolioEntry[] = [
  {
    slug: "qeet-id",
    name: "Qeet ID",
    short: "ID",
    status: "active",
    role: "foundation",
    capability: "Identity",
    purpose: "Passkeys-first identity and access. Qeet products sign in through it, over OIDC.",
  },
  {
    slug: "qeetrix",
    name: "Qeetrix",
    short: "Qeetrix",
    status: "active",
    role: "foundation",
    capability: "Interface",
    purpose: "The design system: accessible, token-driven React components and brand foundations.",
  },
  {
    slug: "qeet-notify",
    name: "Qeet Notify",
    short: "Notify",
    status: "active",
    role: "foundation",
    capability: "Communication",
    purpose: "Transactional notifications across email, SMS, WhatsApp, push, in-app and webhooks.",
  },
  {
    slug: "qeet-logs",
    name: "Qeet Logs",
    short: "Logs",
    status: "active",
    role: "foundation",
    capability: "Observability",
    purpose: "Privacy-first, identity-aware logs, metrics, traces and audit.",
  },
  {
    slug: "qeet-pay",
    name: "Qeet Pay",
    short: "Pay",
    status: "development",
    role: "domain",
    purpose: "India-first payments, billing and GST-compliant invoicing.",
  },
  {
    slug: "qeet-people",
    name: "Qeet People",
    short: "People",
    status: "development",
    role: "domain",
    purpose: "India-first HCM: core HR, leave, attendance and statutory payroll.",
  },
  {
    slug: "qeet-ai",
    name: "Qeet AI",
    short: "AI",
    status: "development",
    role: "domain",
    purpose: "The identity, memory, knowledge and agent-infrastructure layer for the suite.",
  },
  {
    slug: "qeet-news",
    name: "Qeet News",
    short: "News",
    status: "development",
    role: "domain",
    purpose: "AI-first news: cited, multi-perspective stories under human editorial oversight.",
  },
  { slug: "qeet-mail", name: "Qeet Mail", short: "Mail", status: "planned", role: "productivity" },
  { slug: "qeet-calendar", name: "Qeet Calendar", short: "Calendar", status: "planned", role: "productivity" },
  { slug: "qeet-contacts", name: "Qeet Contacts", short: "Contacts", status: "planned", role: "productivity" },
  { slug: "qeet-tasks", name: "Qeet Tasks", short: "Tasks", status: "planned", role: "productivity" },
  { slug: "qeet-drive", name: "Qeet Drive", short: "Drive", status: "planned", role: "productivity" },
  { slug: "qeet-chat", name: "Qeet Chat", short: "Chat", status: "planned", role: "productivity" },
  { slug: "qeet-meet", name: "Qeet Meet", short: "Meet", status: "planned", role: "productivity" },
];

/** Entries in one role, in portfolio order. */
export function byRole(role: PortfolioRole): PortfolioEntry[] {
  return PORTFOLIO.filter((entry) => entry.role === role);
}

/** One entry by slug. Throws, because a typo here is a slide naming nothing. */
export function entry(slug: string): PortfolioEntry {
  const found = PORTFOLIO.find((e) => e.slug === slug);
  if (!found) throw new Error(`No portfolio entry for "${slug}"`);
  return found;
}
