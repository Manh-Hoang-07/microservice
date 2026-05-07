Chay database migration. Tham so: $ARGUMENTS

Cach dung:
- `/migrate dev auth-service add-email-field` → Tao migration moi cho auth-service
- `/migrate deploy` → Ap dung migration cho tat ca service (production)
- `/migrate deploy comic-service` → Ap dung migration cho 1 service
- `/migrate status` → Kiem tra trang thai migration

## Xu ly

### Truong hop: `dev <service> <ten-migration>`
Tao migration moi trong development:
```bash
cd apps/<service>
npx prisma migrate dev --name <ten-migration>
```
Sau do chay `npx prisma generate` de cap nhat client.

### Truong hop: `deploy` (khong chi dinh service)
Ap dung migration cho tat ca service:
```bash
npm run prisma:deploy
```

### Truong hop: `deploy <service>`
Ap dung migration cho 1 service:
```bash
npx --no prisma migrate deploy --schema=apps/<service>/prisma/schema.prisma
```

### Truong hop: `status`
Kiem tra trang thai migration:
```bash
cd apps/<service>
npx prisma migrate status
```

## Luu y
- `migrate dev` chi dung trong development — tao file SQL moi
- `migrate deploy` dung trong production — chi ap dung migration co san
- TUYET DOI KHONG chay `migrate dev` tren production
- Docker entrypoint tu dong chay `migrate deploy` khi container start
