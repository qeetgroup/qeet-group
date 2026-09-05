import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import type {
  LegalFrontmatter,
  LoadedLegal,
  LoadedMemo,
  LoadedPost,
  LoadedProduct,
  MemoFrontmatter,
  PostFrontmatter,
  ProductFrontmatter,
  ProductSummary,
} from "./types";

const CONTENT_ROOT = path.join(process.cwd(), "src", "content");

function computeReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

type RawDoc = { slug: string; data: Record<string, unknown>; content: string };

/*
 * Disk reads are memoized per render pass with React.cache. listProducts() alone
 * is called from the root layout, ProofBand, ProductsBento, the sitemap,
 * llms.txt, /products and generateStaticParams — without this, the same six MDX
 * files get read and parsed a dozen times to render one page. The cache is
 * request-scoped, so editing content in dev still shows up on the next render.
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

export const loadProduct = (slug: string): Promise<LoadedProduct | null> =>
  readMdx<ProductFrontmatter>("products", slug);

export const listProducts = cache(async (): Promise<LoadedProduct[]> => {
  const items = await listMdx<ProductFrontmatter>("products");
  // Explicit `order` drives the home-page feature order and the listing.
  // Products without an order sort last, then alphabetically by name, so
  // the flagship leads rather than whatever the filesystem happens to return.
  return items.sort((a, b) => {
    const ao = a.data.order ?? Number.MAX_SAFE_INTEGER;
    const bo = b.data.order ?? Number.MAX_SAFE_INTEGER;
    if (ao !== bo) return ao - bo;
    return a.data.name.localeCompare(b.data.name);
  });
});

/**
 * Compact, serializable product list for chrome and the identity graph —
 * see ProductSummary in ./types.
 */
const STATUS_LABEL: Record<string, string> = {
  "Generally available": "Live",
  "Early access": "Early access",
  "Coming soon": "Coming soon",
};

export const listProductSummaries = cache(async (): Promise<ProductSummary[]> => {
  const products = await listProducts();
  return products.map(({ slug, data }) => ({
    slug,
    name: data.name,
    short: data.name.replace(/^Qeet\s+/i, ""),
    sector: data.sector,
    href: `/products/${slug}`,
    statusLabel: STATUS_LABEL[data.stage] ?? data.stage,
    live: data.stage === "Generally available",
  }));
});

export async function loadPost(slug: string): Promise<LoadedPost | null> {
  const item = await readMdx<PostFrontmatter>("newsroom", slug);
  if (!item) return null;
  return {
    ...item,
    data: { ...item.data, date: normalizeDate(item.data.date) },
    readingTime: computeReadingTime(item.content),
  };
}

export async function listPosts(): Promise<LoadedPost[]> {
  const items = await listMdx<PostFrontmatter>("newsroom");
  return items
    .map((item) => ({
      ...item,
      data: { ...item.data, date: normalizeDate(item.data.date) },
      readingTime: computeReadingTime(item.content),
    }))
    .sort((a, b) => b.data.date.localeCompare(a.data.date));
}

export async function loadLegal(slug: string): Promise<LoadedLegal | null> {
  const item = await readMdx<LegalFrontmatter>("legal", slug);
  if (!item) return null;
  return {
    ...item,
    data: { ...item.data, lastUpdated: normalizeDate(item.data.lastUpdated) },
  };
}

export async function loadMemo(slug: string): Promise<LoadedMemo | null> {
  const item = await readMdx<MemoFrontmatter>("memos", slug);
  if (!item) return null;
  return {
    ...item,
    data: { ...item.data, date: normalizeDate(item.data.date) },
    readingTime: computeReadingTime(item.content),
  };
}

export async function listMemos(): Promise<LoadedMemo[]> {
  const items = await listMdx<MemoFrontmatter>("memos");
  return items
    .map((item) => ({
      ...item,
      data: { ...item.data, date: normalizeDate(item.data.date) },
      readingTime: computeReadingTime(item.content),
    }))
    .sort((a, b) => b.data.date.localeCompare(a.data.date));
}
