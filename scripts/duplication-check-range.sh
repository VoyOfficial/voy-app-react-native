#!/bin/sh
# Duplication gate for the files a range introduces.
# Usage: duplication-check-range.sh [base-sha]
# Exit 0 when there is nothing to compare or jscpd stays within .jscpd.json.
# Exit 1 when jscpd reports duplication above the threshold or cannot run.
#
# jscpd 5.x does not word-split one argument that contains spaces, so each
# path is passed as its own argument via xargs.

set -eu

ROOT=$(git rev-parse --show-toplevel)
cd "$ROOT"

BASE="${1:-}"

if [ -z "$BASE" ]; then
  upstream=$(git rev-parse --abbrev-ref '@{upstream}' 2>/dev/null | sed 's@^origin/@@' || true)
  if [ -n "$upstream" ] && git rev-parse -q --verify "origin/$upstream" >/dev/null 2>&1; then
    BASE=$(git merge-base HEAD "origin/$upstream")
  else
    best_count=""
    for candidate in develop main; do
      if git rev-parse -q --verify "origin/$candidate" >/dev/null 2>&1; then
        candidate_base=$(git merge-base HEAD "origin/$candidate" 2>/dev/null || true)
        [ -z "$candidate_base" ] && continue
        candidate_count=$(git rev-list --count "$candidate_base..HEAD" 2>/dev/null || true)
        if [ -n "$candidate_count" ] && { [ -z "$best_count" ] || [ "$candidate_count" -lt "$best_count" ]; }; then
          best_count="$candidate_count"
          BASE="$candidate_base"
        fi
      fi
    done
  fi
fi

if [ -z "$BASE" ]; then
  echo "duplication:check:range: base desconhecida, pulando."
  exit 0
fi

list=$(mktemp)
paths=$(mktemp)
trap 'rm -f "$list" "$paths"' EXIT

git diff --name-only --diff-filter=ACMR "$BASE" HEAD -- '*.ts' '*.tsx' '*.js' '*.jsx' >"$list" || true

while IFS= read -r file; do
  [ -n "$file" ] || continue
  [ -f "$file" ] || continue
  case "$file" in
    src/*) ;;
    *) continue ;;
  esac
  case "$file" in
    */__tests__/*|tests/*|*.test.ts|*.test.tsx|*.test.js|*.test.jsx|*.spec.ts|*.spec.tsx|*.integration.spec.ts) continue ;;
  esac
  printf '%s\0' "$file" >>"$paths"
done <"$list"

if [ ! -s "$paths" ]; then
  echo "duplication:check:range: nenhum arquivo de src em $BASE..HEAD, pulando."
  exit 0
fi

echo "duplication:check:range: jscpd em $BASE..HEAD"
# xargs -r skips an empty list. -0 keeps paths intact.
# xargs returns 123 when the command fails; the gate only needs non-zero,
# and callers expect 1 for a duplication failure.
if ! xargs -0 -r yarn jscpd --config .jscpd.json --silent <"$paths"; then
  exit 1
fi
