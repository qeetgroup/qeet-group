/**
 * Typed builders for the JSON-LD documents emitted on each page. Kept narrow
 * on purpose — only fields the site actually populates today are typed.
 * Render with <JsonLd> from "@/components/seo/JsonLd".
 */

import { SOCIAL_PLATFORMS } from "./social";

export const SITE_ORIGIN = "https://qeet.in";

type WithContext<T> = { "@context": "https://schema.org" } & T;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Qeet Group",
    legalName: "Qeet Group",
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}/qeet-logo-light.svg`,
    description:
      "A multi-company holding built on a single philosophy: that meaningful progress begins with the right question.",
    slogan: "Question. Explore. Envision. Transform.",
    foundingDate: "2026",
    areaServed: "IN",
    knowsAbout: [
      "Identity and access management",
      "Design systems",
      "Log management and observability",
      "Human capital management",
      "Notification infrastructure",
      "Payments and billing",
    ],
    sameAs: SOCIAL_PLATFORMS.map((p) => p.url),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "partnerships",
        email: "partnerships@qeet.in",
        availableLanguage: ["English"],
      },
      {
        "@type": "ContactPoint",
        contactType: "press",
        email: "press@qeet.in",
        availableLanguage: ["English"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@qeet.in",
        availableLanguage: ["English"],
      },
    ],
  } as const;
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Qeet Group",
    url: SITE_ORIGIN,
  } as const;
}

export function articleSchema(args: {
  slug: string;
  title: string;
  dek: string;
  date: string;
  author?: string;
  /** Path under SITE_ORIGIN where the article lives, e.g. /newsroom, /memos. */
  section?: "newsroom" | "memos";
}): WithContext<Record<string, unknown>> {
  const section = args.section ?? "newsroom";
  const url = `${SITE_ORIGIN}/${section}/${args.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.title.replace(/\.$/, ""),
    description: args.dek,
    datePublished: args.date,
    dateModified: args.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    image: `${url}/opengraph-image`,
    author: {
      "@type": args.author ? "Person" : "Organization",
      name: args.author ?? "Qeet Group",
    },
    publisher: {
      "@type": "Organization",
      name: "Qeet Group",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_ORIGIN}/qeet-logo-light.svg`,
      },
    },
  };
}

export function productsListSchema(
  products: Array<{ slug: string; name: string; description: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Qeet Group products",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_ORIGIN}/products/${p.slug}`,
      name: p.name,
      description: p.description,
    })),
  } as const;
}

export function productSchema(args: {
  slug: string;
  name: string;
  description: string;
  sector: string;
  externalUrl: string;
}): WithContext<Record<string, unknown>> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: args.name,
    description: args.description,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: args.sector,
    operatingSystem: "Web",
    url: args.externalUrl,
    mainEntityOfPage: `${SITE_ORIGIN}/products/${args.slug}`,
    publisher: {
      "@type": "Organization",
      name: "Qeet Group",
      url: SITE_ORIGIN,
    },
  };
}

export function faqPageSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  } as const;
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_ORIGIN}${item.path}`,
    })),
  } as const;
}
