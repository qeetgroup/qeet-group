import { listCompanies, listMemos, listPosts } from "./content";

export type SearchEntry = {
  type: "post" | "memo" | "company" | "page";
  title: string;
  description: string;
  url: string;
  /** Lowercase, pre-joined haystack for case-insensitive substring matching. */
  haystack: string;
};

const STATIC_PAGES: ReadonlyArray<Omit<SearchEntry, "haystack">> = [
  {
    type: "page",
    title: "About",
    description: "Why Qeet Group exists, how we work, our principles.",
    url: "/about",
  },
  {
    type: "page",
    title: "Companies",
    description: "Qeet Group ventures. One philosophy. Many ventures.",
    url: "/companies",
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

export async function buildSearchIndex(): Promise<SearchEntry[]> {
  const [companies, posts, memos] = await Promise.all([
    listCompanies(),
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

  for (const c of companies) {
    entries.push({
      type: "company",
      title: c.data.name,
      description: c.data.description,
      url: `/companies/${c.slug}`,
      haystack:
        `${c.data.name} ${c.data.tagline} ${c.data.sector} ${c.data.description} ${c.content}`.toLowerCase(),
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
