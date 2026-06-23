#!/bin/bash
# Double-click in Finder to run the qeet.in marketing-pm competitive sweep.
clear
echo "════════════════════════════════════════════════"
echo "   qeet.in — Marketing PM competitive sweep"
echo "════════════════════════════════════════════════"
echo
echo "What should it research?"
echo "   1) Everything  (all areas)         [default]"
echo "   2) Positioning / messaging / pages"
echo "   3) SEO / content depth"
echo "   4) Conversion / trust / social proof"
echo
read -r -p "Type 1-4 then Enter (or just press Enter for 1): " choice
case "$choice" in
  2) FOCUS=positioning ;;
  3) FOCUS=seo ;;
  4) FOCUS=conversion ;;
  *) FOCUS=all ;;
esac
echo
bash "/Users/a3097640/Desktop/QG/qeet-in/.claude/scripts/run-marketing-pm.sh" "$FOCUS"
echo
read -r -p "All done — press Enter to close this window."
