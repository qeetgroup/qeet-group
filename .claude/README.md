# qeet-in `.claude/` — automation

> **👉 New here? Read [HOW-TO-RUN.md](HOW-TO-RUN.md).**

Two parts: a **marketing-pm** that finds content/SEO gaps, and a **content pipeline** that builds pages — tailored to this repo (Next 16 App Router, Tailwind v4 `@theme` tokens, MDX via `next-mdx-remote`+`gray-matter`, dynamic OG, JSON-LD, Plausible). The standout review is **product accuracy** (does the marketing copy match the real products?).

## Pipeline (agents/)
Turns a `planning/CONTENT-PROPOSALS.md` row into a published page. Full flow in **[PIPELINE.md](PIPELINE.md)**.

| Agent | Role |
|---|---|
| [`agents/content-architect.md`](agents/content-architect.md) | proposal → `planning/specs/<slug>.md` (IA, copy outline, frontmatter, SEO/JSON-LD). No code. |
| [`agents/content-engineer.md`](agents/content-engineer.md) | MDX content (`src/content/*`) + Next pages/sections on Tailwind v4. |
| [`agents/seo-perf-engineer.md`](agents/seo-perf-engineer.md) | metadata/OG/JSON-LD/sitemap/robots + Core Web Vitals + images. |
| [`agents/product-accuracy-editor.md`](agents/product-accuracy-editor.md) ⭐ | verify claims vs `../qeet-id`, `../qeetrix`, `../qeet-files/*` + brand/voice/a11y. |

## Find gaps (marketing-pm)
| File | Role |
|---|---|
| [`agents/marketing-pm.md`](agents/marketing-pm.md) | positioning/messaging/SEO research vs Auth0/Clerk/WorkOS/Stripe/Vercel → proposals |
| [`scripts/run-marketing-pm.sh`](scripts/run-marketing-pm.sh) | manual headless runner |
| [`scripts/Run qeet-in PM.command`](scripts/) | double-click launcher |

**Outputs (in-repo, separate from published content):** `planning/COMPETITIVE-INTEL.md` (log) + `planning/CONTENT-PROPOSALS.md` (backlog); architect specs in `planning/specs/`.

Reuse `/code-review`, `/verify`, `/simplify`, `code-architect`. Agents implement + run checks, but **don't commit/deploy** — you review & commit.
