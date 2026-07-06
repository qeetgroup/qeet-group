# qeet-in — CLAUDE.md

**qeet.in** — Qeet Group marketing site (editorial, MDX content). Next.js 16.2.6 / React 19.2.4 / Tailwind 4.3.0 / TypeScript 5.9.3 (pnpm, no `packageManager` pin — uses ambient pnpm). **Self-contained — does NOT consume `@qeetrix/*`**; its design tokens live in its own `src/app/globals.css`.

## Commands (`cd qeet-in`)

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build && pnpm start
pnpm lint
pnpm test         # vitest run (single pass); pnpm test:watch for watch mode
```

Single test: `pnpm vitest run src/lib/foo.test.ts`. Tests are `src/**/*.test.ts(x)`, node environment, `@` → `src/` (see [vitest.config.ts](vitest.config.ts)). No env vars are required for local dev — Resend/Plausible no-op without keys.

## Architecture

Next.js App Router site. Content is **MDX in [src/content/](src/content/)** (`products/`, `newsroom/`, `legal/`, `memos/`), loaded via `next-mdx-remote` + `gray-matter`; each product/post gets a generated OG image and a route. Adding content = adding an MDX file with the frontmatter shape documented in [README.md](README.md). Monochrome editorial design; animations use **`motion` 12.40.0** and always respect `prefers-reduced-motion`; external links detected centrally via `isExternalHref()` in [src/lib/utils.ts](src/lib/utils.ts). Unit tests run on **Vitest 4.1.7**.
