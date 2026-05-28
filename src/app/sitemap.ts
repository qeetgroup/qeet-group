import type { MetadataRoute } from "next";
import { listCompanies, listMemos, listPosts } from "@/lib/content";

const SITE_ORIGIN = "https://qeet.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: Array<{ path: string; changeFreq: "monthly" | "weekly" | "yearly" }> = [
    { path: "", changeFreq: "weekly" },
    { path: "/about", changeFreq: "monthly" },
    { path: "/team", changeFreq: "monthly" },
    { path: "/companies", changeFreq: "monthly" },
    { path: "/newsroom", changeFreq: "weekly" },
    { path: "/memos", changeFreq: "weekly" },
    { path: "/careers", changeFreq: "monthly" },
    { path: "/contact", changeFreq: "yearly" },
    { path: "/press", changeFreq: "monthly" },
    { path: "/faq", changeFreq: "monthly" },
    { path: "/now", changeFreq: "weekly" },
    { path: "/search", changeFreq: "yearly" },
    { path: "/legal/privacy", changeFreq: "yearly" },
    { path: "/legal/terms", changeFreq: "yearly" },
  ];

  const [companies, posts, memos] = await Promise.all([
    listCompanies(),
    listPosts(),
    listMemos(),
  ]);

  return [
    ...staticRoutes.map((r) => ({
      url: `${SITE_ORIGIN}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFreq,
      priority: r.path === "" ? 1.0 : 0.7,
    })),
    ...companies.map((c) => ({
      url: `${SITE_ORIGIN}/companies/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: `${SITE_ORIGIN}/newsroom/${p.slug}`,
      lastModified: new Date(p.data.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...memos.map((m) => ({
      url: `${SITE_ORIGIN}/memos/${m.slug}`,
      lastModified: new Date(m.data.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
