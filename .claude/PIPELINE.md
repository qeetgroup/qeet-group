# qeet.in — content delivery pipeline

How a marketing/editorial idea becomes a published, accurate, SEO-ready page. The **marketing-pm**
finds gaps; this pipeline builds them.

## The agents
| Stage | Agent | Output | Model |
|---|---|---|---|
| 0. Research | `marketing-pm` | `planning/CONTENT-PROPOSALS.md` | sonnet |
| 1. Plan | `content-architect` | `planning/specs/<slug>.md` (IA, copy outline, frontmatter, SEO, JSON-LD) | opus |
| 2. Build | `content-engineer` | MDX content + Next pages/sections | sonnet |
| 2b. SEO/perf | `seo-perf-engineer` | metadata, OG, JSON-LD, sitemap, CWV | sonnet |
| 3. Accuracy ⭐ | `product-accuracy-editor` | verifies claims vs the real products + brand/voice/a11y | opus |

**Reuse (don't duplicate):** `/code-review` (TS/Next code), `/verify` (run `next dev`/build), `/simplify`, `code-architect`. The specialized high-stakes review here is **product accuracy** — does the marketing copy match what the products actually do?

## Flow
```
planning/CONTENT-PROPOSALS.md
        │  pick one
        ▼
content-architect ──► planning/specs/<slug>.md
        ▼
content-engineer (+ seo-perf-engineer)   →  src/content/* + src/app/* , metadata/OG/sitemap/JSON-LD
        ▼
product-accuracy-editor   (every product claim checked vs ../qeet-id, ../qeetrix, ../qeet-files/*)
        ▼
/code-review + /verify
        ▼
YOU: review the diff and commit
```

## How to run it
Open a session in `qeet-in/` and drive the agents:
> "Build the **security/trust page** from CONTENT-PROPOSALS. Use **content-architect** to plan it, then **content-engineer**, then **seo-perf-engineer**, then **product-accuracy-editor** to verify the claims. Stop before committing."

## Definition of done
- `pnpm lint && pnpm exec tsc --noEmit && pnpm test && pnpm build` green
- Page has metadata + OG + appropriate JSON-LD; new routes in `sitemap.ts`
- **product-accuracy-editor**: no Critical/High inaccurate product claims
- **You** reviewed the diff — then commit (agents never commit/deploy)
