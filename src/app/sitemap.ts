import type { MetadataRoute } from "next";
import { listPublishableInsights, listPublishableProducts } from "@/lib/content";
import { SITE_ORIGIN } from "@/config/site";

/**
 * The sitemap is a MACHINE SURFACE, so it uses the publishable loaders rather
 * than the visible ones. Demonstration content is excluded here in every mode,
 * including demo mode — a demo article that gets indexed outlives the preview
 * it was built for, and there is no way to retract it from a search index by
 * changing an environment variable.
 *
 * Routes that only redirect are absent by construction: listing a 308 in a
 * sitemap asks a crawler to spend budget discovering that the page moved.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: Array<{ path: string; changeFreq: "monthly" | "weekly" | "yearly" }> = [
    { path: "", changeFreq: "weekly" },
    { path: "/products", changeFreq: "monthly" },
    { path: "/ecosystem", changeFreq: "monthly" },
    { path: "/technology", changeFreq: "monthly" },
    { path: "/insights", changeFreq: "weekly" },
    { path: "/company/about", changeFreq: "monthly" },
    { path: "/company/principles", changeFreq: "monthly" },
    { path: "/company/leadership", changeFreq: "monthly" },
    { path: "/company/press", changeFreq: "monthly" },
    { path: "/company/now", changeFreq: "weekly" },
    { path: "/careers", changeFreq: "monthly" },
    { path: "/developers", changeFreq: "monthly" },
    { path: "/contact", changeFreq: "yearly" },
    { path: "/search", changeFreq: "yearly" },
    { path: "/legal/privacy", changeFreq: "yearly" },
    { path: "/legal/terms", changeFreq: "yearly" },
  ];

  const [products, insights] = await Promise.all([
    listPublishableProducts(),
    listPublishableInsights(),
  ]);

  return [
    ...staticRoutes.map((r) => ({
      url: `${SITE_ORIGIN}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFreq,
      priority: r.path === "" ? 1.0 : 0.7,
    })),
    ...products.map((p) => ({
      url: `${SITE_ORIGIN}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      // Available products rank above planned ones. A planned product page is
      // real and should be findable, but it is not what a search result for
      // "Qeet" should surface first.
      priority: p.data.status === "available" ? 0.9 : 0.6,
    })),
    ...insights.map((i) => ({
      url: `${SITE_ORIGIN}/insights/${i.slug}`,
      lastModified: new Date(i.data.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
