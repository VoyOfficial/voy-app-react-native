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
    cp "$SRC" "$ROOT_DIR/.env"
    echo "Active env: $TARGET (API_URL from .env.$TARGET → .env)"
    ;;
  *)
    usage >&2
    exit 1
    ;;
esac
