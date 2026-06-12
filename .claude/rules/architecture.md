---
description: Quy tac kien truc module trong moi service
globs: apps/*/src/modules/**/*.ts
---

# Kien truc Module

Moi domain module trong `src/modules/<domain>/` chia theo **lop audience**. Chi dung tap con can thiet — khong ep tao du 4 lop. Moi lop ung voi 1 decorator xac thuc:

| Lop | Decorator | Doi tuong / pham vi |
|-----|-----------|---------------------|
| **admin/** | `@Permission('module.action')` | Super admin, quan ly moi ban ghi toan cuc |
| **group/** | `@PermissionGroup('module.action')` | Thanh vien/chu nhom, thao tac TRONG MOT nhom (groupId tu route param) |
| **user/** | `@Authenticated()` | User dang nhap, du lieu CUA CHINH HO (profile, bookmarks, my-groups) |
| **public/** | `@Public()` | An danh, read-only. Redis cache cho du lieu it thay doi |

> **Luu y quan trong:** `@Authenticated()` va `@PermissionGroup()` KHONG phai tuong duong.
> - `@Authenticated()` chi verify token — khong check quyen chi tiet. Dung cho user layer.
> - `@PermissionGroup()` verify token + check group membership + check permission trong nhom qua IAM. Dung cho group layer.

## Vai tro cua tung lop

- **Controller** chi nhan input + goi service. KHONG chua business logic.
- **Lop `group/`** thuong la **scope-delegator**: tai dung service cua `admin/` (hoac repository dung chung), tiem scope `groupId` (loc ban ghi thuoc nhom, truyen `groupId` xuong service/repository). KHONG viet lai CRUD tu dau.
- **Lop `user/`** chi doc du lieu cua chinh user dang nhap (loc theo `req.user.sub`).
- **Lop `public/`** chi read, cache Redis, filter chi hien ban ghi public.
- **`repositories/`** — Data access dung chung cho ca 4 lop. Ke thua `PrismaRepository` tu `@package/common`. Override `buildWhere()` de custom filter. (Khong phai lop audience.)

## Cau truc thu muc vi du (post module)

```
modules/post/
├── admin/
│   ├── controllers/post.controller.ts      @Permission('post.manage')
│   ├── dtos/
│   └── services/post.service.ts
├── group/
│   ├── controllers/group-post.controller.ts  @PermissionGroup('post.create')
│   └── services/group-post.service.ts        → delegate sang admin service + scope groupId
├── public/
│   ├── controllers/post.controller.ts      @Public()
│   ├── dtos/
│   └── services/post-public.service.ts
├── enums/
└── repositories/post.repository.ts
```

## Lop group/ — pattern chuan

```typescript
// group-post.controller.ts
@PermissionGroup('post.create')
@Post(':groupId/posts')
create(@Param('groupId', ParseBigIntPipe) groupId: bigint, @Body() dto: CreatePostDto, @Req() req) {
  return this.service.create(groupId, dto, req.user.sub);
}

// group-post.service.ts — delegate, scope groupId
async create(groupId: bigint, dto: CreatePostDto, actorId: bigint) {
  return this.adminPostService.create({ ...dto, groupId }, actorId);
}
```

## Service ke thua BaseService

Override lifecycle hooks thay vi viet lai method:
- `prepareFilters` — filter/search
- `beforeCreate` / `afterCreate` — slug, validate, sync relations
- `beforeUpdate` / `afterUpdate` — verify ton tai, refresh slug
- `beforeDelete` / `afterDelete` — verify ton tai, don dep
- `transform` — format response

DTO list ke thua `BaseListQueryDto` (co san page, limit, search, sort, skipCount).

Module dang ky controllers + providers + export repository.

> **Lop `group/` trong module `group` (iam-service):** ten thu muc la `group/group/` (lap chu la cosmetic). Giu class name mo ta (vd `GroupOwnerService`) de khong trung voi `admin/GroupService`.
