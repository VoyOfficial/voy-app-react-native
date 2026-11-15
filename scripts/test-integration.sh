#!/bin/sh
# Integration tests always target the env:prod package (.env.prod).
# Does not copy .env.prod onto .env, so the app build target stays unchanged.
set -eu

ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
ENV_FILE="$ROOT/.env.prod"

if [ ! -f "$ENV_FILE" ]; then
  echo "Missing $ENV_FILE (yarn env:prod package)" >&2
  exit 1
fi

API_URL=$(sed -n 's/^API_URL=//p' "$ENV_FILE" | head -n 1 | tr -d '\r')
API_URL=$(printf '%s' "$API_URL" | sed 's/^[[:space:]]*//; s/[[:space:]]*$//; s/^["'\'']//; s/["'\'']$//; s|/*$||')

case "$API_URL" in
  ''|*localhost*|*127.0.0.1*)
    echo "Integration tests must use the env:prod API_URL from .env.prod (got '${API_URL:-empty}')" >&2
    exit 1
    ;;
esac

export API_URL
cd "$ROOT"

exec "$ROOT/node_modules/.bin/jest" \
  --passWithNoTests \
  --no-cache \
  --runInBand \
  --testPathIgnorePatterns='/node_modules/' \
  --testRegex='\.integration\.spec\.ts' \
  --testTimeout=180000 \
  "$@"
