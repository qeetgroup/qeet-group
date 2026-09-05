/**
 * Central site configuration — the single source of truth for identity,
 * origin, and chrome-level constants. Everything that used to be duplicated
 * across sitemap/robots/structured-data/rss reads from here.
 *
 * Navigation lives in ./nav.ts, not here — it grew past a flat list of links
 * once the mega menu arrived.
 */

/**
 * Canonical origin. `NEXT_PUBLIC_SITE_ORIGIN` overrides for previews
 * (documented in README); production always resolves to https://qeet.in.
 */
export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_ORIGIN?.replace(/\/$/, "") || "https://qeet.in";

export const SITE_NAME = "Qeet Group";

export const SITE_TITLE = "Qeet Group — one organisation, one ecosystem";

/**
 * The positioning line. Deliberately no longer "a multi-company holding":
 * holding reads financial and small, and it undersells what the portfolio
 * actually is. Every product-facing claim here is verifiable from
 * qeet-context/ORGANIZATION.md and PRODUCT-PORTFOLIO.md.
 */
export const SITE_DESCRIPTION =
  "Qeet Group is a technology organisation building a connected ecosystem of products — identity, payments, people, communications, observability and intelligence — on shared identity and design foundations.";

/** Q·E·E·T. The organisation's published acronym, not a backronym. */
export const SITE_SLOGAN = "Question. Explore. Envision. Transform.";

/**
 * 2025, not 2026. The GitHub organisation records a creation date of
 * 2025-01-19 (qeet-context/ORGANIZATION.md, verified against the GitHub API);
 * the site previously said 2026 in three places with no source behind it.
 */
export const FOUNDING_YEAR = "2025";

export const TWITTER_HANDLE = "@qeetgroup";

/** Contact addresses surfaced on /contact, /company/press, and in Organization JSON-LD. */
export const CONTACT = {
  partnerships: "partnerships@qeet.in",
  press: "press@qeet.in",
  support: "support@qeet.in",
  security: "security@qeet.in",
} as const;

/**
 * Organisation-level properties — the other hosts Qeet Group operates, defined
 * in qeet-context/DOMAIN.md. The footer surfaces them because a visitor
 * looking for documentation or an API reference should not have to guess the
 * hostname.
 *
 * All four are listed, but only the reachable ones render as LINKS — see
 * config/live-hosts.ts. `apis.qeet.in` is currently NXDOMAIN and `ui.qeet.in`
 * 404s at its root, so both appear as plain text with their status rather than
 * as links that go nowhere.
 *
 * Naming them anyway is deliberate: an engineer who knows the API portal is
 * coming is better served than one who is told nothing, and it costs nothing
 * to be straight about which are up.
 */
export const ORG_PROPERTIES = [
  { href: "https://qeet.in", label: "qeet.in", description: "Organisation" },
  { href: "https://docs.qeet.in", label: "docs.qeet.in", description: "Documentation" },
  { href: "https://apis.qeet.in", label: "apis.qeet.in", description: "API reference" },
  { href: "https://ui.qeet.in", label: "ui.qeet.in", description: "Design system" },
] as const;

/** Build an absolute URL on the canonical origin from a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}
