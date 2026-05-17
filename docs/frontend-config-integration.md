# Tích hợp Config Service — Tài liệu API cho Frontend

> **Base URL:** `/api/config` (qua Nginx proxy -> config-service:3003)
>
> Tất cả path bên dưới đều có prefix `/api/config`. Ví dụ: `GET /api/config/general`

---

## Cấu trúc Response chung

```json
// Danh sách
{
  "success": true,
  "message": "Success",
  "code": "SUCCESS",
  "httpStatus": 200,
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10,
    "hasNextPage": true,
    "hasPreviousPage": false
  },
  "timestamp": "2026-05-13T10:00:00+07:00"
}

// Single object
{
  "success": true,
  "message": "Success",
  "code": "SUCCESS",
  "httpStatus": 200,
  "data": { ... },
  "meta": {},
  "timestamp": "2026-05-13T10:00:00+07:00"
}
```

---

## Phân quyền

| Ký hiệu | Nghĩa |
|---------|-------|
| Public | Không cần đăng nhập |
| User | Cần header `Authorization: Bearer {token}` |
| Admin | Cần JWT có quyền admin tương ứng |

---

## Lưu ý chung

- **Request body, query params và response đều dùng camelCase** — `countryId`, `siteName`, không phải `country_id`, `site_name`.
- **ID là string** — BigInt serialize thành string. Gửi lên phải là numeric string (VD: `"123"`).
- **Enum `status`:** `"active"` | `"inactive"`.
- **Menu `type`:** `"route"` | `"group"` | `"link"`.
- **Boolean trong query string:** gửi `"true"` hoặc `"1"`.
- **Query param dùng camelCase**: `countryId=1`, KHÔNG dùng `filter[country_id]=1`.

---

## Tham số phân trang chung (áp dụng cho mọi List API)

| Param | Kiểu | Default | Mô tả |
|-------|------|---------|-------|
| `page` | number | `1` | Trang hiện tại |
| `limit` | number | `10` | Số bản ghi mỗi trang (max 100) |
| `search` | string | — | Tìm kiếm toàn văn (max 200) |
| `sort` | string | — | Ví dụ: `name:ASC`, `createdAt:DESC` |
| `skipCount` | boolean string | `"false"` | `"true"` -> bỏ qua đếm tổng (tăng hiệu năng) |

**Response `meta` cho List:**

```json
{
  "page": 1,
  "limit": 10,
  "total": 100,
  "totalPages": 10,
  "hasNextPage": true,
  "hasPreviousPage": false
}
```

---

## 1. General Config

### Public GET `/api/config/general`

Lấy cấu hình chung của site (cache Redis 10 phút).

**Response `data`:**

```json
{
  "id": "1",
  "siteName": "Comic Platform",
  "siteDescription": "Mô tả site",
  "siteLogo": "https://cdn.example.com/logo.png",
  "siteFavicon": "https://cdn.example.com/favicon.ico",
  "siteEmail": "admin@example.com",
  "sitePhone": "0901234567",
  "siteAddress": "123 Đường Sách, TP.HCM",
  "siteCountryId": "1",
  "siteProvinceId": "2",
  "siteWardId": "3",
  "siteCopyright": "2026 Comic Platform",
  "timezone": "Asia/Ho_Chi_Minh",
  "locale": "vi",
  "currency": "VND",
  "contactChannels": [
    {
      "type": "facebook",
      "value": "https://fb.com/page",
      "label": "Facebook",
      "icon": "facebook-icon",
      "urlTemplate": null,
      "enabled": true,
      "sortOrder": 1
    }
  ],
  "metaTitle": "Comic Platform",
  "metaKeywords": "truyện tranh, manga",
  "ogTitle": "Comic Platform",
  "ogDescription": "Đọc truyện tranh online",
  "ogImage": "https://cdn.example.com/og.jpg",
  "canonicalUrl": "https://example.com",
  "googleAnalyticsId": "G-XXXXXXXXXX",
  "facebookPixelId": "123456789",
  "twitterSite": "@handle",
  "createdUserId": null,
  "updatedUserId": null,
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-05-13T10:00:00.000Z"
}
```

---

### Admin GET `/api/config/admin/general`

Lấy cấu hình (admin, quyền `config.manage`). Giống public, thêm `googleSearchConsole`.

---

### Admin PUT `/api/config/admin/general`

Cập nhật cấu hình chung (quyền `config.manage`). Tất cả field optional — chỉ gửi field cần thay đổi.

**Request Body:**

```json
{
  "siteName": "string (max 255)",
  "siteDescription": "string",
  "siteLogo": "URL http/https (max 500)",
  "siteFavicon": "URL http/https (max 500)",
  "siteEmail": "email (max 255)",
  "sitePhone": "string (max 20)",
  "siteAddress": "string",
  "siteCountryId": "numeric string (1-20 digits)",
  "siteProvinceId": "numeric string (1-20 digits)",
  "siteWardId": "numeric string (1-20 digits)",
  "siteCopyright": "string (max 255)",
  "timezone": "string (max 50), VD: 'Asia/Ho_Chi_Minh'",
  "locale": "string (max 10), VD: 'vi'",
  "currency": "string (max 10), VD: 'VND'",
  "contactChannels": [
    {
      "type": "string (bắt buộc)",
      "value": "string (bắt buộc)",
      "label": "string? (max 255)",
      "icon": "string? (max 500)",
      "urlTemplate": "string? (max 500)",
      "enabled": true,
      "sortOrder": 0
    }
  ],
  "metaTitle": "string (max 255)",
  "metaKeywords": "string",
  "ogTitle": "string (max 255)",
  "ogDescription": "string",
  "ogImage": "URL http/https (max 500)",
  "canonicalUrl": "URL http/https (max 500)",
  "googleAnalyticsId": "string (max 50)",
  "googleSearchConsole": "string (max 255)",
  "facebookPixelId": "string (max 50)",
  "twitterSite": "string (max 50)"
}
```

---

## 2. Email Config

### Admin GET `/api/config/admin/email`

Lấy cấu hình SMTP hiện tại (quyền `config.manage`).

**Response `data`:**

```json
{
  "id": "1",
  "smtpHost": "smtp.example.com",
  "smtpPort": 587,
  "smtpSecure": true,
  "smtpUsername": "user@example.com",
  "smtpPassword": "••••••",
  "fromEmail": "noreply@example.com",
  "fromName": "Comic Platform",
  "replyToEmail": null,
  "createdUserId": null,
  "updatedUserId": null,
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-05-13T10:00:00.000Z"
}
```

---

### Admin PUT `/api/config/admin/email`

Cập nhật cấu hình SMTP email (quyền `config.manage`). Tất cả field optional.

**Request Body:**

```json
{
  "smtpHost": "string (valid public hostname, max 255)",
  "smtpPort": "number (1-65535)",
  "smtpSecure": "boolean",
  "smtpUsername": "string (max 255)",
  "smtpPassword": "string (min 6, max 500)",
  "fromEmail": "email (max 255)",
  "fromName": "string (max 255)",
  "replyToEmail": "email (max 255)"
}
```

> **Lưu ý:** Gửi `"••••••"` cho `smtpPassword` để giữ nguyên mật khẩu hiện tại (không thay đổi).

**Response `data`:** Giống GET `/api/config/admin/email`.

---

## 3. Menu

### Public GET `/api/config/menus`

Lấy cây menu public (group `client`, status `active`, cache 10 phút).

**Response `data`:**

```json
[
  {
    "id": "1",
    "code": "home",
    "name": "Trang chủ",
    "path": "/",
    "icon": "home",
    "type": "route",
    "status": "active",
    "isPublic": true,
    "children": [
      {
        "id": "2",
        "code": "home.intro",
        "name": "Giới thiệu",
        "path": "/intro",
        "icon": null,
        "type": "route",
        "status": "active",
        "isPublic": true,
        "children": []
      }
    ]
  }
]
```

---

### User GET `/api/config/user/menus`

Lấy cây menu admin theo quyền của user đang đăng nhập.

**Headers:**
- `Authorization: Bearer {token}` (bắt buộc)

**Response `data`:** Mảng cây menu, chỉ gồm item user có quyền.

---

### Admin GET `/api/config/admin/menus`

Danh sách menu có phân trang (quyền `menu.manage`).

**Query params:**

| Param | Kiểu | Mô tả |
|-------|------|-------|
| `status` | `active` \| `inactive` | |
| `parentId` | numeric string | Lọc theo menu cha |
| `showInMenu` | boolean string | `"true"` \| `"false"` |
| `group` | string (max 50) | `admin`, `client`, ... |
| + phân trang | | |

---

### Admin GET `/api/config/admin/menus/tree`

Toàn bộ cây menu dạng tree (không phân trang).

---

### Admin GET `/api/config/admin/menus/:id`

Chi tiết menu.

**Response `data`:**

```json
{
  "id": "1",
  "code": "dashboard",
  "name": "Dashboard",
  "path": "/admin/dashboard",
  "apiPath": "api/comics/admin/stats/dashboard",
  "icon": "dashboard",
  "type": "route",
  "status": "active",
  "parentId": null,
  "sortOrder": 0,
  "isPublic": false,
  "showInMenu": true,
  "group": "admin",
  "requiredPermissionCode": "dashboard.view",
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-01T00:00:00.000Z",
  "parent": { "id": "1", "name": "...", "code": "..." }
}
```

---

### Admin POST `/api/config/admin/menus`

Tạo menu mới. (HTTP 201)

```json
{
  "code": "string (3-120, bắt buộc, unique)",
  "name": "string (max 150, bắt buộc)",
  "path": "string? (max 255)",
  "apiPath": "string? (max 255)",
  "icon": "string? (max 120)",
  "type": "route | group | link",
  "status": "active | inactive",
  "parentId": "numeric string?",
  "sortOrder": 0,
  "isPublic": false,
  "showInMenu": true,
  "requiredPermissionCode": "string? (max 120)",
  "group": "string? (max 50, default: 'admin')"
}
```

**Lỗi:** `400` — code đã tồn tại, parentId không hợp lệ, phát hiện vòng lặp parent.

---

### Admin PUT `/api/config/admin/menus/:id`

Cập nhật menu. Giống POST, tất cả optional. `parentId` truyền `null` hoặc `""` để bỏ parent.

---

### Admin DELETE `/api/config/admin/menus/:id`

Xóa menu. **Response `data`:** `true`

---

### Admin GET `/api/config/admin/permissions`

Lấy danh sách quyền để chọn khi tạo/sửa menu (quyền `menu.manage`). Gọi nội bộ tới IAM service — FE chỉ cần quyền `menu.manage`, KHÔNG cần `permission.manage`.

**Query params:**

| Param | Kiểu | Mô tả |
|-------|------|-------|
| `search` | string | Tìm kiếm theo code hoặc name |

**Response `data`:**

```json
[
  { "id": "1", "code": "dashboard.view", "name": "Xem dashboard" },
  { "id": "2", "code": "menu.manage", "name": "Quản lý menu" },
  { "id": "3", "code": "user.manage", "name": "Quản lý người dùng" }
]
```

> Max 200 quyền. Dùng cho trường `requiredPermissionCode` khi tạo/sửa menu.

---

### Public GET `/api/config/menus/enums/:key`

Lấy danh sách giá trị enum cho menu. **Không cần đăng nhập.**

| Key | Mô tả | Giá trị |
|-----|-------|---------|
| `types` | Loại menu | `route`, `group`, `link` |
| `statuses` | Trạng thái | `active`, `inactive` |
| `groups` | Nhóm menu | `admin`, `client` |

**Ví dụ request:**

```
GET /api/config/menus/enums/types
GET /api/config/menus/enums/statuses
GET /api/config/menus/enums/groups
```

**Response `data`:**

```json
[
  { "id": "route", "name": "Route (Nội bộ)" },
  { "id": "group", "name": "Group (Nhóm)" },
  { "id": "link", "name": "Link (Bên ngoài)" }
]
```

---

## 4. Quốc gia (Country)

### Public GET `/api/config/countries`

Danh sách quốc gia (chỉ active, cache 24h).

**Query params:** `name`, `code` + phân trang

**Response `data[i]`:**

```json
{
  "id": "1",
  "code": "VN",
  "codeAlpha3": "VNM",
  "name": "Viet Nam",
  "officialName": "Cộng hòa Xã hội Chủ nghĩa Việt Nam",
  "phoneCode": "+84",
  "currencyCode": "VND",
  "flagEmoji": "🇻🇳",
  "status": "active",
  "createdUserId": null,
  "updatedUserId": null,
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-01T00:00:00.000Z"
}
```

---

### Public GET `/api/config/countries/:id/provinces`

Danh sách tỉnh/thành của quốc gia (chỉ active, cache 24h).

**Query params:** `name`, `code` + phân trang

---

### Admin GET `/api/config/admin/countries`

Danh sách quốc gia admin (bao gồm inactive, quyền `country.manage`).

**Query params thêm:** `status` (`active` | `inactive`), `name`, `code` + phân trang

---

### Admin GET `/api/config/admin/countries/simple`

Danh sách rút gọn (limit 1000, skipCount forced) — dùng cho dropdown.

---

### Admin GET `/api/config/admin/countries/:id`

Chi tiết quốc gia. Response giống `data[i]` của list.

---

### Admin POST `/api/config/admin/countries`

Tạo quốc gia mới. (HTTP 201)

```json
{
  "code": "string (max 10, bắt buộc) — ISO alpha-2, VD: 'VN'",
  "codeAlpha3": "string? (max 10) — VD: 'VNM'",
  "name": "string (max 255, bắt buộc)",
  "officialName": "string? (max 255)",
  "phoneCode": "string? (max 20) — VD: '+84'",
  "currencyCode": "string? (max 20)",
  "flagEmoji": "string? (max 20)",
  "status": "active | inactive"
}
```

---

### Admin PATCH `/api/config/admin/countries/:id`

Cập nhật. Tất cả optional.

---

### Admin DELETE `/api/config/admin/countries/:id`

Xóa. **`409 Conflict`** nếu còn tỉnh/thành liên kết. **Response `data`:** `true`

---

## 5. Tỉnh/Thành phố (Province)

### Public GET `/api/config/provinces`

**Query params:** `name`, `code` + phân trang

**Response `data[i]`:**

```json
{
  "id": "1",
  "code": "HCM",
  "name": "Hồ Chí Minh",
  "type": "Thành phố Trực thuộc Trung ương",
  "phoneCode": "028",
  "countryId": "1",
  "status": "active",
  "note": null,
  "codeBnv": null,
  "codeTms": null,
  "createdUserId": null,
  "updatedUserId": null,
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-01T00:00:00.000Z"
}
```

---

### Public GET `/api/config/countries/:countryId/provinces`

Tỉnh theo quốc gia (cache 24h).

---

### Public GET `/api/config/provinces/:id/wards`

Phường/xã theo tỉnh (cache 24h). **Query params:** `name`, `code` + phân trang

---

### Admin GET `/api/config/admin/provinces`

**Query params:** `name`, `code`, `status`, `countryId` + phân trang

---

### Admin GET `/api/config/admin/provinces/simple`

Dropdown — limit 1000, skipCount forced.

---

### Admin GET `/api/config/admin/provinces/:id`

Chi tiết tỉnh. Response giống `data[i]` của list.

---

### Admin POST `/api/config/admin/provinces`

Tạo tỉnh mới. (HTTP 201)

```json
{
  "code": "string (max 20, bắt buộc)",
  "name": "string (max 255, bắt buộc)",
  "type": "string (max 50, bắt buộc) — VD: 'Tỉnh', 'Thành phố Trực thuộc Trung ương'",
  "phoneCode": "string? (max 20)",
  "countryId": "numeric string (1-20 digits, bắt buộc)",
  "status": "active | inactive",
  "note": "string? (max 2000)",
  "codeBnv": "string? (max 20)",
  "codeTms": "string? (max 20)"
}
```

### Admin PATCH `:id` / DELETE `:id`

CRUD tiêu chuẩn. DELETE trả `true`. Wards bị cascade xóa khi xóa tỉnh.

---

## 6. Phường/Xã (Ward)

### Public GET `/api/config/wards`

**Query params:** `name`, `code` + phân trang

**Response `data[i]`:**

```json
{
  "id": "1",
  "provinceId": "1",
  "name": "Phường Bến Nghé",
  "type": "Phường",
  "code": "26734",
  "status": "active",
  "createdUserId": null,
  "updatedUserId": null,
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-01T00:00:00.000Z"
}
```

---

### Public GET `/api/config/provinces/:provinceId/wards`

Phường/xã theo tỉnh (cache 24h).

---

### Admin GET `/api/config/admin/wards`

**Query params:** `name`, `code`, `status`, `provinceId` + phân trang

---

### Admin GET `/api/config/admin/wards/simple`

Dropdown — limit 1000, skipCount forced.

---

### Admin GET `/api/config/admin/wards/:id`

Chi tiết phường/xã. Response giống `data[i]` của list.

---

### Admin POST `/api/config/admin/wards`

Tạo phường/xã mới. (HTTP 201)

```json
{
  "provinceId": "numeric string (1-20 digits, bắt buộc)",
  "name": "string (max 255, bắt buộc)",
  "type": "string (max 50, bắt buộc) — VD: 'Phường', 'Xã', 'Thị trấn'",
  "code": "string (max 20, bắt buộc)",
  "status": "active | inactive"
}
```

### Admin PATCH `:id` / DELETE `:id`

CRUD tiêu chuẩn. DELETE trả `true`.

---

## 7. Cache

### Public GET `/api/config/cache/flush`

Xóa toàn bộ Redis cache. **Throttle: 5 req/60s.**

**Response `data`:**

```json
{
  "flushed": true,
  "reason": "redis_disabled"
}
```

> `reason` chỉ có khi `flushed = false`.

---

## Luồng tích hợp địa chỉ (Country -> Province -> Ward)

```
1. GET /api/config/countries?limit=200
   -> Hiển thị dropdown quốc gia

2. Khi chọn quốc gia (countryId):
   GET /api/config/countries/{countryId}/provinces?limit=100
   -> Hiển thị dropdown tỉnh/thành

3. Khi chọn tỉnh (provinceId):
   GET /api/config/provinces/{provinceId}/wards?limit=500
   -> Hiển thị dropdown phường/xã
```

---

## Tổng hợp endpoint

| Method | Path | Auth | Mô tả |
|--------|------|------|-------|
| GET | `/api/config/general` | Public | Cấu hình chung |
| GET | `/api/config/admin/general` | Admin | Cấu hình chung (admin) |
| PUT | `/api/config/admin/general` | Admin | Cập nhật cấu hình chung |
| GET | `/api/config/admin/email` | Admin | Lấy cấu hình SMTP |
| PUT | `/api/config/admin/email` | Admin | Cập nhật SMTP email |
| GET | `/api/config/menus` | Public | Menu public |
| GET | `/api/config/user/menus` | User | Menu theo quyền user |
| GET | `/api/config/admin/menus` | Admin | Danh sách menu |
| GET | `/api/config/admin/menus/tree` | Admin | Cây menu |
| GET | `/api/config/admin/permissions` | Admin | DS quyền cho menu |
| GET | `/api/config/admin/menus/:id` | Admin | Chi tiết menu |
| POST | `/api/config/admin/menus` | Admin | Tạo menu |
| PUT | `/api/config/admin/menus/:id` | Admin | Cập nhật menu |
| DELETE | `/api/config/admin/menus/:id` | Admin | Xóa menu |
| GET | `/api/config/menus/enums/types` | Public | Enum loại menu |
| GET | `/api/config/menus/enums/statuses` | Public | Enum trạng thái menu |
| GET | `/api/config/menus/enums/groups` | Public | Enum nhóm menu |
| GET | `/api/config/countries` | Public | DS quốc gia |
| GET | `/api/config/countries/:id/provinces` | Public | Tỉnh theo quốc gia |
| GET | `/api/config/admin/countries` | Admin | DS quốc gia (admin) |
| GET | `/api/config/admin/countries/simple` | Admin | Dropdown quốc gia |
| GET | `/api/config/admin/countries/:id` | Admin | Chi tiết quốc gia |
| POST | `/api/config/admin/countries` | Admin | Tạo quốc gia |
| PATCH | `/api/config/admin/countries/:id` | Admin | Cập nhật quốc gia |
| DELETE | `/api/config/admin/countries/:id` | Admin | Xóa quốc gia |
| GET | `/api/config/provinces` | Public | DS tỉnh/thành |
| GET | `/api/config/countries/:countryId/provinces` | Public | Tỉnh theo quốc gia |
| GET | `/api/config/provinces/:id/wards` | Public | Phường/xã theo tỉnh |
| GET | `/api/config/admin/provinces` | Admin | DS tỉnh (admin) |
| GET | `/api/config/admin/provinces/simple` | Admin | Dropdown tỉnh |
| GET | `/api/config/admin/provinces/:id` | Admin | Chi tiết tỉnh |
| POST | `/api/config/admin/provinces` | Admin | Tạo tỉnh |
| PATCH | `/api/config/admin/provinces/:id` | Admin | Cập nhật tỉnh |
| DELETE | `/api/config/admin/provinces/:id` | Admin | Xóa tỉnh |
| GET | `/api/config/wards` | Public | DS phường/xã |
| GET | `/api/config/provinces/:provinceId/wards` | Public | Phường/xã theo tỉnh |
| GET | `/api/config/admin/wards` | Admin | DS phường/xã (admin) |
| GET | `/api/config/admin/wards/simple` | Admin | Dropdown phường/xã |
| GET | `/api/config/admin/wards/:id` | Admin | Chi tiết phường/xã |
| POST | `/api/config/admin/wards` | Admin | Tạo phường/xã |
| PATCH | `/api/config/admin/wards/:id` | Admin | Cập nhật phường/xã |
| DELETE | `/api/config/admin/wards/:id` | Admin | Xóa phường/xã |
| GET | `/api/config/cache/flush` | Public | Xóa cache |
