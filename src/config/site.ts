/**
 * Central site configuration — the single source of truth for identity,
 * origin, and chrome-level constants. Everything that used to be duplicated
 * across sitemap/robots/structured-data/rss reads from here.
 */

/**
 * Canonical origin. `NEXT_PUBLIC_SITE_ORIGIN` overrides for previews
 * (documented in README); production always resolves to https://qeet.in.
 */
export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_ORIGIN?.replace(/\/$/, "") || "https://qeet.in";

export const SITE_NAME = "Qeet Group";

export const SITE_TITLE = "Qeet Group — Question, Explore, Envision, Transform";

export const SITE_DESCRIPTION =
  "Qeet Group is a multi-company holding building software products on one identity graph — identity, design systems, observability, people, notifications, and payments.";

export const SITE_SLOGAN = "Question. Explore. Envision. Transform.";

export const FOUNDING_YEAR = "2026";

export const TWITTER_HANDLE = "@qeetgroup";

/** Contact addresses surfaced on /contact, /press, and in Organization JSON-LD. */
export const CONTACT = {
  partnerships: "partnerships@qeet.in",
  press: "press@qeet.in",
  support: "support@qeet.in",
} as const;

/** Primary nav links (product links are injected from MDX content). */
export const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/newsroom", label: "Newsroom" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
] as const;

/** Build an absolute URL on the canonical origin from a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}
