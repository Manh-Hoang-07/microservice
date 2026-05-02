#!/bin/sh
# Entrypoint for any microservice container.
#  1. If a prisma/ folder exists, run `prisma migrate deploy` (idempotent).
#  2. Exec the main service command (passed via CMD).
#
# Skip migration with SKIP_MIGRATIONS=1 (e.g. for read-only replicas).

set -eu

SVC_DIR="/app/apps/${SERVICE_NAME:-}"

if [ -z "${SERVICE_NAME:-}" ]; then
  echo "[entrypoint] SERVICE_NAME is not set" >&2
  exit 1
fi

if [ "${SKIP_MIGRATIONS:-0}" = "1" ]; then
  echo "[entrypoint] SKIP_MIGRATIONS=1 — skipping prisma migrate deploy"
elif [ -d "${SVC_DIR}/prisma" ] && [ -f "${SVC_DIR}/prisma/schema.prisma" ]; then
  echo "[entrypoint] running prisma migrate deploy for ${SERVICE_NAME}"
  cd "${SVC_DIR}"
  # `prisma` CLI is bundled in node_modules; --skip-generate avoids re-generating
  # the client at startup (already generated at build time).
  npx --no prisma migrate deploy --schema=./prisma/schema.prisma --skip-generate
else
  echo "[entrypoint] no prisma schema for ${SERVICE_NAME} — skipping migrations"
fi

cd "${SVC_DIR}"
echo "[entrypoint] starting ${SERVICE_NAME}"
exec "$@"
