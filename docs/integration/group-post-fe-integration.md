# Tài liệu tích hợp FE — Nhóm (Group) & Bài viết (Post)

> Phạm vi: API cho **nhóm** (menu, quản trị thành viên/vai trò, nội dung trong nhóm) và **bài viết** (admin + group: post, bình luận, thống kê).
> Cập nhật: 2026-06-12. Có sẵn DB seed để test ngay — xem **Phụ lục: Tài khoản & dữ liệu test**.

---

## 1. Quy ước chung

### Base URL (qua API Gateway)
| Service | Prefix |
|---|---|
| iam-service | `/api/iam` |
| config-service | `/api/config` |
| post-service | `/api/posts` |

### Đăng nhập (lấy token)
| Method | Path | Body | Mô tả |
|---|---|---|---|
| POST | `/api/auth/login` | `{ "email": "...", "password": "...", "remember": true }` | Trả `token` (access) + `refreshToken`; đồng thời set cookie `auth_token` |
| POST | `/api/auth/refresh` | `{ "refreshToken": "..." }` | Cấp lại access token |
| POST | `/api/auth/logout` | — | Đăng xuất |

> Đăng nhập bằng **email** (không phải username) + password. Response: `{ success, data: { token, refreshToken, user } }`.

### Xác thực
- Mọi request gửi JWT qua header: `Authorization: Bearer <token>` (hoặc dùng cookie `auth_token` mà login đã set).
- FE **không cần** tự kiểm tra quyền — BE chặn theo decorator. FE chỉ cần:
  1. Gửi token.
  2. Với API nhóm: truyền `groupId` đúng vào URL (xem mục 2).
- Mã lỗi phân quyền: `401` (chưa đăng nhập), `403` (không đủ quyền / không thuộc nhóm).

### Định dạng response (tự động wrap)
```jsonc
// Thành công — 1 bản ghi
{ "success": true, "data": { /* ... */ }, "timestamp": "2026-06-11T10:00:00+07:00" }

// Thành công — danh sách (có phân trang)
{ "success": true, "data": [ /* ... */ ], "meta": { "page": 1, "limit": 20, "total": 57 }, "timestamp": "..." }

// Lỗi
{ "success": false, "message": "Không có quyền truy cập", "code": "ERROR", "httpStatus": 403, "timestamp": "..." }
```
> **Lưu ý ID:** mọi ID kiểu BigInt được trả về dưới dạng **string** (vd `"15"`), không phải number. FE nên xử lý ID như string.

### Tham số phân trang chung (cho mọi endpoint danh sách)
`page` (mặc định 1), `limit` (mặc định 20, tối đa 100), `search`, `sort` (vd `createdAt:desc`), `skipCount` (`true` để bỏ đếm tổng, nhanh hơn).

---

## 2. Mô hình phân quyền nhóm

API được chia theo **đối tượng gọi**:

| Lớp | Ai gọi | Cách FE gọi |
|---|---|---|
| **admin** | Super admin (quyền toàn cục) | endpoint `/admin/...`, cần quyền vd `group.manage`, `post.manage` |
| **user** | User đăng nhập (dữ liệu của họ) | endpoint `/user/...`, chỉ cần đăng nhập |
| **group** | Thành viên/chủ nhóm (trong 1 nhóm) | endpoint `/groups/:groupId/...`, cần thuộc nhóm + có quyền thao tác |
| **public** | Ẩn danh | endpoint công khai |

**Với API nhóm (`/groups/:groupId/...`):**
- `groupId` luôn nằm trên **URL path**.
- BE tự kiểm tra: user **thuộc nhóm** + **có quyền** thao tác (vd `post.update`).
- **Chủ nhóm (owner)** mặc định có vai trò `group_manager` (**toàn bộ** quyền nội dung nhóm) → làm được mọi thứ.
- **Thành viên** chỉ làm được phần chủ nhóm đã **phân quyền** (gán vai trò nhóm).
- Vai trò nhóm là **danh sách phẳng**, không phụ thuộc loại nhóm — chủ nhóm gán vai trò nào cho thành viên cũng được. Thành viên thấy/làm gì là theo **quyền của vai trò** được gán.

---

## 3. Luồng khởi tạo FE (menu-driven)

FE **không hardcode** menu — lấy từ BE rồi render:

| Ngữ cảnh | Gọi | Trả về |
|---|---|---|
| Vào khu admin / cá nhân | `GET /api/config/user/menus` | cây menu admin theo quyền user |
| Vào 1 nhóm cụ thể | `GET /api/config/group/menus?groupId=<id>` | cây menu của nhóm đó theo quyền của user trong nhóm |
| Danh sách nhóm của tôi | `GET /api/iam/user/groups` | các nhóm user là thành viên (kèm `type`, `ownerId`) |

**Cấu trúc 1 item menu (`MenuTreeItem`):**
```jsonc
{
  "id": "12",
  "code": "group-posts",
  "name": "Danh sách bài viết",
  "path": "/group/posts",          // route FE
  "icon": "📄",
  "type": "route",                  // 'group' (gom nhóm) | 'route' (điều hướng) | 'link' (ngoài)
  "children": [ /* MenuTreeItem[] */ ]
}
```
> Menu trả về **đã được lọc theo quyền** — FE chỉ việc render, không cần check thêm. Owner thấy đầy đủ; thành viên thấy ít hơn theo vai trò được gán. Menu category/tag **chỉ có ở admin**, không có trong nhóm.

**Cách xác định gọi menu nào:** FE biết mình đang ở đâu qua route. Vào `/groups/:groupId/...` → gọi `group/menus?groupId=`; khu admin → gọi `user/menus`.

---

## 4. API NHÓM (iam-service)

### 4.1. Admin quản lý nhóm — cần quyền `group.manage`
| Method | Path | Mô tả |
|---|---|---|
| GET | `/api/iam/admin/groups` | Danh sách nhóm (phân trang; filter `type`, `status`, `search`) |
| GET | `/api/iam/admin/groups/:id` | Chi tiết nhóm |
| POST | `/api/iam/admin/groups` | Tạo nhóm |
| PUT | `/api/iam/admin/groups/:id` | Sửa nhóm |
| DELETE | `/api/iam/admin/groups/:id` | Xóa nhóm |
| GET | `/api/iam/admin/groups/:id/members` | Danh sách thành viên (phân trang) |
| POST | `/api/iam/admin/groups/:id/members` | Thêm thành viên — body `{ "userId": "5" }` |
| DELETE | `/api/iam/admin/groups/:id/members/:userId` | Xóa thành viên |

**Body tạo/sửa nhóm:**
```jsonc
{
  "type": "post",            // 'post' | 'comic'  (bắt buộc khi tạo)
  "code": "nhom_bai_dang_1", // duy nhất
  "name": "Nhóm bài đăng 1",
  "description": "…",
  "ownerId": "5"             // userId chủ nhóm — set xong owner tự có full quyền loại nhóm
}
```

### 4.2. Chủ nhóm phân quyền thành viên — cần là **owner** của nhóm
| Method | Path | Mô tả |
|---|---|---|
| GET | `/api/iam/groups/:id/assignable-roles` | **Tất cả vai trò nhóm** có thể gán (danh sách phẳng, KHÔNG lọc theo loại nhóm) → đổ vào dropdown |
| GET | `/api/iam/groups/:id/members/:userId/roles` | Vai trò hiện có của 1 thành viên |
| POST | `/api/iam/groups/:id/members/:userId/roles` | Gán 1 vai trò — body `{ "roleId": "8" }` |
| PUT | `/api/iam/groups/:id/members/:userId/roles/sync` | Thay toàn bộ vai trò — body `{ "roleIds": ["8","9"] }` |
| DELETE | `/api/iam/groups/:id/members/:userId/roles/:roleId` | Thu hồi 1 vai trò |

**Response `assignable-roles`:**
```jsonc
{ "success": true, "data": [ { "id": "1", "code": "group_manager", "name": "Quản lý nhóm (đầy đủ)" } ] }
```
> Vai trò nhóm là **danh sách phẳng, không gắn với loại nhóm** — gán vai trò nào cho thành viên cũng được. FE đổ thẳng kết quả `assignable-roles` vào dropdown.

**Vai trò nhóm có sẵn (flat):**
- `group_manager` — đầy đủ quyền nội dung nhóm (**tự động gán cho chủ nhóm** khi set owner).
- `group_post_editor`, `group_post_writer` — quyền bài viết.
- `group_comic_manager`, `group_comic_editor`, `group_comic_translator` — quyền truyện.

> **Chủ nhóm** luôn tự có `group_manager` (đầy đủ quyền) → thấy/làm mọi thứ trong nhóm, không cần gán thủ công.

### 4.3. User xem nhóm của mình
| Method | Path | Mô tả |
|---|---|---|
| GET | `/api/iam/user/groups` | Các nhóm user là thành viên (kèm `type`, `ownerId` để biết có phải chủ nhóm) |

---

## 5. API BÀI VIẾT (post-service)

> **Hai bộ song song, cùng logic CRUD:**
> - `admin/posts` — super admin quản lý **mọi** bài viết (`@Permission('post.manage')`).
> - `groups/:groupId/posts` — thao tác bài viết **trong 1 nhóm** (`@PermissionGroup`), tự lọc theo nhóm + chặn sửa bài của nhóm khác.

### 5.1. Bài viết — Admin (`post.manage`)
| Method | Path | Mô tả |
|---|---|---|
| GET | `/api/posts/admin/posts` | Danh sách (filter: `status`, `postType`, `isFeatured`, `isPinned`, `categoryId`, `tagId`, `search`) |
| GET | `/api/posts/admin/posts/simple` | Danh sách rút gọn (id/name/slug) |
| GET | `/api/posts/admin/posts/:id` | Chi tiết |
| POST | `/api/posts/admin/posts` | Tạo |
| PUT | `/api/posts/admin/posts/:id` | Sửa |
| DELETE | `/api/posts/admin/posts/:id` | Xóa |

### 5.2. Bài viết — Nhóm
| Method | Path | Quyền nhóm |
|---|---|---|
| GET | `/api/posts/groups/:groupId/posts` | `post.view` |
| GET | `/api/posts/groups/:groupId/posts/categories` | `post.view` (lấy cây danh mục để chọn khi tạo bài) |
| GET | `/api/posts/groups/:groupId/posts/:id` | `post.view` |
| POST | `/api/posts/groups/:groupId/posts` | `post.create` |
| PUT | `/api/posts/groups/:groupId/posts/:id` | `post.update` |
| DELETE | `/api/posts/groups/:groupId/posts/:id` | `post.delete` |

> Khi tạo bài qua route nhóm, **không cần gửi `groupId` trong body** — BE tự gán theo URL (gửi cũng bị ghi đè). Sửa/xóa bài không thuộc nhóm → `403`.

**Body tạo/sửa bài viết (`CreatePostDto` / `UpdatePostDto`):**
```jsonc
{
  "name": "Tiêu đề",                  // bắt buộc khi tạo, ≤255
  "slug": "tieu-de",                  // optional, [a-z0-9-], tự sinh nếu bỏ trống
  "excerpt": "Tóm tắt",               // ≤2000
  "content": "<p>Nội dung</p>",       // ≤200KB
  "image": "https://…",               // ≤500
  "coverImage": "https://…",
  "status": "draft",                  // draft|scheduled|published|archived
  "postType": "text",                 // text|video|image|audio
  "videoUrl": "https://…",            // http(s)
  "audioUrl": "https://…",
  "isFeatured": false,
  "isPinned": false,
  "publishedAt": "2026-06-11T10:00:00Z", // ISO 8601
  "seoTitle": "…", "seoDescription": "…", "seoKeywords": "…",
  "categoryIds": [1, 2],              // ≤50 phần tử, số nguyên ≥1
  "tagIds": [3, 4]
}
```

### 5.3. Bình luận bài viết
| Method | Path | Quyền |
|---|---|---|
| GET | `/api/posts/admin/post-comments` | admin `post.manage` |
| PATCH | `/api/posts/admin/post-comments/:id` | admin `post.manage` |
| GET | `/api/posts/groups/:groupId/post-comments` | nhóm `post.view` |
| PATCH | `/api/posts/groups/:groupId/post-comments/:id` | nhóm `post.update` |

- Danh sách filter: `postId`, `status`, `userId`, `search`, phân trang.
- Đổi trạng thái (kiểm duyệt) — body: `{ "status": "hidden" }`.
- `status` ∈ `visible | hidden | spam | deleted`.
- Route nhóm chỉ thấy/duyệt bình luận trên bài viết **thuộc nhóm** (bình luận nhóm khác → `403`).

### 5.4. Thống kê bài viết
| Method | Path | Quyền |
|---|---|---|
| GET | `/api/posts/admin/stats/overview` | admin `post.manage` |
| GET | `/api/posts/admin/stats/posts/:id/daily` | admin `post.manage` |
| GET | `/api/posts/groups/:groupId/stats/overview` | nhóm `post.view` |
| GET | `/api/posts/groups/:groupId/stats/posts/:id/daily` | nhóm `post.view` |

> Bản nhóm chỉ thống kê bài viết **của nhóm đó**.

**Response `overview`:**
```jsonc
{
  "success": true,
  "data": {
    "posts": { "total": 12, "published": 8, "draft": 4 },
    "views": { "total": "1530", "today": "20", "last7Days": "210", "last30Days": "900" }
  }
}
```
**Response `posts/:id/daily`** (query: `startDate`, `endDate` ISO; tối đa 90 ngày):
```jsonc
{
  "success": true,
  "data": {
    "postId": "5", "name": "…", "slug": "…", "totalViews": "320",
    "daily": [ { "date": "2026-06-10", "viewCount": "12" }, { "date": "2026-06-11", "viewCount": "8" } ]
  }
}
```

---

## 6. Bảng enum (cho dropdown FE)

| Enum | Giá trị |
|---|---|
| Post status | `draft` (Nháp), `scheduled` (Lên lịch), `published` (Đã xuất bản), `archived` (Đã lưu trữ) |
| Post type | `text` (Văn bản), `video`, `image` (Hình ảnh), `audio` (Âm thanh) |
| Comment status | `visible` (Hiển thị), `hidden` (Ẩn), `spam`, `deleted` (Đã xóa) |

> Các enum có endpoint động: `GET /api/posts/post-categories/enums`, `GET /api/posts/comments/enums`, `GET /api/iam/groups/enums` (trả `{ id, name }[]`) — FE nên lấy từ đây thay vì hardcode.

---

## 7. Tóm tắt cho FE

1. Luôn gửi JWT. Với API nhóm: đưa `groupId` vào URL path.
2. Lấy menu từ BE (`user/menus` hoặc `group/menus?groupId=`) để dựng điều hướng — đã lọc theo quyền, không cần check thêm.
3. Cùng 1 màn CRUD bài viết dùng được cho 2 ngữ cảnh: admin (`/admin/posts`) và nhóm (`/groups/:groupId/posts`) — chỉ khác base path, body giống nhau.
4. Chủ nhóm phân quyền: lấy `assignable-roles` đổ dropdown → `sync`/`assign`.
5. ID là string. Đổi trạng thái comment qua `PATCH` với `{ status }`.

---

## 8. Phụ lục: Tài khoản & dữ liệu test (seed)

DB đã được seed sẵn — FE login + gọi API là có data ngay. **Mật khẩu chung: `Password@123`.**

### Tài khoản
| user_id | email | vai trò để test |
|---|---|---|
| 1 | `admin.comic@gmail.com` | Super admin (toàn quyền, mọi menu admin) |
| 2 | `mod.comic@gmail.com` | Chủ nhóm **truyện** `nhom_dich_truyen_1` (id=2) |
| 5 | `lan.pham@gmail.com` | **Chủ nhóm bài đăng** `nhom_bai_dang_1` (id=4) ⭐ |
| 6 | `duc.nguyen@gmail.com` | Chủ nhóm bài đăng `nhom_bai_dang_2` (id=5) |
| 7 | `huong.vo@gmail.com` | **Thành viên** nhóm bài đăng 1 (id=4) — chưa có vai trò, dùng để test phân quyền |
| 8 | `bao.dang@gmail.com` | Chủ nhóm truyện `nhom_dich_truyen_2` (id=3) |

### Nhóm (groupId)
| groupId | code | type | owner |
|---|---|---|---|
| 2 | nhom_dich_truyen_1 | comic | user 2 |
| 3 | nhom_dich_truyen_2 | comic | user 8 |
| **4** | **nhom_bai_dang_1** | **post** | **user 5** (+ member user 7) |
| 5 | nhom_bai_dang_2 | post | user 6 |

### Kịch bản test nhanh (nhóm bài đăng)
1. Login `lan.pham@gmail.com` / `Password@123` (chủ nhóm 4).
2. `GET /api/iam/user/groups` → thấy nhóm id=4.
3. `GET /api/config/group/menus?groupId=4` → menu nhóm (Bài viết / Bình luận / Thống kê).
4. `GET /api/posts/groups/4/posts` → **2 bài viết** (1 published, 1 draft) của nhóm.
5. `GET /api/posts/groups/4/stats/overview` → số liệu nhóm.
6. **Phân quyền:** `GET /api/iam/groups/4/assignable-roles` → đổ dropdown → gán role cho member user 7:
   `POST /api/iam/groups/4/members/7/roles` body `{ "roleId": "<id group_post_writer>" }`.
7. Login `huong.vo@gmail.com` (member 7) → menu/quyền nhóm 4 thay đổi theo role vừa gán.

> Dữ liệu post-service: 6 danh mục, 10 tag, 6 bài viết (3 global + 3 thuộc nhóm 4/5). comic-service: 15 danh mục, 3 truyện.
