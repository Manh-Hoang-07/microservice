# RabbitMQ Migration Design

**Date:** 2026-05-18
**Status:** Approved
**Scope:** Thêm RabbitMQ làm message broker thay thế Kafka (có thể switch qua `EVENT_DRIVER`)

---

## 1. Mục tiêu

- Tắt Kafka tạm thời, dùng RabbitMQ cho toàn bộ event messaging
- Kafka code giữ nguyên 100%, switch bằng `EVENT_DRIVER=kafka|rabbitmq|local`
- Không thay đổi business logic, outbox pattern, hay handler code

---

## 2. Kiến trúc

### 2.1 Shared package mới: `@package/rabbitmq-client`

```
shared/rabbitmq-client/
  package.json
  tsconfig.json
  src/
    index.ts
    rabbitmq-client.module.ts     ← DynamicModule, registerAsync()
    rabbitmq-producer.service.ts  ← implements IKafkaProducer (send() method)
```

Library: `@golevelup/nestjs-rabbitmq`

`RabbitmqProducerService` implement interface `IKafkaProducer` từ `@package/common`:
```ts
send(record: { topic: string; messages: Array<{ key?: string; value: string; headers?: Record<string, string> }> }): Promise<void>
```
Mapping: `topic` → routing key, publish lên exchange `events`.

### 2.2 RabbitMQ Topology

```
Exchange: "events"  (type: topic, durable: true)
  Routing key = event type (e.g. comic.chapter.published)
  → queue: comic.chapter.published  (durable, x-dead-letter-exchange: events.dlq)
  → queue: user.registered
  → queue: user.password.reset
  → queue: mail.send
  → queue: comic.comment.created
  → queue: user.followed.comic
  → queue: user.unfollowed.comic
  → queue: post.comment.created
  → queue: contact.submitted

Exchange: "events.dlq"  (type: topic, durable: true)
  → queue: events.dlq  (dead letters)
```

9 queues, 1 queue per event type, mirror 1-1 với Kafka topics hiện tại.

---

## 3. Thay đổi code

### 3.1 Files tạo mới

| File | Mô tả |
|------|-------|
| `shared/rabbitmq-client/...` | Package mới (5 files) |
| `apps/auth-service/src/rabbitmq/rabbitmq.module.ts` | Provide KAFKA_PRODUCER = RabbitmqProducerService (giống các service khác) |
| `apps/comic-service/src/rabbitmq/rabbitmq.module.ts` | Provide KAFKA_PRODUCER = RabbitmqProducerService |
| `apps/post-service/src/rabbitmq/rabbitmq.module.ts` | Provide KAFKA_PRODUCER = RabbitmqProducerService |
| `apps/iam-service/src/rabbitmq/rabbitmq.module.ts` | Provide KAFKA_PRODUCER = RabbitmqProducerService |
| `apps/cms-service/src/rabbitmq/rabbitmq.module.ts` | Provide KAFKA_PRODUCER = RabbitmqProducerService |
| `apps/notification-service/src/rabbitmq/rabbitmq.module.ts` | Consumer module |
| `apps/notification-service/src/rabbitmq/rabbitmq-consumer.service.ts` | Reuse tất cả handlers, subscribe 9 queues |

### 3.2 Files sửa (minimal)

| File | Thay đổi |
|------|----------|
| `apps/auth-service/src/app.module.ts` | Conditional import KafkaModule vs RabbitmqModule; bỏ HEALTH_KAFKA_PROBE khi rabbitmq |
| `apps/comic-service/src/app.module.ts` | Conditional import |
| `apps/post-service/src/app.module.ts` | Conditional import |
| `apps/iam-service/src/app.module.ts` | Conditional import |
| `apps/cms-service/src/app.module.ts` | Conditional import |
| `apps/notification-service/src/app.module.ts` | Conditional import |
| `apps/*/src/core/config/env.validation.ts` (6 files) | Thêm `'rabbitmq'` vào Joi valid list của `EVENT_DRIVER` |
| `package.json` (root) | Thêm workspace `shared/rabbitmq-client` |
| `shared/config/src/kafka.config.ts` | Không đổi (enabled check vẫn dùng cho kafka path) |

### 3.3 Files không đụng vào

- `shared/kafka-client/*`
- `shared/common/*` (OutboxRelayService, IKafkaProducer, KAFKA_PRODUCER, CommonKafkaModule)
- Tất cả `kafka/kafka.module.ts` trong mỗi service
- Tất cả `kafka/services/outbox-relay.service.ts`
- Tất cả notification-service handlers
- `KafkaService` trong notification-service
- Business logic (registration.service.ts, auth-otp.service.ts, v.v.)

---

## 4. Switch mechanism

`EVENT_DRIVER` env var (đã tồn tại):
- `local` — không publish, event chỉ trong process (giữ nguyên behavior cũ)
- `kafka` — dùng Kafka (giữ nguyên)
- `rabbitmq` — dùng RabbitMQ (mới)

Trong `app.module.ts` mỗi service:
```ts
const messagingModule = process.env.EVENT_DRIVER === 'rabbitmq'
  ? RabbitmqModule
  : KafkaModule;
```

---

## 5. auth-service MailPublisher (đã xử lý — DONE)

`mail.send` đã được chuyển vào outbox pattern. `MailPublisher` đã bị xoá.

- `auth-otp.service.ts` — inject `UserRepository`, gọi `enqueueOutboxEvent('mail.send', ...)`
- `auth-service/kafka/services/outbox-relay.service.ts` — `TOPIC_MAP` đã có `'mail.send'`
- `kafka.module.ts` — không còn `MailPublisher`
- `auth.module.ts` — không còn import `KafkaModule`
- `mail-publisher.service.ts` — đã xoá

Không còn special case. `auth-service` RabbitmqModule sẽ giống các service khác.

---

## 6. Env vars cần thêm (mỗi service)

```env
EVENT_DRIVER=rabbitmq
RABBITMQ_URL=amqp://guest:guest@localhost:5672
```

---

## 7. Docker Compose

Thêm RabbitMQ service vào `docker-compose.yml`:
```yaml
rabbitmq:
  image: rabbitmq:3-management
  ports:
    - "5672:5672"
    - "15672:15672"  # management UI
```
