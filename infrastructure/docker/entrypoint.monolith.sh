#!/bin/sh
# Entrypoint for monolith container.
# Runs prisma migrate deploy for each service that has a schema,
# using service-specific DATABASE_URL from Railway env vars.
# Format: <SERVICE_UPPER>_DATABASE_URL (e.g. AUTH_SERVICE_DATABASE_URL)

set -eu

WORKSPACE="/workspace"

run_migrate() {
  local SVC="$1"
  local SCHEMA="${WORKSPACE}/apps/${SVC}/prisma/schema.prisma"

  [ -f "$SCHEMA" ] || return 0

  # Build env var name: auth-service → AUTH_SERVICE_DATABASE_URL
  local PREFIX
  PREFIX=$(echo "$SVC" | tr '[:lower:]-' '[:upper:]_')
  local DB_VAR="${PREFIX}_DATABASE_URL"

  # Resolve value (sh-compatible indirect lookup)
  local DB_URL
  DB_URL=$(eval "echo \"\${${DB_VAR}:-}\"")

  if [ -z "$DB_URL" ]; then
    # Fallback to shared DATABASE_URL (useful when all services share the same DB server)
    DB_URL="${DATABASE_URL:-}"
  fi

  if [ -z "$DB_URL" ]; then
    echo "[monolith] WARNING: ${DB_VAR} not set — skipping migrations for ${SVC}"
    return 0
  fi

  echo "[monolith] running prisma migrate deploy for ${SVC}"
  DATABASE_URL="$DB_URL" npx --no prisma migrate deploy --schema="$SCHEMA"
}

if [ "${SKIP_MIGRATIONS:-0}" != "1" ]; then
  run_migrate auth-service
  run_migrate iam-service
  run_migrate config-service
  run_migrate storage-service
  run_migrate notification-service
  run_migrate cms-service
  run_migrate post-service
  run_migrate comic-service
fi

echo "[monolith] starting all services"
exec "$@"
