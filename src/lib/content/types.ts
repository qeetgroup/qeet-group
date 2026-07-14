/**
 * Frontmatter and loaded-document shapes for every MDX content collection.
 * Pure types — importable from client and server code alike.
 */

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

/**
 * Compact, serializable product list — the single source of truth for chrome
 * (nav mega-panel, footer) and the identity graph. Derived from the MDX files,
 * so the portfolio scales automatically: drop in a new product and it appears
 * everywhere, with no hardcoded count or list to maintain.
 */
export type ProductSummary = {
  slug: string;
  name: string;
  /** Short node/badge label, e.g. "Qeet ID" → "ID", "Qeetrix" stays "Qeetrix". */
  short: string;
  sector: string;
  href: string;
  statusLabel: string;
  live: boolean;
};
