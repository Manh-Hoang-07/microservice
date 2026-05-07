# Deploy VPS bang PM2

Huong dan deploy truc tiep len VPS bang PM2 (khong dung Docker cho service).
Phu hop khi VPS khong du resource chay Docker hoac muon don gian hoa.

---

## Yeu cau

- **VPS**: Ubuntu 20.04+ / Debian 11+
- **Node.js** >= 20
- **PM2** (process manager)
- **PostgreSQL** 15+ (co the dung managed DB)
- **Redis** 7+ (co the dung managed Redis)
- **Kafka** (neu dung `EVENT_DRIVER=kafka`)

---

## Thiet lap VPS (lam 1 lan)

### 1. Cai runtime

```bash
sudo apt update
sudo apt install -y git curl build-essential

# Cai Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Cai PM2
sudo npm i -g pm2

# Kiem tra
node -v && npm -v && pm2 -v
```

### 2. Tao user deploy va thu muc

```bash
sudo useradd -m -s /bin/bash deploy
sudo mkdir -p /srv/microservice
sudo chown -R deploy:deploy /srv/microservice
sudo mkdir -p /var/log/comic-platform
sudo chown -R deploy:deploy /var/log/comic-platform
```

### 3. Clone code va cai dependencies

```bash
sudo -u deploy bash -lc '
  cd /srv/microservice
  git clone <REPO_URL> app
  cd app
  npm ci --no-audit --no-fund
'
```

---

## Cau hinh

### Tao file .env cho tung service

Moi service can file `.env` trong thu muc rieng cua no:

```bash
cd /srv/microservice/app
cp apps/auth-service/.env.example apps/auth-service/.env
# Sua gia tri production thuc te
```

Cac gia tri quan trong:

| Bien | Mo ta |
|------|-------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | Connection string PostgreSQL |
| `REDIS_URL` | Connection string Redis |
| `AUTH_JWKS_URL` | URL JWKS cua auth-service |
| `INTERNAL_API_SECRET` | Secret >= 32 ky tu, giong nhau tren moi service |
| `KAFKA_BROKERS` | Dia chi Kafka broker |
| `EVENT_DRIVER` | `kafka` (production) hoac `local` |

### Tao JWT key pair

```bash
bash scripts/generate-keys.sh
```

Copy key vao `.env` cua auth-service.

---

## Deploy

### Phuong an A: Tat ca service tren 1 VPS

Dung `ecosystem.config.js` de quan ly tat ca 10 service bang PM2.

#### Build va khoi dong

```bash
cd /srv/microservice/app
npm run build:shared
npm run build:apps
npm run prisma:deploy       # Chay migration cho tat ca service co DB
pm2 start ecosystem.config.js
pm2 save
pm2 startup systemd -u deploy --hp /home/deploy
```

#### Deploy code moi

```bash
cd /srv/microservice/app
git pull origin master
npm ci --no-audit --no-fund
npm run build:shared
npm run build:apps
npm run prisma:deploy
pm2 reload ecosystem.config.js --update-env
```

#### Kiem tra

```bash
pm2 status                  # Xem trang thai tat ca service
pm2 logs auth-service       # Xem log 1 service
curl http://localhost:3001/api/v1/health
```

---

### Phuong an B: Moi VPS 1 service

Moi VPS chi chay 1 service. Deploy va rollback doc lap.

#### Build va khoi dong 1 service

Vi du VPS chay `comic-service`:

```bash
cd /srv/microservice/app
npm run build:shared
npm -w apps/comic-service run build

# Chay migration (neu service co DB)
npx --no prisma migrate deploy --schema=apps/comic-service/prisma/schema.prisma

# Khoi dong bang PM2
pm2 start apps/comic-service/dist/main.js \
  --name comic-service \
  --cwd /srv/microservice/app/apps/comic-service \
  --node-args "-r tsconfig-paths/register" \
  --time

pm2 save
pm2 startup systemd -u deploy --hp /home/deploy
```

#### Script deploy tu dong

Tao file `/srv/microservice/deploy.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail

SERVICE_NAME="${1:?Thieu ten service. Vi du: ./deploy.sh comic-service 3009}"
SERVICE_PORT="${2:?Thieu port. Vi du: ./deploy.sh comic-service 3009}"
BRANCH="${3:-master}"
REPO_DIR="/srv/microservice/app"

cd "$REPO_DIR"
BEFORE_SHA="$(git rev-parse HEAD)"

# Lay code moi
git fetch origin "$BRANCH"
git reset --hard "origin/$BRANCH"
AFTER_SHA="$(git rev-parse HEAD)"
echo "[deploy] ${SERVICE_NAME}: ${BEFORE_SHA} -> ${AFTER_SHA}"

# Build
npm ci --no-audit --no-fund
npm run build:shared
npm -w "apps/${SERVICE_NAME}" run build

# Restart
pm2 restart "${SERVICE_NAME}" --update-env || \
pm2 start "apps/${SERVICE_NAME}/dist/main.js" \
  --name "${SERVICE_NAME}" \
  --cwd "${REPO_DIR}/apps/${SERVICE_NAME}" \
  --node-args "-r tsconfig-paths/register" \
  --time

# Health check
sleep 8
if ! curl -fsS "http://localhost:${SERVICE_PORT}/api/v1/health" >/dev/null; then
  echo "[deploy] Health check that bai! Rollback..."
  git reset --hard "${BEFORE_SHA}"
  npm ci --no-audit --no-fund
  npm run build:shared
  npm -w "apps/${SERVICE_NAME}" run build
  pm2 restart "${SERVICE_NAME}" --update-env
  exit 1
fi

echo "[deploy] Thanh cong: ${SERVICE_NAME}@${AFTER_SHA}"
```

Su dung:

```bash
chmod +x /srv/microservice/deploy.sh
/srv/microservice/deploy.sh comic-service 3009
```

---

## Rollback

### Rollback nhanh (khong lien quan migration)

```bash
cd /srv/microservice/app
git log --oneline -10          # Tim SHA can rollback
git reset --hard <SHA_CU>
npm ci --no-audit --no-fund
npm run build:shared
npm -w apps/comic-service run build
pm2 restart comic-service --update-env
```

### Rollback co lien quan migration

Prisma khong co down-migration. Phai dung forward-fix:
1. Viet migration moi de dao nguoc thay doi
2. Xem chi tiet: [docs/deployment/database-migration.md](database-migration.md)

---

## CI/CD voi GitHub Actions

### Single-host (1 workflow deploy tat ca)

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [master]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.VPS_HOST }}
          username: deploy
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /srv/microservice/app
            git pull origin master
            npm ci --no-audit --no-fund
            npm run build:shared && npm run build:apps
            npm run prisma:deploy
            pm2 reload ecosystem.config.js --update-env
```

### Multi-host (moi service 1 workflow)

```yaml
# .github/workflows/deploy-comic.yml
name: Deploy Comic Service
on:
  push:
    branches: [master]
    paths:
      - "apps/comic-service/**"
      - "shared/**"
      - "package-lock.json"

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy comic-service
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.COMIC_HOST }}
          username: deploy
          key: ${{ secrets.COMIC_SSH_KEY }}
          script: |
            /srv/microservice/deploy.sh comic-service 3009
```

Lap lai tuong tu cho moi service, moi file workflow co `paths` filter rieng.

---

## Cac lenh PM2 thuong dung

| Lenh | Mo ta |
|------|-------|
| `pm2 status` | Xem trang thai tat ca service |
| `pm2 logs <service>` | Xem log realtime |
| `pm2 restart <service>` | Restart 1 service |
| `pm2 reload ecosystem.config.js` | Reload tat ca (zero-downtime) |
| `pm2 stop <service>` | Dung 1 service |
| `pm2 delete <service>` | Xoa service khoi PM2 |
| `pm2 monit` | Dashboard monitor |
| `pm2 save` | Luu danh sach process |
| `pm2 startup` | Cau hinh tu khoi dong khi reboot |

## Checklist truoc khi go-live

- [ ] `NODE_ENV=production` trong env
- [ ] `INTERNAL_API_SECRET` >= 32 ky tu va dong bo tren moi service
- [ ] JWT key pair da tao va cau hinh dung
- [ ] Migration da chay thanh cong
- [ ] Health check `/api/v1/health` tra 200 tren moi service
- [ ] PM2 da `save` va `startup` (tu khoi dong khi reboot)
- [ ] Log khong co loi trong 10 phut dau
- [ ] Co SHA rollback da test
