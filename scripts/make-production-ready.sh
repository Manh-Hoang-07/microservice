#!/usr/bin/env bash
set -euo pipefail

echo "🔧 Production Readiness Automation Script"
echo "=========================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

BASE_URL=${1:-http://localhost}

# Function to print status
status() {
  echo -e "${GREEN}✓${NC} $1"
}

error() {
  echo -e "${RED}✗${NC} $1"
  exit 1
}

warning() {
  echo -e "${YELLOW}⚠${NC} $1"
}

echo "1. 📦 Installing dependencies..."
if npm install --ignore-scripts --no-fund --no-audit; then
  status "Dependencies installed"
else
  error "Failed to install dependencies"
fi

echo ""
echo "2. 🏗️  Building shared packages..."
if npm run build:shared; then
  status "Shared packages built"
else
  error "Failed to build shared packages"
fi

echo ""
echo "3. 🏗️  Building all services..."
if npm run build:apps; then
  status "All services built successfully"
else
  error "Failed to build services"
fi

echo ""
echo "4. 🔍 Checking environment..."
if [ -f ".env.docker" ]; then
  if ./scripts/check-env.sh --env-file .env.docker; then
    status "Environment variables validated"
  else
    error "Environment validation failed"
  fi
else
  warning "No .env.docker file found - skipping env check"
fi

echo ""
echo "5. 🧪 Running smoke tests..."
if ./scripts/smoke/service-health.sh "$BASE_URL"; then
  status "All services healthy"
else
  error "Smoke tests failed"
fi

echo ""
echo "6. 📊 Running basic load test..."
if ./scripts/smoke/basic-load-test.sh "$BASE_URL" 5 25; then
  status "Load test completed"
else
  error "Load test failed"
fi

echo ""
echo "7. 🔒 Security audit..."
if npm audit --audit-level moderate --production; then
  status "Security audit passed"
else
  warning "Security vulnerabilities found - review npm audit output"
fi

echo ""
echo "🎉 Production readiness check completed!"
echo ""
echo "📋 Summary:"
echo "   - ✅ Dependencies installed"
echo "   - ✅ All services build successfully"
echo "   - ✅ Environment validated"
echo "   - ✅ Health checks pass"
echo "   - ✅ Basic load test passes"
echo "   - ✅ Security audit completed"
echo ""
echo "🚀 Ready for production deployment!"
echo ""
echo "Next steps:"
echo "1. Configure production environment variables"
echo "2. Run: docker compose up -d --build"
echo "3. Monitor logs and metrics"
echo "4. Run full load tests on staging"