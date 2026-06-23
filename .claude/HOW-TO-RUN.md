# How to use the qeet.in agents

Two stages:
1. **Find gaps** — the **marketing-pm** agent researches peers' positioning/SEO and writes proposals. → **Part 1**.
2. **Build a page** — a pipeline turns a proposal into a published, accurate, SEO-ready page. → **Part 2** (you chat with Claude).

Outputs (in-repo, separate from published content in `src/content`):
- `planning/COMPETITIVE-INTEL.md` — research log
- `planning/CONTENT-PROPOSALS.md` — prioritized backlog
- `planning/specs/<slug>.md` — page plans

═══════════════════════════════════════════════════════════════

# Part 1 — Find gaps (marketing-pm)

## ⭐ Double-click (no typing)
1. Finder → `Desktop → QG → qeet-in → .claude → scripts` (press **⌘ + Shift + .** to show hidden folders).
2. Double-click **`Run qeet-in PM.command`** → pick a focus (or Enter) → wait a few minutes.
3. First time: macOS may ask → **right-click → Open → Open** (once).

## Or one line in Terminal
```bash
bash ~/Desktop/QG/qeet-in/.claude/scripts/run-marketing-pm.sh
# focus: positioning | seo | conversion   ·   deeper: PM_MODEL=opus bash …/run-marketing-pm.sh
open ~/Desktop/QG/qeet-in/planning/CONTENT-PROPOSALS.md
```

═══════════════════════════════════════════════════════════════

# Part 2 — Build a page (the pipeline)

You **chat with Claude** (no script). Full flow: [PIPELINE.md](PIPELINE.md).

```bash
cd ~/Desktop/QG/qeet-in
claude
```
Then, e.g.:
> Build the **security/trust page** from planning/CONTENT-PROPOSALS.md. Use **content-architect** to
> plan it, then **content-engineer** to build it, then **seo-perf-engineer**, then
> **product-accuracy-editor** to verify every product claim against the real qeet-id/qeetrix. Stop
> before committing so I can review.

| Agent | Does |
|---|---|
| **content-architect** | the plan → `planning/specs/<slug>.md` (no code) |
| **content-engineer** | the MDX content + Next.js page |
| **seo-perf-engineer** | metadata, OpenGraph, sitemap, performance |
| **product-accuracy-editor** | checks every product claim is true vs the real products |

**Important:** agents **don't commit or deploy** — they leave changes for your review. You don't need to memorize names: *"build the security page end to end and stop before committing"* works.

## If the Part 1 script fails
- **`Operation not permitted`** → grant macOS **Full Disk Access** to `/bin/bash` + `/Users/a3097640/.local/bin/claude` (System Settings → Privacy & Security).
- **Log:** `ls -t ~/Desktop/QG/qeet-in/.claude/logs/run-*.log | head -1 | xargs cat`
