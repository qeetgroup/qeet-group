import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { publishableOnly, visibleOnly } from "@/config/content-mode";
import { statusLabel } from "./types";
import type {
  CompanyFrontmatter,
  InsightFrontmatter,
  LegalFrontmatter,
  LoadedCompany,
  LoadedInsight,
  LoadedLegal,
  LoadedProduct,
  LoadedTechnology,
  PortfolioCounts,
  ProductFrontmatter,
  ProductStatus,
  ProductSummary,
  TechnologyFrontmatter,
} from "./types";

const CONTENT_ROOT = path.join(process.cwd(), "src", "content");

function computeReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

type RawDoc = { slug: string; data: Record<string, unknown>; content: string };

/*
 * Disk reads are memoized per render pass with React.cache. listProducts()
 * alone is called from the root layout, the nav, the footer, the ecosystem
 * map, the sitemap, llms.txt, /products and generateStaticParams — without
 * this, the same MDX files get read and parsed a dozen times to render one
 * page. The cache is request-scoped, so editing content in dev still shows up
 * on the next render.
 *
 * Caching happens at the file/directory level rather than on the public
 * loaders, because readMdx is generic and cache() cannot preserve a type
 * parameter.
 */
const readMdxFile = cache(
  async (subdir: string, slug: string): Promise<RawDoc | null> => {
    const filePath = path.join(CONTENT_ROOT, subdir, `${slug}.mdx`);
    try {
      const raw = await fs.readFile(filePath, "utf-8");
      const { data, content } = matter(raw);
      return { slug, data: data as Record<string, unknown>, content };
    } catch {
      return null;
    }
  },
);

const listMdxSlugs = cache(async (subdir: string): Promise<string[]> => {
  try {
    const files = await fs.readdir(path.join(CONTENT_ROOT, subdir));
    return files.filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
});

async function readMdx<T>(
  subdir: string,
  slug: string,
): Promise<{ slug: string; data: T; content: string } | null> {
  const doc = await readMdxFile(subdir, slug);
  return doc ? { ...doc, data: doc.data as T } : null;
}

async function listMdx<T>(
  subdir: string,
): Promise<Array<{ slug: string; data: T; content: string }>> {
  const slugs = await listMdxSlugs(subdir);
  const items = await Promise.all(slugs.map((s) => readMdx<T>(subdir, s)));
  return items.filter((i): i is { slug: string; data: T; content: string } => i !== null);
}

/**
 * YAML's date type parses unquoted `2026-04-15` into a JS Date. Quoted dates
 * come through as strings. Normalize both into an ISO `YYYY-MM-DD` string so
 * downstream code can treat the field consistently.
 */
function normalizeDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "");
}

/* ==========================================================================
 * Products
 * ======================================================================= */

export const loadProduct = (slug: string): Promise<LoadedProduct | null> =>
  readMdx<ProductFrontmatter>("products", slug);

/**
 * Sorted by explicit `order`, then by status, then alphabetically.
 *
 * Status is the secondary key rather than the primary one so that the flagship
 * still leads by `order`, but a planned product can never float above a
 * shipped one by accident of alphabet — which is exactly the impression the
 * lifecycle system exists to prevent.
 */
const STATUS_RANK: Record<ProductStatus, number> = {
  available: 0,
  development: 1,
  planned: 2,
};

export const listProducts = cache(async (): Promise<LoadedProduct[]> => {
  const items = visibleOnly(await listMdx<ProductFrontmatter>("products"));
  return items.sort((a, b) => {
    const ao = a.data.order ?? Number.MAX_SAFE_INTEGER;
    const bo = b.data.order ?? Number.MAX_SAFE_INTEGER;
    if (ao !== bo) return ao - bo;
    const ar = STATUS_RANK[a.data.status] ?? 9;
    const br = STATUS_RANK[b.data.status] ?? 9;
    if (ar !== br) return ar - br;
    return a.data.name.localeCompare(b.data.name);
  });
});

/** Products that may appear in sitemap.xml and structured data. */
export const listPublishableProducts = cache(async (): Promise<LoadedProduct[]> =>
  publishableOnly(await listProducts()),
);

export const listProductSummaries = cache(async (): Promise<ProductSummary[]> => {
  const products = await listProducts();
  return products.map(({ slug, data }) => ({
    slug,
    name: data.name,
    short: data.name.replace(/^Qeet\s+/i, ""),
    oneLiner: data.oneLiner,
    sector: data.sector,
    group: data.group,
    href: `/products/${slug}`,
    status: data.status,
    statusLabel: statusLabel(data.status),
    // A planned product has nowhere to send anyone. Dropping the field here
    // means no component further downstream has to remember that rule.
    externalUrl: data.status === "planned" ? undefined : data.externalUrl,
  }));
});

/**
 * Counts for the metric band, derived from the collection rather than stated.
 * See config/metrics.ts for why that distinction is not pedantry.
 */
export const portfolioCounts = cache(async (): Promise<PortfolioCounts> => {
  const products = await listProducts();
  return {
    total: products.length,
    available: products.filter((p) => p.data.status === "available").length,
    development: products.filter((p) => p.data.status === "development").length,
    planned: products.filter((p) => p.data.status === "planned").length,
  };
});

/* ==========================================================================
 * Insights
 * ======================================================================= */

function hydrateInsight(item: {
  slug: string;
  data: InsightFrontmatter;
  content: string;
}): LoadedInsight {
  return {
    ...item,
    data: { ...item.data, date: normalizeDate(item.data.date) },
    readingTime: computeReadingTime(item.content),
  };
}

export async function loadInsight(slug: string): Promise<LoadedInsight | null> {
  const item = await readMdx<InsightFrontmatter>("insights", slug);
  return item ? hydrateInsight(item) : null;
}

export const listInsights = cache(async (): Promise<LoadedInsight[]> => {
  const items = visibleOnly(await listMdx<InsightFrontmatter>("insights"));
  return items.map(hydrateInsight).sort((a, b) => b.data.date.localeCompare(a.data.date));
});

/** Insights that may appear in RSS, sitemap.xml and Article structured data. */
export const listPublishableInsights = cache(async (): Promise<LoadedInsight[]> =>
  publishableOnly(await listInsights()),
);

/**
 * The hub's lead story. Prefers an explicit `featured: true`, falls back to
 * the most recent — so the hub is never empty and never depends on someone
 * remembering to move a flag.
 */
export async function leadInsight(): Promise<LoadedInsight | null> {
  const all = await listInsights();
  return all.find((i) => i.data.featured) ?? all[0] ?? null;
}

export async function listInsightsByTopic(topic: string): Promise<LoadedInsight[]> {
  const all = await listInsights();
  return all.filter((i) => i.data.topic.toLowerCase() === topic.toLowerCase());
}

export async function listInsightTopics(): Promise<string[]> {
  const all = await listInsights();
  return [...new Set(all.map((i) => i.data.topic))].sort();
}

/* ==========================================================================
 * Technology and company
 * ======================================================================= */

export const loadTechnology = (slug: string): Promise<LoadedTechnology | null> =>
  readMdx<TechnologyFrontmatter>("technology", slug);

export const listTechnology = cache(async (): Promise<LoadedTechnology[]> => {
  const items = visibleOnly(await listMdx<TechnologyFrontmatter>("technology"));
  return items.sort((a, b) => {
    const ao = a.data.order ?? Number.MAX_SAFE_INTEGER;
    const bo = b.data.order ?? Number.MAX_SAFE_INTEGER;
    if (ao !== bo) return ao - bo;
    return a.data.title.localeCompare(b.data.title);
  });
});

export const loadCompany = (slug: string): Promise<LoadedCompany | null> =>
  readMdx<CompanyFrontmatter>("company", slug);

export const listCompany = cache(async (): Promise<LoadedCompany[]> => {
  const items = visibleOnly(await listMdx<CompanyFrontmatter>("company"));
  return items.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
});

/* ==========================================================================
 * Legal
 * ======================================================================= */

export async function loadLegal(slug: string): Promise<LoadedLegal | null> {
  const item = await readMdx<LegalFrontmatter>("legal", slug);
  if (!item) return null;
  return {
    ...item,
    data: { ...item.data, lastUpdated: normalizeDate(item.data.lastUpdated) },
  };
}

export const listLegal = cache(async (): Promise<LoadedLegal[]> =>
  listMdx<LegalFrontmatter>("legal"),
);
