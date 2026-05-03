# Multi-Host Production (10 services / 10 targets) — Detailed Runbook

Tài liệu này là bản triển khai chi tiết cho mô hình:

- 10 microservices
- 10 target hosts (hoặc 10 VM groups)
- deploy độc lập từng service
- rollback độc lập từng service

Không dùng Docker runtime. Chạy process bằng `pm2` hoặc `systemd`.

## 1) Sơ đồ target mẫu

| Service | Port | Host |
|---|---:|---|
| `auth-service` | 3002 | `auth-prod-01` |
| `comic-service` | 3001 | `comic-prod-01` |
| `config-service` | 3005 | `config-prod-01` |
| `iam-service` | 3008 | `iam-prod-01` |
| `introduction-service` | 3010 | `introduction-prod-01` |
| `marketing-service` | 3009 | `marketing-prod-01` |
| `notification-service` | 3004 | `notification-prod-01` |
| `post-service` | 3007 | `post-prod-01` |
| `storage-service` | 3003 | `storage-prod-01` |
| `web-api-service` | 3006 | `web-api-prod-01` |

## 2) Chuẩn bị mỗi host (làm 1 lần)

Ví dụ host `comic-prod-01` chạy `comic-service`.

### 2.1 Cài runtime

```bash
sudo apt update
sudo apt install -y git curl build-essential
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm i -g pm2
node -v
npm -v
pm2 -v
```

### 2.2 Tạo user deploy + thư mục

```bash
sudo useradd -m -s /bin/bash deploy || true
sudo mkdir -p /srv/microservice
sudo chown -R deploy:deploy /srv/microservice
sudo mkdir -p /var/log/comic-platform
sudo chown -R deploy:deploy /var/log/comic-platform
```

### 2.3 Clone code

```bash
sudo -u deploy -H bash -lc '
cd /srv/microservice
git clone <YOUR_REPO_URL> app
cd app
npm ci --no-audit --no-fund
'
```

## 3) Cấu hình env theo từng service

Mỗi host chỉ cần env cho service nó chạy (và shared packages mà service dùng).

Ví dụ với `comic-service`:

```bash
sudo -u deploy -H bash -lc '
cd /srv/microservice/app
cp apps/comic-service/.env.example apps/comic-service/.env
'
```

Sau đó sửa `apps/comic-service/.env`:

- `NODE_ENV=production`
- `PORT=3001`
- `DATABASE_URL=postgresql://.../comic_db`
- `REDIS_URL=redis://...`
- `AUTH_JWKS_URL=https://auth.your-domain/.well-known/jwks.json`
- `INTERNAL_API_SECRET=<same secret used cross-services>`
- `KAFKA_BROKERS=<broker-list>`

> Quy tắc: `INTERNAL_API_SECRET` phải giống nhau trên các service cần gọi nội bộ.

## 4) Chạy service bằng PM2 (không dùng ecosystem chung)

Khuyến nghị multi-host: mỗi host chỉ chạy 1 service bằng 1 lệnh rõ ràng.

Ví dụ `comic-service`:

```bash
sudo -u deploy -H bash -lc '
cd /srv/microservice/app
npm run build:shared
npm -w apps/comic-service run build
pm2 start apps/comic-service/dist/main.js \
  --name comic-service \
  --cwd /srv/microservice/app/apps/comic-service \
  --node-args "-r tsconfig-paths/register" \
  --time
pm2 save
pm2 startup systemd -u deploy --hp /home/deploy
'
```

Health check:

```bash
curl -fsS http://localhost:3001/api/v1/health
curl -fsS http://localhost:3001/api/v1/health/ready
```

## 5) Deploy script chuẩn cho từng host (không migrate DB)

Tạo file `/srv/microservice/deploy-service.sh` trên mỗi host:

```bash
#!/usr/bin/env bash
set -euo pipefail

SERVICE_NAME="${1:?service name required}"
SERVICE_PORT="${2:?service port required}"
BRANCH="${3:-master}"
REPO_DIR="/srv/microservice/app"

cd "$REPO_DIR"
BEFORE_SHA="$(git rev-parse HEAD)"

git fetch origin "$BRANCH"
git reset --hard "origin/$BRANCH"
AFTER_SHA="$(git rev-parse HEAD)"
echo "[deploy] ${SERVICE_NAME}: ${BEFORE_SHA} -> ${AFTER_SHA}"

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
  echo "[deploy] health failed, rollback..."
  git reset --hard "${BEFORE_SHA}"
  npm ci --no-audit --no-fund
  npm run build:shared
  npm -w "apps/${SERVICE_NAME}" run build
  pm2 restart "${SERVICE_NAME}" --update-env
  exit 1
fi

echo "[deploy] success ${SERVICE_NAME}@${AFTER_SHA}"
```

Cấp quyền:

```bash
chmod +x /srv/microservice/deploy-service.sh
```

Chạy deploy thủ công:

```bash
/srv/microservice/deploy-service.sh comic-service 3001
```

## 5.1 Script có sẵn ngay trong repo (10 service = 10 file)

Repo đã có sẵn:

- `scripts/deploy/deploy-service.sh` (script lõi)
- `apps/<service>/deploy.sh` (wrapper per-service)

Ví dụ trên host chạy `comic-service`:

```bash
cd /srv/microservice/app
chmod +x scripts/deploy/deploy-service.sh apps/comic-service/deploy.sh
./apps/comic-service/deploy.sh
```

Deploy branch khác:

```bash
./apps/comic-service/deploy.sh release/2026-05-03
```

## 6) Rollback độc lập từng service

Rollback nhanh (không migration):

```bash
cd /srv/microservice/app
git log --oneline -20
git reset --hard <PREVIOUS_SHA>
npm ci --no-audit --no-fund
npm run build:shared
npm -w apps/comic-service run build
pm2 restart comic-service --update-env
```

Nếu lỗi do migration schema:

- Không chạy down-migration tự động.
- Dùng forward-fix migration theo `docs/MIGRATIONS.md`.

## 7) CI/CD multi-host (GitHub Actions)

Mỗi service 1 workflow riêng (`deploy-comic.yml`, `deploy-auth.yml`, ...), trigger khi path service thay đổi.

Ví dụ trigger cho `comic-service`:

```yaml
on:
  push:
    branches: [master]
    paths:
      - "apps/comic-service/**"
      - "shared/**"
      - "package-lock.json"
      - ".github/workflows/deploy-comic.yml"
```

Step deploy qua SSH:

```yaml
- name: Deploy comic-service
  uses: appleboy/ssh-action@v1
  with:
    host: ${{ secrets.COMIC_HOST }}
    username: ${{ secrets.COMIC_USER }}
    key: ${{ secrets.COMIC_SSH_KEY }}
    script: |
      /srv/microservice/deploy-service.sh comic-service 3001
```

Lặp lại cho từng service bằng host/secret riêng.

## 8) DB migrations chạy thủ công (không nằm trong deploy script)

Chạy migrate trước khi deploy code mới cho các service có Prisma schema:

```bash
npx --no prisma migrate deploy --schema=apps/auth-service/prisma/schema.prisma
npx --no prisma migrate deploy --schema=apps/comic-service/prisma/schema.prisma
npx --no prisma migrate deploy --schema=apps/config-service/prisma/schema.prisma
npx --no prisma migrate deploy --schema=apps/iam-service/prisma/schema.prisma
npx --no prisma migrate deploy --schema=apps/introduction-service/prisma/schema.prisma
npx --no prisma migrate deploy --schema=apps/marketing-service/prisma/schema.prisma
npx --no prisma migrate deploy --schema=apps/notification-service/prisma/schema.prisma
npx --no prisma migrate deploy --schema=apps/post-service/prisma/schema.prisma
```

Service không có Prisma schema:

- `storage-service`
- `web-api-service`

## 9) Checklist go-live cho mỗi service

- [ ] Env đúng và không dùng giá trị mặc định yếu
- [ ] `npm run build:shared` + `npm -w apps/<service> run build` pass
- [ ] `prisma migrate deploy` pass (nếu có DB)
- [ ] `/api/v1/health` và `/api/v1/health/ready` trả 200
- [ ] Log không có crash loop trong 10 phút đầu
- [ ] Có rollback SHA gần nhất đã test

## 10) Ghi chú trạng thái repo hiện tại

- `.github/workflows/deploy.yml` hiện vẫn là workflow single-host (deploy all-in-one).
- Với multi-host thực sự, bạn nên tách thành workflow per-service như mục 7.

