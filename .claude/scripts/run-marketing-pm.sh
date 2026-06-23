#!/usr/bin/env bash
# Manual runner for the qeet.in marketing-pm competitive-intelligence agent.
# Researches peer marketing/positioning/SEO and writes proposals into planning/.
# Run whenever you want (no schedule); or double-click "Run qeet-in PM.command".
set -euo pipefail

QIN="/Users/a3097640/Desktop/QG/qeet-in"
CLAUDE_BIN="${CLAUDE_BIN:-/Users/a3097640/.local/bin/claude}"
MODEL="${PM_MODEL:-sonnet}"            # override with PM_MODEL=opus for a deeper run

# Optional focus arg: positioning | seo | conversion | all (default: all).
case "$(printf '%s' "${1:-}" | tr '[:upper:]' '[:lower:]')" in
  positioning|messaging|pages)  FOCUS="Positioning, messaging & page coverage vs peers";;
  seo|content)                  FOCUS="SEO, keyword/topic gaps & content depth";;
  conversion|trust|proof)       FOCUS="Conversion, trust/social-proof & CTAs";;
  ""|all)                       FOCUS="ALL areas in one light pass: positioning/pages, SEO/content, conversion/trust";;
  *)                            FOCUS="${1}";;
esac

LOGDIR="$QIN/.claude/logs"; mkdir -p "$LOGDIR"
LOG="$LOGDIR/run-$(date +%Y%m%d-%H%M%S).log"

PROMPT="Use the marketing-pm subagent to run a competitive-intelligence sweep for qeet.in. Focus: ${FOCUS}.
First read src/content/ and the routes in src/app/ to dedupe against pages/posts that already exist, then research peer marketing sites for that focus and update planning/COMPETITIVE-INTEL.md and planning/CONTENT-PROPOSALS.md exactly per your output contract. Cite primary sources. Keep product claims unverified-and-flagged (don't invent). If nothing material changed, say so and add nothing."

cd "$QIN"                               # cwd = repo so the marketing-pm agent is discovered
echo "=== marketing-pm run $(date '+%Y-%m-%d %H:%M:%S %Z') (focus=${FOCUS%% (*}, model=$MODEL) ===" >> "$LOG"

TOOLS="WebSearch,WebFetch,Read,Grep,Glob,Write,Edit,Bash"
if [ -t 1 ]; then
  echo "Researching '${FOCUS%% (*}' — this takes a few minutes. Leave this window open…"; echo
  "$CLAUDE_BIN" -p "$PROMPT" --model "$MODEL" --permission-mode acceptEdits --verbose \
    --allowedTools "$TOOLS" 2>&1 | tee -a "$LOG"
  echo
  echo "✅ Done. Proposals written to: $QIN/planning/CONTENT-PROPOSALS.md"
else
  exec "$CLAUDE_BIN" -p "$PROMPT" --model "$MODEL" --permission-mode acceptEdits \
    --allowedTools "$TOOLS" >> "$LOG" 2>&1
fi
