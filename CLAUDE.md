# qeet-in — CLAUDE.md

**qeet.in** — Qeet Group marketing site (editorial, MDX content). Next.js 16.2.6 / React 19.2.4 / Tailwind 4.3.0 / TypeScript 5.9.3 (**Bun** for install + scripts; Next runs on Node). **Self-contained — does NOT consume `@qeetrix/*`**; its design tokens live in its own `src/app/globals.css`.

## Commands (`cd qeet-in`)

```bash
bun install
bun run dev       # http://localhost:3000
bun run build && bun run start
bun run lint
bun run test      # vitest run (single pass); bun run test:watch for watch mode
```

Single test: `bunx vitest run src/lib/foo.test.ts`. Tests are `src/**/*.test.ts(x)`, node environment, `@` → `src/` (see [vitest.config.ts](vitest.config.ts)). No env vars are required for local dev — Resend/Plausible no-op without keys.

## Architecture

Next.js App Router site. Content is **MDX in [src/content/](src/content/)** (`products/`, `newsroom/`, `legal/`, `memos/`), loaded via `next-mdx-remote` + `gray-matter`; each product/post gets a generated OG image and a route. Adding content = adding an MDX file with the frontmatter shape documented in [README.md](README.md). Site-wide constants (origin, nav links, contact emails) live in `src/config/site.ts`; `src/lib` is organized by domain — `lib/content` (loaders + types), `lib/seo` (structured data, `buildPageMetadata`, OG), `lib/search`. Every route sets its own canonical (no layout-level canonical). Monochrome editorial design; animations use **`motion` 12.40.0** and always respect `prefers-reduced-motion`; external links detected centrally via `isExternalHref()` in [src/lib/utils.ts](src/lib/utils.ts). Unit tests run on **Vitest 4.1.7**.
