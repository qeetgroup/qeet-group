import { listPublishableInsights } from "@/lib/content";
import { SITE_DESCRIPTION, SITE_NAME, SITE_ORIGIN } from "@/config/site";

export const dynamic = "force-static";

/**
 * The insights feed.
 *
 * Uses the PUBLISHABLE loader, not the visible one. A feed item is pulled into
 * readers and aggregators and cannot be recalled by changing an environment
 * variable, so demonstration content must never enter it — in any mode.
 *
 * Every URL here is /insights/*. The previous version emitted /newsroom/*,
 * which now 308s: a feed full of redirects still works, but it makes every
 * subscriber's client take two round trips per item forever.
 */
const escapeXml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export async function GET() {
  const insights = await listPublishableInsights();

  const items = insights
    .map((p) => {
      const url = `${SITE_ORIGIN}/insights/${p.slug}`;
      return `    <item>
      <title>${escapeXml(p.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(p.data.date).toUTCString()}</pubDate>
      <category>${escapeXml(p.data.topic)}</category>
      <description>${escapeXml(p.data.dek)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)} — Insights</title>
    <link>${SITE_ORIGIN}/insights</link>
    <atom:link href="${SITE_ORIGIN}/insights/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
