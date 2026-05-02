#!/usr/bin/env bash
# Pre-flight env-var check for `docker compose up`.
# Run this before bringing the stack up to fail fast on missing secrets,
# instead of getting cryptic compose errors mid-startup.
#
# Usage: ./scripts/check-env.sh [--env-file <path>]

set -euo pipefail

ENV_FILE=".env.docker"
if [ "${1:-}" = "--env-file" ] && [ -n "${2:-}" ]; then
  ENV_FILE="$2"
fi

if [ ! -f "$ENV_FILE" ]; then
  echo "✗ env file not found: $ENV_FILE" >&2
  exit 1
fi

# Load env file without leaking it into the parent shell
set -a
# shellcheck disable=SC1090
. "$ENV_FILE"
set +a

REQUIRED=(
  POSTGRES_PASSWORD
  INTERNAL_API_SECRET
  JWT_PRIVATE_KEY_PEM
  JWT_PUBLIC_KEY_PEM
)

missing=0
for var in "${REQUIRED[@]}"; do
  val=$(eval "printf '%s' \"\${$var:-}\"")
  if [ -z "$val" ]; then
    echo "✗ $var is not set" >&2
    missing=$((missing + 1))
  fi
done

# Specific weakness checks
if [ -n "${INTERNAL_API_SECRET:-}" ] && [ ${#INTERNAL_API_SECRET} -lt 32 ]; then
  echo "✗ INTERNAL_API_SECRET must be ≥ 32 characters (current: ${#INTERNAL_API_SECRET})" >&2
  missing=$((missing + 1))
fi
if [ -n "${POSTGRES_PASSWORD:-}" ] && [ ${#POSTGRES_PASSWORD} -lt 16 ]; then
  echo "✗ POSTGRES_PASSWORD must be ≥ 16 characters (current: ${#POSTGRES_PASSWORD})" >&2
  missing=$((missing + 1))
fi
case "${POSTGRES_PASSWORD:-}" in
  secret|password|change-me|123456) echo "✗ POSTGRES_PASSWORD looks insecure" >&2; missing=$((missing+1));;
esac
case "${INTERNAL_API_SECRET:-}" in
  *change-me*) echo "✗ INTERNAL_API_SECRET still contains 'change-me'" >&2; missing=$((missing+1));;
esac

if [ "${NODE_ENV:-}" = "production" ]; then
  case "${CORS_ORIGINS:-}" in
    ""|"*") echo "✗ CORS_ORIGINS must be a non-empty explicit list in production" >&2; missing=$((missing+1));;
  esac
fi

if [ "$missing" -gt 0 ]; then
  echo
  echo "$missing problem(s) found. Aborting." >&2
  exit 1
fi
echo "✓ env file looks good ($ENV_FILE)"
