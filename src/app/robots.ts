import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // A data file for the client-side search UI, not a page — crawling it
          // spends budget on ~60 KB of text already indexed at its real URLs.
          "/search-index.json",
          // Internal token reference. Also carries a noindex.
          "/design",
          // The corporate deck. Also carries a noindex. A presentation is
          // pitched at a room on a date; indexed, it outlives both and gets
          // quoted back long after its status claims have moved on.
          "/presentation",
        ],
      },
    ],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    host: SITE_ORIGIN,
  };
}
