import { listPosts } from "@/lib/content";

const SITE_ORIGIN = "https://qeet.in";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const dynamic = "force-static";

export async function GET() {
  const posts = await listPosts();
  const updated = posts[0]?.data.date ?? new Date().toISOString();

  const items = posts
    .map((p) => {
      const url = `${SITE_ORIGIN}/newsroom/${p.slug}`;
      const pubDate = new Date(p.data.date).toUTCString();
      return `
    <item>
      <title>${escapeXml(p.data.title.replace(/\.$/, ""))}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(p.data.category)}</category>
      <description>${escapeXml(p.data.dek)}</description>${
        p.data.author ? `\n      <author>noreply@qeet.in (${escapeXml(p.data.author)})</author>` : ""
      }
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Qeet Group — Newsroom</title>
    <link>${SITE_ORIGIN}/newsroom</link>
    <atom:link href="${SITE_ORIGIN}/newsroom/rss.xml" rel="self" type="application/rss+xml" />
    <description>Announcements and milestones from Qeet Group and its companies.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date(updated).toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
