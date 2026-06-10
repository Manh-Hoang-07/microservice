# Tích hợp Group Workspace — Tài liệu cho Frontend

> **Ngày cập nhật:** 2026-06-09  
> **Phiên bản:** 2.0 — Group-scoped permission system  
> **Liên quan:** [IAM Integration](./frontend-iam-integration.md)

---

## Mục lục

1. [Tổng quan thay đổi](#1-tổng-quan-thay-đổi)
2. [Mô hình hoạt động](#2-mô-hình-hoạt-động)
3. [Thay đổi trong màn hình Role (Admin)](#3-thay-đổi-trong-màn-hình-role-admin)
4. [Admin quản lý nhóm — Group CRUD](#4-admin-quản-lý-nhóm--group-crud)
5. [Admin quản lý thành viên nhóm](#5-admin-quản-lý-thành-viên-nhóm)
6. [Chủ nhóm phân quyền thành viên](#6-chủ-nhóm-phân-quyền-thành-viên)
7. [User — Danh sách nhóm của tôi](#7-user--danh-sách-nhóm-của-tôi)
8. [Menu nhóm (Group Workspace)](#8-menu-nhóm-group-workspace)
9. [Danh sách màn hình FE cần xây dựng mới](#9-danh-sách-màn-hình-fe-cần-xây-dựng-mới)
10. [Luồng tích hợp đầy đủ](#10-luồng-tích-hợp-đầy-đủ)
11. [Phụ lục — Tóm tắt tất cả endpoint](#phụ-lục--tóm-tắt-tất-cả-endpoint)

---

## 1. Tổng quan thay đổi

### So sánh v1 → v2

| Thành phần | v1 (cũ) | v2 (mới) |
|---|---|---|
| Role | Không có `roleType` | Thêm field `roleType: "system" \| "group"` |
| Màn hình tạo/sửa Role | Không có field roleType | **Cần thêm dropdown roleType** |
| Group | Chỉ là dữ liệu tổ chức, không liên quan auth | Có phân quyền thành viên trong nhóm |
| Màn hình quản lý Group | Chỉ CRUD cơ bản | **Cần thêm tab quản lý thành viên + vai trò** |
| Group Workspace | Chưa có | **Cần xây mới toàn bộ** |
| Menu nhóm | Chưa có | **9 menu mới, endpoint mới** |

### Cam kết backward-compatible

Tất cả endpoint admin cũ **không thay đổi**. Role response chỉ thêm field `roleType` — không xóa/đổi tên field nào. Phần FE cũ tiếp tục hoạt động bình thường, chỉ cần bổ sung các phần mới bên dưới.

---

## 2. Mô hình hoạt động

Hệ thống có hai loại phân quyền **song song và độc lập**:

```
┌─────────────────────────────────────────────────────────────────┐
│ GLOBAL (hệ thống)                                               │
│  Admin gán Role (roleType=system) cho User                      │
│  → User vào /admin/... với menu admin                           │
│  → Guard kiểm tra quyền toàn cục                                │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ GROUP-SCOPED (nhóm)                                             │
│  Admin tạo Role (roleType=group) + chọn permissions             │
│  → Chủ nhóm gán Group Role cho thành viên                       │
│  → Thành viên vào /group/... với menu nhóm                      │
│  → Kiểm tra quyền theo nhóm cụ thể                              │
└─────────────────────────────────────────────────────────────────┘
```

Một user có thể vừa là admin vừa là thành viên nhiều nhóm — FE cần render UI để user chọn context làm việc.

---

## 3. Thay đổi trong màn hình Role (Admin)

### 3.1 Field mới: `roleType`

Tất cả response của Role API giờ có thêm field `roleType`.

| Giá trị | Ý nghĩa |
|---|---|
| `"system"` | Vai trò hệ thống — gán toàn cục cho user bởi admin |
| `"group"` | Vai trò nhóm — chủ nhóm gán cho thành viên trong nhóm |

Tất cả role cũ tự động có `roleType: "system"` nhờ default value.

### 3.2 Lấy enum options cho dropdown roleType

```
GET /api/iam/roles/enums
```

> Không cần auth

**Response:**

```json
{
  "success": true,
  "data": {
    "roleTypes": [
      { "id": "system", "name": "System - Hệ thống" },
      { "id": "group",  "name": "Group - Nhóm" }
    ],
    "statuses": [
      { "id": "active",   "name": "Hoạt động" },
      { "id": "inactive", "name": "Vô hiệu" }
    ]
  }
}
```

### 3.3 Cập nhật form tạo / sửa Role

Thêm field mới vào form:

```
Loại vai trò *
  [Dropdown — lấy từ data.roleTypes]
  Default: "system" (System - Hệ thống)
```

**Body POST `/api/iam/admin/roles`:**

```json
{
  "code": "group_comic_editor",
  "name": "Biên tập viên truyện nhóm",
  "status": "active",
  "roleType": "group"
}
```

`roleType` optional — server default `"system"` nếu không truyền.

**Body PUT `/api/iam/admin/roles/:id`:**

```json
{
  "name": "Tên mới",
  "roleType": "group"
}
```

### 3.4 Cập nhật trang danh sách Role

Thêm vào UI:

- **Cột mới** `Loại` trong table — hiển thị badge: `system` → xanh lam, `group` → cam
- **Dropdown filter** `Loại vai trò` trên toolbar, options lấy từ `GET /api/iam/roles/enums → data.roleTypes`

Filter API:

```
GET /api/iam/admin/roles?roleType=group&status=active&page=1&limit=20
```

**Response `data[i]` (thêm field `roleType`):**

```json
{
  "id": "10",
  "code": "group_comic_editor",
  "name": "Biên tập viên truyện nhóm",
  "roleType": "group",
  "status": "active",
  "parentId": null,
  "createdAt": "2026-06-09T00:00:00.000Z",
  "updatedAt": "2026-06-09T00:00:00.000Z"
}
```

### 3.5 Vai trò nhóm seed sẵn trong DB

6 group roles đã được tạo sẵn, FE không cần tạo thêm. Chủ nhóm chỉ gán từ danh sách này.

**Nhóm truyện tranh (roleType=group):**

| Code | Tên | Permissions |
|---|---|---|
| `group_comic_manager` | Quản lý truyện nhóm | `comic.view/create/update/delete`, `chapter.view/create/update/delete` |
| `group_comic_editor` | Biên tập viên truyện | `comic.view/update`, `chapter.view/create/update` |
| `group_comic_translator` | Dịch giả | `comic.view`, `chapter.view/create/update` |

**Nhóm bài viết (roleType=group):**

| Code | Tên | Permissions |
|---|---|---|
| `group_post_manager` | Quản lý bài viết nhóm | `post.view/create/update/delete` |
| `group_post_editor` | Biên tập viên bài viết | `post.view/create/update` |
| `group_post_writer` | Tác giả bài viết | `post.view/create/update` |

---

## 4. Admin quản lý nhóm — Group CRUD

> **Base URL:** `/api/iam`  
> **Auth:** Bearer token với quyền `group.manage`

### 4.1 Lấy enum options cho form Group

```
GET /api/iam/groups/enums
```

> Không cần auth

**Response:**

```json
{
  "success": true,
  "data": {
    "statuses": [
      { "id": "active",   "name": "Hoạt động" },
      { "id": "inactive", "name": "Vô hiệu" }
    ]
  }
}
```

> Field `type` của group là free-text string, không có enum từ API. FE hardcode options: `[{ id: "comic", name: "Truyện tranh" }, { id: "post", name: "Bài viết" }]`

### 4.2 Danh sách nhóm

```
GET /api/iam/admin/groups?type=comic&status=active&search=nhom&page=1&limit=20
```

| Query | Kiểu | Mô tả |
|---|---|---|
| `type` | string | Lọc theo loại: `comic`, `post` |
| `status` | `active` \| `inactive` | Lọc trạng thái |
| `search` | string | Tìm theo tên / code |
| `page`, `limit` | number | Phân trang |

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "type": "comic",
      "code": "nhom_dich_truyen_1",
      "name": "Nhóm dịch truyện 1",
      "description": null,
      "status": "active",
      "ownerId": "42",
      "metadata": null,
      "createdAt": "2026-06-09T10:00:00.000Z",
      "updatedAt": "2026-06-09T10:00:00.000Z"
    }
  ],
  "meta": { "page": 1, "limit": 20, "total": 4, "totalPages": 1 }
}
```

### 4.3 Tạo nhóm mới

```
POST /api/iam/admin/groups
```

**Body:**

```json
{
  "type": "comic",
  "code": "nhom_dich_truyen_3",
  "name": "Nhóm dịch truyện 3",
  "description": "Mô tả nhóm",
  "ownerId": "42",
  "status": "active"
}
```

| Field | Bắt buộc | Ràng buộc |
|---|---|---|
| `type` | Có | `"comic"` hoặc `"post"` |
| `code` | Có | Unique trong cùng type, 2–100 ký tự, không khoảng trắng |
| `name` | Có | Max 255 ký tự |
| `description` | Không | Max 1000 ký tự |
| `ownerId` | Không | User ID dạng numeric string |
| `status` | Không | Default `"active"` |

**Response:** HTTP 201 — trả về object group.

**Lỗi thường gặp:**

| HTTP | Trường hợp |
|---|---|
| `400` | Thiếu field bắt buộc hoặc sai format |
| `409` | `code` đã tồn tại |

### 4.4 Chi tiết nhóm

```
GET /api/iam/admin/groups/:id
```

Response giống object trong danh sách.

### 4.5 Sửa nhóm

```
PUT /api/iam/admin/groups/:id
```

Body giống tạo nhóm, tất cả field đều optional. Khi đổi `ownerId` — chủ nhóm cũ mất quyền owner trong workspace, chủ nhóm mới được set.

### 4.6 Xóa nhóm

```
DELETE /api/iam/admin/groups/:id
```

Cascade xóa: thành viên, toàn bộ role assignment trong nhóm. HTTP 200.

---

## 5. Admin quản lý thành viên nhóm

> **Auth:** Bearer token với quyền `group.manage`

### 5.1 Danh sách thành viên

```
GET /api/iam/admin/groups/:id/members?page=1&limit=20
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "userId": "99",
      "groupId": "1",
      "joinedAt": "2026-06-09T10:00:00.000Z"
    }
  ],
  "meta": { "page": 1, "limit": 20, "total": 5, "totalPages": 1 }
}
```

### 5.2 Thêm thành viên

```
POST /api/iam/admin/groups/:id/members
```

**Body:**

```json
{ "userId": "99" }
```

**Lỗi:**

| HTTP | Trường hợp |
|---|---|
| `404` | User hoặc Group không tồn tại |
| `409` | User đã là thành viên |

### 5.3 Xóa thành viên

```
DELETE /api/iam/admin/groups/:id/members/:userId
```

Tự động xóa luôn toàn bộ role assignment của user đó trong nhóm. HTTP 200.

---

## 6. Chủ nhóm phân quyền thành viên

> **Auth:** Bearer token — **không cần quyền admin**. Server tự kiểm tra caller có phải `ownerId` của nhóm không.

### 6.1 Lấy danh sách group roles để render picker

Gọi `GET /api/iam/admin/roles?roleType=group&status=active` — endpoint này cần quyền admin. Nếu page owner không muốn dùng admin token, FE có thể:

**Phương án A (khuyên dùng):** Admin load trang → cache list roles vào store khi init app. Trang owner dùng lại từ store.

**Phương án B:** Hardcode 6 roles đã biết trong FE (phù hợp khi roles không thay đổi thường xuyên):

```javascript
const COMIC_GROUP_ROLES = [
  { id: 'group_comic_manager',    name: 'Quản lý truyện nhóm' },
  { id: 'group_comic_editor',     name: 'Biên tập viên truyện' },
  { id: 'group_comic_translator', name: 'Dịch giả' },
];
const POST_GROUP_ROLES = [
  { id: 'group_post_manager', name: 'Quản lý bài viết nhóm' },
  { id: 'group_post_editor',  name: 'Biên tập viên bài viết' },
  { id: 'group_post_writer',  name: 'Tác giả bài viết' },
];
// Chọn theo nhóm.type
const availableRoles = group.type === 'comic' ? COMIC_GROUP_ROLES : POST_GROUP_ROLES;
```

### 6.2 Xem vai trò hiện tại của một thành viên

```
GET /api/iam/groups/:id/members/:userId/roles
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "userId": "99",
      "groupId": "1",
      "roleId": "10",
      "role": {
        "id": "10",
        "code": "group_comic_editor",
        "name": "Biên tập viên truyện nhóm",
        "roleType": "group",
        "status": "active"
      }
    }
  ]
}
```

**Lỗi:**

| HTTP | Trường hợp |
|---|---|
| `403` | Caller không phải chủ nhóm |
| `404` | Nhóm không tồn tại hoặc user không phải thành viên |

### 6.3 Gán vai trò cho thành viên

```
POST /api/iam/groups/:id/members/:userId/roles
```

**Body:**

```json
{ "roleId": "10" }
```

Một thành viên có thể có **nhiều vai trò** trong cùng 1 nhóm. Gọi nhiều lần để gán nhiều vai trò.

### 6.4 Gỡ một vai trò của thành viên

```
DELETE /api/iam/groups/:id/members/:userId/roles/:roleId
```

HTTP 200.

### 6.5 Đồng bộ toàn bộ vai trò — Dùng cho form checkbox (khuyên dùng)

Thay thế toàn bộ role assignment trong 1 lần gọi:

```
PUT /api/iam/groups/:id/members/:userId/roles/sync
```

**Body:**

```json
{ "roleIds": ["10", "11"] }
```

Truyền `"roleIds": []` để xóa hết vai trò. HTTP 200.

**Luồng UX với multi-select checkbox:**

```
1. Mở modal "Phân quyền" cho thành viên userId=99
2. GET /api/iam/groups/:id/members/99/roles  → lấy roleIds đang có, tick sẵn checkbox
3. User chọn / bỏ chọn các vai trò
4. Click "Lưu" → PUT /api/iam/groups/:id/members/99/roles/sync
                    Body: { roleIds: [id của tất cả checkbox đang tick] }
```

---

## 7. User — Danh sách nhóm của tôi

> **Auth:** Bearer token — không cần quyền cụ thể

```
GET /api/iam/user/groups
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "type": "comic",
      "code": "nhom_dich_truyen_1",
      "name": "Nhóm dịch truyện 1",
      "status": "active",
      "ownerId": "42",
      "isOwner": true,
      "joinedAt": "2026-06-01T10:00:00.000Z"
    },
    {
      "id": "3",
      "type": "post",
      "code": "nhom_bai_dang_1",
      "name": "Nhóm bài đăng 1",
      "status": "active",
      "ownerId": "55",
      "isOwner": false,
      "joinedAt": "2026-06-05T09:00:00.000Z"
    }
  ]
}
```

> Dùng field `isOwner` để hiển thị badge "Chủ nhóm" và quyết định có show nút "Quản lý thành viên" trong workspace không.

---

## 8. Menu nhóm (Group Workspace)

> **Auth:** Bearer token — user phải là thành viên của `groupId`

### 8.1 Endpoint lấy menu

```
GET /api/config/group/menus?groupId=1
```

| Query | Bắt buộc | Mô tả |
|---|---|---|
| `groupId` | Có | ID của nhóm muốn vào |

**Lỗi:**

| HTTP | Trường hợp |
|---|---|
| `401` | Chưa đăng nhập |
| `403` | User không phải thành viên của nhóm này |
| `404` | Nhóm không tồn tại hoặc inactive |

### 8.2 Cấu trúc response menu

```json
{
  "success": true,
  "data": [ /* mảng menu tree — xem mục 8.3 */ ]
}
```

Mỗi item trong `data` là node gốc (không có parent), bên trong có `children[]`.

Fields của mỗi menu node:

| Field | Kiểu | Mô tả |
|---|---|---|
| `id` | string | ID menu |
| `code` | string | Code định danh |
| `name` | string | Tên hiển thị |
| `path` | string | Route path trong FE (`/group/...`) |
| `apiPath` | string \| null | API tương ứng (có thể có placeholder `:groupId`, `:userId`) |
| `icon` | string \| null | Emoji icon |
| `type` | `"group"` \| `"route"` | `group` = node nhóm (không có route thực), `route` = trang thực |
| `sortOrder` | number | Thứ tự hiển thị |
| `requiredPermissionCode` | string | Permission cần có để thấy menu này |
| `children` | array | Các menu con |

### 8.3 Toàn bộ 9 menu nhóm

Server chỉ trả về menu user có quyền tương ứng. Dưới đây là tất cả 9 menu có thể xuất hiện:

#### Nhóm 1 — Quản lý nhóm (chỉ chủ nhóm thấy)

Điều kiện: user là `ownerId` → server synthetic permission `group.owner`

```json
{
  "code": "group-owner-panel",
  "name": "Quản lý nhóm",
  "path": "/group/members",
  "apiPath": null,
  "icon": "👑",
  "type": "group",
  "sortOrder": 5,
  "requiredPermissionCode": "group.owner",
  "children": [
    {
      "code": "group-members",
      "name": "Thành viên nhóm",
      "path": "/group/members",
      "apiPath": "api/iam/groups/:groupId/members",
      "icon": "👥",
      "type": "route",
      "sortOrder": 10,
      "requiredPermissionCode": "group.owner",
      "children": []
    },
    {
      "code": "group-member-roles",
      "name": "Phân quyền thành viên",
      "path": "/group/members/roles",
      "apiPath": "api/iam/groups/:groupId/members/:userId/roles",
      "icon": "🔑",
      "type": "route",
      "sortOrder": 20,
      "requiredPermissionCode": "group.owner",
      "children": []
    }
  ]
}
```

#### Nhóm 2 — Truyện tranh nhóm (thành viên nhóm comic)

Điều kiện: user có `comic.view` → xuất hiện panel + 2 route con

```json
{
  "code": "group-comic-panel",
  "name": "Truyện tranh nhóm",
  "path": "/group/comics",
  "apiPath": null,
  "icon": "📚",
  "type": "group",
  "sortOrder": 10,
  "requiredPermissionCode": "comic.view",
  "children": [
    {
      "code": "group-comic-list",
      "name": "Danh sách truyện",
      "path": "/group/comics",
      "apiPath": "api/comics/group/comics",
      "icon": "📕",
      "type": "route",
      "sortOrder": 10,
      "requiredPermissionCode": "comic.view",
      "children": []
    },
    {
      "code": "group-comic-chapters",
      "name": "Chương truyện",
      "path": "/group/comics/chapters",
      "apiPath": "api/comics/group/chapters",
      "icon": "📑",
      "type": "route",
      "sortOrder": 20,
      "requiredPermissionCode": "chapter.view",
      "children": []
    }
  ]
}
```

#### Nhóm 3 — Bài viết nhóm (thành viên nhóm post)

Điều kiện: user có `post.view` → xuất hiện panel + 2 route con

```json
{
  "code": "group-post-panel",
  "name": "Bài viết nhóm",
  "path": "/group/posts",
  "apiPath": null,
  "icon": "📝",
  "type": "group",
  "sortOrder": 20,
  "requiredPermissionCode": "post.view",
  "children": [
    {
      "code": "group-posts",
      "name": "Danh sách bài viết",
      "path": "/group/posts",
      "apiPath": "api/posts/group/posts",
      "icon": "📄",
      "type": "route",
      "sortOrder": 10,
      "requiredPermissionCode": "post.view",
      "children": []
    },
    {
      "code": "group-post-categories",
      "name": "Danh mục bài viết",
      "path": "/group/posts/categories",
      "apiPath": "api/posts/group/post-categories",
      "icon": "📂",
      "type": "route",
      "sortOrder": 20,
      "requiredPermissionCode": "post.view",
      "children": []
    }
  ]
}
```

### 8.4 Menu xuất hiện theo vai trò

| Vai trò / Trạng thái | Quản lý nhóm | Truyện tranh | Bài viết |
|---|:---:|:---:|:---:|
| Chủ nhóm comic (ownerId) | ✅ | ❌* | ❌ |
| Chủ nhóm post (ownerId) | ✅ | ❌ | ❌* |
| `group_comic_manager/editor/translator` | ❌ | ✅ | ❌ |
| `group_post_manager/editor/writer` | ❌ | ❌ | ✅ |
| Thành viên chưa có vai trò | ❌ | ❌ | ❌ |

> ❌* = Chủ nhóm không tự động có `comic.view`/`post.view`. Nếu muốn chủ nhóm cũng thấy menu nội dung, admin cần gán thêm group role cho chủ nhóm.

### 8.5 Xử lý `apiPath` có placeholder

Một số menu có `apiPath` chứa `:groupId`, `:userId` — FE thay thế bằng giá trị thực:

```javascript
const resolveApiPath = (apiPath, groupId, userId) =>
  apiPath
    ?.replace(':groupId', groupId)
    ?.replace(':userId', userId);

// "api/iam/groups/:groupId/members"
// → "api/iam/groups/1/members"

// "api/iam/groups/:groupId/members/:userId/roles"
// → "api/iam/groups/1/members/99/roles"
```

---

## 9. Danh sách màn hình FE cần xây dựng mới

### 9.1 Cập nhật trong Admin Panel (sẵn có)

#### A. Trang danh sách Role — bổ sung

- [ ] Thêm cột `Loại` vào table — badge `system` xanh / `group` cam
- [ ] Thêm dropdown filter `Loại vai trò` trên toolbar, options từ `GET /api/iam/roles/enums → data.roleTypes`

#### B. Form tạo / sửa Role — bổ sung

- [ ] Thêm field **Loại vai trò** (dropdown)
  - Options: `GET /api/iam/roles/enums → data.roleTypes`
  - Default khi tạo mới: `"system"`

#### C. Trang Admin Groups — `/admin/groups` (mới hoàn toàn)

- [ ] Table: ID, Tên, Loại, Chủ nhóm, Trạng thái, Ngày tạo
- [ ] Filter toolbar: Loại (`comic`/`post`), Trạng thái, Tìm kiếm
- [ ] Nút `Tạo nhóm` → form tạo mới
- [ ] Row actions: `Sửa`, `Xóa`, `Xem thành viên`

#### D. Form Tạo / Sửa Group

- [ ] **Loại nhóm** (`type`): dropdown, FE hardcode `[comic, post]`
- [ ] **Mã nhóm** (`code`): text input, unique, không khoảng trắng
- [ ] **Tên nhóm** (`name`): text input, required
- [ ] **Mô tả** (`description`): textarea, optional
- [ ] **Chủ nhóm** (`ownerId`): user search/select, optional
- [ ] **Trạng thái** (`status`): dropdown, options từ `GET /api/iam/groups/enums → data.statuses`

#### E. Tab / Modal Quản lý thành viên (trong trang detail/edit Group)

- [ ] Table: User ID, Ngày tham gia
- [ ] Nút `Thêm thành viên`: input userId → `POST /api/iam/admin/groups/:id/members`
- [ ] Nút `Xóa` mỗi row: confirm → `DELETE /api/iam/admin/groups/:id/members/:userId`

---

### 9.2 Group Workspace — Layout mới (`/group/...`)

> Đây là bộ màn hình hoàn toàn mới. Dùng layout riêng, không nằm trong admin layout.

#### F. Trang chọn nhóm — `/group`

- [ ] Gọi `GET /api/iam/user/groups` khi load trang
- [ ] Render danh sách card nhóm: tên, loại, badge "Chủ nhóm" nếu `isOwner: true`
- [ ] Click card → vào workspace nhóm (lưu `groupId` vào context/store)
- [ ] Hiển thị "Bạn chưa trong nhóm nào" nếu `data` rỗng

#### G. Group Workspace Layout — `/group/:groupId/...`

- [ ] Sidebar menu: `GET /api/config/group/menus?groupId=:groupId`
  - Render cùng component với admin sidebar, data khác
  - Thay placeholder `apiPath` trước khi dùng (xem mục 8.5)
- [ ] Header: tên nhóm hiện tại, nút "Đổi nhóm" → về `/group`
- [ ] Lưu `groupId` vào context để các trang con dùng

#### H. Trang Thành viên nhóm — `/group/:groupId/members`

> Chỉ chủ nhóm truy cập (menu có `requiredPermissionCode: "group.owner"`)

- [ ] `GET /api/iam/groups/:groupId/members` → hiển thị table
- [ ] Mỗi row: User ID, Ngày tham gia, nút **Phân quyền**
- [ ] Click Phân quyền → mở Modal I

#### I. Modal Phân quyền thành viên

- [ ] Gọi `GET /api/iam/groups/:groupId/members/:userId/roles` → lấy roleIds đang có, tick sẵn
- [ ] Multi-select checkbox từ danh sách roles phù hợp loại nhóm:
  - Nhóm `comic` → hiển thị 3 comic roles
  - Nhóm `post` → hiển thị 3 post roles
- [ ] Nút `Lưu` → `PUT /api/iam/groups/:groupId/members/:userId/roles/sync` với toàn bộ roleId đang tick
- [ ] Nút `Hủy` → đóng modal không lưu

#### J. Trang Danh sách Truyện nhóm — `/group/:groupId/comics`

> Hiện khi user có `comic.view`. `apiPath`: `api/comics/group/comics`

- [ ] `GET /api/comics/group/comics?groupId=:groupId` → render danh sách truyện
- [ ] Nút Tạo mới: hiện nếu user có `comic.create`, ẩn nếu không
- [ ] Nút Sửa/Xóa: tương tự theo `comic.update`/`comic.delete`

#### K. Trang Chương Truyện nhóm — `/group/:groupId/comics/chapters`

> Hiện khi user có `chapter.view`. `apiPath`: `api/comics/group/chapters`

- [ ] `GET /api/comics/group/chapters?groupId=:groupId` → render danh sách chương
- [ ] CRUD theo `chapter.create`/`chapter.update`/`chapter.delete`

#### L. Trang Danh sách Bài viết nhóm — `/group/:groupId/posts`

> Hiện khi user có `post.view`. `apiPath`: `api/posts/group/posts`

- [ ] `GET /api/posts/group/posts?groupId=:groupId` → render danh sách bài viết
- [ ] CRUD theo `post.create`/`post.update`/`post.delete`

#### M. Trang Danh mục Bài viết nhóm — `/group/:groupId/posts/categories`

> Hiện khi user có `post.view`. `apiPath`: `api/posts/group/post-categories`

- [ ] `GET /api/posts/group/post-categories?groupId=:groupId` → render danh mục
- [ ] CRUD theo permission bài viết

---

## 10. Luồng tích hợp đầy đủ

### Luồng A — Sau khi đăng nhập

```
POST /api/auth/login → { accessToken, user }

Song song gọi 2 API:
  GET /api/config/user/menus        → có data: user là admin
  GET /api/iam/user/groups          → có data: user là thành viên nhóm

Quyết định hiển thị:
  Chỉ admin    → redirect /admin/dashboard
  Chỉ thành viên nhóm → redirect /group (trang chọn nhóm)
  Cả hai       → Hiển thị modal "Bạn muốn vào đâu?"
                   [Vào Admin Panel] [Vào Workspace nhóm]
```

### Luồng B — Vào workspace nhóm

```
User ở trang /group → thấy danh sách nhóm mình thuộc về
Click vào "Nhóm dịch truyện 1" (id=1) → lưu groupId=1 vào store

GET /api/config/group/menus?groupId=1
  → Nếu user là chủ nhóm: trả về menu "Quản lý nhóm" + menu truyện/bài viết
  → Nếu là thành viên bình thường: chỉ trả về menu nội dung tương ứng role

Render sidebar từ response → navigate vào /group/1/...
```

### Luồng C — Admin setup nhóm mới

```
1. Tạo nhóm:
   POST /api/iam/admin/groups
   { type: "comic", code: "nhom_demo", name: "Nhóm Demo", ownerId: "42" }

2. Thêm thành viên:
   POST /api/iam/admin/groups/5/members { userId: "99" }
   POST /api/iam/admin/groups/5/members { userId: "100" }

3. (Tuỳ chọn) Admin gán vai trò luôn:
   GET /api/iam/admin/roles?roleType=group&status=active → lấy id của role muốn gán
   PUT /api/iam/groups/5/members/99/roles/sync { roleIds: ["10"] }
   PUT /api/iam/groups/5/members/100/roles/sync { roleIds: ["11", "12"] }

4. (Hoặc) Chủ nhóm (userId=42) tự gán sau khi vào /group/5/members
```

### Luồng D — Chủ nhóm phân quyền thành viên trong workspace

```
Chủ nhóm (userId=42) vào /group/5/members
  → Sidebar có "Quản lý nhóm" vì có group.owner

Table thành viên: GET /api/iam/groups/5/members

Click "Phân quyền" cho userId=99:
  1. GET /api/iam/groups/5/members/99/roles → [{ roleId: "10" }]
  2. Render modal, tick sẵn checkbox role id=10
  3. User bỏ tick 10, tick 11
  4. Click Lưu → PUT /api/iam/groups/5/members/99/roles/sync { roleIds: ["11"] }
  5. Đóng modal, refresh table
```

---

## Phụ lục — Tóm tắt tất cả endpoint

### IAM Service (`/api/iam`)

| Method | Path | Auth cần thiết | Mô tả |
|---|---|---|---|
| GET | `/roles/enums` | Public | Options roleType + status cho form |
| GET | `/admin/roles?roleType=group` | Admin `role.manage` | Danh sách group roles |
| POST | `/admin/roles` | Admin `role.manage` | Tạo role (thêm `roleType` vào body) |
| PUT | `/admin/roles/:id` | Admin `role.manage` | Sửa role |
| GET | `/groups/enums` | Public | Options status cho form group |
| GET | `/admin/groups` | Admin `group.manage` | Danh sách nhóm |
| POST | `/admin/groups` | Admin `group.manage` | Tạo nhóm |
| GET | `/admin/groups/:id` | Admin `group.manage` | Chi tiết nhóm |
| PUT | `/admin/groups/:id` | Admin `group.manage` | Sửa nhóm |
| DELETE | `/admin/groups/:id` | Admin `group.manage` | Xóa nhóm |
| GET | `/admin/groups/:id/members` | Admin `group.manage` | Danh sách thành viên |
| POST | `/admin/groups/:id/members` | Admin `group.manage` | Thêm thành viên |
| DELETE | `/admin/groups/:id/members/:userId` | Admin `group.manage` | Xóa thành viên |
| GET | `/user/groups` | Đăng nhập | Danh sách nhóm của tôi |
| GET | `/groups/:id/members/:userId/roles` | Chủ nhóm | Xem vai trò thành viên |
| POST | `/groups/:id/members/:userId/roles` | Chủ nhóm | Gán 1 vai trò |
| DELETE | `/groups/:id/members/:userId/roles/:roleId` | Chủ nhóm | Gỡ 1 vai trò |
| PUT | `/groups/:id/members/:userId/roles/sync` | Chủ nhóm | Sync toàn bộ vai trò |

### Config Service (`/api/config`)

| Method | Path | Auth cần thiết | Mô tả |
|---|---|---|---|
| GET | `/group/menus?groupId=X` | Thành viên nhóm | Menu tree của nhóm |

### Comic Service — `api/comics/group/...` (sắp có)

| Method | Path | Mô tả |
|---|---|---|
| GET | `/api/comics/group/comics?groupId=X` | Truyện trong nhóm |
| GET | `/api/comics/group/chapters?groupId=X` | Chương trong nhóm |

### Post Service — `api/posts/group/...` (sắp có)

| Method | Path | Mô tả |
|---|---|---|
| GET | `/api/posts/group/posts?groupId=X` | Bài viết trong nhóm |
| GET | `/api/posts/group/post-categories?groupId=X` | Danh mục bài viết nhóm |
