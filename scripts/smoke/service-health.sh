#!/usr/bin/env bash
set -euo pipefail

BASE_URL=${1:-http://localhost}
# Service ports (must match each service's default port config)
declare -A SERVICES=(
  ["comic-service"]="3001"
  ["auth-service"]="3002"
  ["storage-service"]="3003"
  ["notification-service"]="3004"
  ["config-service"]="3005"
  ["web-api-service"]="3006"
  ["post-service"]="3007"
  ["iam-service"]="3008"
  ["marketing-service"]="3009"
  ["introduction-service"]="3010"
)

echo "🔍 Checking health endpoints for all services..."
for service in "${!SERVICES[@]}"; do
  port="${SERVICES[$service]}"
  echo -n "- ${service} (${BASE_URL}:${port}/api/v1/health) ... "

  # Check /health endpoint
  if curl -fsS --max-time 10 "${BASE_URL}:${port}/api/v1/health" >/dev/null; then
    echo "✅"
  else
    echo "❌ FAILED"
    exit 1
  fi
done

echo ""
echo "📊 Checking Prometheus metrics endpoints..."
for service in "${!SERVICES[@]}"; do
  port="${SERVICES[$service]}"
  echo -n "- ${service} metrics (${BASE_URL}:${port}/api/v1/metrics) ... "

  # Check /metrics endpoint has app_http_requests_total
  if curl -fsS --max-time 10 "${BASE_URL}:${port}/api/v1/metrics" | grep -q 'app_http_requests_total'; then
    echo "✅"
  else
    echo "❌ FAILED"
    exit 1
  fi
done

echo ""
echo "🔐 Checking JWKS endpoint on auth-service..."
if curl -fsS --max-time 10 "${BASE_URL}:3002/.well-known/jwks.json" >/dev/null; then
  echo "✅ JWKS endpoint OK"
else
  echo "❌ JWKS endpoint FAILED"
  exit 1
fi

echo ""
echo "🎉 All smoke checks passed! Services are healthy and metrics are exposed."
