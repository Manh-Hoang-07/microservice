# ⚠️ Tài liệu đã chuyển

Doc này đã được thay thế bằng tài liệu IAM đầy đủ. Vui lòng dùng:

📄 **[docs/integration/frontend-iam-integration.md](integration/frontend-iam-integration.md)**

---

## Tóm tắt thay đổi (2026-05-17)

Tài liệu mới gộp toàn bộ API IAM cho FE: Role, Permission, Group, User-Role, User groups.

### URL admin có prefix `admin/`

Tất cả endpoint admin của IAM Service hiện **bắt buộc** có prefix `admin/`. Các URL cũ KHÔNG còn hoạt động (sẽ trả 404).

| URL cũ (đã bỏ) | URL mới |
|---|---|
| `/api/iam/roles` | `/api/iam/admin/roles` |
| `/api/iam/roles/:id/permissions` | `/api/iam/admin/roles/:id/permissions` |
| `/api/iam/permissions` | `/api/iam/admin/permissions` |
| `/api/iam/groups` | `/api/iam/admin/groups` |
| `/api/iam/groups/:id/members` | `/api/iam/admin/groups/:id/members` |
| `/api/iam/users/:userId/roles` | `/api/iam/admin/users/:userId/roles` |
| `/api/iam/users/:userId/roles/sync` | `/api/iam/admin/users/:userId/roles/sync` |

Endpoint user (`/api/iam/user/groups`) và internal (`/api/iam/internal/rbac/*`) — **giữ nguyên**, không đổi.

### Đã bỏ Context

- Bỏ hoàn toàn khái niệm Context (system context, group context).
- Permission KHÔNG còn scope theo group nữa — mỗi user có 1 bộ permissions toàn cục.
- Header `x-group-id` đã gỡ bỏ — không gửi nữa.
- Field `contextId` (Create/List Group), `groupId` (Sync/Assign/Remove role) — đã bỏ.

Chi tiết đầy đủ xem trong [docs/integration/frontend-iam-integration.md](integration/frontend-iam-integration.md).
