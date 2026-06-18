import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    // Wrap client-side navigations in document.startViewTransition() where
    // the browser supports it; degrades to a normal nav elsewhere. Pairs
    // with the @view-transition CSS rule for hard navs.
    viewTransition: true,
  },
  // The product showcase moved from /companies to /products (Qeet Group ships
  // products). Permanent (308) redirects preserve inbound links and SEO equity
  // from the old paths.
  async redirects() {
    return [
      { source: "/companies", destination: "/products", permanent: true },
      { source: "/companies/:slug", destination: "/products/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
