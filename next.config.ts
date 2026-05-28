import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    // Wrap client-side navigations in document.startViewTransition() where
    // the browser supports it; degrades to a normal nav elsewhere. Pairs
    // with the @view-transition CSS rule for hard navs.
    viewTransition: true,
  },
};

export default nextConfig;
