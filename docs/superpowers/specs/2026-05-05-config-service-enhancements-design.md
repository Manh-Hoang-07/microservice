# Config Service Enhancements Design

## Context

Đối chiếu comic monolith (`D:/comic/src/modules/system/`) với microservice config-service, phát hiện 2 chức năng thiếu và 1 dependency cần bổ sung.

## Changes Overview

| # | Scope | Change |
|---|-------|--------|
| 1 | IAM Service | Thêm `GET /internal/rbac/permissions` endpoint |
| 2 | Config Service | Thêm User Menu module (`GET /menus/user`) |
| 3 | Config Service | Thêm Cache Purge module (`GET /cache/flush`) |
| 4 | Shared (RedisService) | Thêm `flushDb()` method |

---

## 1. IAM Service — Internal Permissions Endpoint

### Problem

Config-service cần danh sách permission codes của user để lọc menu tree. Hiện tại IAM chỉ expose `POST /internal/rbac/check` (trả boolean), không có endpoint trả danh sách.

### Endpoint

```
GET /internal/rbac/permissions?userId=123&groupId=456
```

- Guard: `@Internal()` (x-internal-secret header)
- `groupId` optional — không truyền thì lấy system scope

### Response

```json
{ "permissions": ["menu.manage", "user.view", "config.manage"] }
```

### Implementation

- Thêm method `getPermissions()` vào `InternalRbacController` hiện có tại `apps/iam-service/src/internal/controllers/rbac-check.controller.ts`
- Gọi `rbacService.getPermissions(userId, groupId)` đã có sẵn → convert `Set<string>` → array
- Không cần thêm service/repo mới

---

## 2. Config Service — User Menu Module

### Problem

Comic monolith có `UserMenuController` tại `POST /admin/user/menus` cho phép user đăng nhập lấy menu tree được lọc theo permission. Microservice config-service chỉ có public menu (anonymous) và admin CRUD.

### Endpoint

```
GET /menus/user?group=admin
```

- Guard: JWT auth (`@Permission('user')`)
- `userId` từ `req.user.sub`
- `groupId` từ header `x-group-id` (optional)
- Query param `group`: `'admin'` (default) hoặc `'client'`

### Flow

1. Controller lấy userId, groupId từ request
2. Gọi HTTP sang IAM: `GET {IAM_INTERNAL_URL}/internal/rbac/permissions?userId=X&groupId=Y`
3. Nhận về permission codes → `Set<string>`
4. Gọi `MenuService.getUserMenuTree(group, userPermissions)`
5. Lọc menu:
   - `is_public = true` → luôn hiển thị
   - Có `required_permission_code` → check `userPermissions.has(code)`
   - Không có `required_permission_code` và không `is_public` → hiển thị cho mọi user đã login
6. Build tree với `buildMenuTree()`, trả về

### Caching

Không cache ở config-service. Lý do:
- Permission có thể thay đổi bất cứ lúc nào
- RBAC đã cache 60s ở IAM side
- Menu tree thay đổi ít, DB query nhanh

### IAM Client

Tạo `IamClient` service trong config-service:
- Pattern tương tự `ComicClient`/`PostClient` ở web-api-service
- `fetch()` + circuit breaker (cockatiel) + timeout 5s
- Inject `IAM_INTERNAL_URL` và `INTERNAL_API_SECRET` từ ConfigService
- Method: `getUserPermissions(userId, groupId?) → Promise<Set<string>>`

### Module Structure

```
modules/menu/
├── admin/          (existing)
├── public/         (existing)
├── user/           (NEW)
│   ├── controllers/menu.controller.ts
│   ├── services/menu.service.ts
│   └── user-menu.module.ts
├── repositories/   (existing)
├── helpers/        (existing)
├── interfaces/     (existing)
└── menu.module.ts  (update imports)

clients/
└── iam.client.ts   (NEW)
```

### Menu Filtering Logic

```typescript
function filterUserMenus(
  menus: any[],
  userPermissions: Set<string>,
): any[] {
  return menus.filter((menu) => {
    if (menu.is_public) return true;
    if (!menu.required_permission_code) return true; // logged-in user, no specific perm needed
    return userPermissions.has(menu.required_permission_code);
  });
}
```

Giống `filterPublicMenus` nhưng khác ở chỗ: menu không có `required_permission_code` vẫn hiển thị cho user đã login (thay vì ẩn).

---

## 3. Config Service — Cache Purge Module

### Problem

Comic monolith có endpoint `GET /public/system/cache/flush` để flush toàn bộ Redis. Microservice config-service không có.

### Endpoint

```
GET /cache/flush
```

- `@Public()` decorator
- `@Throttle({ default: { limit: 5, ttl: 60000 } })` — 5 lần/phút
- Response: `{ flushed: true }` hoặc `{ flushed: false, reason: 'redis_disabled' }`

### Module Structure

```
modules/cache-purge/
├── controllers/cache-purge.controller.ts
└── cache-purge.module.ts
```

### Implementation

- Controller gọi `RedisService.flushDb()`
- Check `redis.isEnabled()` trước khi flush

---

## 4. Shared — RedisService Enhancement

### Problem

`RedisService` tại `shared/redis/src/redis.service.ts` chưa có method `flushDb()`.

### Change

Thêm 1 method:

```typescript
async flushDb(): Promise<void> {
  if (!this.client) return;
  await this.client.flushdb();
}
```

---

## Files Changed Summary

### IAM Service
- `apps/iam-service/src/internal/controllers/rbac-check.controller.ts` — thêm GET method
- `apps/iam-service/src/internal/dtos/rbac-permissions-query.dto.ts` — NEW

### Config Service
- `apps/config-service/src/clients/iam.client.ts` — NEW
- `apps/config-service/src/modules/menu/user/controllers/menu.controller.ts` — NEW
- `apps/config-service/src/modules/menu/user/services/menu.service.ts` — NEW
- `apps/config-service/src/modules/menu/user/user-menu.module.ts` — NEW
- `apps/config-service/src/modules/menu/menu.module.ts` — update imports
- `apps/config-service/src/modules/menu/helpers/menu.helper.ts` — thêm `filterUserMenus()`
- `apps/config-service/src/modules/menu/admin/services/menu.service.ts` — thêm `getUserMenuTree()`
- `apps/config-service/src/modules/cache-purge/controllers/cache-purge.controller.ts` — NEW
- `apps/config-service/src/modules/cache-purge/cache-purge.module.ts` — NEW
- `apps/config-service/src/app.module.ts` — import CachePurgeModule

### Shared
- `shared/redis/src/redis.service.ts` — thêm `flushDb()`
