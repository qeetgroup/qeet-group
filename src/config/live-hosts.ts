/**
 * ============================================================================
 * Which Qeet hosts actually resolve
 * ============================================================================
 *
 * The domain standard reserves a zone per product — `pay.qeet.in`,
 * `logs.qeet.in`, and so on — and reserving them early is deliberate policy.
 * But a reserved name is not a running site, and the two had quietly become
 * the same thing on this website: product frontmatter carried the intended
 * zone, and the template rendered it as a link.
 *
 * Checked on the date below, only three of the eleven hosts the site referenced
 * were reachable. Seven were NXDOMAIN — no DNS record at all — and `ui.qeet.in`
 * resolved but returned 404 at its root. A corporate site linking to eight dead
 * hosts is worse than one that links nowhere: a broken outbound link is visible
 * to every visitor who clicks it, and it undermines every other claim on the
 * page.
 *
 * So `externalUrl` in frontmatter now means "the zone this product will own",
 * which is true and useful, and this list decides whether it is rendered as a
 * LINK. Same discipline as config/metrics.ts: the assertion is separated from
 * the evidence for it, and the evidence carries a date.
 *
 * ---------------------------------------------------------------------------
 * Adding a host
 * ---------------------------------------------------------------------------
 * Confirm it serves a real page, add it here, update the date. The site starts
 * linking to it everywhere at once — product pages, the footer properties row
 * and the developer hub all read from this.
 */

export const HOSTS_VERIFIED_ON = "2026-09-06";

/**
 * Verified reachable and serving content. Deliberately conservative:
 * `ui.qeet.in` has DNS and responds, but 404s at its root, so it is absent —
 * "the host exists" is not the bar, "a visitor who clicks this arrives
 * somewhere" is.
 */
export const LIVE_HOSTS: readonly string[] = ["qeet.in", "id.qeet.in", "docs.qeet.in"];

function hostOf(url: string): string | null {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

/** Is this URL safe to render as a link today? */
export function isLive(url: string | undefined): boolean {
  if (!url) return false;
  const host = hostOf(url);
  return host !== null && LIVE_HOSTS.includes(host);
}
