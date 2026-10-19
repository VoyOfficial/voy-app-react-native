#!/bin/sh
# Definition of Done runner. See .cursor/rules/definition-of-done.mdc.
# Exit 0 when active gates pass.
# Exit 1 when a blocking gate fails.
# Exit 2 when the arguments are invalid.
#
# Gate 2 (E2E) is suspended until a React Native runner exists.
# Gate 3 and Gate 5 are oriented: they print the next action and do not fail the script.

set -eu

TASK=""
SKIP_TESTS=0
SKIP_E2E=0
E2E_FILE=""
E2E_RELEASE=0

usage() {
  cat <<'EOF'
Usage: ./scripts/validate-dod.sh [options]

Options:
  --task <id>       Issue id or slug to find in Obsidian frontmatter (Gate 4)
  --skip-tests      Skip Gate 1 (lint, typecheck, yarn test)
  --skip-e2e        Mark Gate 2 skipped (it is already suspended by default)
  --e2e-file <path> E2E spec to require. Fails: no RN runner is configured
  --e2e-release     Fail Gate 2 until an E2E runner exists
  --help            Show this help

Exit codes: 0 pass, 1 gate failed, 2 bad arguments.
EOF
}

while [ $# -gt 0 ]; do
  case "$1" in
    --task)
      if [ $# -lt 2 ] || [ -z "${2:-}" ]; then
        echo "--task precisa de um valor" >&2
        exit 2
      fi
      TASK=$2
      shift 2
      ;;
    --skip-tests)
      SKIP_TESTS=1
      shift
      ;;
    --skip-e2e)
      SKIP_E2E=1
      shift
      ;;
    --e2e-file)
      if [ $# -lt 2 ] || [ -z "${2:-}" ]; then
        echo "--e2e-file precisa de um caminho" >&2
        exit 2
      fi
      E2E_FILE=$2
      shift 2
      ;;
    --e2e-release)
      E2E_RELEASE=1
      shift
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    *)
      echo "Argumento desconhecido: $1" >&2
      usage >&2
      exit 2
      ;;
  esac
done

ROOT=$(git rev-parse --show-toplevel)
cd "$ROOT"

failed=0

echo ""
echo "Gate 1 — Testes, lint e tipos"
if [ "$SKIP_TESTS" -eq 1 ]; then
  echo "  pulado (--skip-tests)"
else
  if ! yarn lint:check; then
    echo "  FALHOU: yarn lint:check" >&2
    failed=1
  fi
  if ! yarn typecheck; then
    echo "  FALHOU: yarn typecheck" >&2
    echo "  Debito conhecido: erros pre-existentes podem falhar este passo (.cursor/rules/pre-commit-hooks.mdc)." >&2
    failed=1
  fi
  if ! yarn test; then
    echo "  FALHOU: yarn test" >&2
    echo "  yarn test ja inclui coverage. Threshold global pode falhar por debito existente." >&2
    failed=1
  fi
  if [ "$failed" -eq 0 ]; then
    echo "  ok"
  fi
fi

echo ""
echo "Gate 2 — E2E"
if [ "$SKIP_E2E" -eq 1 ]; then
  echo "  pulado (--skip-e2e)"
elif [ -n "$E2E_FILE" ] || [ "$E2E_RELEASE" -eq 1 ]; then
  echo "  FALHOU: nao ha framework de E2E configurado (Detox/Maestro). Playwright nao cobre este app." >&2
  if [ -n "$E2E_FILE" ]; then
    echo "  Arquivo informado: $E2E_FILE" >&2
  fi
  failed=1
else
  echo "  suspenso (sem framework de E2E). Reativar em definition-of-done.mdc quando existir."
fi

echo ""
echo "Gate 3 — Code review (orientado)"
echo "  Rodar /code-reviewer contra a branch base. Nao aprovar com achado High ou BLOCKING."
echo "  No fluxo lean, /speckit.verify delega este passo e nao pode ser o autor."

echo ""
echo "Gate 4 — Documentacao Obsidian"
if [ -z "$TASK" ]; then
  branch=$(git branch --show-current 2>/dev/null || true)
  TASK=$(printf '%s' "$branch" | sed -n 's/.*\/\([0-9][0-9]*\)-.*/ISSUE-\1/p')
fi

if [ -z "$TASK" ]; then
  echo "  FALHOU: informe --task <id> (nao deu para ler a Issue no nome da branch)." >&2
  failed=1
else
  echo "  procurando '$TASK' no frontmatter de docs/obsidian"
  if [ ! -d docs/obsidian ]; then
    echo "  FALHOU: docs/obsidian nao existe." >&2
    failed=1
  else
    list=$(mktemp)
    find docs/obsidian -name '*.md' -type f >"$list"
    found=0
    while IFS= read -r file; do
      [ -n "$file" ] || continue
      if awk -v id="$TASK" '
        function has_id(line, needle,    pos, before, after) {
          pos = index(line, needle)
          if (pos == 0) return 0
          if (pos > 1) {
            before = substr(line, pos - 1, 1)
            if (before ~ /[0-9A-Za-z_-]/) return 0
          }
          after = substr(line, pos + length(needle), 1)
          if (after ~ /[0-9A-Za-z_-]/) return 0
          return 1
        }
        BEGIN { hit = 0 }
        FNR == 1 { infront = 0; marks = 0 }
        /^---$/ {
          marks++
          if (marks == 1) { infront = 1; next }
          if (marks == 2) { infront = 0; next }
        }
        infront && has_id($0, id) { hit = 1 }
        END { exit hit ? 0 : 1 }
      ' "$file"; then
        found=1
        break
      fi
    done <"$list"
    rm -f "$list"
    if [ "$found" -eq 1 ]; then
      echo "  ok"
    else
      echo "  FALHOU: '$TASK' nao aparece no frontmatter de docs/obsidian." >&2
      failed=1
    fi
  fi
fi

echo ""
echo "Gate 5 — PR (orientado)"
branch=$(git branch --show-current 2>/dev/null || true)
if command -v gh >/dev/null 2>&1 && [ -n "$branch" ]; then
  if pr_url=$(gh pr view --json url -q .url 2>/dev/null); then
    echo "  PR: $pr_url"
  else
    echo "  Nenhum PR para '$branch'. Abrir com o fluxo de .cursor/skills/github/SKILL.md."
  fi
else
  echo "  Conferir o PR no GitHub e linkar a Issue (Closes #<n>)."
fi

echo ""
if [ "$failed" -ne 0 ]; then
  echo "DoD: falhou."
  exit 1
fi

echo "DoD: gates ativos ok (Gate 3 e Gate 5 continuam orientados)."
exit 0
