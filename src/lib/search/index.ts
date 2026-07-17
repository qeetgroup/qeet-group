/**
 * Client-safe search primitives — types, label map, scoring function, and
 * the static-page seed list. No filesystem imports here. The server-only
 * `buildSearchIndex()` lives in lib/search-index.ts so this file stays
 * importable from client components (SearchBox, CommandPalette).
 */

export type SearchEntry = {
  type: "post" | "memo" | "product" | "page";
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
  post: "Newsroom",
  memo: "Memo",
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
    title: "About",
    description: "Why Qeet Group exists, how we work, our principles.",
    url: "/about",
  },
  {
    type: "page",
    title: "Products",
    description: "Qeet Group products. One philosophy. Many products.",
    url: "/products",
  },
  {
    type: "page",
    title: "Newsroom",
    description: "Announcements and milestones from Qeet Group.",
    url: "/newsroom",
  },
  {
    type: "page",
    title: "Memos",
    description: "Long-form notes from the Qeet Group team.",
    url: "/memos",
  },
  {
    type: "page",
    title: "Careers",
    description: "What we look for. Open roles.",
    url: "/careers",
  },
  {
    type: "page",
    title: "Contact",
    description: "Partnerships, press, general inquiries.",
    url: "/contact",
  },
  {
    type: "page",
    title: "Press",
    description: "Brand assets and press contact.",
    url: "/press",
  },
  {
    type: "page",
    title: "FAQ",
    description:
      "Frequently asked questions — what we back, how we work, whether we take outside capital.",
    url: "/faq",
  },
  {
    type: "page",
    title: "Now",
    description: "What Qeet Group is focused on right now.",
    url: "/now",
  },
];
