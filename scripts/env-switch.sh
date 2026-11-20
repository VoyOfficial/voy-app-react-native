#!/usr/bin/env sh
set -eu

ROOT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
TARGET=${1:-}

usage() {
  echo "Usage: yarn env:local | yarn env:prod"
  echo "Copies .env.<name> to .env for react-native-config."
}

case "$TARGET" in
  local|prod)
    SRC="$ROOT_DIR/.env.$TARGET"
    if [ ! -f "$SRC" ]; then
      echo "Missing env package: $SRC" >&2
      exit 1
    fi
    SECRETS="$ROOT_DIR/.env.secrets"
    if [ -f "$SECRETS" ]; then
      awk '
        FNR == NR {
          if ($0 ~ /^[A-Za-z_][A-Za-z0-9_]*=/) {
            key = substr($0, 1, index($0, "=") - 1)
            secret[key] = $0
            order[++n] = key
          }
          next
        }
        /^[A-Za-z_][A-Za-z0-9_]*=/ {
          key = substr($0, 1, index($0, "=") - 1)
          if (key in secret) {
            next
          }
        }
        { print }
        END {
          for (i = 1; i <= n; i++) {
            print secret[order[i]]
          }
        }
      ' "$SECRETS" "$SRC" > "$ROOT_DIR/.env"
      echo "Active env: $TARGET (API_URL from .env.$TARGET, secrets overlaid from .env.secrets → .env)"
    else
      cp "$SRC" "$ROOT_DIR/.env"
      echo "Active env: $TARGET (API_URL from .env.$TARGET → .env)"
    fi
    ;;
  *)
    usage >&2
    exit 1
    ;;
esac
