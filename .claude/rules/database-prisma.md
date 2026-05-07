---
description: Quy tac lam viec voi Prisma va database
globs: apps/*/prisma/**,apps/*/src/**/*.repository.ts
---

# Database & Prisma

Moi service 1 DB PostgreSQL rieng. Schema tai `apps/<service>/prisma/schema.prisma`.

Repository ke thua `PrismaRepository` tu `@package/common` — co san findAll, findById, create, update, delete, count, exists. Override `buildWhere(filter)` de chuyen filter object thanh Prisma where clause.

Transaction cho thao tac nhieu bang: `this.prisma.$transaction(async (tx) => { ... })`.

BigInt: Prisma dung bigint cho ID. `ParseBigIntPipe` trong controller, `BigIntSerializationInterceptor` tu dong convert thanh string trong response.

Search cap o 100 ky tu trong buildWhere de chong DoS. Sort field dung allowlist.

Migration:
- Dev: `npx prisma migrate dev --name mo-ta` (tao file SQL moi)
- Production: `npx prisma migrate deploy` (chi ap dung, KHONG tao moi)
- Docker entrypoint tu dong chay migrate deploy khi container start
- TUYET DOI KHONG chay migrate dev tren production

Thay doi schema an toan: them bang/cot nullable. Nguy hiem: xoa cot (bo code truoc → deploy → xoa cot sau), them NOT NULL (nullable truoc → backfill → set NOT NULL).
