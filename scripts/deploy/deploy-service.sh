#!/usr/bin/env bash
set -euo pipefail

# Generic deploy script for a single service.
# Usage:
#   ./scripts/deploy/deploy-service.sh <service-name> <service-port> [branch]
#
# Example:
#   ./scripts/deploy/deploy-service.sh comic-service 3001

SERVICE_NAME="${1:?service name required}"
SERVICE_PORT="${2:?service port required}"
BRANCH="${3:-master}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "${SCRIPT_DIR}/../.." && pwd)"

cd "$REPO_DIR"

if [ ! -d "apps/${SERVICE_NAME}" ]; then
  echo "[deploy] unknown service: ${SERVICE_NAME}" >&2
  exit 1
fi

BEFORE_SHA="$(git rev-parse HEAD)"
echo "[deploy] ${SERVICE_NAME}: current sha=${BEFORE_SHA}"

git fetch origin "${BRANCH}"
git reset --hard "origin/${BRANCH}"
AFTER_SHA="$(git rev-parse HEAD)"
echo "[deploy] ${SERVICE_NAME}: target sha=${AFTER_SHA}"

npm ci --no-audit --no-fund
npm run build:shared
npm -w "apps/${SERVICE_NAME}" run build

pm2 restart "${SERVICE_NAME}" --update-env || \
pm2 start "apps/${SERVICE_NAME}/dist/main.js" \
  --name "${SERVICE_NAME}" \
  --cwd "${REPO_DIR}/apps/${SERVICE_NAME}" \
  --node-args "-r tsconfig-paths/register" \
  --time

sleep 8
if ! curl -fsS "http://localhost:${SERVICE_PORT}/api/v1/health" >/dev/null; then
  echo "[deploy] ${SERVICE_NAME}: health failed, rolling back to ${BEFORE_SHA}" >&2

  git reset --hard "${BEFORE_SHA}"
  npm ci --no-audit --no-fund
  npm run build:shared
  npm -w "apps/${SERVICE_NAME}" run build
  pm2 restart "${SERVICE_NAME}" --update-env

  exit 1
fi

if ! curl -fsS "http://localhost:${SERVICE_PORT}/api/v1/health/ready" >/dev/null; then
  echo "[deploy] ${SERVICE_NAME}: readiness failed, rolling back to ${BEFORE_SHA}" >&2

  git reset --hard "${BEFORE_SHA}"
  npm ci --no-audit --no-fund
  npm run build:shared
  npm -w "apps/${SERVICE_NAME}" run build
  pm2 restart "${SERVICE_NAME}" --update-env

  exit 1
fi

echo "[deploy] ${SERVICE_NAME}: success ${AFTER_SHA}"
