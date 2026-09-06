import type { NextConfig } from "next";
import { MEDIA_HOSTS } from "./src/config/media";

const nextConfig: NextConfig = {
  /*
   * Defaults to .next, exactly as before. The override exists so a production
   * build can be run WITHOUT evicting a `next dev` server that is using the
   * same directory — `next build` and `next dev` share .next, so building
   * while dev is running pulls dev's client chunks out from under the browser
   * and every client-side navigation fails with "Failed to fetch".
   *
   *   NEXT_DIST_DIR=.next-audit bun run build
   *
   * No effect on a normal build or on the deployed output.
   */
  distDir: process.env.NEXT_DIST_DIR || ".next",
  reactCompiler: true,
  experimental: {
    // Wrap client-side navigations in document.startViewTransition() where
    // the browser supports it; degrades to a normal nav elsewhere. Pairs
    // with the @view-transition CSS rule for hard navs.
    viewTransition: true,
  },

  images: {
    /*
     * Hosts come from the media registry rather than being listed here, so the
     * two cannot drift. Adding a source to the registry without allowing it
     * here fails at request time on whichever page happens to use it — which
     * might be a page nobody loads for weeks.
     */
    remotePatterns: MEDIA_HOSTS.map((hostname) => ({
      protocol: "https" as const,
      hostname,
    })),
    // AVIF first: roughly 20-30% smaller than WebP at equivalent quality, and
    // the fallback chain means nothing breaks where it is unsupported.
    formats: ["image/avif", "image/webp"],
    // Photography is graded to near-monochrome by .figure-qeet before it is
    // seen, so it tolerates more compression than full-colour imagery would.
    qualities: [60, 75, 90],
  },

  /*
   * ==========================================================================
   * The route reset
   * ==========================================================================
   *
   * All permanent (308), because these paths are not coming back. Three groups:
   *
   *   1. /companies/* → /products/*  — predates this work. Qeet Group ships
   *      products, not "companies".
   *   2. /newsroom + /memos → /insights — two thinly-populated sections merged
   *      into one that can carry editorial weight. Slugs do not collide
   *      between the two, so the merge is clean and every deep link survives.
   *   3. Loose top-level pages gathered under /company.
   *
   * The RSS path redirects too. Feed readers follow 308s and update their
   * stored URL, so existing subscribers are carried across rather than
   * silently stranded on a dead feed — which is what dropping the old path
   * would do, without anyone noticing for months.
   */
  async redirects() {
    return [
      { source: "/companies", destination: "/products", permanent: true },
      { source: "/companies/:slug", destination: "/products/:slug", permanent: true },

      // The flagship's slug was inconsistent with every other product.
      { source: "/products/qeetid", destination: "/products/qeet-id", permanent: true },

      { source: "/newsroom", destination: "/insights", permanent: true },
      { source: "/newsroom/rss.xml", destination: "/insights/rss.xml", permanent: true },
      { source: "/newsroom/:slug", destination: "/insights/:slug", permanent: true },
      { source: "/memos", destination: "/insights", permanent: true },
      { source: "/memos/:slug", destination: "/insights/:slug", permanent: true },

      { source: "/about", destination: "/company/about", permanent: true },
      { source: "/team", destination: "/company/leadership", permanent: true },
      { source: "/press", destination: "/company/press", permanent: true },
      { source: "/now", destination: "/company/now", permanent: true },
      { source: "/faq", destination: "/company/faq", permanent: true },
    ];
  },
};

export default nextConfig;
