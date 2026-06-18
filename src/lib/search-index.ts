import "server-only";
import { listProducts, listMemos, listPosts } from "./content";
import { STATIC_PAGES, type SearchEntry } from "./search";

/**
 * Server-only index builder. Reads MDX from disk (products, newsroom,
 * memos) and merges with the static-page seed. Kept apart from the
 * client-safe utilities in lib/search.ts because that file is imported
 * by client components and cannot transitively pull in node:fs.
 */
export async function buildSearchIndex(): Promise<SearchEntry[]> {
  const [products, posts, memos] = await Promise.all([
    listProducts(),
    listPosts(),
    listMemos(),
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
      description: p.data.description,
      url: `/products/${p.slug}`,
      haystack:
        `${p.data.name} ${p.data.tagline} ${p.data.sector} ${p.data.description} ${p.content}`.toLowerCase(),
    });
  }

  for (const p of posts) {
    entries.push({
      type: "post",
      title: p.data.title.replace(/\.$/, ""),
      description: p.data.dek,
      url: `/newsroom/${p.slug}`,
      haystack:
        `${p.data.title} ${p.data.category} ${p.data.dek} ${p.content}`.toLowerCase(),
    });
  }

  for (const m of memos) {
    entries.push({
      type: "memo",
      title: m.data.title.replace(/\.$/, ""),
      description: m.data.dek,
      url: `/memos/${m.slug}`,
      haystack: `${m.data.title} ${m.data.dek} ${m.content}`.toLowerCase(),
    });
  }

  return entries;
}
