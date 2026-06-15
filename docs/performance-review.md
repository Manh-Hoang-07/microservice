# Đánh giá hiệu năng — Comic Platform (Microservices)

> Ngày đánh giá: 2026-06-13
> Phạm vi: 9 microservice trong `apps/` (bỏ qua `monolith` — chỉ là bản gộp re-export).
> Phương pháp: mỗi service do một agent chuyên trách review độc lập (static analysis: code + `schema.prisma` + migrations). Chỉ phân tích, không sửa code.

## Tóm tắt điều hành

Nhìn chung codebase **trưởng thành về hiệu năng**: hầu hết public read path đã có Redis cache + versioning + single-flight, list dùng `Promise.all(data, count)` + pagination + allowlist sort, repository dùng `select` thay vì over-fetch, có circuit breaker + timeout cho external call, view-count dùng HLL buffer thay vì ghi DB mỗi lượt. Các vấn đề còn lại tập trung vào vài nhóm lặp lại xuyên service.

### Vấn đề xuyên suốt (pattern lặp ở nhiều service)

| Pattern | Service bị ảnh hưởng | Mức độ |
|---|---|---|
| **Cache key tĩnh bỏ qua query params** (page/filter/sort dùng chung 1 key → vừa sai dữ liệu vừa vô hiệu cache) | cms (8 module), config (location) | 🔴 Critical |
| **Schema/migration drift hoặc thiếu index cho cột dùng trong `orderBy`/`where` nóng** | auth (`search_text`), post (`updated_at`), iam (`roles(role_type,status)`) | 🔴 Critical |
| **IamClient thiếu cache membership và/hoặc circuit breaker** | post, comic | 🟠 Medium |
| **View-flush cron: 2 upsert tuần tự mỗi item** thay vì `Promise.all` | post, comic | 🟢 Low |
| **Over-fetch trên list** (thiếu `select`, kéo cột Text/JSON nặng) | config, cms, notification | 🟡 Medium |
| **Endpoint nóng không cache** (homepage, user-menu, member-permissions, template) | comic, config, iam, notification | 🟠 High |

### Top ưu tiên toàn hệ thống

1. 🔴 **cms-service** — cache key tĩnh ở cả 8 public module (bug đúng đắn + cache vô dụng dưới tải).
2. 🔴 **auth-service** — drift `search_text`: index khai báo trong schema nhưng không migration nào tạo → full table scan list/search trên DB thật.
3. 🔴 **post-service** — admin/group list `orderBy updated_at DESC` nhưng không có index trên `updated_at`.
4. 🔴 **iam-service** — `/internal/groups/member-permissions` (endpoint nóng nhất hệ thống) không cache phía IAM.
5. 🟠 **auth-service** — `bcryptjs` rounds=12 (pure-JS) chặn event loop ~200-400ms mỗi login/register.

---

## Bảng thống kê theo service

| Service | Critical | High | Medium | Low | Nhận xét tổng quan |
|---|:-:|:-:|:-:|:-:|---|
| auth-service | 1 | 2 | 3 | 3 | Tốt; 2 điểm nóng: drift index + bcryptjs blocking |
| iam-service | 2 | 2 | 4 | 3 | Service phức tạp nhất; endpoint RBAC nóng cần cache/precompute |
| config-service | 0 | 2 | 2 | 4 | Khá tốt; user-menu chưa cache + cache key location sai |
| storage-service | 1 | 4 | 3 | 2 | Không dùng DB; vấn đề chính là buffer file vào RAM |
| notification-service | 0 | 3 | 5 | 4 | Nhiều điểm tốt; cache template + tối ưu fanout |
| cms-service | 1 | 2 | 2 | 2 | Cache key tĩnh là vấn đề lớn nhất (lặp 8 module) |
| post-service | 1 | 3 | 4 | 3 | Tốt; thiếu index `updated_at` + count/detail cache |
| comic-service | 0 | 2 | 3 | 3 | Rất tốt; chủ yếu homepage chưa cache |
| web-api-service | 0 | 2 | 3 | 3 | BFF thiết kế tốt; chỉ tinh chỉnh pool/TTL |

---

## auth-service

Service nhỏ, chất lượng tốt: hầu hết lookup dùng `select`, list đã phân trang + `Promise.all`, IAM client có timeout + circuit breaker + cache, refresh-token dùng Redis pipeline.

### 🔴 Critical
**1. Index `search_text` (và cả cột) chỉ có trong schema, KHÔNG migration nào tạo**
- `prisma/schema.prisma:28,39` vs `prisma/migrations/20260501164649_init/migration.sql:2-22`
- Schema khai báo cột `searchText` + `@@index([searchText])` + `@@index([status,createdAt])`, nhưng migration init không có cột `search_text` lẫn các index này. → Drift schema/DB.
- **Tác động:** List admin (`buildWhere` dùng `searchText.startsWith` + `status`) chạy **full table scan** trên DB thật; nếu cột chưa tồn tại có thể lỗi runtime.
- **Fix:** Tạo migration thêm cột + index. Lưu ý `startsWith` (LIKE 'x%') cần `text_pattern_ops`: `CREATE INDEX users_idx_search_text ON users (search_text text_pattern_ops);`

### 🟠 High
**2. `bcryptjs` rounds=12 chặn event loop**
- `modules/user/admin/services/user.service.ts:46,81,103`; `registration.service.ts:41`; `password.service.ts:71`; `profile.service.ts:65`
- `bcryptjs` (pure-JS) chậm hơn native ~30-40% và block toàn bộ Node thread ~200-400ms mỗi `hash`/`compare`.
- **Tác động:** Mỗi login/register/reset block event loop → throughput rất thấp dưới tải, nghẽn cả health check/JWKS.
- **Fix:** Chuyển sang native `bcrypt` (dùng libuv threadpool) hoặc `argon2`; hoặc giảm rounds 10-11.

**3. JWKS endpoint không cache, export JWK mỗi request**
- `jwks/controllers/jwks.controller.ts:12-15`, `jwks/services/jwks.service.ts:85-96`
- `/.well-known/jwks.json` export JWK mỗi lần dù key không đổi; không set `Cache-Control`.
- **Fix:** Memoize `getJwkSet()` (invalidate khi rotation) + header `Cache-Control: public, max-age=300`.

### 🟡 Medium
- **4.** `validateUniqueness` register chạy 3 query tuần tự (`registration.service.ts:89-103`) → gộp 1 query `OR` (như `checkUnique`).
- **5.** `findByEmail`/`findById` over-fetch toàn cột kể cả `searchText`/`password` (`user.repository.ts:14-24`) → thêm `select` tối thiểu.
- **6.** `forgotPassword`/`resetPassword` dùng `findByEmailSelect` thay vì over-fetch (`password.service.ts:34,63`).

### 🟢 Low
- **7.** `findAllSimple` hardcode `take: 200` không phân trang (`user-admin.repository.ts:79-90`) — chấp nhận được cho lookup.
- **8.** Outbox relay cron mỗi 5s — polling cố định, đã có index, chấp nhận được.
- **9.** `revokeAllUserSessions` smembers → deleteMany (`token.service.ts:115-132`) — OK với quy mô hiện tại.

---

## iam-service

Service RBAC phức tạp nhất; các internal endpoint được mọi service gọi liên tục.

### 🔴 Critical
**1. `/internal/groups/member-permissions` — KHÔNG cache phía IAM + N+1 nested fetch**
- `src/internal/controllers/group.controller.ts:29-33` → `group-member-role.repository.ts:166-190` (`getPermissionCodes`)
- Endpoint nóng nhất hệ thống (mọi `@PermissionGroup` gọi). Guard cache 60s nhưng khi miss/bump version, request đổ thẳng DB với `include` lồng nhiều tầng. Khác với các method khác đều đã cache.
- **Fix:** Cache `getPermissionCodes(userId, groupId)` trong Redis (TTL 60s, versioned theo `rbac:meta.version`), hoặc raw query `SELECT DISTINCT perm.code` thay include lồng.

**2. `getEffectivePermissions`/`expandAssigned` — O(N_permissions × depth) mỗi lần tính**
- `src/rbac/services/rbac-permission-index.service.ts:92-105` → `rbac.service.ts:48-52`
- Lặp qua **toàn bộ** permission, mỗi code gọi `grants()` (walk ancestors) → blocking event loop khi nhiều user cache miss đồng thời.
- **Fix:** Precompute `ancestorCode → Set<descendantCodes>` một lần khi build index; `expandAssigned` chỉ union theo code user giữ. Cache effective set vào Redis.

### 🟠 High
**3. `getMembers` over-fetch toàn bộ member rồi filter/sort/paginate trong JS**
- `group/admin/services/group.service.ts:81-126` và `group/group/services/group-owner.service.ts:80-125` (trùng lặp)
- Fetch toàn bộ `findMemberIds` (cap 500) → gọi `authClient.getUsersByIds` cho tất cả → filter/sort/slice in-memory. `total` sai khi vượt 500.
- **Fix:** Đẩy search/sort/pagination xuống auth-service, hoặc paginate `userIds` trước khi gọi auth. Tách logic dùng chung.

**4. CTE `getActivePermissionCodes` thiếu index `roles(role_type, status)`**
- `src/rbac/repositories/rbac.repository.ts:82-107`; `roles` chỉ có `@@index([roleType])`
- CTE đệ quy filter `r.status='active' AND r.role_type='system'` không có composite index. Chạy mỗi khi RBAC cache miss (sau mỗi bump version → toàn bộ user invalidate).
- **Fix:** Thêm composite index `roles(role_type, status)`.

### 🟡 Medium
- **5.** `invalidateGroupRoleCaches` dùng `redis.keys(...)` — lệnh O(N) blocking Redis (`group-member-role.repository.ts:160-164`) → dùng SCAN hoặc tracked SET.
- **6.** `countUsersWithPermission` kéo full rows về JS rồi `.length` (`rbac.repository.ts:119-155`) → `SELECT COUNT(DISTINCT user_id)`.
- **7.** Thiếu index `permissions(status)` cho filter `status='active'` lặp lại (bảng nhỏ → tác động thấp).
- **8.** Migration mới `20260613_add_group_indexes` phủ tốt group list/role nhưng còn thiếu `roles(role_type, status)` cho RBAC toàn cục.

### 🟢 Low
- **9.** Logic `getMembers` trùng lặp admin vs group → trích helper chung.
- **10.** `findUserGroups` (`/membership`) fetch tất cả group của user rồi `.find()` 1 group (`group.repository.ts:213-220`) → `findUnique({ userId_groupId })`.
- **11.** `clearAllUserCaches` + `refreshPermissions` eager sau mỗi assign (`rbac.service.ts:130-134,150-154`) — version bump đã đủ, cân nhắc lazy.

---

## config-service

Kiến trúc tốt: `CachedService` (getOrSet + inflight dedup chống stampede), public read cache Redis với TTL hợp lý, index DB đầy đủ, IAM client có timeout + circuit breaker.

### 🟠 High
**1. User menu tree (`/user/menus`) không cache — gọi IAM + full-table scan mỗi request**
- `src/modules/menu/user/services/menu.service.ts:15-22`
- Mỗi request: gọi IAM `getUserPermissions` + `findAllWithChildren` (tải toàn bộ menu) + build tree. Endpoint admin panel gọi mỗi lần load layout.
- **Fix:** Cache theo user (TTL 30-60s, versioned theo permission version); tối thiểu cache "menu admin thô" chung (TTL 600s) để bỏ full-table query.

**2. Cache key bỏ qua query params ở public location**
- `province/public/services/province.service.ts:18-42`, `country/.../country.service.ts:18-32`, `ward/.../ward.service.ts:16-30`
- Key cố định nhưng factory nhận query động (page/limit/search/sort). Request đầu "đóng băng" kết quả vào key chung; request sau nhận sai tới hết TTL (86400s).
- **Fix:** Đưa query vào cache key (hash params), hoặc chuẩn hóa public chỉ cache "toàn bộ active list" cố định.

### 🟡 Medium
- **3.** `provinces`/`wards`/`countries` public `findMany` không `select` → over-fetch cột nội bộ (`created_user_id`...), khuếch đại với `getSimpleList` limit 1000.
- **4.** `assertNoCycle` menu update — N query tuần tự theo độ sâu cây (`menu.service.ts:136-152`) → tải 1 lần `(id, parentId)` rồi leo in-memory.

### 🟢 Low
- **5.** `findByCode` dùng `findFirst` trên cột unique (`menu.repository.ts:79-84`) → `findUnique`.
- **6.** Trùng index `code` trên `menus` (`@unique` + `@@index([code])`) → bỏ `@@index`.
- **7.** `CachePurgeController.flush` là `@Public()` gọi `flushDb()` toàn bộ → đổi `@Internal()` + xóa theo prefix (rủi ro perf + security).
- **8.** BigInt serialize thành `Number` khi cache (`cached.service.ts:25`) → dùng string cho an toàn lâu dài.

---

## storage-service

**Không dùng Prisma/database** → N+1/index/transaction/over-fetch DB không áp dụng. Trọng tâm: stream/buffer/memory + external call S3/Cloudinary.

### 🔴 Critical
**1. Toàn bộ file nạp vào RAM (memory storage) — buffer thay vì stream**
- `src/modules/upload/controllers/upload.controller.ts:60-70,96-106`; mọi strategy
- `FileInterceptor`/`FilesInterceptor` không cấu hình `storage` → multer dùng memoryStorage; mỗi file nạp trọn vào `file.buffer`. Strategy chỉ bọc `Readable.from(buffer)` (stream giả).
- **Tác động:** 10 file × 10MB = 100MB/request × concurrency → nguy cơ OOM. Điểm nóng memory lớn nhất.
- **Fix:** Dùng `diskStorage` hoặc streaming parser (`@fastify/multipart`/`busboy`) + `@aws-sdk/lib-storage` multipart streaming.

### 🟠 High
- **2.** S3 `delete()` gọi `exists()` (HeadObject) tuần tự trước DeleteObject (`s3.strategy.ts:168-180`) — DeleteObject vốn idempotent → bỏ bước Head.
- **3.** Cleanup khi upload lỗi xóa tuần tự từng file (`upload.service.ts:67-71`) → `Promise.allSettled`.
- **4.** S3Client không có timeout/retry (`s3.strategy.ts:45-53`) → backend treo cạn connection pool. Cấu hình `NodeHttpHandler({ connectionTimeout, requestTimeout })` + `maxAttempts`.

### 🟡 Medium
- **5.** Download local không set `Cache-Control`/`ETag`/`Range` (`upload.controller.ts:163-186`) → không cache/304/seek video được.
- **6.** `getMetadata` trả `mimetype: 'application/octet-stream'` cố định → lưu mimetype thật vào object metadata.
- **7.** Local `list()` stat tuần tự toàn thư mục rồi mới slice (`local.strategy.ts:142-176`) → O(n) stat. Dùng `withFileTypes` + stat song song có giới hạn + phân trang.

### 🟢 Low
- **8.** Magic-byte validation đồng bộ trên buffer (`file-validation.service.ts:230-257`) — nhẹ, chấp nhận được.
- **9.** Cloudinary download 2 external call tuần tự (`cloudinary.strategy.ts:92,129`) → dựng URL trực tiếp nếu chỉ cần redirect.

---

## notification-service

Nhiều điểm tốt: batch `createMany` 500/lần, Bull queue cho mail, nodemailer pool, circuit breaker ConfigClient, index DB đầy đủ, cache unread count.

### 🟠 High
**1. Thiếu cache template — query DB mỗi lần gửi 1 email**
- `src/modules/mail/services/mail.service.ts:129` (`findActiveByCode`)
- Template gần như tĩnh nhưng query DB mỗi job. Mail hàng loạt → số query = số email.
- **Fix:** Cache template theo `code` (Redis/in-memory TTL 60-300s), invalidate khi admin update.

**2. `findActiveByCode` filter `{code,status,category,type}`** — `code` đã unique nên OK; ưu tiên fix cache (#1) (`content-template.repository.ts:61-65`).

**3. ConfigClient reload lazy trên đường gửi mail** (`mail.service.ts:67-80`) — mỗi 5 phút 1 mail chờ tới 5s. Reload nền (interval timer) thay vì lazy.

### 🟡 Medium
- **4.** `comic_followers_projection` thiếu covering index `(comicId, userId)`; fanout load toàn bộ followers vào RAM (`schema.prisma:57-67`, `followers-projection.repository.ts:8`) → covering index + stream/paginate.
- **5.** Fanout `chapter.published` xử lý batch tuần tự (`chapter-published.handler.ts:26-41`) — 50k followers = 100 round-trip nối tiếp → concurrency limit (p-limit) hoặc job nền.
- **6.** `invalidateUnreadCounts` xóa cache theo từng userId-set mỗi batch (`notification.service.ts:74-87`) → gom 1 lần cuối/pipeline.
- **7.** RabbitMQ consumer không cấu hình `prefetchCount` (`rabbitmq-consumer.service.ts:18`) → đặt rõ theo loại queue.
- **8.** Bull limiter toàn cục 10 jobs/s (`queue.module.ts:17`) — nghẽn mail burst (≤600/phút). Cân nhắc nâng theo năng lực SMTP.

### 🟢 Low
- **9.** `filterRateLimited` gọi Redis tuần tự từng recipient (`mail.service.ts:196-214`) → pipeline.
- **10.** List notification/template không `select`, trả cả `data`/`content`/`metadata` nặng → thêm `select` cho list view.
- **11.** `markAsRead` read-then-write 2 query (`user/services/notification.service.ts:55-60`) → `updateMany({id,userId})` 1 query.
- **12.** `attempts` Map trong KafkaService tăng không giới hạn (`kafka.service.ts:30`) → LRU/TTL cleanup.

---

## cms-service

Schema index đầy đủ. Vấn đề tập trung ở tầng cache.

### 🔴 Critical
**1. Cache key tĩnh bỏ qua toàn bộ query params → trả sai dữ liệu + cache thrash**
- 8 module public `getList`: `banner/public/services/banner.service.ts:47`, `about/.../about.service.ts:39`, `testimonial:43`, `certificate:40`, `partner:40`, `staff:40`, `gallery:41`, `faq:40`
- Key cố định (vd `'cms:public:banners:list'`) nhưng `getList` nhận `page/limit/sort` + filter động (`featured`, `projectId`, `type`, `locationId`, `search`...). Mọi biến thể query ghi đè/đọc chung 1 key.
- **Tác động:** Bug đúng đắn (request `?featured=true&page=2` nhận cache `?page=1`); cache gần như vô dụng dưới tải → vẫn đập DB. `inflight` map cũng share nhầm Promise.
- **Fix:** Đưa params phân biệt vào key (vd `...:list:${locationCode}:${page}:${take}:${sort}`); `inflight` cũng key theo cùng chuỗi.

### 🟠 High
- **2.** Cache invalidation chỉ `del()` 1 key tĩnh (`banner/admin:18-20`, `faq:16-21`, `about/admin:17-22`) — sau khi fix #1 sẽ còn nhiều key biến thể → dùng **versioning** (incr 1 key version, nhúng vào cache key).
- **3.** Cache key prefix không nhất quán admin vs public; `contact.service.ts:15` xóa key chết `'cms:admin:contacts:list'` (no-op) → tập trung tạo key vào 1 helper.

### 🟡 Medium
- **4.** FAQ increment view/helpful không invalidate cache + 1 read thừa (`faq/public/services/faq.service.ts:57-67`); write DB mỗi lượt xem → đếm bằng Redis INCR flush định kỳ.
- **5.** Banner/testimonial `findMany` admin/list dùng `include`/không `select` cột entity → kéo full Text (`content`/`description`/`bio`) (`banner.repository.ts:84,107-109`; `testimonial.repository.ts`) → `select` whitelist cho list.

### 🟢 Low
- **6.** `getOrSet` copy-paste 8 lần; một số module không serialize BigInt → `JSON.stringify` ném lỗi, bị `.catch(()=>{})` nuốt → **cache set thất bại âm thầm = cache luôn miss** (about/staff/gallery/certificate/partner/faq). Trích helper chung luôn dùng replacer BigInt→string.
- **7.** Outbox relay cron mỗi 5s — `contact.submitted` tần suất thấp, đã có index, chấp nhận được.

---

## post-service

Tối ưu tốt nhiều mặt: composite index `status+published_at`, cache versioned public, `select`, `Promise.all`, HLL view-count, outbox relay.

### 🔴 Critical
**1. Admin/group list `orderBy: updatedAt DESC` nhưng KHÔNG có index trên `updated_at`**
- `src/modules/post/repositories/post.repository.ts:141` (`findMany`)
- `schema.prisma` (Post) + migration init không có index trên `updated_at` (chỉ `created_at`/`published_at`/`status`). Group list thêm filter `groupId` → `WHERE group_id=? ORDER BY updated_at DESC`.
- **Tác động:** Mỗi lần mở list admin/nhóm → full sort không index, chậm tuyến tính theo số bài.
- **Fix:** `@@index([updatedAt(sort: Desc)])` + `@@index([groupId, updatedAt(sort: Desc)])`; hoặc dùng `buildOrderBy` (như public) thay hardcode.

### 🟠 High
- **2.** Offset pagination sâu trên public feed — không cursor (`post.repository.ts:147-155`); `page` tới 1000, `skip` tới 99.900 → keyset/cursor pagination (`WHERE (published_at, id) < (?, ?)`).
- **3.** Count query mỗi request public (không skipCount như admin) (`public/services/post.service.ts:43-46`); count qua quan hệ many-to-many khi lọc category/tag càng đắt → cache `total` riêng TTL dài, hoặc fetch `take+1` thay count.
- **4.** View-count flush: 2 upsert tuần tự mỗi item (`view-cron.service.ts:68-82`) → `Promise.all` hoặc bulk upsert `INSERT ... ON CONFLICT`.

### 🟡 Medium
- **5.** IamClient thiếu circuit breaker, chỉ timeout 5s (`iam.client.ts:37-61`) → bọc `createCircuitBreaker()`, giảm timeout ~2s, cache membership.
- **6.** `assertInGroup` fetch full post (`WITH_RELATIONS`) chỉ để check `groupId` (`group-post.service.ts:55-60`) → method `findGroupId` select `{id, groupId}`.
- **7.** `StatsAdminService.getPostDailyStats` fetch full post để verify tồn tại (`stats.service.ts:41`) → select tối thiểu.
- **8.** `getBySlug` luôn query DB trước cache để lấy id cho view-count (`public/services/post.service.ts:55-77`) → cache detail vô dụng. Chỉ query `id` nhẹ cho view-count, data lấy từ `getOrSet`.

### 🟢 Low
- **9.** Lọc category/tag bằng `some` làm count đắt (`post.repository.ts:114-119`) — ưu tiên fix #3.
- **10.** JSON serialize BigInt chạy 2 lần mỗi cache write (`public/services/post.service.ts:106-118,137`) — nhỏ.
- **11.** Outbox relay cron 5s — index đúng, không phải vấn đề.

---

## comic-service

Hiệu năng **rất tốt**: schema index dày đặc, public read cache + versioning + single-flight, view tracking HLL dedup + buffer + cron flush.

### 🟠 High
**1. Homepage endpoints không có cache — đọc DB mỗi request**
- `src/modules/homepage/services/homepage.service.ts:9-27`, `homepage.controller.ts`
- 5 endpoint homepage (`top-viewed`/`popular`/`newest`/`recently-updated`/`categories`) gọi thẳng DB không qua Redis. Trang lưu lượng cao nhất; mỗi tải = 5 query (join stats + categoryLinks + subquery chapter).
- **Fix:** Bọc Redis cache (TTL 30-60s) như public service khác; bump version trong `clearComicCaches`/`clearChapterCaches`.

**2. Homepage `limit` không cap → `take` không giới hạn**
- `homepage.controller.ts:11-31` → `homepage.repository.ts:30-37`
- `Number(limit) || 12` truyền thẳng vào `take`. `?limit=100000` fetch 100k comic + relations — DoS vector.
- **Fix:** `Math.min(Math.max(Number(limit) || 12, 1), 50)`.

### 🟡 Medium
- **3.** Admin chapter list over-fetch toàn bộ pages mọi chapter (`WITH_PAGES` không `take`) (`chapter/admin/services/chapter.service.ts:22-37`) → `_count.pages` thay vì include pages.
- **4.** `getPages` query trùng — `findPublicOne` (include pages) chỉ để check tồn tại rồi `findPages` lại (`chapter/public/services/chapter.service.ts:28-38`) → check nhẹ `select:{id}` hoặc tái dùng pages.
- **5.** IamClient không cache membership (`iam.client.ts:20-35`) → cache Redis 60s + circuit breaker.

### 🟢 Low
- **6.** Public comment cache hash dùng toàn bộ query không allowlist (`comment/public/services/comments.service.ts:47-60`) → allowlist key như `PublicComicService`.
- **7.** View flush 2 upsert tuần tự mỗi comic (`view-cron.service.ts:68-79`) → `Promise.all`.
- **8.** Deep offset pagination bounded (cap `MAX_PAGE=1000`) — cân nhắc keyset cho bảng lớn.

---

## web-api-service

BFF/aggregator thiết kế tốt: circuit breaker, timeout (AbortController), keep-alive (undici), Redis cache-aside, single-flight, `Promise.all`/`allSettled` fan-out, xử lý partial failure. Chỉ tinh chỉnh.

### 🟠 High
**1. Keep-alive connection pool quá nhỏ (`connections: 10`)**
- `src/clients/comic.client.ts:7-11`, `post.client.ts:7-11`
- Gateway public tải cao; homepage fan-out 5 lệnh đồng thời tới comic-service. Pool 10 → request xếp hàng chờ connection.
- **Fix:** Nâng `connections` 50-100 (qua env) + `keepAliveMaxTimeout`; đo metrics rồi tinh chỉnh.

**2. TTL cache ngắn (`NEWEST`/`RECENT_UPDATED`=120s), chưa stale-while-revalidate**
- `src/homepage/services/homepage.service.ts:6-13`
- Mỗi 2 phút request đầu chịu full upstream latency.
- **Fix:** Stale-while-revalidate (trả cache cũ + refresh nền) hoặc nâng TTL mục ít đổi.

### 🟡 Medium
- **3.** Client không giới hạn field từ upstream (`comic.client.ts:13-21,49-82`) → payload aggregate phình → truyền `fields`/projection hoặc trim ở gateway.
- **4.** `top_viewed_comics` và `trending_comics` cùng dữ liệu, serialize 2 lần (`homepage.service.ts:82-83`) → trả 1 key hoặc FE tự alias.
- **5.** Response homepage gộp 6 collection, chưa chắc bật compression (`main.ts`) → xác nhận gzip/brotli trong `createApp`.

### 🟢 Low
- **6.** Không retry transient error khi gọi upstream (`comic.client.ts:137-175`) → 1 retry với jitter cho idempotent GET.
- **7.** Mỗi client tự tạo Agent + breaker riêng → trích `BaseHttpClient` chung.
- **8.** Search TTL 30s, hit rate thấp cho long-tail (`search/services/search.service.ts:22,43`) → nâng TTL query hot.

---

## Khuyến nghị hành động (roadmap đề xuất)

### Đợt 1 — Critical (làm ngay)
1. **cms** — sửa cache key 8 module: đưa query params vào key + chuyển invalidation sang versioning.
2. **auth** — tạo migration thêm cột `search_text` + index (`text_pattern_ops`) để khớp schema.
3. **post** — thêm index `updated_at` (+ composite `groupId, updated_at`), hoặc dùng `buildOrderBy`.
4. **iam** — cache `member-permissions` phía IAM (versioned) + precompute expand effective permissions.
5. **storage** — chuyển upload sang streaming/disk-temp + `@aws-sdk/lib-storage`.

### Đợt 2 — High (ưu tiên cao)
- auth: bcryptjs → native bcrypt/argon2; cache JWKS.
- config: cache user-menu + sửa cache key location.
- comic: cache homepage + cap `limit`.
- notification: cache template + reload config nền.
- web-api: nâng connection pool + stale-while-revalidate.
- iam: tối ưu `getMembers` over-fetch + index `roles(role_type, status)`.

### Đợt 3 — Medium/Low (cải tiến dần)
- Chuẩn hóa: IamClient cache membership + circuit breaker (post, comic).
- View-flush `Promise.all` (post, comic).
- Over-fetch list `select` (config, cms, notification).
- Cursor pagination cho feed lớn (post, comic).
- Các tinh chỉnh Redis pipeline, allowlist cache key, BigInt serialize.

---

*Báo cáo tạo tự động bằng 9 agent review song song. Mỗi phát hiện đã ghi `file:line` để tra cứu trực tiếp.*
