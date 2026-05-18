# RabbitMQ Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Thêm RabbitMQ làm message broker thay thế Kafka, switch qua `EVENT_DRIVER=rabbitmq`, Kafka code giữ nguyên.

**Architecture:** Tạo `shared/rabbitmq-client` package với `RabbitmqProducerService` implement `IKafkaProducer` interface — inject vào `KAFKA_PRODUCER` token thay Kafka khi `EVENT_DRIVER=rabbitmq`. notification-service có thêm `RabbitmqConsumerService` với 9 `@RabbitSubscribe` handler. Mỗi service có `rabbitmq.module.ts` song song với `kafka.module.ts`. `app.module.ts` switch module theo `process.env.EVENT_DRIVER`.

**Tech Stack:** `@golevelup/nestjs-rabbitmq`, topic exchange `events`, dead letter exchange `events.dlq`.

**Spec:** `docs/superpowers/specs/2026-05-18-rabbitmq-migration-design.md`

---

## File Map

### Tạo mới
| File | Mục đích |
|------|----------|
| `shared/rabbitmq-client/package.json` | Package definition |
| `shared/rabbitmq-client/tsconfig.json` | TypeScript config |
| `shared/rabbitmq-client/src/index.ts` | Exports |
| `shared/rabbitmq-client/src/rabbitmq-client.module.ts` | DynamicModule, setup RabbitMQModule |
| `shared/rabbitmq-client/src/rabbitmq-producer.service.ts` | Publish lên exchange |
| `shared/rabbitmq-client/tests/rabbitmq-producer.service.spec.ts` | Unit test producer |
| `apps/auth-service/src/rabbitmq/rabbitmq.module.ts` | RabbitMQ module cho auth |
| `apps/comic-service/src/rabbitmq/rabbitmq.module.ts` | RabbitMQ module cho comic |
| `apps/post-service/src/rabbitmq/rabbitmq.module.ts` | RabbitMQ module cho post |
| `apps/iam-service/src/rabbitmq/rabbitmq.module.ts` | RabbitMQ module cho iam |
| `apps/cms-service/src/rabbitmq/rabbitmq.module.ts` | RabbitMQ module cho cms |
| `apps/notification-service/src/rabbitmq/rabbitmq-consumer.service.ts` | 9 @RabbitSubscribe handlers |
| `apps/notification-service/src/rabbitmq/rabbitmq.module.ts` | Consumer module |
| `apps/notification-service/tests/rabbitmq/rabbitmq-consumer.service.spec.ts` | Unit test consumer |

### Sửa
| File | Thay đổi |
|------|----------|
| `package.json` (root) | Thêm rabbitmq-client vào build:shared, docker:infra |
| `docker-compose.yml` | Thêm service rabbitmq + volume rabbitmq_data |
| `apps/auth-service/src/app.module.ts` | Conditional switch + remove HEALTH_KAFKA_PROBE |
| `apps/comic-service/src/app.module.ts` | Conditional switch + remove HEALTH_KAFKA_PROBE |
| `apps/post-service/src/app.module.ts` | Conditional switch + remove HEALTH_KAFKA_PROBE |
| `apps/iam-service/src/app.module.ts` | Conditional switch + remove HEALTH_KAFKA_PROBE |
| `apps/cms-service/src/app.module.ts` | Conditional switch + remove HEALTH_KAFKA_PROBE |
| `apps/notification-service/src/app.module.ts` | Conditional switch |
| `apps/auth-service/src/core/config/env.validation.ts` | Thêm 'rabbitmq' vào EVENT_DRIVER |
| `apps/comic-service/src/core/config/env.validation.ts` | Thêm 'rabbitmq' vào EVENT_DRIVER |
| `apps/post-service/src/core/config/env.validation.ts` | Thêm 'rabbitmq' vào EVENT_DRIVER |
| `apps/iam-service/src/core/config/env.validation.ts` | Thêm 'rabbitmq' vào EVENT_DRIVER |
| `apps/cms-service/src/core/config/env.validation.ts` | Thêm 'rabbitmq' vào EVENT_DRIVER |
| `apps/notification-service/src/core/config/env.validation.ts` | Thêm 'rabbitmq' vào EVENT_DRIVER |
| `apps/*/env.example` (6 files) | Thêm RABBITMQ_URL |

---

## Task 1: Setup — cài dependency, workspace, docker-compose

**Files:**
- Modify: `package.json` (root)
- Modify: `docker-compose.yml`

- [ ] **Step 1: Cài @golevelup/nestjs-rabbitmq tại root**

```bash
cd d:/microservice
npm install @golevelup/nestjs-rabbitmq
```

- [ ] **Step 2: Thêm rabbitmq-client vào build:shared trong package.json**

Tìm dòng:
```json
"build:shared": "npm -w shared/shared-types run build && npm -w shared/circuit-breaker run build && npm -w shared/config run build && npm -w shared/redis run build && npm -w shared/kafka-client run build && npm -w shared/tracing run build && npm -w shared/common run build && npm -w shared/bootstrap run build",
```
Thay thành (thêm `npm -w shared/rabbitmq-client run build` sau `kafka-client`):
```json
"build:shared": "npm -w shared/shared-types run build && npm -w shared/circuit-breaker run build && npm -w shared/config run build && npm -w shared/redis run build && npm -w shared/kafka-client run build && npm -w shared/rabbitmq-client run build && npm -w shared/tracing run build && npm -w shared/common run build && npm -w shared/bootstrap run build",
```

Tìm dòng `docker:infra`:
```json
"docker:infra": "docker compose up -d kafka kafka-ui auth-db ...",
```
Thêm `rabbitmq` vào đầu danh sách sau `kafka-ui`:
```json
"docker:infra": "docker compose up -d kafka kafka-ui rabbitmq auth-db ...",
```

- [ ] **Step 3: Thêm RabbitMQ vào docker-compose.yml**

Thêm vào sau block `kafka-ui:`:
```yaml
  rabbitmq:
    image: rabbitmq:3-management
    container_name: comic-rabbitmq
    restart: unless-stopped
    ports:
      - "127.0.0.1:5672:5672"
      - "127.0.0.1:15672:15672"
    environment:
      RABBITMQ_DEFAULT_USER: guest
      RABBITMQ_DEFAULT_PASS: guest
    volumes:
      - rabbitmq_data:/var/lib/rabbitmq
    healthcheck:
      test: ["CMD", "rabbitmq-diagnostics", "check_port_connectivity"]
      interval: 10s
      timeout: 10s
      retries: 5
```

Thêm vào cuối block `volumes:`:
```yaml
  rabbitmq_data:
```

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json docker-compose.yml
git commit -m "chore: add @golevelup/nestjs-rabbitmq and RabbitMQ docker service"
```

---

## Task 2: Tạo shared/rabbitmq-client package

**Files:**
- Create: `shared/rabbitmq-client/package.json`
- Create: `shared/rabbitmq-client/tsconfig.json`
- Create: `shared/rabbitmq-client/src/rabbitmq-producer.service.ts`
- Create: `shared/rabbitmq-client/src/rabbitmq-client.module.ts`
- Create: `shared/rabbitmq-client/src/index.ts`
- Test: `shared/rabbitmq-client/tests/rabbitmq-producer.service.spec.ts`

- [ ] **Step 1: Tạo package.json**

```json
// shared/rabbitmq-client/package.json
{
  "name": "@package/rabbitmq-client",
  "version": "1.0.0",
  "description": "RabbitMQ producer wrapper for NestJS microservices",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "private": true,
  "scripts": {
    "build": "tsc",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@nestjs/common": "^11.1.19",
    "@golevelup/nestjs-rabbitmq": "*"
  },
  "devDependencies": {
    "typescript": "^6.0.3"
  }
}
```

- [ ] **Step 2: Tạo tsconfig.json**

```json
// shared/rabbitmq-client/tsconfig.json
{
  "extends": "../tsconfig.base.json",
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

- [ ] **Step 3: Tạo RabbitmqProducerService**

```typescript
// shared/rabbitmq-client/src/rabbitmq-producer.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

const EXCHANGE = 'events';

@Injectable()
export class RabbitmqProducerService {
  private readonly logger = new Logger(RabbitmqProducerService.name);

  constructor(private readonly amqp: AmqpConnection) {}

  /**
   * Publish messages to the events topic exchange.
   * topic → routing key, compatible với IKafkaProducer.send().
   */
  async send(record: {
    topic: string;
    messages: Array<{ key?: string; value: string; headers?: Record<string, string> }>;
  }): Promise<void> {
    for (const msg of record.messages) {
      let content: unknown;
      try {
        content = JSON.parse(msg.value);
      } catch (err) {
        this.logger.error(`Failed to parse message for routing key "${record.topic}"`);
        throw err;
      }
      await this.amqp.publish(EXCHANGE, record.topic, content, {
        headers: msg.headers,
        persistent: true,
      });
    }
  }
}
```

- [ ] **Step 4: Tạo RabbitmqClientModule**

```typescript
// shared/rabbitmq-client/src/rabbitmq-client.module.ts
import { Module, DynamicModule } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitmqProducerService } from './rabbitmq-producer.service';

export interface RabbitmqClientOptions {
  uri: string;
  enabled?: boolean;
}

export interface RabbitmqClientAsyncOptions {
  imports?: any[];
  useFactory: (...args: any[]) => RabbitmqClientOptions | Promise<RabbitmqClientOptions>;
  inject?: any[];
}

@Module({})
export class RabbitmqClientModule {
  static registerAsync(options: RabbitmqClientAsyncOptions): DynamicModule {
    return {
      module: RabbitmqClientModule,
      global: true,
      imports: [
        RabbitMQModule.forRootAsync(RabbitMQModule, {
          imports: options.imports ?? [],
          useFactory: async (...args: any[]) => {
            const opts = await options.useFactory(...args);
            return {
              uri: opts.uri,
              exchanges: [
                { name: 'events', type: 'topic', options: { durable: true } },
                { name: 'events.dlq', type: 'topic', options: { durable: true } },
              ],
              connectionInitOptions: { wait: false },
              enableControllerDiscovery: true,
            };
          },
          inject: options.inject ?? [],
        }),
      ],
      providers: [RabbitmqProducerService],
      exports: [RabbitmqProducerService, RabbitMQModule],
    };
  }
}
```

- [ ] **Step 5: Tạo index.ts**

```typescript
// shared/rabbitmq-client/src/index.ts
export { RabbitmqClientModule, RabbitmqClientOptions, RabbitmqClientAsyncOptions } from './rabbitmq-client.module';
export { RabbitmqProducerService } from './rabbitmq-producer.service';
```

- [ ] **Step 6: Viết test cho RabbitmqProducerService**

```typescript
// shared/rabbitmq-client/tests/rabbitmq-producer.service.spec.ts
import { Test } from '@nestjs/testing';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { RabbitmqProducerService } from '../src/rabbitmq-producer.service';

describe('RabbitmqProducerService', () => {
  let service: RabbitmqProducerService;
  let amqp: { publish: jest.Mock };

  beforeEach(async () => {
    amqp = { publish: jest.fn().mockResolvedValue(undefined) };
    const module = await Test.createTestingModule({
      providers: [
        RabbitmqProducerService,
        { provide: AmqpConnection, useValue: amqp },
      ],
    }).compile();
    service = module.get(RabbitmqProducerService);
  });

  it('publishes to events exchange with routing key = topic', async () => {
    await service.send({
      topic: 'comic.chapter.published',
      messages: [{ value: JSON.stringify({ comic_id: '1' }) }],
    });
    expect(amqp.publish).toHaveBeenCalledWith(
      'events',
      'comic.chapter.published',
      { comic_id: '1' },
      expect.objectContaining({ persistent: true }),
    );
  });

  it('publishes each message in a batch separately', async () => {
    await service.send({
      topic: 'user.registered',
      messages: [
        { value: JSON.stringify({ user_id: '1' }) },
        { value: JSON.stringify({ user_id: '2' }) },
      ],
    });
    expect(amqp.publish).toHaveBeenCalledTimes(2);
    expect(amqp.publish).toHaveBeenNthCalledWith(1, 'events', 'user.registered', { user_id: '1' }, expect.any(Object));
    expect(amqp.publish).toHaveBeenNthCalledWith(2, 'events', 'user.registered', { user_id: '2' }, expect.any(Object));
  });

  it('throws if value is not valid JSON', async () => {
    await expect(
      service.send({ topic: 'foo', messages: [{ value: 'not-json' }] }),
    ).rejects.toThrow();
    expect(amqp.publish).not.toHaveBeenCalled();
  });

  it('passes headers to amqp.publish', async () => {
    await service.send({
      topic: 'mail.send',
      messages: [{ value: JSON.stringify({ to: 'a@b.com' }), headers: { 'event-id': '99' } }],
    });
    expect(amqp.publish).toHaveBeenCalledWith(
      'events', 'mail.send', { to: 'a@b.com' },
      expect.objectContaining({ headers: { 'event-id': '99' } }),
    );
  });
});
```

- [ ] **Step 7: Build package và chạy test**

```bash
cd d:/microservice
npm run build:shared
npm test -- --testPathPattern="shared/rabbitmq-client"
```

Expected: build OK, 4 tests pass.

- [ ] **Step 8: Commit**

```bash
git add shared/rabbitmq-client
git commit -m "feat: add shared/rabbitmq-client package with RabbitmqProducerService"
```

---

## Task 3: RabbitmqModule cho 5 producer services

**Files:**
- Create: `apps/auth-service/src/rabbitmq/rabbitmq.module.ts`
- Create: `apps/comic-service/src/rabbitmq/rabbitmq.module.ts`
- Create: `apps/post-service/src/rabbitmq/rabbitmq.module.ts`
- Create: `apps/iam-service/src/rabbitmq/rabbitmq.module.ts`
- Create: `apps/cms-service/src/rabbitmq/rabbitmq.module.ts`

Mỗi `RabbitmqModule` mirror đúng `KafkaModule` tương ứng: import `RabbitmqClientModule`, include đúng outbox cron service, provide `KAFKA_PRODUCER` token.

- [ ] **Step 1: auth-service RabbitmqModule**

```typescript
// apps/auth-service/src/rabbitmq/rabbitmq.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KAFKA_PRODUCER } from '@package/common';
import { RabbitmqClientModule, RabbitmqProducerService } from '@package/rabbitmq-client';
import { AuthOutboxCronService } from '../kafka/services/outbox-relay.service';

@Module({
  imports: [
    RabbitmqClientModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('RABBITMQ_URL', 'amqp://localhost:5672'),
        enabled: config.get<string>('EVENT_DRIVER') === 'rabbitmq',
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthOutboxCronService,
    { provide: KAFKA_PRODUCER, useExisting: RabbitmqProducerService },
  ],
  exports: [KAFKA_PRODUCER],
})
export class RabbitmqModule {}
```

- [ ] **Step 2: comic-service RabbitmqModule**

```typescript
// apps/comic-service/src/rabbitmq/rabbitmq.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KAFKA_PRODUCER } from '@package/common';
import { RabbitmqClientModule, RabbitmqProducerService } from '@package/rabbitmq-client';
import { OutboxCronService } from '../kafka/services/outbox-relay.service';

@Module({
  imports: [
    RabbitmqClientModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('RABBITMQ_URL', 'amqp://localhost:5672'),
        enabled: config.get<string>('EVENT_DRIVER') === 'rabbitmq',
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    OutboxCronService,
    { provide: KAFKA_PRODUCER, useExisting: RabbitmqProducerService },
  ],
  exports: [KAFKA_PRODUCER],
})
export class RabbitmqModule {}
```

- [ ] **Step 3: post-service RabbitmqModule**

```typescript
// apps/post-service/src/rabbitmq/rabbitmq.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KAFKA_PRODUCER } from '@package/common';
import { RabbitmqClientModule, RabbitmqProducerService } from '@package/rabbitmq-client';
import { PostOutboxCronService } from '../kafka/services/outbox-relay.service';

@Module({
  imports: [
    RabbitmqClientModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('RABBITMQ_URL', 'amqp://localhost:5672'),
        enabled: config.get<string>('EVENT_DRIVER') === 'rabbitmq',
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    PostOutboxCronService,
    { provide: KAFKA_PRODUCER, useExisting: RabbitmqProducerService },
  ],
  exports: [KAFKA_PRODUCER],
})
export class RabbitmqModule {}
```

- [ ] **Step 4: iam-service RabbitmqModule**

iam-service có thêm `RbacEventPublisher` cần export:

```typescript
// apps/iam-service/src/rabbitmq/rabbitmq.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { KAFKA_PRODUCER } from '@package/common';
import { RabbitmqClientModule, RabbitmqProducerService } from '@package/rabbitmq-client';
import { IamOutboxCronService } from '../kafka/services/outbox-relay.service';
import { RbacEventPublisher } from '../kafka/services/rbac-event-publisher.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    RabbitmqClientModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('RABBITMQ_URL', 'amqp://localhost:5672'),
        enabled: config.get<string>('EVENT_DRIVER') === 'rabbitmq',
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    IamOutboxCronService,
    RbacEventPublisher,
    { provide: KAFKA_PRODUCER, useExisting: RabbitmqProducerService },
  ],
  exports: [RbacEventPublisher, KAFKA_PRODUCER],
})
export class RabbitmqModule {}
```

- [ ] **Step 5: cms-service RabbitmqModule**

```typescript
// apps/cms-service/src/rabbitmq/rabbitmq.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KAFKA_PRODUCER } from '@package/common';
import { RabbitmqClientModule, RabbitmqProducerService } from '@package/rabbitmq-client';
import { OutboxCronService } from '../kafka/services/outbox-relay.service';

@Module({
  imports: [
    RabbitmqClientModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('RABBITMQ_URL', 'amqp://localhost:5672'),
        enabled: config.get<string>('EVENT_DRIVER') === 'rabbitmq',
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    OutboxCronService,
    { provide: KAFKA_PRODUCER, useExisting: RabbitmqProducerService },
  ],
  exports: [KAFKA_PRODUCER],
})
export class RabbitmqModule {}
```

- [ ] **Step 6: Commit**

```bash
git add apps/auth-service/src/rabbitmq apps/comic-service/src/rabbitmq apps/post-service/src/rabbitmq apps/iam-service/src/rabbitmq apps/cms-service/src/rabbitmq
git commit -m "feat: add RabbitmqModule for 5 producer services"
```

---

## Task 4: RabbitmqConsumerService + RabbitmqModule cho notification-service

**Files:**
- Create: `apps/notification-service/src/rabbitmq/rabbitmq-consumer.service.ts`
- Create: `apps/notification-service/src/rabbitmq/rabbitmq.module.ts`
- Test: `apps/notification-service/tests/rabbitmq/rabbitmq-consumer.service.spec.ts`

- [ ] **Step 1: Viết failing test trước**

```typescript
// apps/notification-service/tests/rabbitmq/rabbitmq-consumer.service.spec.ts
import { Test } from '@nestjs/testing';
import { RabbitmqConsumerService } from '../../src/rabbitmq/rabbitmq-consumer.service';
import { IdempotencyService } from '@package/common';
import { ChapterPublishedHandler } from '../../src/kafka/handlers/chapter-published.handler';
import { CommentCreatedHandler } from '../../src/kafka/handlers/comment-created.handler';
import { UserFollowedHandler } from '../../src/kafka/handlers/user-followed.handler';
import { UserUnfollowedHandler } from '../../src/kafka/handlers/user-unfollowed.handler';
import { UserRegisteredHandler } from '../../src/kafka/handlers/user-registered.handler';
import { PasswordResetHandler } from '../../src/kafka/handlers/password-reset.handler';
import { ContactSubmittedHandler } from '../../src/kafka/handlers/contact-submitted.handler';
import { PostCommentCreatedHandler } from '../../src/kafka/handlers/post-comment-created.handler';
import { MailSendHandler } from '../../src/kafka/handlers/mail-send.handler';

const makeHandler = () => ({ handle: jest.fn().mockResolvedValue(undefined) });

describe('RabbitmqConsumerService', () => {
  let service: RabbitmqConsumerService;
  let idempotency: { claim: jest.Mock };
  let chapterPublished: ReturnType<typeof makeHandler>;
  let userRegistered: ReturnType<typeof makeHandler>;
  let mailSend: ReturnType<typeof makeHandler>;

  beforeEach(async () => {
    idempotency = { claim: jest.fn().mockResolvedValue(true) };
    chapterPublished = makeHandler();
    userRegistered = makeHandler();
    mailSend = makeHandler();

    const module = await Test.createTestingModule({
      providers: [
        RabbitmqConsumerService,
        { provide: IdempotencyService, useValue: idempotency },
        { provide: ChapterPublishedHandler, useValue: chapterPublished },
        { provide: CommentCreatedHandler, useValue: makeHandler() },
        { provide: UserFollowedHandler, useValue: makeHandler() },
        { provide: UserUnfollowedHandler, useValue: makeHandler() },
        { provide: UserRegisteredHandler, useValue: userRegistered },
        { provide: PasswordResetHandler, useValue: makeHandler() },
        { provide: ContactSubmittedHandler, useValue: makeHandler() },
        { provide: PostCommentCreatedHandler, useValue: makeHandler() },
        { provide: MailSendHandler, useValue: mailSend },
      ],
    }).compile();

    service = module.get(RabbitmqConsumerService);
  });

  it('dispatches chapter.published to handler using payload.id as eventId', async () => {
    await service.onChapterPublished({ id: '42', comic_id: '123' });
    expect(idempotency.claim).toHaveBeenCalledWith('comic.chapter.published', '42');
    expect(chapterPublished.handle).toHaveBeenCalledWith({ id: '42', comic_id: '123' });
  });

  it('skips handler when idempotency claim returns false', async () => {
    idempotency.claim.mockResolvedValue(false);
    await service.onChapterPublished({ id: '42' });
    expect(chapterPublished.handle).not.toHaveBeenCalled();
  });

  it('dispatches user.registered to handler', async () => {
    await service.onUserRegistered({ id: '7', email: 'x@x.com' });
    expect(idempotency.claim).toHaveBeenCalledWith('user.registered', '7');
    expect(userRegistered.handle).toHaveBeenCalledWith({ id: '7', email: 'x@x.com' });
  });

  it('dispatches mail.send to handler', async () => {
    await service.onMailSend({ event_id: 'abc', to: 'a@b.com', templateCode: 'welcome' });
    expect(idempotency.claim).toHaveBeenCalledWith('mail.send', 'abc');
    expect(mailSend.handle).toHaveBeenCalled();
  });

  it('falls back to timestamp eventId when payload has no id or event_id', async () => {
    jest.spyOn(Date, 'now').mockReturnValue(12345);
    await service.onUserRegistered({ email: 'x@x.com' });
    expect(idempotency.claim).toHaveBeenCalledWith('user.registered', '12345');
  });
});
```

- [ ] **Step 2: Chạy test — phải FAIL vì file chưa tồn tại**

```bash
cd d:/microservice
npm test -w apps/notification-service -- --testPathPattern="rabbitmq-consumer"
```

Expected: FAIL với "Cannot find module '../../src/rabbitmq/rabbitmq-consumer.service'"

- [ ] **Step 3: Tạo RabbitmqConsumerService**

```typescript
// apps/notification-service/src/rabbitmq/rabbitmq-consumer.service.ts
import { Injectable } from '@nestjs/common';
import { RabbitSubscribe, MessageHandlerErrorBehavior } from '@golevelup/nestjs-rabbitmq';
import { IdempotencyService } from '@package/common';
import { KafkaHandler } from '../kafka/interfaces/kafka-handler.interface';
import { ChapterPublishedHandler } from '../kafka/handlers/chapter-published.handler';
import { CommentCreatedHandler } from '../kafka/handlers/comment-created.handler';
import { UserFollowedHandler } from '../kafka/handlers/user-followed.handler';
import { UserUnfollowedHandler } from '../kafka/handlers/user-unfollowed.handler';
import { UserRegisteredHandler } from '../kafka/handlers/user-registered.handler';
import { PasswordResetHandler } from '../kafka/handlers/password-reset.handler';
import { ContactSubmittedHandler } from '../kafka/handlers/contact-submitted.handler';
import { PostCommentCreatedHandler } from '../kafka/handlers/post-comment-created.handler';
import { MailSendHandler } from '../kafka/handlers/mail-send.handler';

const EXCHANGE = 'events';
const DLX = 'events.dlq';
const queueOptions = { durable: true, deadLetterExchange: DLX };
const errorBehavior = MessageHandlerErrorBehavior.NACK;

@Injectable()
export class RabbitmqConsumerService {
  constructor(
    private readonly idempotency: IdempotencyService,
    private readonly chapterPublished: ChapterPublishedHandler,
    private readonly commentCreated: CommentCreatedHandler,
    private readonly userFollowed: UserFollowedHandler,
    private readonly userUnfollowed: UserUnfollowedHandler,
    private readonly userRegistered: UserRegisteredHandler,
    private readonly passwordReset: PasswordResetHandler,
    private readonly contactSubmitted: ContactSubmittedHandler,
    private readonly postCommentCreated: PostCommentCreatedHandler,
    private readonly mailSend: MailSendHandler,
  ) {}

  private async dispatch(routingKey: string, payload: any, handler: KafkaHandler): Promise<void> {
    const eventId =
      payload?.id?.toString() ?? payload?.event_id?.toString() ?? String(Date.now());
    const claimed = await this.idempotency.claim(routingKey, eventId);
    if (!claimed) return;
    await handler.handle(payload);
  }

  @RabbitSubscribe({ exchange: EXCHANGE, routingKey: 'comic.chapter.published', queue: 'comic.chapter.published', queueOptions, errorBehavior })
  async onChapterPublished(payload: any): Promise<void> {
    await this.dispatch('comic.chapter.published', payload, this.chapterPublished);
  }

  @RabbitSubscribe({ exchange: EXCHANGE, routingKey: 'comic.comment.created', queue: 'comic.comment.created', queueOptions, errorBehavior })
  async onCommentCreated(payload: any): Promise<void> {
    await this.dispatch('comic.comment.created', payload, this.commentCreated);
  }

  @RabbitSubscribe({ exchange: EXCHANGE, routingKey: 'user.followed.comic', queue: 'user.followed.comic', queueOptions, errorBehavior })
  async onUserFollowed(payload: any): Promise<void> {
    await this.dispatch('user.followed.comic', payload, this.userFollowed);
  }

  @RabbitSubscribe({ exchange: EXCHANGE, routingKey: 'user.unfollowed.comic', queue: 'user.unfollowed.comic', queueOptions, errorBehavior })
  async onUserUnfollowed(payload: any): Promise<void> {
    await this.dispatch('user.unfollowed.comic', payload, this.userUnfollowed);
  }

  @RabbitSubscribe({ exchange: EXCHANGE, routingKey: 'user.registered', queue: 'user.registered', queueOptions, errorBehavior })
  async onUserRegistered(payload: any): Promise<void> {
    await this.dispatch('user.registered', payload, this.userRegistered);
  }

  @RabbitSubscribe({ exchange: EXCHANGE, routingKey: 'user.password.reset', queue: 'user.password.reset', queueOptions, errorBehavior })
  async onPasswordReset(payload: any): Promise<void> {
    await this.dispatch('user.password.reset', payload, this.passwordReset);
  }

  @RabbitSubscribe({ exchange: EXCHANGE, routingKey: 'contact.submitted', queue: 'contact.submitted', queueOptions, errorBehavior })
  async onContactSubmitted(payload: any): Promise<void> {
    await this.dispatch('contact.submitted', payload, this.contactSubmitted);
  }

  @RabbitSubscribe({ exchange: EXCHANGE, routingKey: 'post.comment.created', queue: 'post.comment.created', queueOptions, errorBehavior })
  async onPostCommentCreated(payload: any): Promise<void> {
    await this.dispatch('post.comment.created', payload, this.postCommentCreated);
  }

  @RabbitSubscribe({ exchange: EXCHANGE, routingKey: 'mail.send', queue: 'mail.send', queueOptions, errorBehavior })
  async onMailSend(payload: any): Promise<void> {
    await this.dispatch('mail.send', payload, this.mailSend);
  }
}
```

- [ ] **Step 4: Tạo notification-service RabbitmqModule**

```typescript
// apps/notification-service/src/rabbitmq/rabbitmq.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitmqClientModule } from '@package/rabbitmq-client';
import { NotificationModule } from '../modules/notification/notification.module';
import { QueueModule } from '../queue/queue.module';
import { ChapterPublishedHandler } from '../kafka/handlers/chapter-published.handler';
import { CommentCreatedHandler } from '../kafka/handlers/comment-created.handler';
import { UserFollowedHandler } from '../kafka/handlers/user-followed.handler';
import { UserUnfollowedHandler } from '../kafka/handlers/user-unfollowed.handler';
import { UserRegisteredHandler } from '../kafka/handlers/user-registered.handler';
import { PasswordResetHandler } from '../kafka/handlers/password-reset.handler';
import { ContactSubmittedHandler } from '../kafka/handlers/contact-submitted.handler';
import { PostCommentCreatedHandler } from '../kafka/handlers/post-comment-created.handler';
import { MailSendHandler } from '../kafka/handlers/mail-send.handler';
import { RabbitmqConsumerService } from './rabbitmq-consumer.service';

@Module({
  imports: [
    RabbitmqClientModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('RABBITMQ_URL', 'amqp://localhost:5672'),
        enabled: config.get<string>('EVENT_DRIVER') === 'rabbitmq',
      }),
      inject: [ConfigService],
    }),
    NotificationModule,
    QueueModule,
  ],
  providers: [
    ChapterPublishedHandler,
    CommentCreatedHandler,
    UserFollowedHandler,
    UserUnfollowedHandler,
    UserRegisteredHandler,
    PasswordResetHandler,
    ContactSubmittedHandler,
    PostCommentCreatedHandler,
    MailSendHandler,
    RabbitmqConsumerService,
  ],
})
export class RabbitmqModule {}
```

- [ ] **Step 5: Chạy test — phải PASS**

```bash
npm test -w apps/notification-service -- --testPathPattern="rabbitmq-consumer"
```

Expected: 5 tests pass.

- [ ] **Step 6: Commit**

```bash
git add apps/notification-service/src/rabbitmq apps/notification-service/tests/rabbitmq
git commit -m "feat: add RabbitmqConsumerService for notification-service"
```

---

## Task 5: Update app.module.ts cho 6 services

**Files:**
- Modify: `apps/auth-service/src/app.module.ts`
- Modify: `apps/comic-service/src/app.module.ts`
- Modify: `apps/post-service/src/app.module.ts`
- Modify: `apps/iam-service/src/app.module.ts`
- Modify: `apps/cms-service/src/app.module.ts`
- Modify: `apps/notification-service/src/app.module.ts`

Pattern chung cho mỗi file:
1. Thêm import `RabbitmqModule` từ `./rabbitmq/rabbitmq.module`
2. Thêm `const messagingModule = process.env.EVENT_DRIVER === 'rabbitmq' ? RabbitmqModule : KafkaModule;` trước `@Module`
3. Thay `KafkaModule` → `messagingModule` trong `imports`
4. Bỏ `HEALTH_KAFKA_PROBE` và import `KafkaProducerService` khi dùng rabbitmq mode (dùng spread conditional)

- [ ] **Step 1: auth-service app.module.ts**

Thêm import và thay thế:
```typescript
// Thêm vào imports
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

// Trước @Module decorator
const messagingModule = process.env.EVENT_DRIVER === 'rabbitmq' ? RabbitmqModule : KafkaModule;
```

Trong `imports` array: thay `KafkaModule` → `messagingModule`

`HealthModule.register` probes: bọc `HEALTH_KAFKA_PROBE` bằng conditional spread:
```typescript
HealthModule.register({
  serviceName: 'auth-service',
  probes: [
    {
      provide: 'HEALTH_DB_PROBE',
      inject: [PrismaService],
      useFactory: (prisma: PrismaService) => () => prisma.$queryRawUnsafe('SELECT 1').then(() => {}),
    },
    {
      provide: 'HEALTH_REDIS_PROBE',
      inject: [RedisService],
      useFactory: (redis: RedisService) => () => redis.ping(),
    },
    ...(process.env.EVENT_DRIVER !== 'rabbitmq'
      ? [{
          provide: 'HEALTH_KAFKA_PROBE',
          inject: [KafkaProducerService],
          useFactory: (kafka: KafkaProducerService) => () => kafka.ping(),
        }]
      : []),
  ],
}),
```

- [ ] **Step 2: comic-service app.module.ts**

Thêm:
```typescript
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
const messagingModule = process.env.EVENT_DRIVER === 'rabbitmq' ? RabbitmqModule : KafkaModule;
```

Trong `imports`: thay `KafkaModule` → `messagingModule`

HealthModule probes (bọc HEALTH_KAFKA_PROBE giống auth):
```typescript
HealthModule.register({
  serviceName: 'comic-service',
  probes: [
    { provide: 'HEALTH_DB_PROBE', inject: [PrismaService], useFactory: (prisma: PrismaService) => () => prisma.$queryRawUnsafe('SELECT 1').then(() => {}) },
    { provide: 'HEALTH_REDIS_PROBE', inject: [RedisService], useFactory: (redis: RedisService) => () => redis.ping() },
    ...(process.env.EVENT_DRIVER !== 'rabbitmq'
      ? [{ provide: 'HEALTH_KAFKA_PROBE', inject: [KafkaProducerService], useFactory: (kafka: KafkaProducerService) => () => kafka.ping() }]
      : []),
  ],
}),
```

- [ ] **Step 3: post-service app.module.ts**

Tương tự comic-service. Thêm import `RabbitmqModule`, thêm `messagingModule`, thay `KafkaModule` → `messagingModule`, wrap `HEALTH_KAFKA_PROBE`.

- [ ] **Step 4: iam-service app.module.ts**

Tương tự. Lưu ý iam không có `ScheduleModule.forRoot()` trong `app.module.ts` (nó nằm trong `KafkaModule`/`RabbitmqModule` rồi) — giữ nguyên.

- [ ] **Step 5: cms-service app.module.ts**

Tương tự. cms không có `createRedisConfig` trong load — giữ nguyên phần còn lại.

- [ ] **Step 6: notification-service app.module.ts**

Notification-service không có `HEALTH_KAFKA_PROBE` — chỉ cần switch module:
```typescript
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
const messagingModule = process.env.EVENT_DRIVER === 'rabbitmq' ? RabbitmqModule : KafkaModule;
```

Thay `KafkaModule` → `messagingModule` trong imports.

- [ ] **Step 7: Build tất cả 6 services để verify không có lỗi TypeScript**

```bash
cd d:/microservice
npm run build:shared
npm run build:auth && npm run build:comic && npm run build:post && npm run build:iam && npm run build:cms && npm run build:notification
```

Expected: tất cả build thành công.

- [ ] **Step 8: Commit**

```bash
git add apps/auth-service/src/app.module.ts apps/comic-service/src/app.module.ts apps/post-service/src/app.module.ts apps/iam-service/src/app.module.ts apps/cms-service/src/app.module.ts apps/notification-service/src/app.module.ts
git commit -m "feat: add EVENT_DRIVER=rabbitmq switch in app.module.ts for all 6 services"
```

---

## Task 6: Update env.validation.ts + .env.example

**Files:**
- Modify: `apps/auth-service/src/core/config/env.validation.ts`
- Modify: `apps/comic-service/src/core/config/env.validation.ts`
- Modify: `apps/post-service/src/core/config/env.validation.ts`
- Modify: `apps/iam-service/src/core/config/env.validation.ts`
- Modify: `apps/cms-service/src/core/config/env.validation.ts`
- Modify: `apps/notification-service/src/core/config/env.validation.ts`
- Modify: `.env.example` cho 6 services

- [ ] **Step 1: Cập nhật EVENT_DRIVER validation trong 6 services**

Trong mỗi `env.validation.ts`, tìm và thay:
```typescript
// Before (auth-service)
EVENT_DRIVER: Joi.string().valid('local', 'kafka').default('local'),
// After
EVENT_DRIVER: Joi.string().valid('local', 'kafka', 'rabbitmq').default('local'),
```

Làm tương tự cho comic, post, iam, cms, notification. Các file có thể có thứ tự `'kafka', 'local'` hoặc `'local', 'kafka'` — chỉ cần thêm `'rabbitmq'` vào.

- [ ] **Step 2: Thêm RABBITMQ_URL vào .env.example của 6 services**

Trong mỗi `apps/<service>/.env.example`, thêm sau dòng `EVENT_DRIVER`:
```env
RABBITMQ_URL=amqp://guest:guest@localhost:5672
```

- [ ] **Step 3: Commit**

```bash
git add apps/auth-service/src/core/config/env.validation.ts apps/comic-service/src/core/config/env.validation.ts apps/post-service/src/core/config/env.validation.ts apps/iam-service/src/core/config/env.validation.ts apps/cms-service/src/core/config/env.validation.ts apps/notification-service/src/core/config/env.validation.ts
git add apps/auth-service/.env.example apps/comic-service/.env.example apps/post-service/.env.example apps/iam-service/.env.example apps/cms-service/.env.example apps/notification-service/.env.example
git commit -m "feat: add rabbitmq to EVENT_DRIVER validation and .env.example files"
```

---

## Task 7: Build toàn bộ & verify

- [ ] **Step 1: Build shared packages**

```bash
cd d:/microservice
npm run build:shared
```

Expected: tất cả pass, không có lỗi TypeScript.

- [ ] **Step 2: Build tất cả service**

```bash
npm run build
```

Expected: tất cả 10 services build thành công.

- [ ] **Step 3: Chạy toàn bộ test**

```bash
npm test
```

Expected: tất cả tests pass.

- [ ] **Step 4: Smoke test với EVENT_DRIVER=rabbitmq**

Start RabbitMQ:
```bash
docker compose up -d rabbitmq
```

Tạo file `.env.local` trong `apps/notification-service/`:
```env
EVENT_DRIVER=rabbitmq
RABBITMQ_URL=amqp://guest:guest@localhost:5672
```

Start notification-service:
```bash
npm run dev:notification
```

Expected: service start không lỗi, log hiện kết nối RabbitMQ thành công.

Kiểm tra RabbitMQ Management UI tại `http://localhost:15672` (guest/guest):
- Exchange `events` đã tồn tại, type `topic`
- Exchange `events.dlq` đã tồn tại
- 9 queues đã được tạo và bind

- [ ] **Step 5: Commit cuối**

```bash
git add -A
git commit -m "feat: complete RabbitMQ migration — EVENT_DRIVER=rabbitmq replaces Kafka"
```
