import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Fraunces, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo/structured-data";
import { CommandPaletteShell } from "@/components/sections/CommandPaletteShell";
import { listProductSummaries } from "@/lib/content";

/*
 * Type system:
 *   • Display / headings → Fraunces (expressive variable serif — editorial-premium)
 *   • Body               → Cal Sans Text (self-hosted; same body face as the Qeet products)
 *   • UI / controls      → Cal Sans UI (the UI-optimised cut)
 *   • Mono               → Geist Mono (technical detail)
 * Serif display + the products' body face: premium headlines, consistent body.
 * Each role resolves to its own CSS variable (see globals.css @theme inline), so
 * swapping any face is a one-line change here.
 */
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  fallback: ["ui-serif", "Georgia", "serif"],
});

const body = localFont({
  variable: "--font-body",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  src: [
    { path: "./fonts/CalSansText-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/CalSansText-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/CalSansText-SemiBold.woff2", weight: "600", style: "normal" },
  ],
});

const ui = localFont({
  variable: "--font-ui",
  display: "swap",
  preload: false,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  src: [
    { path: "./fonts/CalSansUI-UIRegular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/CalSansUI-UIMedium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/CalSansUI-UISemiBold.woff2", weight: "600", style: "normal" },
  ],
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Qeet Group — Question, Explore, Envision, Transform",
    template: "%s — Qeet Group",
  },
  description:
    "Qeet Group is a multi-company holding building software products on one identity graph — identity, design systems, observability, people, notifications, and payments.",
  metadataBase: new URL("https://qeet.in"),
  applicationName: "Qeet Group",
  category: "technology",
  publisher: "Qeet Group",
  keywords: [
    "Qeet Group",
    "holding company",
    "identity platform",
    "design systems",
    "observability",
    "notification infrastructure",
    "payments",
  ],
  formatDetection: { telephone: false },
  // Canonicals are set per page (every route owns its own path); only the
  // RSS alternate is site-wide. A layout-level canonical would silently
  // attach the homepage canonical to any future page that forgets its own.
  alternates: {
    types: {
      "application/rss+xml": [
        { url: "/newsroom/rss.xml", title: "Qeet Group — Newsroom" },
      ],
    },
  },
  manifest: "/manifest.webmanifest",
  // Declaring `icons` here disables Next's file-convention icon links, so all
  // of them must be listed. The theme-adaptive SVG is what modern browsers use
  // in the tab/bookmark bar (legible in light AND dark UI); the PNG from
  // app/icon.tsx is the fixed-dark raster Google's search favicon falls back to.
  icons: {
    icon: [
      { url: "/qeet-mark.svg", type: "image/svg+xml" },
      { url: "/icon", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    siteName: "Qeet Group",
    locale: "en_US",
    url: "https://qeet.in",
  },
  twitter: {
    card: "summary_large_image",
    site: "@qeetgroup",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FCFCFC" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
  colorScheme: "light dark",
};

/*
 * Sets the initial theme class on <html> before any paint, so users who chose
 * dark (or whose OS prefers dark) don't get a flash of the default light theme
 * on first render. Runs synchronously, before React hydrates. The localStorage
 * key is the same one ThemeToggle writes to.
 */
const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(t===null&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  // Single source of truth for the chrome's product links — scales with the
  // portfolio (add an MDX product and it appears in the nav + footer).
  const products = await listProductSummaries();
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${ui.variable} ${mono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </head>
      <body className="flex min-h-full flex-col bg-canvas text-ink">
        <a
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-50 focus-visible:rounded-sm focus-visible:bg-ink focus-visible:px-3 focus-visible:py-2 focus-visible:text-body-s focus-visible:text-canvas"
        >
          Skip to content
        </a>
        <Nav products={products} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer products={products} />
        <CommandPaletteShell />
        {plausibleDomain && (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
