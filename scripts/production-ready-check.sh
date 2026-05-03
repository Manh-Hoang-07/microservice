#!/usr/bin/env bash
set -euo pipefail

echo "🚀 Production Readiness Check"
echo "=============================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BASE_URL=${1:-http://localhost}

echo "1. 🔍 Checking environment variables..."
if ./scripts/check-env.sh --env-file .env.docker; then
  echo -e "${GREEN}✓ Environment variables OK${NC}"
else
  echo -e "${RED}✗ Environment variables FAILED${NC}"
  exit 1
fi

echo ""
echo "2. 🏗️  Checking service builds..."
if npm run build:apps; then
  echo -e "${GREEN}✓ All services build successfully${NC}"
else
  echo -e "${RED}✗ Build FAILED${NC}"
  exit 1
fi

echo ""
echo "3. 🐳 Checking Docker images..."
# This would require docker to be running, skip for now
echo -e "${YELLOW}⚠ Docker image check skipped (requires running containers)${NC}"

echo ""
echo "4. 🔍 Running smoke tests..."
if ./scripts/smoke/service-health.sh "$BASE_URL"; then
  echo -e "${GREEN}✓ All services healthy and metrics exposed${NC}"
else
  echo -e "${RED}✗ Smoke tests FAILED${NC}"
  exit 1
fi

echo ""
echo "5. 📊 Running basic load test..."
if ./scripts/smoke/basic-load-test.sh "$BASE_URL" 5 50; then
  echo -e "${GREEN}✓ Load test completed${NC}"
else
  echo -e "${RED}✗ Load test FAILED${NC}"
  exit 1
fi

echo ""
echo "6. 🔒 Checking security..."
echo -e "${YELLOW}⚠ Security scan (OWASP ZAP) should be run manually on staging/production${NC}"

echo ""
echo "🎉 Production readiness check completed!"
echo ""
echo "Next steps:"
echo "1. Push this code to your repository"
echo "2. Deploy to staging environment"
echo "3. Run full load tests with k6/Artillery"
echo "4. Run security scan with OWASP ZAP"
echo "5. Deploy to production with proper environment variables"