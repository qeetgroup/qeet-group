# qeet-group — CLAUDE.md

**qeet.in** — Qeet Group marketing site (editorial, MDX content). Next.js 16.2.6 / React 19.2.4 / Tailwind 4.3.0 / TypeScript 5.9.3 (**Bun** for install + scripts; Next runs on Node). **Self-contained — does NOT consume `@qeetrix/*`**; its design tokens live in its own `src/app/globals.css`.

## Commands (`cd qeet-websites/qeet-group`)

```bash
bun install
bun run dev       # http://localhost:3000
bun run build && bun run start
bun run lint
bun run test      # vitest run (single pass); bun run test:watch for watch mode
```

Single test: `bunx vitest run src/lib/foo.test.ts`. Tests are `src/**/*.test.ts(x)`, node environment, `@` → `src/` (see [vitest.config.ts](vitest.config.ts)). No env vars are required for local dev — Resend/Plausible no-op without keys.

### Corporate presentation

`/presentation` is the unlisted master corporate overview: 15 slides,
keyboard-driven, `N` for speaker notes, `G` for the safe-area grid, Cmd-P for a
1600×900 PDF (each slide followed by its notes). Always dark, regardless of the
site theme. (No `.pptx` pipeline exists in this repo.)

- Running order, labels, notes and per-slide cautions: `slides/notes.ts`
  (`DECKS.master`; audience variants are new sequences — see `slides/index.ts`).
- Product names, roles and **organisation** statuses (`active` / `development` /
  `planned` — never the site's "Available"): `portfolio.ts`. Quoted philosophy,
  vision, mission: `slides/canon.ts`.
- Every dimension inside a slide is `cqw`; never use the site's viewport-based
  `grid-editorial`/`col-*` there — use `.deck-grid` and the safe area in `deck.css`.

`src/app/presentation/slides.test.tsx` renders every slide and fails on any claim
the organisation's records do not support (GA, "available", certifications, product
totals, business figures, a maturity scale), checks the portfolio against both the
site's MDX and — when `../qeet-context` is checked out — PRODUCT-PORTFOLIO.md and
ORGANIZATION.md.

## Architecture

Next.js App Router site. Content is **MDX in [src/content/](src/content/)** (`products/`, `newsroom/`, `legal/`, `memos/`), loaded via `next-mdx-remote` + `gray-matter`; each product/post gets a generated OG image and a route. Adding content = adding an MDX file with the frontmatter shape documented in [README.md](README.md). Site-wide constants (origin, nav links, contact emails) live in `src/config/site.ts`; `src/lib` is organized by domain — `lib/content` (loaders + types), `lib/seo` (structured data, `buildPageMetadata`, OG), `lib/search`. Every route sets its own canonical (no layout-level canonical). Monochrome editorial design; animations use **`motion` 12.40.0** and always respect `prefers-reduced-motion`; external links detected centrally via `isExternalHref()` in [src/lib/utils.ts](src/lib/utils.ts). Unit tests run on **Vitest 4.1.7**.
