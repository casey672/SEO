#!/usr/bin/env bash
# Renders all 10 estate planning videos to out/
# Usage: bash scripts/render-all.sh

set -e

COMPOSITIONS=(
  "living-trust"
  "estate-planning-cost"
  "die-without-will"
  "power-of-attorney"
  "write-own-will"
  "avoid-probate"
  "lady-bird-deed"
  "update-estate-plan"
  "will-vs-trust"
  "young-and-healthy"
)

mkdir -p out

echo "🎬 Rendering ${#COMPOSITIONS[@]} estate planning videos..."

for id in "${COMPOSITIONS[@]}"; do
  echo ""
  echo "▶ Rendering: $id"
  npx remotion render "$id" "out/${id}.mp4" \
    --codec=h264 \
    --crf=18 \
    --output-format=mp4
  echo "✓ Done: out/${id}.mp4"
done

echo ""
echo "✅ All videos rendered to out/"
ls -lh out/*.mp4
