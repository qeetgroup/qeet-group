import { listMemos, listPosts, listProducts } from "@/lib/content";
import { SITE_DESCRIPTION, SITE_NAME, SITE_ORIGIN } from "@/config/site";

export const dynamic = "force-static";

/**
 * llms.txt — a plain-text map of the site for AI crawlers and agents
 * (https://llmstxt.org). Generated from the same MDX content as the site
 * itself, so it never drifts: new products and posts appear automatically.
 */
export async function GET() {
  const [products, posts, memos] = await Promise.all([
    listProducts(),
    listPosts(),
    listMemos(),
  ]);

  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "## Products",
    "",
    ...products.map(
      (p) =>
        `- [${p.data.name}](${SITE_ORIGIN}/products/${p.slug}): ${p.data.tagline} (${p.data.sector} — ${p.data.stage})`,
    ),
    "",
    "## Company",
    "",
    `- [About](${SITE_ORIGIN}/about): Why Qeet Group exists, how we work, our principles`,
    `- [Team](${SITE_ORIGIN}/team): The people running the group`,
    `- [Careers](${SITE_ORIGIN}/careers): What we look for; open roles`,
    `- [Press kit](${SITE_ORIGIN}/press): Facts, logos, and boilerplate`,
    `- [FAQ](${SITE_ORIGIN}/faq): Common questions, answered`,
    `- [Contact](${SITE_ORIGIN}/contact): Partnerships, press, general inquiries`,
    "",
    "## Newsroom",
    "",
    ...posts.map(
      (p) => `- [${p.data.title}](${SITE_ORIGIN}/newsroom/${p.slug}): ${p.data.dek}`,
    ),
    "",
    "## Memos",
    "",
    ...memos.map(
      (m) => `- [${m.data.title}](${SITE_ORIGIN}/memos/${m.slug}): ${m.data.dek}`,
    ),
    "",
    "## Optional",
    "",
    `- [Newsroom RSS](${SITE_ORIGIN}/newsroom/rss.xml): Machine-readable feed of announcements`,
    `- [Legal — Privacy](${SITE_ORIGIN}/legal/privacy)`,
    `- [Legal — Terms](${SITE_ORIGIN}/legal/terms)`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
