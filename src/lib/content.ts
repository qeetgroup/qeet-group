import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "src", "content");

export type ProductFrontmatter = {
  name: string;
  tagline: string;
  sector: string;
  stage: string;
  founded: string;
  externalUrl: string;
  description: string;
  /** Display order across the home page and listing. Lower sorts first. */
  order?: number;
};

export type PostFrontmatter = {
  title: string;
  date: string;
  category: string;
  dek: string;
  author?: string;
};

export type LegalFrontmatter = {
  title: string;
  lastUpdated: string;
  description: string;
};

export type MemoFrontmatter = {
  title: string;
  date: string;
  dek: string;
  author?: string;
};

export type LoadedProduct = {
  slug: string;
  data: ProductFrontmatter;
  content: string;
};

export type LoadedPost = {
  slug: string;
  data: PostFrontmatter;
  content: string;
  /** Estimated reading time in whole minutes (220 wpm). Min 1. */
  readingTime: number;
};

function computeReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export type LoadedLegal = {
  slug: string;
  data: LegalFrontmatter;
  content: string;
};

export type LoadedMemo = {
  slug: string;
  data: MemoFrontmatter;
  content: string;
  readingTime: number;
};

async function readMdx<T>(
  subdir: string,
  slug: string,
): Promise<{ slug: string; data: T; content: string } | null> {
  const filePath = path.join(CONTENT_ROOT, subdir, `${slug}.mdx`);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(raw);
    return { slug, data: data as T, content };
  } catch {
    return null;
  }
}

async function listMdx<T>(
  subdir: string,
): Promise<Array<{ slug: string; data: T; content: string }>> {
  const dirPath = path.join(CONTENT_ROOT, subdir);
  let files: string[];
  try {
    files = await fs.readdir(dirPath);
  } catch {
    return [];
  }
  const slugs = files
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
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

export async function listProducts(): Promise<LoadedProduct[]> {
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
}

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
