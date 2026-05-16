# Frontend Integration — RBAC đơn giản hoá (bỏ Context)

**Cập nhật:** 2026-05-17
**Tác động:** Tất cả các trang admin gọi IAM hoặc kiểm tra quyền

---

## TL;DR — Cái gì thay đổi

- ❌ **Bỏ hoàn toàn khái niệm "Context"** (system context, group context)
- ❌ **Quyền KHÔNG còn scope theo group nữa** — mỗi user có 1 bộ permissions toàn cục
- ✅ Vẫn còn `Group` nhưng chỉ là dữ liệu (chủ nhóm, thành viên) — không liên quan auth
- ✅ Header `x-group-id` **vẫn được chấp nhận** nhưng IAM bỏ qua. Có thể dùng cho data filtering ở các service khác (comic, post...) nếu cần
- ✅ Trang chọn nhóm/context trên UI (nếu có) → **gỡ bỏ**

---

## Mô hình phân quyền mới

```
User ──hasMany──> UserRoleAssignment ──belongsTo──> Role ──hasMany──> Permission
```

- User có nhiều role
- Role có nhiều permission
- **Không có** scope theo group/context/anything

User `admin` có role `super_admin` → có toàn bộ 65 permissions.
User `moderator` có role `group_owner` ("Quản lý nhóm") → có 6 permissions: `group.owner`, `group.comic`, `group.post`, `group.member.manage`, `group.member.add`, `group.member.remove`.

---

## API check quyền (Internal — do BE service gọi)

> FE **không gọi trực tiếp** các endpoint này. Khi FE gọi 1 API bất kỳ, service đó tự gọi IAM để check quyền qua các endpoint dưới.

### `POST /api/iam/internal/rbac/check`

Body:
```json
{
  "userId": "1",
  "permissions": ["user.manage"]
}
```

> ⚠️ Trước đây có field `groupId` — **đã bỏ**. Nếu FE/BE nào còn gửi, IAM sẽ trả lỗi validation (`forbidNonWhitelisted`).

Response:
```json
{ "allowed": true }
```

### `GET /api/iam/internal/rbac/permissions?userId=1`

> ⚠️ Trước có param `groupId` — **đã bỏ**.

Response:
```json
{
  "permissions": ["user.manage", "role.manage", "group.owner", ...]
}
```

---

## API cho FE — đã đổi signature

### 1. Lấy menu của user

`GET /api/config/user/menus`

- **Trước:** đọc header `x-group-id`, menu phụ thuộc group
- **Sau:** chỉ cần JWT token. Menu trả về dựa vào permissions toàn cục của user.

Header gửi: `Authorization: Bearer <token>` (như cũ).
Header `x-group-id` nếu có thì FE vẫn gửi được, BE bỏ qua.

### 2. Gán role cho user

`POST /api/iam/users/:userId/roles`

Body **đã đổi:**
```json
{ "roleId": "2" }
```

> ⚠️ Trước có field `groupId` — đã bỏ.

### 3. Xóa role của user

`DELETE /api/iam/users/:userId/roles/:roleId`

> ⚠️ Trước có query `?groupId=X` — đã bỏ.

### 4. Đồng bộ roles của user

`PUT /api/iam/users/:userId/roles/sync`

Body **đã đổi:**
```json
{ "roleIds": ["1", "2"] }
```

> ⚠️ Trước có field `groupId` — đã bỏ.

### 5. Lấy roles của user

`GET /api/iam/users/:userId/roles`

> ⚠️ Trước có query `?groupId=X` (lọc roles trong group đó) — đã bỏ. Giờ trả về tất cả roles của user.

### 6. Sync permissions cho role

`PUT /api/iam/roles/:id/permissions`

Body giữ nguyên `{ permissionIds: [...] }`. Bỏ header `x-group-id` (không còn ảnh hưởng).

---

## API Group — vẫn còn nhưng đơn giản hơn

### CRUD Group (admin)

| Method | Path | Permission |
|--------|------|-----------|
| GET | `/api/iam/groups` | `group.manage` |
| GET | `/api/iam/groups/:id` | `group.manage` |
| POST | `/api/iam/groups` | `group.manage` |
| PUT | `/api/iam/groups/:id` | `group.manage` |
| DELETE | `/api/iam/groups/:id` | `group.manage` |

**Body Create — đã đổi:**
```json
{
  "type": "team",
  "code": "team-a",
  "name": "Team A",
  "description": "...",
  "ownerId": "10"
}
```

> ⚠️ Trước có field `contextId` (bắt buộc) — **đã bỏ**.

**Body List Query — đã đổi:**

> ⚠️ Trước có param `contextId` — đã bỏ.

### Member management

| Method | Path | Permission |
|--------|------|-----------|
| GET | `/api/iam/groups/:id/members` | `group.manage` |
| POST | `/api/iam/groups/:id/members` | `group.manage` |
| DELETE | `/api/iam/groups/:id/members/:userId` | `group.manage` |

### Group của user hiện tại

`GET /api/iam/user/groups` — trả về list groups mà user là thành viên.

---

## API đã GỠ BỎ HOÀN TOÀN

| Path cũ | Lý do |
|---------|-------|
| `/api/iam/contexts/*` (tất cả) | Module Context đã xoá |
| `/api/iam/owner/groups/*` (owner panel) | Owner panel đã xoá. Dùng `/api/iam/user/groups` thay |
| `/api/iam/owner/groups/:id/roles` (gán role per-group) | Role giờ toàn cục, không scope theo group |

---

## Menu cho role "Quản lý nhóm"

Role `group_owner` ("Quản lý nhóm") hiện có các quyền: `group.owner`, `group.comic`, `group.post`, `group.member.*`. User mang role này khi gọi `/api/config/user/menus` sẽ thấy:

```
Quản lý nhóm (group.owner)
  ├── Thông tin nhóm        /owner/group
  └── Danh sách thành viên  /owner/group/members

Quản lý Truyện tranh (group.comic)
  ├── Truyện tranh          /owner/comics
  ├── Chương truyện         /owner/comics/chapters
  ├── Bình luận truyện      /owner/comics/comments
  ├── Đánh giá truyện       /owner/comics/reviews
  └── Báo cáo thống kê      /owner/comics/stats

Quản lý Bài viết (group.post)
  ├── Bài viết              /owner/posts
  ├── Bình luận             /owner/posts/comments
  └── Thống kê              /owner/posts/stats
```

**Lưu ý:** Các path `/owner/*` chỉ là tên route FE, BE chưa có endpoint tương ứng. Khi cần list/thao tác data của nhóm, BE sẽ có endpoint mới (sẽ thông báo sau).

---

## Header `x-group-id` — Khi nào dùng?

| Use case | Có cần `x-group-id`? |
|----------|----------------------|
| Check permission (IAM) | ❌ **Không**. IAM ignore. |
| Lấy menu user | ❌ Không cần. |
| Lấy roles của user | ❌ Không cần. |
| List comic/post/... lọc theo group (sau này) | ✅ Có. BE service dùng cho data filtering. |

→ **Kết luận cho FE:** Có thể vẫn gửi `x-group-id` cho mọi API (không hại), nhưng KHÔNG cần thiết cho phần auth/menu/role.

---

## Checklist tích hợp FE

- [ ] Gỡ trang/dropdown chọn Context (nếu có)
- [ ] Bỏ field `contextId` khỏi form Create Group
- [ ] Bỏ filter `contextId` khỏi trang list Group
- [ ] Bỏ field `groupId` khỏi:
  - Form gán role cho user
  - Body sync roles
  - Query xóa role
- [ ] Cập nhật trang "Quản lý vai trò" (Role detail) — nếu hiển thị `roleContexts`, gỡ section đó
- [ ] (Tuỳ chọn) Vẫn giữ dropdown chọn group/`x-group-id` nếu cần cho các module sẽ làm sau (comic/post owner panel)

---

## Test accounts hiện có

| User ID | Email | Role | Permissions |
|---------|-------|------|-------------|
| 1 | `admin.comic@gmail.com` | `super_admin` | All 65 |
| 2 | `mod.comic@gmail.com` | `group_owner` | 6 (group.owner, group.comic, group.post, member.*) |

Password mặc định: `Password@123`
