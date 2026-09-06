import { listPublishableInsights, listPublishableProducts, statusLabel } from "@/lib/content";
import { SITE_DESCRIPTION, SITE_NAME, SITE_ORIGIN } from "@/config/site";

export const dynamic = "force-static";

/**
 * llms.txt — a plain-text map of the site for AI crawlers and agents
 * (https://llmstxt.org). Generated from the same MDX content as the site
 * itself, so it never drifts: new products and insights appear automatically.
 *
 * Uses the PUBLISHABLE loaders, not the visible ones. This file is a
 * machine-readable surface, and demonstration content must never reach one —
 * an invented article quoted back as a Qeet Group claim is exactly the failure
 * the demo mechanism exists to prevent.
 *
 * Product status is included deliberately. An agent summarising this file
 * should not describe a planned product as though it were purchasable today.
 */
export async function GET() {
  const [products, insights] = await Promise.all([
    listPublishableProducts(),
    listPublishableInsights(),
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
        `- [${p.data.name}](${SITE_ORIGIN}/products/${p.slug}): ${p.data.oneLiner} (${p.data.sector} — ${statusLabel(p.data.status)})`,
    ),
    "",
    "## Technology",
    "",
    `- [Technology](${SITE_ORIGIN}/technology): The capabilities behind the portfolio`,
    `- [Ecosystem](${SITE_ORIGIN}/ecosystem): How the products relate to one another`,
    `- [Developers](${SITE_ORIGIN}/developers): Documentation, API reference and design system`,
    "",
    "## Company",
    "",
    `- [About](${SITE_ORIGIN}/company/about): Why Qeet Group exists and how it is organised`,
    `- [Principles](${SITE_ORIGIN}/company/principles): The standards we work to`,
    `- [Leadership](${SITE_ORIGIN}/company/leadership): The people running the group`,
    `- [Careers](${SITE_ORIGIN}/careers): What we look for; open roles`,
    `- [Press](${SITE_ORIGIN}/company/press): Facts, logos and boilerplate`,
    `- [Contact](${SITE_ORIGIN}/contact): Partnerships, press, general enquiries`,
    "",
    "## Insights",
    "",
    ...insights.map(
      (i) => `- [${i.data.title}](${SITE_ORIGIN}/insights/${i.slug}): ${i.data.dek}`,
    ),
    "",
    "## Optional",
    "",
    `- [Insights RSS](${SITE_ORIGIN}/insights/rss.xml): Machine-readable feed`,
    `- [Legal — Privacy](${SITE_ORIGIN}/legal/privacy)`,
    `- [Legal — Terms](${SITE_ORIGIN}/legal/terms)`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
