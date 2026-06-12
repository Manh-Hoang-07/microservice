---
description: Quy tac bao mat va phan quyen
globs: apps/*/src/**/*.ts
---

# Bao mat & Phan quyen

## Decorators xac thuc (5 loai trong `@package/common`)

- `@Permission('module.action')` — **Admin layer**. JwtGuard verify token, RbacGuard goi IAM kiem tra quyen toan cuc. VD: `@Permission('post.manage')`.
- `@PermissionGroup('module.action', { param?: string })` — **Group layer**. JwtGuard verify token, RbacGuard skip IAM toan cuc, GroupPermissionGuard goi IAM kiem tra quyen trong pham vi nhom. `groupId` lay tu route param (mac dinh ten param la `groupId`, tuy chinh qua `param` option). VD: `@PermissionGroup('post.create')`.
- `@Authenticated()` — **User layer**. Chi yeu cau dang nhap, KHONG check permission cu the. JwtGuard verify token, RbacGuard skip IAM. Dung cho `/me`, `/profile`, bookmarks, comments, ...
- `@Public()` — **Public layer**. Cong khai, khong can dang nhap. Van try set user neu co token.
- `@Internal()` + `@UseGuards(InternalGuard)` — Route noi bo giua cac service. Xac thuc bang header `x-internal-secret`.
- `@AuditLog({ action })` — Ghi audit trail JSON cho create/update/delete. Tu dong redact field nhay cam.

## Thu tu Guard chain (dang ky trong AppModule)

```
ThrottlerGuard → JwtGuard → RbacGuard → GroupPermissionGuard
```

1. **ThrottlerGuard** — rate limiting
2. **JwtGuard** — verify JWT token, set `req.user`
3. **RbacGuard** — xu ly `@Permission()` (goi IAM) va `@Authenticated()` (chi check token)
4. **GroupPermissionGuard** — xu ly `@PermissionGroup()`: lay `groupId` tu route param, goi IAM endpoint `/internal/groups/member-permissions?userId=X&groupId=Y`, cache Redis 60s (version-tracked)

## Thong tin user & actorId

`req.user` chua JWT payload. `req.user.sub` la user ID. Truyen xuong service lam `created_user_id` / `updated_user_id`.

## GroupPermissionGuard — chi tiet

- Goi IAM: `GET /internal/groups/member-permissions?userId=...&groupId=...` → `{ codes: ['post.view', 'post.create', ...] }`
- Cache per user+group, TTL 60s, versioned theo `rbac:meta.version` (khi IAM bump version, cache tu dong expire)
- Circuit breaker: mo sau 5 loi lien tiep → ForbiddenException (fail-closed)
- Timeout: 5s per request
- Dev mode bypass: neu `IAM_INTERNAL_URL` khong config + `NODE_ENV=development` → skip guard

## RbacGuard (quyen toan cuc)

- Cache Redis 60s, versioned theo `rbac:meta.version`
- Circuit breaker mo sau 5 loi. Dev mode (NODE_ENV=development va khong cau hinh IAM_INTERNAL_URL) cho phep tat ca. Staging/production fail-closed.
- IAM endpoint: `GET /internal/rbac/effective-permissions?userId=...`

## INTERNAL_API_SECRET

Phai giong nhau tren moi service. Header `x-internal-secret`. So sanh timing-safe.
