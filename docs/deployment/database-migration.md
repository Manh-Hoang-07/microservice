# Database Migration

Quan ly database schema bang Prisma Migration.
Moi service co database rieng va quan ly migration doc lap.

## Cau truc

```
apps/<service>/
├── prisma/
│   ├── schema.prisma              # Dinh nghia schema
│   └── migrations/                # Cac file migration (SQL)
│       ├── 20260101_init/
│       │   └── migration.sql
│       └── 20260215_add_column/
│           └── migration.sql
```

Service co database (co Prisma):
- auth-service, iam-service, config-service
- notification-service, marketing-service, introduction-service
- post-service, comic-service

Service **khong co** database:
- storage-service, web-api-service

---

## Trong moi truong Development

### Tao migration moi

Sau khi sua `schema.prisma`, chay:

```bash
cd apps/comic-service
npx prisma migrate dev --name mo-ta-thay-doi
```

Lenh nay se:
1. Tao file SQL trong `prisma/migrations/<timestamp>_<name>/`
2. Ap dung migration vao DB local
3. Tao lai Prisma Client

### Ap dung migration (chua co migration moi, chi sync)

```bash
npm -w apps/comic-service run prisma:migrate
```

### Ap dung cho tat ca service

```bash
npm run prisma:migrate
```

### Reset DB (xoa toan bo du lieu)

```bash
cd apps/comic-service
npx prisma migrate reset
```

> Chi dung trong dev. **TUYET DOI KHONG** chay tren production.

---

## Trong moi truong Production

### Ap dung migration

```bash
npx --no prisma migrate deploy --schema=apps/comic-service/prisma/schema.prisma
```

Hoac cho tat ca service:

```bash
npm run prisma:deploy
```

### Trong Docker

Entrypoint (`infrastructure/docker/entrypoint.sh`) **tu dong chay** `prisma migrate deploy` moi khi container khoi dong.
- Idempotent: chay lai khong loi neu da up-to-date
- Bo qua: dat `SKIP_MIGRATIONS=1` trong env

### Trong VPS (PM2)

Chay migration **truoc khi** restart service:

```bash
npx --no prisma migrate deploy --schema=apps/comic-service/prisma/schema.prisma
pm2 restart comic-service
```

---

## Viet migration an toan

### An toan (chay duoc luon)

| Thao tac | Ghi chu |
|----------|---------|
| Them bang moi | Khong anh huong gi |
| Them cot nullable | Code cu van chay binh thuong |
| Them index | An toan (nhung nen dung CONCURRENTLY cho bang lon) |

### Can than (can deploy nhieu buoc)

| Thao tac | Rui ro | Cach lam an toan |
|----------|--------|------------------|
| Xoa cot | Code cu van SELECT cot do | (1) Bo doc cot trong code → (2) Deploy → (3) Xoa cot trong migration tiep |
| Doi ten cot | Code cu dung ten cu | Them cot moi → backfill → doi code → xoa cot cu |
| Them NOT NULL khong default | INSERT cu se loi | Them nullable → backfill → set NOT NULL |
| Doi kieu du lieu | Cast ngam co the loi | Them cot moi kieu moi → backfill → doi code → xoa cot cu |
| Them unique index | Loi neu co du lieu trung | Lam sach du lieu trung truoc trong migration |

### Khong nen lam

- Tron DDL + DML trong 1 migration ma khong idempotent
- Migration lock bang lon qua 1 giay (dung `pg_repack` thay the)
- Chay `prisma migrate dev` tren production

---

## Rollback migration

Prisma **khong** tao down-migration tu dong. Cac cach rollback:

### 1. Forward-fix (khuyen nghi)

Viet migration moi de dao nguoc thay doi:

```bash
cd apps/comic-service
npx prisma migrate dev --name revert-ten-thay-doi
```

### 2. Restore tu backup (truong hop nghiem trong)

```bash
gunzip -c /var/backups/comic-platform/<ngay>/<db>.sql.gz \
  | pg_restore -h <host> -U postgres -d <db> --clean --if-exists
```

> Se mat du lieu tu luc backup den luc restore.

### 3. Revert code (neu migration chi them cot/bang)

Neu migration chi them cot hoac bang moi (khong xoa/doi gi):
- Rollback code ve phien ban cu
- Schema moi van nam do nhung vo hai — code cu khong doc cac cot moi

---

## Loi thuong gap

| Loi | Nguyen nhan | Cach xu ly |
|-----|-------------|------------|
| `prisma migrate dev` tren production | Lenh nay co the xoa va tao lai DB | Luon dung `prisma migrate deploy` |
| Migration drift | Sua truc tiep DB bang psql | Xoa migration sai trong `_prisma_migrations`, tao lai |
| 2 service dung chung 1 DB | Prisma giai dinh 1 service = 1 DB | Tach DB, moi service quan ly rieng |
| Loi `--skip-generate` | Prisma 7 da xoa flag nay | Bo `--skip-generate`, chi dung `migrate deploy` |
