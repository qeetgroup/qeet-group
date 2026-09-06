/**
 * ============================================================================
 * Demonstration content
 * ============================================================================
 *
 * The site ships structure that real content has not caught up to yet — an
 * insights hub with three articles in it, a careers page with no open roles.
 * Demonstration content fills those shapes so the design can be judged, and
 * so replacing it later is a content edit rather than a redesign.
 *
 * The danger is obvious: a demo article is indistinguishable from a real one
 * the moment it is indexed, linked or screenshotted. A corporate site making a
 * claim it cannot support is a materially worse outcome than an empty section,
 * so demo content is fenced in three ways at once rather than by convention:
 *
 *   1. VISIBLY LABELLED. Every demo document renders a DemoBadge. A reader
 *      always knows.
 *   2. EXCLUDED FROM MACHINE SURFACES. Never in sitemap.xml, RSS or JSON-LD,
 *      in any mode — those are the surfaces that outlive the page and get
 *      quoted back at you.
 *   3. OFF BY DEFAULT. Production shows nothing marked demo unless
 *      NEXT_PUBLIC_CONTENT_MODE is explicitly set to "demo".
 *
 * Rule 2 holds even in demo mode, which is the important one. Rules 1 and 3
 * protect a human reader; rule 2 protects everyone the content reaches after
 * it leaves the page.
 */

export type ContentMode = "verified" | "demo";

/**
 * `verified` unless explicitly opted out of. Defaulting the other way would
 * mean a missing env var on a production deploy silently publishes invented
 * content — the failure has to land on the safe side.
 */
export const CONTENT_MODE: ContentMode =
  process.env.NEXT_PUBLIC_CONTENT_MODE === "demo" ? "demo" : "verified";

/** Anything loaded from MDX that can be flagged as demonstration content. */
type Demoable = { data: { demo?: boolean } };

/** Should this document be rendered at all in the current mode? */
export function isVisible(doc: Demoable): boolean {
  return CONTENT_MODE === "demo" || doc.data.demo !== true;
}

/** Filter a collection for rendering. */
export function visibleOnly<T extends Demoable>(docs: T[]): T[] {
  return docs.filter(isVisible);
}

/**
 * Filter a collection for sitemap, RSS and structured data.
 *
 * Deliberately NOT the same function as `visibleOnly`. They agree in verified
 * mode and diverge in demo mode, and that divergence is the whole point — the
 * one place it would be tempting to reuse `visibleOnly` is the one place doing
 * so would publish invented content to a machine-readable surface.
 */
export function publishableOnly<T extends Demoable>(docs: T[]): T[] {
  return docs.filter((d) => d.data.demo !== true);
}
