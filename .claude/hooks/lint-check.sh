#!/usr/bin/env bash
# Stop hook: feedback de qualidade ao fim do turno.
# Roda eslint nos .ts/.tsx alterados na branch (vs merge-base origin/main),
# nao commitados e novos untracked, e tsc no projeto inteiro se houve mudanca.
# Nunca bloqueia (exit 0 sempre). No-op se nada mudou ou se node_modules nao existe.

set -uo pipefail

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
cd "$PROJECT_DIR" 2>/dev/null || exit 0
[ -d node_modules ] || exit 0

BASE=$(git merge-base HEAD origin/main 2>/dev/null || true)

CHANGED=$(
  {
    [ -n "$BASE" ] && git diff --name-only --diff-filter=d "$BASE"...HEAD -- '*.ts' '*.tsx'
    git diff --name-only --diff-filter=d HEAD -- '*.ts' '*.tsx'
    git ls-files --others --exclude-standard -- '*.ts' '*.tsx'
  } 2>/dev/null | sort -u
)

EXISTING=""
while IFS= read -r f; do
  [ -n "$f" ] && [ -f "$f" ] && EXISTING="$EXISTING $f"
done <<EOF
$CHANGED
EOF
EXISTING="${EXISTING# }"

[ -z "$EXISTING" ] && exit 0

echo "eslint + tsc nos arquivos alterados da branch..." >&2

# shellcheck disable=SC2086
npx --no-install eslint $EXISTING >&2 \
  || echo "eslint apontou problemas acima. Resolva antes do PR." >&2

npx --no-install tsc --noEmit >&2 \
  || echo "tsc apontou problemas acima. Resolva antes do PR." >&2

exit 0
