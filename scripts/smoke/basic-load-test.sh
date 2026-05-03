#!/usr/bin/env bash
set -euo pipefail

BASE_URL=${1:-http://localhost}
CONCURRENT_REQUESTS=${2:-10}
TOTAL_REQUESTS=${3:-100}

echo "🚀 Running basic load test..."
echo "Target: ${BASE_URL}"
echo "Concurrent requests: ${CONCURRENT_REQUESTS}"
echo "Total requests: ${TOTAL_REQUESTS}"
echo ""

# Test auth service health endpoint
echo "Testing auth-service health endpoint..."
ab -n ${TOTAL_REQUESTS} -c ${CONCURRENT_REQUESTS} -g /dev/null "${BASE_URL}:3002/api/v1/health" | grep -E "(Requests per second|Time per request|Failed requests)"

echo ""
echo "Testing web-api-service health endpoint..."
ab -n ${TOTAL_REQUESTS} -c ${CONCURRENT_REQUESTS} -g /dev/null "${BASE_URL}:3006/api/v1/health" | grep -E "(Requests per second|Time per request|Failed requests)"

echo ""
echo "Testing comic-service health endpoint..."
ab -n ${TOTAL_REQUESTS} -c ${CONCURRENT_REQUESTS} -g /dev/null "${BASE_URL}:3001/api/v1/health" | grep -E "(Requests per second|Time per request|Failed requests)"

echo ""
echo "📈 Load test completed. Check results above."
echo "Expected: <500ms response time, 0 failed requests, >100 RPS"