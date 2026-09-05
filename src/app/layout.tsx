import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Fira_Code, Newsreader } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo/structured-data";
import { CommandPalette } from "@/components/sections/CommandPalette";
import { listInsightTopics, listProductSummaries } from "@/lib/content";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_ORIGIN,
  SITE_TITLE,
} from "@/config/site";

/*
 * ============================================================================
 * Type system
 * ============================================================================
 *
 *   Newsreader  editorial display type and major headings
 *   Qeet UI     navigation, controls, labels and compact headings
 *   Qeet Text   body copy
 *   Fira Code   data, metrics, timestamps
 *
 * The display face deliberately differs from the product UI. Qeet Group is a
 * corporate headquarters and an editorial publisher, not another interface in
 * the product suite; Newsreader gives its large statements a recognisable
 * institutional voice while Qeet UI keeps every functional surface familiar.
 *
 * ---------------------------------------------------------------------------
 * Why the files are copied in rather than imported from the package
 * ---------------------------------------------------------------------------
 * qeet.in is deliberately self-contained (see CLAUDE.md) — it does not consume
 * `@qeetrix/ui`, whose stylesheet also restyles every heading and button in the
 * host document and would fight this site's own token layer. Taking the faces
 * and matching Qeetrix's own @font-face weights exactly gets the shared
 * typography without inheriting a component library's opinions about the rest
 * of the page.
 *
 * next/font/local self-hosts and preloads them, so there is no third-party font
 * request and no layout shift on first paint. Every weight declared below is
 * preloaded at roughly 54KB, so the list is kept to what the site actually
 * sets — see globals.css for where each weight is used.
 */
const ui = localFont({
  variable: "--font-ui-face",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  /*
   * 400 for chrome, 500 for emphasis, 600 for headings. No 700 — `font-bold`
   * has zero call sites, and every weight declared here is preloaded at ~55KB,
   * so an unused one is pure cost on the critical path.
   */
  src: [
    { path: "./fonts/QeetUI-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/QeetUI-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/QeetUI-SemiBold.woff2", weight: "600", style: "normal" },
  ],
});

const body = localFont({
  variable: "--font-body-face",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  // 400 for body, 500 for emphasis — the only two the site sets.
  src: [
    { path: "./fonts/QeetText-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/QeetText-Medium.woff2", weight: "500", style: "normal" },
  ],
});

const display = Newsreader({
  subsets: ["latin"],
  variable: "--font-display-face",
  display: "swap",
  preload: true,
  fallback: ["Georgia", "Times New Roman", "serif"],
  weight: ["400", "500", "600"],
});

/** Qeetrix's mono. Google-hosted rather than vendored — it is not a Qeet face. */
const mono = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono-face",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "SFMono-Regular", "monospace"],
});

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  // Derived from SITE_ORIGIN so preview and staging deploys resolve their own
  // absolute URLs instead of silently emitting production canonicals.
  metadataBase: new URL(SITE_ORIGIN),
  applicationName: SITE_NAME,
  category: "technology",
  publisher: SITE_NAME,
  keywords: [
    "Qeet Group",
    "technology organisation",
    "identity platform",
    "design systems",
    "observability",
    "notification infrastructure",
    "payments",
    "product ecosystem",
  ],
  formatDetection: { telephone: false },
  // Canonicals are set per page (every route owns its own path); only the
  // RSS alternate is site-wide. A layout-level canonical would silently
  // attach the homepage canonical to any future page that forgets its own.
  alternates: {
    types: {
      "application/rss+xml": [
        { url: "/insights/rss.xml", title: "Qeet Group — Insights" },
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
  // Matches --color-canvas in each theme. Dark leads because it is the default.
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#101214" },
    { media: "(prefers-color-scheme: light)", color: "#FAFBFC" },
  ],
  colorScheme: "dark light",
};

/*
 * Dark is the default and needs no class, so this only has to act for visitors
 * who explicitly chose light: it adds `.light` before first paint so they don't
 * get a flash of dark. Runs synchronously, ahead of hydration. The localStorage
 * key is the one ThemeToggle writes to.
 *
 * It deliberately does NOT consult prefers-color-scheme. Dark is the brand
 * surface rather than a system-derived preference; the toggle is how you leave it.
 */
const themeInitScript = `(function(){try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.add('light')}catch(e){}})();`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  // Single source of truth for the chrome's product links — scales with the
  // portfolio (add an MDX product and it appears in the nav + footer).
  const [products, topics] = await Promise.all([
    listProductSummaries(),
    listInsightTopics(),
  ]);
  return (
    <html
      lang="en"
      className={`${display.variable} ${ui.variable} ${body.variable} ${mono.variable} h-full`}
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
        <Nav products={products} topics={topics} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer products={products} topics={topics} />
        <CommandPalette />
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
