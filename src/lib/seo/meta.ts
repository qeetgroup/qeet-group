import type { Metadata } from "next";
import { SITE_NAME, TWITTER_HANDLE } from "@/config/site";

/**
 * Central page-metadata builder. Guarantees every page ships a per-page
 * canonical URL (Next resolves the relative path against `metadataBase`)
 * plus consistent OpenGraph/Twitter fields — the title template in the
 * root layout still applies.
 */
export function buildPageMetadata(args: {
  title: string;
  description: string;
  /** Site-relative canonical path, e.g. "/about" or "/newsroom/hello". */
  path: string;
  ogType?: "website" | "article";
  /** Only meaningful when ogType is "article". */
  article?: { publishedTime: string; authors?: string[] };
}): Metadata {
  const { title, description, path, ogType = "website", article } = args;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: ogType,
      ...(ogType === "article" && article
        ? { publishedTime: article.publishedTime, authors: article.authors }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      title,
      description,
    },
  };
}
