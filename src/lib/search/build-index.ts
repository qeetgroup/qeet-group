import "server-only";
import { listInsights, listProducts, listTechnology, statusLabel } from "@/lib/content";
import { STATIC_PAGES, type SearchEntry } from "./index";

/**
 * Server-only index builder. Reads MDX from disk and merges with the
 * static-page seed. Kept apart from the client-safe utilities in ./index.ts
 * because that file is imported by client components and cannot transitively
 * pull in node:fs.
 *
 * Uses the VISIBLE loaders rather than the publishable ones — unlike the
 * sitemap, search is a surface a human is actively looking at, so if
 * demonstration content is being shown on the site it should be findable. The
 * demo badge on the destination page is what keeps it honest.
 */
export async function buildSearchIndex(): Promise<SearchEntry[]> {
  const [products, insights, technology] = await Promise.all([
    listProducts(),
    listInsights(),
    listTechnology(),
  ]);

  const entries: SearchEntry[] = [];

  for (const p of STATIC_PAGES) {
    entries.push({
      ...p,
      haystack: `${p.title} ${p.description}`.toLowerCase(),
    });
  }

  for (const p of products) {
    entries.push({
      type: "product",
      title: p.data.name,
      // Lifecycle rides along in the description, so a result for a planned
      // product cannot be mistaken for something available today — search
      // results get read far more carelessly than pages do.
      description: `${statusLabel(p.data.status)} · ${p.data.oneLiner}`,
      url: `/products/${p.slug}`,
      haystack:
        `${p.data.name} ${p.data.tagline} ${p.data.oneLiner} ${p.data.sector} ${p.data.description} ${p.content}`.toLowerCase(),
    });
  }

  for (const t of technology) {
    entries.push({
      type: "technology",
      title: t.data.title,
      description: t.data.dek,
      url: `/technology/${t.slug}`,
      haystack: `${t.data.title} ${t.data.eyebrow} ${t.data.dek} ${t.content}`.toLowerCase(),
    });
  }

  for (const i of insights) {
    entries.push({
      type: "insight",
      title: i.data.title.replace(/\.$/, ""),
      description: i.data.dek,
      url: `/insights/${i.slug}`,
      haystack:
        `${i.data.title} ${i.data.topic} ${i.data.dek} ${i.content}`.toLowerCase(),
    });
  }

  return entries;
}
