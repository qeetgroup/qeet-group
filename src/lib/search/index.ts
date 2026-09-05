/**
 * Client-safe search primitives — types, label map, scoring function, and
 * the static-page seed list. No filesystem imports here. The server-only
 * `buildSearchIndex()` lives in lib/search-index.ts so this file stays
 * importable from client components (SearchBox, CommandPalette).
 */

export type SearchEntry = {
  type: "insight" | "product" | "technology" | "page";
  title: string;
  description: string;
  url: string;
  /** Lowercase, pre-joined haystack for case-insensitive substring matching. */
  haystack: string;
};

/**
 * Visible label for each entry type in result rows. Centralised so the
 * /search page and the ⌘K command palette stay in sync.
 */
export const SEARCH_TYPE_LABEL: Record<SearchEntry["type"], string> = {
  page: "Page",
  product: "Product",
  technology: "Technology",
  insight: "Insight",
};

/**
 * Score an entry against a lowercased query. Higher is better.
 * - title.startsWith(q)  → 100  (best — likely the intent)
 * - title.includes(q)    →  60
 * - description match    →  30
 * - body match           →  10
 * - no match             →   0
 */
export function scoreEntry(entry: SearchEntry, q: string): number {
  if (!q) return 0;
  const title = entry.title.toLowerCase();
  if (title.startsWith(q)) return 100;
  if (title.includes(q)) return 60;
  if (entry.description.toLowerCase().includes(q)) return 30;
  if (entry.haystack.includes(q)) return 10;
  return 0;
}

export const STATIC_PAGES: ReadonlyArray<Omit<SearchEntry, "haystack">> = [
  {
    type: "page",
    title: "Products",
    description: "The Qeet Group portfolio, grouped by what each product does.",
    url: "/products",
  },
  {
    type: "page",
    title: "Ecosystem",
    description: "How the products relate to one another.",
    url: "/ecosystem",
  },
  {
    type: "page",
    title: "Technology",
    description: "The capabilities behind the portfolio.",
    url: "/technology",
  },
  {
    type: "page",
    title: "Insights",
    description: "Perspectives, engineering, research and announcements.",
    url: "/insights",
  },
  {
    type: "page",
    title: "About Qeet Group",
    description: "Why Qeet Group exists and how it is organised.",
    url: "/company/about",
  },
  {
    type: "page",
    title: "Principles",
    description: "The standards we hold ourselves to.",
    url: "/company/principles",
  },
  {
    type: "page",
    title: "Leadership",
    description: "The people running the group.",
    url: "/company/leadership",
  },
  {
    type: "page",
    title: "Careers",
    description: "What we look for. Open roles.",
    url: "/careers",
  },
  {
    type: "page",
    title: "Developers",
    description: "Documentation, API reference and the design system.",
    url: "/developers",
  },
  {
    type: "page",
    title: "Press",
    description: "Brand assets, facts and press contact.",
    url: "/company/press",
  },
  {
    type: "page",
    title: "Contact",
    description: "Partnerships, press, general enquiries.",
    url: "/contact",
  },
];
