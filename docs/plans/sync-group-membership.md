# Kế hoạch: Sync Group Membership từ IAM sang Auth Service

## Bối cảnh

Hiện tại khi auth-service cần lọc user theo group (ví dụ admin group A chỉ thấy user trong group A), flow đang là:

```
Auth service → HTTP call IAM lấy memberIds → WHERE id IN(10000 ids)
```

**Vấn đề:**
- Nếu group có 10.000 member → query `IN(...)` rất chậm, có thể vượt limit
- Mỗi request đều gọi HTTP sang IAM (dù có cache vẫn tốn)
- Không scale được

**Giải pháp:** Sync bảng `user_group` từ IAM sang auth DB qua Kafka event. Auth service query JOIN local, không cần gọi IAM.

```
Auth service → JOIN user_group → WHERE groupId = ? (query local, nhanh)
```

---

## Phạm vi thay đổi

| Service/Package | Thay đổi |
|-----------------|----------|
| `shared/shared-types` | Thêm event interfaces `GroupMemberAdded`, `GroupMemberRemoved`, `GroupDeleted` |
| `apps/iam-service` | Publish Kafka event khi add/remove member, delete group; thêm `withTransaction` + tx param vào `GroupRepository` |
| `apps/auth-service` | Thêm bảng `user_groups`, Kafka consumer, thêm `groupId` vào `UserQueryDto`, refactor `getList` + `getSimpleList` |

---

## Chi tiết từng bước

### Bước 1: Định nghĩa Kafka event (shared/shared-types)

Thêm file `shared/shared-types/src/events/group-membership.event.ts`:

```ts
export interface GroupMemberAddedEvent {
  groupId: string;
  userId: string;
  timestamp: string;
}

export interface GroupMemberRemovedEvent {
  groupId: string;
  userId: string;
  timestamp: string;
}

export interface GroupDeletedEvent {
  groupId: string;
  timestamp: string;
}
```

> Dùng `string` cho ID để tránh JSON BigInt overflow. Consumer parse về `bigint` khi cần.

Topics:
- `group.member.added`
- `group.member.removed`
- `group.deleted`

---

### Bước 2: IAM service — Thêm transaction support vào GroupRepository

**File:** `apps/iam-service/src/modules/group/repositories/group.repository.ts`

**Công việc:**
1. Thêm kiểu `Tx` và method `withTransaction`:

```ts
type Tx = Prisma.TransactionClient | PrismaService;

async withTransaction<T>(fn: (tx: Tx) => Promise<T>): Promise<T> {
  return this.prisma.$transaction(fn);
}
```

2. Cập nhật `addMember` và `removeMember` nhận optional `tx`:

```ts
addMember(groupId: string | bigint, userId: string | bigint, tx: Tx = this.prisma) {
  const gid = toPrimaryKey(groupId);
  const uid = toPrimaryKey(userId);
  return tx.userGroup.upsert({
    where: { userId_groupId: { userId: uid, groupId: gid } },
    create: { userId: uid, groupId: gid },
    update: {},
  });
}

removeMember(groupId: string | bigint, userId: string | bigint, tx: Tx = this.prisma) {
  const gid = toPrimaryKey(groupId);
  const uid = toPrimaryKey(userId);
  return tx.userGroup.delete({
    where: { userId_groupId: { userId: uid, groupId: gid } },
  });
}
```

---

### Bước 3: IAM service — Publish event khi add/remove member, delete group

**File:** `apps/iam-service/src/kafka/services/rbac-event-publisher.service.ts`

Thêm 3 method:

```ts
async publishGroupMemberAdded(
  payload: { groupId: bigint; userId: bigint },
  tx?: Tx,
): Promise<void> {
  await this.insertOutboxEvent(
    'group.member.added',
    {
      group_id: String(payload.groupId),
      user_id: String(payload.userId),
      timestamp: new Date().toISOString(),
    },
    tx,
  );
}

async publishGroupMemberRemoved(
  payload: { groupId: bigint; userId: bigint },
  tx?: Tx,
): Promise<void> {
  await this.insertOutboxEvent(
    'group.member.removed',
    {
      group_id: String(payload.groupId),
      user_id: String(payload.userId),
      timestamp: new Date().toISOString(),
    },
    tx,
  );
}

async publishGroupDeleted(
  payload: { groupId: bigint },
  tx?: Tx,
): Promise<void> {
  await this.insertOutboxEvent(
    'group.deleted',
    {
      group_id: String(payload.groupId),
      timestamp: new Date().toISOString(),
    },
    tx,
  );
}
```

**File:** `apps/iam-service/src/kafka/services/outbox-relay.service.ts`

Thêm 3 topic vào `TOPIC_MAP`:

```ts
'group.member.added': 'group.member.added',
'group.member.removed': 'group.member.removed',
'group.deleted': 'group.deleted',
```

---

### Bước 4: IAM service — Gọi publisher trong GroupService (atomically)

**File:** `apps/iam-service/src/modules/group/admin/services/group.service.ts`

Inject thêm `RbacEventPublisher`. Cập nhật `addMember`, `removeMember`, `delete` dùng `repo.withTransaction()` để DB operation + outbox insert nằm trong cùng 1 transaction:

```ts
async addMember(id: PrimaryKey, dto: AddMemberDto) {
  await this.getOne(id);
  await this.repo.withTransaction(async (tx) => {
    await this.repo.addMember(id, dto.userId, tx);
    await this.eventPublisher.publishGroupMemberAdded(
      { groupId: BigInt(String(id)), userId: BigInt(String(dto.userId)) },
      tx,
    );
  });
  await this.rbacCache.clearAllUserCaches(dto.userId);
  return { message: t(this.i18n, 'group.MEMBER_ADDED') };
}

async removeMember(id: PrimaryKey, userId: PrimaryKey) {
  await this.getOne(id);
  await this.repo.withTransaction(async (tx) => {
    await this.repo.removeMember(id, userId, tx);
    await this.eventPublisher.publishGroupMemberRemoved(
      { groupId: BigInt(String(id)), userId: BigInt(String(userId)) },
      tx,
    );
  });
  await this.rbacCache.clearAllUserCaches(userId);
  return { message: t(this.i18n, 'group.MEMBER_REMOVED') };
}

async delete(id: PrimaryKey) {
  await this.getOne(id);
  await this.repo.withTransaction(async (tx) => {
    await this.repo.delete(id, tx);  // cần thêm tx param vào repo.delete()
    await this.eventPublisher.publishGroupDeleted(
      { groupId: BigInt(String(id)) },
      tx,
    );
  });
  await this.rbacCache.bumpVersion();
  return { message: t(this.i18n, 'group.DELETED') };
}
```

> Lý do dùng `withTransaction` từ repo: `$transaction` chỉ được gọi ở 1 chỗ (repo), service không biết Prisma internals. Cùng lúc cũng cần thêm `tx` param cho `repo.delete()`.

---

### Bước 5: Auth service — Thêm bảng `user_groups`

**Migration:** `apps/auth-service/prisma/`

```sql
CREATE TABLE user_groups (
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  group_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, group_id)
);

CREATE INDEX idx_user_groups_group_id ON user_groups(group_id);
```

> `group_id` không có FK vì group nằm ở IAM DB. Chỉ là bản copy read-only.
> Index trên `user_id` không cần thêm vì đã có trong composite PK.

**Prisma schema** thêm:

```prisma
model UserGroup {
  userId    BigInt   @map("user_id")
  groupId   BigInt   @map("group_id")
  createdAt DateTime @default(now()) @map("created_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@id([userId, groupId])
  @@index([groupId])
  @@map("user_groups")
}
```

---

### Bước 6: Auth service — Setup Kafka consumer

**Hiện trạng:** Auth service chưa có Kafka consumer. Cần setup infrastructure trước.

**Công việc:**
1. Thêm `KafkaClientModule` vào `app.module.ts` của auth-service (tham khảo `notification-service`)
2. Tạo `apps/auth-service/src/modules/user/kafka/group-membership.consumer.ts`:

```ts
@Injectable()
export class GroupMembershipConsumer {
  constructor(private readonly prisma: PrismaService) {}

  @EventPattern('group.member.added')
  async handleMemberAdded(@Payload() event: GroupMemberAddedEvent) {
    const userId = BigInt(event.user_id);
    const groupId = BigInt(event.group_id);
    await this.prisma.userGroup.upsert({
      where: { userId_groupId: { userId, groupId } },
      create: { userId, groupId },
      update: {},  // idempotent — không làm gì nếu đã có
    });
  }

  @EventPattern('group.member.removed')
  async handleMemberRemoved(@Payload() event: GroupMemberRemovedEvent) {
    const userId = BigInt(event.user_id);
    const groupId = BigInt(event.group_id);
    await this.prisma.userGroup.deleteMany({
      where: { userId, groupId },  // deleteMany: không throw nếu không tồn tại
    });
  }

  @EventPattern('group.deleted')
  async handleGroupDeleted(@Payload() event: GroupDeletedEvent) {
    const groupId = BigInt(event.group_id);
    await this.prisma.userGroup.deleteMany({ where: { groupId } });
  }
}
```

3. Đăng ký `GroupMembershipConsumer` trong `UserModule` (hoặc tạo `KafkaModule` riêng trong auth-service)
4. Thêm consumer group ID vào `.env` auth-service: `KAFKA_CONSUMER_GROUP_ID=auth-service-group`

---

### Bước 7: Auth service — Cập nhật UserQueryDto

**File:** `apps/auth-service/src/modules/user/admin/dtos/user-query.dto.ts`

Thêm field `groupId`:

```ts
@IsOptional()
@IsString()
groupId?: string;
```

---

### Bước 8: Auth service — Refactor filter logic

**File:** `apps/auth-service/src/modules/user/repositories/user-admin.repository.ts`

Trong `buildWhere`, thay thế filter `userIds` bằng `groupId`:

```ts
if (query.groupId) {
  where.userGroups = { some: { groupId: BigInt(query.groupId) } };
}

// Giữ lại userIds cho các use-case khác nếu còn dùng
if (query.userIds?.length) {
  andConditions.push({ id: { in: query.userIds } });
}
```

**File:** `apps/auth-service/src/modules/user/admin/services/user.service.ts`

Cập nhật cả `getList` **và** `getSimpleList`:

```ts
async getList(query: UserQueryDto) {
  const sessionGroupId = getSessionGroupId();
  if (sessionGroupId) {
    query = { ...query, groupId: String(sessionGroupId) };
  }
  const { data, meta } = await this.userRepo.findAll(query);
  return { data, meta };
}

async getSimpleList(query: UserQueryDto) {
  const sessionGroupId = getSessionGroupId();
  if (sessionGroupId) {
    return this.userRepo.findAllSimple({ ...query, groupId: String(sessionGroupId) });
  }
  return this.userRepo.findAllSimple(query);
}
```

> Không còn gọi `iamClient.getGroupMemberIds()`. Bỏ `IamClient` injection khỏi `AdminUserService` nếu không còn dùng ở đâu khác.

---

### Bước 9: Backfill data ban đầu

Khi deploy lần đầu, bảng `user_groups` ở auth trống. Cần sync data hiện có:

**Cách được chọn — Script migration 1 lần:**
1. Gọi IAM internal API lấy toàn bộ group + members
2. Insert vào auth DB
3. Verify `COUNT(*)` khớp với IAM trước khi chuyển sang bước 10

Chạy script này **sau khi** consumer đã active (bước 6), để không bỏ sót event trong khoảng thời gian migrate.

---

### Bước 10: Cleanup

- Xóa `IamClient.getGroupMemberIds()` nếu không còn ai dùng
- Xóa endpoint `/internal/groups/:id/member-ids` trong IAM nếu không còn ai dùng
- Xóa filter `userIds` khỏi `buildWhere` nếu không còn use-case nào dùng

---

## Thứ tự triển khai

```
1. shared-types    → Thêm 3 event interfaces, build shared
2. iam-service     → Thêm withTransaction + tx params vào GroupRepository
3. iam-service     → Thêm publishGroupMember* vào RbacEventPublisher
4. iam-service     → Thêm topics vào TOPIC_MAP
5. iam-service     → Refactor GroupService.addMember/removeMember/delete dùng withTransaction
6. auth-service    → Migration tạo bảng user_groups
7. auth-service    → Setup Kafka consumer infrastructure
8. auth-service    → Tạo GroupMembershipConsumer
9. Backfill        → Script sync data hiện có từ IAM, verify count
10. auth-service   → Thêm groupId vào UserQueryDto
11. auth-service   → Refactor buildWhere + getList + getSimpleList
12. Cleanup        → Xóa getGroupMemberIds, endpoint /internal/groups/:id/member-ids
```

> Bước 1–8 có thể deploy trước mà không ảnh hưởng logic cũ.
> Bước 11 mới là breaking change — phải sau backfill (bước 9).

---

## Unit tests bắt buộc (CLAUDE.md)

| File test | Nội dung cần cover |
|-----------|-------------------|
| `apps/auth-service/tests/modules/user/kafka/group-membership.consumer.spec.ts` | `handleMemberAdded` idempotent (upsert twice → 1 row), `handleMemberRemoved` không throw nếu không tồn tại, `handleGroupDeleted` xóa tất cả row của group |
| `apps/auth-service/tests/modules/user/admin/services/user.service.spec.ts` | `getList` với sessionGroupId → truyền `groupId` vào query (không gọi iamClient), `getSimpleList` tương tự |
| `apps/auth-service/tests/modules/user/repositories/user-admin.repository.spec.ts` | `buildWhere` với `groupId` → sinh `userGroups.some` filter đúng |
| `apps/iam-service/tests/modules/group/admin/services/group.service.spec.ts` | `addMember` → gọi `withTransaction`, insert outbox event; `removeMember` tương tự; `delete` → gọi `publishGroupDeleted` |

---

## Rủi ro & lưu ý

| Rủi ro | Giảm thiểu |
|--------|------------|
| Event mất (Kafka downtime) | Outbox pattern — event persist trong DB trong cùng transaction với DB operation |
| Data không đồng bộ tạm thời | Chấp nhận eventual consistency (delay 1–5 giây). Chỉ ảnh hưởng filter danh sách, không phải authorization |
| Consumer chưa có trong auth | Setup infrastructure trước (bước 7) trước khi triển khai logic mới |
| Backfill thiếu data | Chạy backfill sau khi consumer active, verify count trước khi switch logic |
| Group bị xóa không cleanup | Xử lý bằng event `group.deleted` → consumer `deleteMany` toàn bộ row của group đó |
| `removeMember` trong IAM throw nếu record không tồn tại | Repo dùng `delete` (throw P2025) — cân nhắc đổi sang `deleteMany` để idempotent |
