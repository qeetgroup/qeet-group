import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "src", "content");

export type CompanyFrontmatter = {
  name: string;
  tagline: string;
  sector: string;
  stage: string;
  founded: string;
  externalUrl: string;
  description: string;
};

export type PostFrontmatter = {
  title: string;
  date: string;
  category: string;
  dek: string;
  author?: string;
};

export type LoadedCompany = {
  slug: string;
  data: CompanyFrontmatter;
  content: string;
};

export type LoadedPost = {
  slug: string;
  data: PostFrontmatter;
  content: string;
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

export const loadCompany = (slug: string): Promise<LoadedCompany | null> =>
  readMdx<CompanyFrontmatter>("companies", slug);

export const listCompanies = (): Promise<LoadedCompany[]> =>
  listMdx<CompanyFrontmatter>("companies");

export async function loadPost(slug: string): Promise<LoadedPost | null> {
  const item = await readMdx<PostFrontmatter>("newsroom", slug);
  if (!item) return null;
  return {
    ...item,
    data: { ...item.data, date: normalizeDate(item.data.date) },
  };
}

export async function listPosts(): Promise<LoadedPost[]> {
  const items = await listMdx<PostFrontmatter>("newsroom");
  return items
    .map((item) => ({
      ...item,
      data: { ...item.data, date: normalizeDate(item.data.date) },
    }))
    .sort((a, b) => b.data.date.localeCompare(a.data.date));
}
