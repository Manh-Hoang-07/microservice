---
description: Quy tac xu ly loi va validation
globs: apps/*/src/**/*.ts
---

# Error Handling & Validation

Dung NestJS exceptions ket hop i18n: `throw new NotFoundException(t(this.i18n, 'domain.NOT_FOUND'))`.
GlobalExceptionFilter tu dong wrap thanh ApiResponse format chuan.

Prisma error code thuong gap: P2002 (unique violation) → ConflictException, P2025 (not found) → NotFoundException.

Global ValidationPipe da cau hinh: whitelist (loai field la), forbidNonWhitelisted (throw loi), transform (convert type).
DTO dung class-validator decorators. KHONG validate thu cong nhung gi class-validator da lam.

Pipes co san trong `@package/common`:
- `ParseBigIntPipe` — parse param thanh bigint, reject neu khong hop le
- `SanitizeHtmlPipe` — loc HTML nguy hiem, chi giu cac tag an toan

Response format dung `ResponseUtil` khi can custom (success, created, updated, deleted, paginated, notFound, badRequest...). TransformInterceptor tu dong wrap response mac dinh.

I18n file nam trong `apps/<service>/src/i18n/`. Helper: `t(this.i18n, 'key')`.
