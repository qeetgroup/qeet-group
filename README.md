# qeet.in

Marketing site for Qeet Group — a multi-company holding. Editorial design, MDX content, monochrome palette, dark mode, and per-page generated OG images.

## Stack

- **Next.js 16** (App Router) on **React 19** with the React Compiler
- **Tailwind v4** with a custom design-token palette in `globals.css`
- **MDX** via `next-mdx-remote` + `gray-matter` for companies, newsroom posts, and legal docs
- **Resend** for the contact form and newsletter
- **Plausible** for cookie-less analytics
- **Vitest** for unit tests

## Getting started

```bash
bun install
cp .env.example .env       # fill in only what you need; missing keys degrade gracefully
bun run dev                # http://localhost:3000
```

Other scripts:

```bash
bun run build       # production build
bun run start       # serve the production build
bun run lint        # eslint
bun run test        # vitest run (single pass)
bun run test:watch  # vitest in watch mode
```

Bun is the package manager and script runner; Next.js itself still builds and
runs on Node (Vercel-compatible).

## Environment

See `.env.example` for the full list. None are strictly required for local dev — Resend and Plausible are no-ops without their keys.

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Sends contact-form messages |
| `RESEND_AUDIENCE_ID` | Newsletter signups land in this audience |
| `CONTACT_FROM` / `CONTACT_TO` | From/To headers on contact emails |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Loads the Plausible script in production |
| `NEXT_PUBLIC_SITE_ORIGIN` | Override the canonical origin for previews |

## Adding content

### Companies (`src/content/companies/<slug>.mdx`)

```yaml
---
name: Qeet Two
tagline: A short claim.
sector: Industry & Focus
stage: In active development
founded: "2027"
externalUrl: https://two.qeet.in
order: 5
description: One-paragraph summary that appears in the listing and OG image.
---
```

Each company gets a route at `/companies/<slug>` and a generated OG image. `order` (lower sorts first) drives both the listing and which companies the home page features — the home page surfaces the first three. Companies without an `order` sort last, then alphabetically.

### Newsroom posts (`src/content/newsroom/<slug>.mdx`)

```yaml
---
title: Introducing Qeet Group.
date: "2026-04-15"
category: Group           # Group, Product, Hiring, etc. — drives the category filter
dek: A short standfirst.
author: The Qeet Group team   # optional
---
```

Reading time is computed from word count. Posts appear in the RSS feed at `/newsroom/rss.xml` and in client-side search.

### Legal documents (`src/content/legal/<slug>.mdx`)

```yaml
---
title: Privacy Policy
lastUpdated: "2026-05-28"
description: Meta description shown on the page and in search results.
---
```

## Project layout

```
src/
  app/              # routes, OG images, manifest, sitemap, robots, llms.txt
  components/
    forms/          # ContactForm, NewsletterForm
    layout/         # Nav, Footer, Container, Section
    motion/         # FadeRise, WordReveal — respect prefers-reduced-motion
    product-ui/     # Stylized product mocks for the bento + product pages
    sections/       # Home-page sections + page-level compositions
    seo/            # JsonLd helper
    ui/             # Primitives (Link, Button, Eyebrow, Breadcrumbs, …)
  config/           # site.ts (origin, nav, contacts), social.ts (platforms)
  content/          # MDX content (products, newsroom, legal, memos)
  lib/
    content/        # MDX loaders + frontmatter types (barrel: @/lib/content)
    search/         # client-safe search core + server index builder
    seo/            # structured data, page-metadata builder, OG fonts/template
    …               # utils, motion, analytics
```

## Deployment

The site is built for Vercel. Push to `main` and the production deploy runs; PRs get preview URLs. The CI workflow in `.github/workflows/ci.yml` runs lint, typecheck, tests, and build on every PR.

## Conventions

- Editorial type pairing: **Instrument Serif** for display, **Inter** for body
- Colour is monochrome by design — accents come from typography, scale, and rules
- Motion is opt-in and always respects `prefers-reduced-motion`
- External links are detected centrally via `isExternalHref()` in `src/lib/utils.ts`
