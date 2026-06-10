# Điều hướng sau đăng nhập — Nhóm & Admin

> **Cập nhật:** 2026-06-10  
> **Liên quan:** [Auth Integration](./frontend-auth-integration.md) · [Group Workspace](./group-workspace-integration.md) · [IAM Integration](./frontend-iam-integration.md)

---

## Tổng quan

Sau đăng nhập, frontend cần biết user có thể vào không gian làm việc nào: **Admin Panel** hay **các Nhóm**. Thay vì gọi nhiều API riêng lẻ, một endpoint duy nhất trong IAM trả về danh sách tất cả workspace mà user được phép truy cập, kèm sẵn đường dẫn API menu tương ứng.

---

## 1. Luồng tổng thể

```
POST /api/auth/login
  → Nhận { token, refreshToken, expiresIn }
  → Lưu token

GET /api/auth/me                        ← lấy thông tin user (tên, avatar,...)
GET /api/iam/user/workspaces            ← biết có những workspace nào

FE render danh sách workspace:
  [Bảng điều khiển quản trị]   ← nếu có quyền admin
  [Nhóm dịch truyện 1]         ← nếu là thành viên nhóm
  [Nhóm bài đăng 1]            ← ...

User click vào workspace bất kỳ:
  → Gọi menuApi của workspace đó → nhận cây menu sidebar
  → Điều hướng vào workspace
```

---

## 2. Endpoint lấy danh sách workspace

```http
GET /api/iam/user/workspaces
Authorization: Bearer {accessToken}
```

IAM tự kiểm tra đồng thời:
- RBAC permissions của user → có bản ghi admin không
- Group membership của user → có bao nhiêu nhóm

### Response

```json
{
  "success": true,
  "data": [
    {
      "type": "admin",
      "name": "Bảng điều khiển quản trị",
      "menuApi": "/api/config/user/menus"
    },
    {
      "type": "group",
      "id": "1",
      "name": "Nhóm dịch truyện 1",
      "groupType": "comic",
      "isOwner": true,
      "menuApi": "/api/config/group/menus?groupId=1"
    },
    {
      "type": "group",
      "id": "3",
      "name": "Nhóm bài đăng 1",
      "groupType": "post",
      "isOwner": false,
      "menuApi": "/api/config/group/menus?groupId=3"
    }
  ]
}
```

### Mô tả các field

| Field | Có ở type | Mô tả |
|-------|-----------|-------|
| `type` | tất cả | `"admin"` hoặc `"group"` |
| `name` | tất cả | Tên hiển thị trên giao diện |
| `menuApi` | tất cả | URL để gọi lấy sidebar menu của workspace này |
| `id` | group | ID nhóm |
| `groupType` | group | `"comic"` hoặc `"post"` — quyết định icon/nhãn hiển thị |
| `isOwner` | group | `true` → user là chủ nhóm |

### Các trường hợp response

| Tình huống | Kết quả `data` |
|-----------|----------------|
| User có quyền admin + 2 nhóm | 3 bản ghi (1 admin + 2 group) |
| Chỉ có quyền admin, không nhóm | 1 bản ghi admin |
| Không có admin, có 2 nhóm | 2 bản ghi group |
| Không có gì | `[]` |

---

## 3. Lấy menu sidebar của từng workspace

Sau khi user click vào 1 workspace, gọi `menuApi` tương ứng từ response trên.

### Admin workspace

```http
GET /api/config/user/menus
Authorization: Bearer {accessToken}
```

Server trả cây menu admin lọc theo permission của user. Chi tiết từng menu tham khảo [IAM Integration](./frontend-iam-integration.md).

### Group workspace

```http
GET /api/config/group/menus?groupId={id}
Authorization: Bearer {accessToken}
```

Server trả cây menu nhóm lọc theo vai trò của user trong nhóm đó. Nếu user không còn là thành viên → `403`.

**Response menu (dùng chung cho cả 2 loại workspace):**

```json
{
  "success": true,
  "data": [
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
          "children": []
        }
      ]
    }
  ]
}
```

---

## 4. Logic xử lý phía Frontend

```javascript
// 1. Sau khi login xong, gọi song song
const [userRes, workspacesRes] = await Promise.all([
  api.get('/api/auth/me'),
  api.get('/api/iam/user/workspaces'),
]);

store.user       = userRes.data;
store.workspaces = workspacesRes.data;   // có thể rỗng []

// 2. Tự động điều hướng nếu chỉ có 1 workspace
if (store.workspaces.length === 1) {
  enterWorkspace(store.workspaces[0]);
} else {
  router.push('/select-workspace');      // trang chọn workspace
}

// 3. Khi user click vào 1 workspace
async function enterWorkspace(workspace) {
  const menus = await api.get(workspace.menuApi);
  store.currentWorkspace = workspace;
  store.sidebarMenus     = menus.data;

  if (workspace.type === 'admin') {
    router.push('/admin/dashboard');
  } else {
    router.push(`/group/${workspace.id}`);
  }
}
```

---

## 5. Bộ API trong Admin workspace

> Header `Authorization: Bearer {token}` bắt buộc cho tất cả.  
> Thiếu permission → server trả `403`.

### Quản lý nhóm

| Method | Endpoint | Quyền | Mô tả |
|--------|----------|-------|-------|
| GET | `/api/iam/admin/groups` | `group.manage` | Danh sách nhóm |
| POST | `/api/iam/admin/groups` | `group.manage` | Tạo nhóm |
| PUT | `/api/iam/admin/groups/:id` | `group.manage` | Sửa nhóm |
| DELETE | `/api/iam/admin/groups/:id` | `group.manage` | Xóa nhóm |
| GET | `/api/iam/admin/groups/:id/members` | `group.manage` | Thành viên nhóm |
| POST | `/api/iam/admin/groups/:id/members` | `group.manage` | Thêm thành viên |
| DELETE | `/api/iam/admin/groups/:id/members/:userId` | `group.manage` | Xóa thành viên |

### Quản lý vai trò & phân quyền

| Method | Endpoint | Quyền | Mô tả |
|--------|----------|-------|-------|
| GET | `/api/iam/admin/roles` | `role.manage` | Danh sách vai trò |
| POST | `/api/iam/admin/roles` | `role.manage` | Tạo vai trò |
| PUT | `/api/iam/admin/roles/:id/permissions` | `role.manage` | Gán permissions cho role |
| GET | `/api/iam/admin/users/:userId/roles` | `user.role.assign` | Vai trò của user |
| PUT | `/api/iam/admin/users/:userId/roles/sync` | `user.role.assign` | Đồng bộ vai trò |

### Quản lý người dùng

| Method | Endpoint | Quyền | Mô tả |
|--------|----------|-------|-------|
| GET | `/api/auth/admin/users` | `user.manage` | Danh sách user |
| POST | `/api/auth/admin/users` | `user.manage` | Tạo user |
| PUT | `/api/auth/admin/users/:id` | `user.manage` | Sửa user |
| PATCH | `/api/auth/admin/users/:id/status` | `user.manage` | Khóa / mở tài khoản |

### CMS

| Endpoint | Mô tả |
|----------|-------|
| `/api/cms/admin/banners` | Banner |
| `/api/cms/admin/about-sections` | Giới thiệu |
| `/api/cms/admin/faqs` | Câu hỏi thường gặp |
| `/api/cms/admin/partners` | Đối tác |
| `/api/cms/admin/staff` | Nhân sự |
| `/api/cms/admin/galleries` | Thư viện ảnh |
| `/api/cms/admin/contacts` | Liên hệ |
| `/api/cms/admin/certificates` | Chứng chỉ |
| `/api/cms/admin/testimonials` | Đánh giá |
| `/api/cms/admin/projects` | Dự án |

---

## 6. Bộ API trong Group workspace

> Tất cả endpoint nhóm đều truyền `groupId` theo query string hoặc path param.

### Nội dung nhóm

| Endpoint | Quyền cần | Mô tả |
|----------|-----------|-------|
| `GET /api/comics/group/comics?groupId=X` | `comic.view` | Danh sách truyện |
| `GET /api/comics/group/chapters?groupId=X` | `chapter.view` | Danh sách chương |
| `GET /api/posts/group/posts?groupId=X` | `post.view` | Danh sách bài viết |
| `GET /api/posts/group/post-categories?groupId=X` | `post.view` | Danh mục bài viết |

### Quản lý thành viên (chỉ chủ nhóm — `isOwner: true`)

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/iam/groups/:id/members` | Danh sách thành viên |
| GET | `/api/iam/groups/:id/members/:userId/roles` | Vai trò của 1 thành viên |
| PUT | `/api/iam/groups/:id/members/:userId/roles/sync` | Đồng bộ vai trò thành viên |

> Chi tiết đầy đủ từng endpoint xem [Group Workspace Integration](./group-workspace-integration.md).

---

## 7. Gợi ý vị trí trên giao diện

### Header — avatar dropdown

```
┌──────────────────────────────────────────────────────────┐
│  Logo     Trang chủ    Truyện    Bài viết    [Avatar ▼] │
└──────────────────────────────────────────────────────────┘
                                              │
                                      ┌───────────────────┐
                                      │ Nguyen Van A       │
                                      │ user@email.com     │
                                      │ ─────────────────  │
                                      │ Không gian làm việc│
                                      │  🔧 Admin Panel    │  ← chỉ hiện nếu có
                                      │  📚 Nhóm truyện 1  │  ← mỗi nhóm 1 dòng
                                      │  📝 Nhóm bài đăng  │
                                      │ ─────────────────  │
                                      │ Thông tin cá nhân  │
                                      │ Đăng xuất          │
                                      └───────────────────┘
```

- Phần "Không gian làm việc" render trực tiếp từ `store.workspaces`
- Click bất kỳ item → gọi `enterWorkspace(workspace)` → điều hướng
- **Không hiển thị "Admin Panel" nếu `data` không có bản ghi `type: "admin"`**

---

### Trang chọn workspace — `/select-workspace`

Hiển thị khi user có từ 2 workspace trở lên:

```
Chào Nguyen Van A, bạn muốn vào đâu?

  ┌─────────────────────┐   ┌─────────────────────┐   ┌──────────────────────┐
  │  🔧                 │   │  📚                 │   │  📝                  │
  │  Bảng điều khiển    │   │  Nhóm dịch          │   │  Nhóm bài đăng 1     │
  │  quản trị           │   │  truyện 1           │   │                      │
  │                     │   │  👑 Chủ nhóm        │   │  Thành viên          │
  └─────────────────────┘   └─────────────────────┘   └──────────────────────┘
```

- Icon: `🔧` cho admin, `📚` cho group comic, `📝` cho group post
- Badge **"Chủ nhóm"** khi `isOwner: true`
- Click card → `enterWorkspace(workspace)` → gọi `menuApi` → vào workspace

---

### Layout workspace

**Admin** (`/admin/...`):
```
┌──────────────────────────────────────────────────────────┐
│  [← Đổi workspace]     Admin Panel                      │
├──────────────┬───────────────────────────────────────────┤
│  Sidebar     │  Content                                  │
│  (từ         │                                           │
│  user/menus) │                                           │
└──────────────┴───────────────────────────────────────────┘
```

**Group** (`/group/:id/...`):
```
┌──────────────────────────────────────────────────────────┐
│  [← Đổi workspace]     Nhóm dịch truyện 1   📚          │
├──────────────┬───────────────────────────────────────────┤
│  Sidebar     │  Content                                  │
│  (từ         │                                           │
│  group/menus)│                                           │
└──────────────┴───────────────────────────────────────────┘
```

- Nút **"Đổi workspace"** góc trên trái → về `/select-workspace` hoặc mở dropdown danh sách
- Lưu `currentWorkspace` vào store để header biết đang ở đâu

---

## 8. Tóm tắt API theo use-case

| Use-case | API |
|----------|-----|
| Đăng nhập | `POST /api/auth/login` |
| Lấy thông tin user | `GET /api/auth/me` |
| **Biết có workspace nào** | **`GET /api/iam/user/workspaces`** |
| Lấy menu sidebar của workspace | Dùng `menuApi` từ response trên |
| Nội dung nhóm truyện | `GET /api/comics/group/*?groupId=X` |
| Nội dung nhóm bài viết | `GET /api/posts/group/*?groupId=X` |
| CRUD admin (nhóm, vai trò, user) | `/api/iam/admin/*` · `/api/auth/admin/users` |
| CRUD CMS | `/api/cms/admin/*` |

-Note cho FE: BE không cần quan tâm
Chỗ này thì sẽ như này nhé, khi fe đăng nhập xong, nếu thành công thì sẽ link sang 1 trang là user chẳng hạn, chỗ đó sẽ có các cái để chọn là thông tin tài khoản, đổi mật khẩu, api mới bên trên list ra danh sách workspace, đăng xuất

có 1 lỗi bạn sửa luôn cho tôi, khi tôi đăng nhập rồi vào trang login nó vẫn hiện form login, nếu đăng nhập rồi bạn mặc định vào trang bên trên luôn cho tôi nhé