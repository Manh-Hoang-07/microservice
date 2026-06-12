---
description: Quy trinh CRUD chuan dung BaseService
globs: apps/*/src/modules/**/*.ts
---

# CRUD Workflow

## Admin layer

Tat ca admin endpoint PHAI co `@Permission('module.action')`. Create/update/delete them `@AuditLog({ action })`.
Param ID dung `ParseBigIntPipe` de convert va validate.
User ID lay tu `req.user.sub`, truyen xuong service lam `created_user_id` / `updated_user_id`.

## Group layer

Tat ca group endpoint PHAI co `@PermissionGroup('module.action')`. AuditLog ap dung tuong tu nhu admin.
`groupId` lay tu route param (ParseBigIntPipe). Truyen `groupId` + `actorId` xuong service.
Group service la **scope-delegator**: KHONG viet lai CRUD — goi admin service va inject `groupId` vao data/filter.

```typescript
// Dung: delegate + scope
async createPost(groupId: bigint, dto: CreatePostDto, actorId: bigint) {
  return this.adminPostService.create({ ...dto, groupId }, actorId);
}

// Sai: viet lai toan bo CRUD
```

## Lifecycle hooks trong BaseService

| Hook | Muc dich |
|------|----------|
| `prepareFilters(filter)` | Them dieu kien filter cho getList |
| `beforeCreate(data)` | Tao slug, validate, chuyen doi du lieu truoc khi ghi DB |
| `afterCreate(entity, data)` | Sync relations many-to-many, clear cache |
| `beforeUpdate(id, data)` | Goi `getOne(id)` verify ton tai, refresh slug neu title doi |
| `afterUpdate(entity, data)` | Sync relations, clear cache |
| `beforeDelete(id)` | Goi `getOne(id)` verify ton tai |
| `afterDelete(id)` | Don dep file/resource, clear cache |
| `transform(entity)` | Format response (flatten relations, bo field noi bo) |

BaseService tu dong xu ly: pagination, not found exception, goi transform.

## Public API

Dung `@Public()`, chi read-only (getList, getBySlug). Redis cache voi versioning strategy. Filter chi public status. Select it field hon admin.
