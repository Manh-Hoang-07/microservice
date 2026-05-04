# Kafka KRaft + Client Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove Zookeeper dependency by switching Kafka to KRaft mode, and replace the archived KafkaJS library with `@confluentinc/kafka-javascript` using its KafkaJS compatibility layer.

**Architecture:** Docker Compose Kafka service runs in combined mode (broker+controller) with KRaft. All TypeScript files change their import from `kafkajs` to `@confluentinc/kafka-javascript`'s KafkaJS compatibility API. The application-level logic (outbox, dedup, DLQ) remains unchanged.

**Tech Stack:** Confluent cp-kafka 8.2.0 (KRaft), @confluentinc/kafka-javascript ^1.8.2, NestJS, TypeScript

---

## File Structure

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `docker-compose.yml` | Remove zookeeper service, reconfigure kafka for KRaft |
| Modify | `package.json` | Update `docker:infra` script (remove zookeeper reference) |
| Modify | `shared/kafka-client/package.json` | Replace kafkajs with @confluentinc/kafka-javascript |
| Modify | `shared/common/package.json` | Replace kafkajs with @confluentinc/kafka-javascript |
| Modify | `apps/auth-service/package.json` | Remove kafkajs dependency |
| Modify | `apps/comic-service/package.json` | Remove kafkajs dependency |
| Modify | `apps/notification-service/package.json` | Remove kafkajs dependency |
| Modify | `apps/post-service/package.json` | Remove kafkajs dependency |
| Modify | `apps/marketing-service/package.json` | Remove kafkajs dependency |
| Modify | `shared/kafka-client/src/kafka-producer.service.ts` | Update import |
| Modify | `shared/common/src/kafka/outbox-relay.service.ts` | Update import |
| Modify | `apps/auth-service/src/kafka/services/mail-publisher.service.ts` | Update import |
| Modify | `apps/notification-service/src/kafka/services/kafka.service.ts` | Update import + adjust consumer config |

---

### Task 1: Docker Compose — Remove Zookeeper, Enable KRaft

**Files:**
- Modify: `docker-compose.yml`
- Modify: `package.json` (scripts only)

- [ ] **Step 1: Replace zookeeper and kafka services in docker-compose.yml**

Remove the `zookeeper` service entirely. Replace the `kafka` service with KRaft combined-mode config:

```yaml
  kafka:
    image: confluentinc/cp-kafka:8.2.0
    container_name: comic-kafka
    restart: unless-stopped
    ports:
      - "9092:9092"
      - "9093:9093"
    environment:
      # KRaft combined mode (broker + controller in single node)
      KAFKA_NODE_ID: 1
      KAFKA_PROCESS_ROLES: broker,controller
      KAFKA_CONTROLLER_QUORUM_VOTERS: 1@kafka:9094
      CLUSTER_ID: MkU3OEVBNTcwNTJENDM2Qk

      # Listeners
      KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:9092,PLAINTEXT_HOST://0.0.0.0:9093,CONTROLLER://0.0.0.0:9094
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092,PLAINTEXT_HOST://localhost:9093
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT,CONTROLLER:PLAINTEXT
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_CONTROLLER_LISTENER_NAMES: CONTROLLER

      # Topic defaults
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_AUTO_CREATE_TOPICS_ENABLE: "true"
      KAFKA_LOG_RETENTION_HOURS: 168
      KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: 0
    volumes:
      - kafka_data:/var/lib/kafka/data
    healthcheck:
      test: ["CMD", "kafka-topics", "--bootstrap-server", "localhost:9092", "--list"]
      interval: 10s
      timeout: 10s
      retries: 5
```

- [ ] **Step 2: Update kafka-ui service — remove Zookeeper reference**

```yaml
  kafka-ui:
    image: provectuslabs/kafka-ui:latest
    container_name: comic-kafka-ui
    restart: unless-stopped
    ports:
      - "8080:8080"
    depends_on:
      - kafka
    environment:
      KAFKA_CLUSTERS_0_NAME: comic-platform
      KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS: kafka:9092
```

Remove the `KAFKA_CLUSTERS_0_ZOOKEEPER` line entirely.

- [ ] **Step 3: Remove zookeeper volumes**

In the `volumes:` section at the bottom of docker-compose.yml, remove:
```yaml
  zookeeper_data:
  zookeeper_logs:
```

- [ ] **Step 4: Update package.json docker:infra script**

In root `package.json`, update the `docker:infra` and `docker:infra:down` scripts to remove `zookeeper`:

```json
"docker:infra": "docker compose up -d kafka kafka-ui auth-db comic-db notification-db config-db post-db introduction-db marketing-db iam-db auth-redis comic-redis notification-redis post-redis web-api-redis iam-redis jaeger",
"docker:infra:down": "docker compose stop kafka kafka-ui auth-db comic-db notification-db config-db post-db introduction-db marketing-db iam-db auth-redis comic-redis notification-redis post-redis web-api-redis iam-redis jaeger",
```

- [ ] **Step 5: Verify Docker Compose config is valid**

Run: `cd d:/microservice && docker compose config --quiet`
Expected: No errors (exit code 0)

- [ ] **Step 6: Commit**

```bash
git add docker-compose.yml package.json
git commit -m "infra: remove Zookeeper, switch Kafka to KRaft combined mode (cp-kafka 8.2.0)"
```

---

### Task 2: Replace kafkajs with @confluentinc/kafka-javascript in package.json files

**Files:**
- Modify: `shared/kafka-client/package.json`
- Modify: `shared/common/package.json`
- Modify: `apps/auth-service/package.json`
- Modify: `apps/comic-service/package.json`
- Modify: `apps/notification-service/package.json`
- Modify: `apps/post-service/package.json`
- Modify: `apps/marketing-service/package.json`

- [ ] **Step 1: Update shared/kafka-client/package.json**

Replace `"kafkajs": "^2.2.4"` with `"@confluentinc/kafka-javascript": "^1.8.2"` in dependencies.

- [ ] **Step 2: Update shared/common/package.json**

Replace `"kafkajs": "^2.2.4"` with `"@confluentinc/kafka-javascript": "^1.8.2"` in dependencies.

- [ ] **Step 3: Remove kafkajs from app service package.json files**

In each of these files, remove `"kafkajs": "^2.2.4"` from dependencies (they will use it transitively through shared packages):
- `apps/auth-service/package.json`
- `apps/comic-service/package.json`
- `apps/notification-service/package.json`
- `apps/post-service/package.json`
- `apps/marketing-service/package.json`

- [ ] **Step 4: Run npm install**

Run: `cd d:/microservice && npm install`
Expected: Successful install, kafkajs removed, @confluentinc/kafka-javascript added to node_modules.

- [ ] **Step 5: Commit**

```bash
git add shared/kafka-client/package.json shared/common/package.json apps/auth-service/package.json apps/comic-service/package.json apps/notification-service/package.json apps/post-service/package.json apps/marketing-service/package.json package-lock.json
git commit -m "deps: replace kafkajs with @confluentinc/kafka-javascript"
```

---

### Task 3: Migrate shared/kafka-client TypeScript imports

**Files:**
- Modify: `shared/kafka-client/src/kafka-producer.service.ts`

- [ ] **Step 1: Update import in kafka-producer.service.ts**

Change line 2 from:
```typescript
import { Kafka, Producer } from 'kafkajs';
```
to:
```typescript
import { Kafka, Producer } from '@confluentinc/kafka-javascript/kafkajs';
```

The rest of the file remains unchanged — the KafkaJS compatibility API exposes the same `Kafka`, `Producer` classes with identical interfaces.

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd d:/microservice && npm -w shared/kafka-client run build`
Expected: Successful compilation, no type errors.

- [ ] **Step 3: Commit**

```bash
git add shared/kafka-client/src/kafka-producer.service.ts
git commit -m "refactor(kafka-client): migrate import to @confluentinc/kafka-javascript"
```

---

### Task 4: Migrate shared/common outbox-relay import

**Files:**
- Modify: `shared/common/src/kafka/outbox-relay.service.ts`

- [ ] **Step 1: Update import in outbox-relay.service.ts**

Change line 3 from:
```typescript
import { Kafka, Producer } from 'kafkajs';
```
to:
```typescript
import { Kafka, Producer } from '@confluentinc/kafka-javascript/kafkajs';
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd d:/microservice && npm -w shared/common run build`
Expected: Successful compilation.

- [ ] **Step 3: Commit**

```bash
git add shared/common/src/kafka/outbox-relay.service.ts
git commit -m "refactor(common): migrate outbox-relay import to @confluentinc/kafka-javascript"
```

---

### Task 5: Migrate auth-service mail-publisher import

**Files:**
- Modify: `apps/auth-service/src/kafka/services/mail-publisher.service.ts`

- [ ] **Step 1: Update import in mail-publisher.service.ts**

Change line 3 from:
```typescript
import { Kafka, Producer } from 'kafkajs';
```
to:
```typescript
import { Kafka, Producer } from '@confluentinc/kafka-javascript/kafkajs';
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd d:/microservice && npm -w apps/auth-service run build`
Expected: Successful compilation.

- [ ] **Step 3: Commit**

```bash
git add apps/auth-service/src/kafka/services/mail-publisher.service.ts
git commit -m "refactor(auth): migrate mail-publisher import to @confluentinc/kafka-javascript"
```

---

### Task 6: Migrate notification-service consumer

**Files:**
- Modify: `apps/notification-service/src/kafka/services/kafka.service.ts`

This is the most complex migration because it uses Consumer, Producer, EachMessagePayload, and KafkaConfig types.

- [ ] **Step 1: Update import in kafka.service.ts**

Change line 3 from:
```typescript
import { Kafka, Consumer, EachMessagePayload, KafkaConfig, Producer } from 'kafkajs';
```
to:
```typescript
import { Kafka, Consumer, EachMessagePayload, KafkaConfig, Producer } from '@confluentinc/kafka-javascript/kafkajs';
```

- [ ] **Step 2: Move `fromBeginning` to consumer-level config**

Per the migration guide, `fromBeginning` cannot be set per `subscribe()` call. It must be set at consumer creation. Update the consumer creation (around line 97):

```typescript
    this.consumer = kafka.consumer({
      groupId: groupId || 'notification-service',
      sessionTimeout: 30_000,
      heartbeatInterval: 3_000,
      fromBeginning: false,
    });
```

And update the subscribe calls (around line 110) to remove `fromBeginning`:
```typescript
    for (const topic of this.handlers.keys()) {
      await this.consumer.subscribe({ topic });
    }
```

- [ ] **Step 3: Move `allowAutoTopicCreation` from producer options to top-level config**

Per the migration guide, `allowAutoTopicCreation` is set at Kafka-level, not producer-level. Update DLQ producer creation (around line 106):

```typescript
    this.dlqProducer = kafka.producer();
```

The `allowAutoTopicCreation` is already handled by the broker config `KAFKA_AUTO_CREATE_TOPICS_ENABLE: "true"`.

- [ ] **Step 4: Verify TypeScript compiles**

Run: `cd d:/microservice && npm -w apps/notification-service run build`
Expected: Successful compilation.

- [ ] **Step 5: Commit**

```bash
git add apps/notification-service/src/kafka/services/kafka.service.ts
git commit -m "refactor(notification): migrate consumer to @confluentinc/kafka-javascript"
```

---

### Task 7: Integration test — verify full stack works

- [ ] **Step 1: Clean up old Docker volumes**

Run:
```bash
cd d:/microservice && docker compose down -v
```

This removes old zookeeper and kafka volumes that are incompatible with KRaft.

- [ ] **Step 2: Start infrastructure**

Run:
```bash
cd d:/microservice && npm run docker:infra
```

Expected: kafka and kafka-ui start without zookeeper.

- [ ] **Step 3: Wait for Kafka healthcheck**

Run:
```bash
docker inspect --format='{{.State.Health.Status}}' comic-kafka
```

Expected: `healthy` (may need to wait 30s for healthcheck to pass).

- [ ] **Step 4: Verify Kafka UI accessible**

Open http://localhost:8080 — Kafka UI should show the `comic-platform` cluster connected.

- [ ] **Step 5: Start notification service to test consumer**

Run:
```bash
cd d:/microservice && npm run start:notification
```

Expected: Service starts, Kafka consumer connects without errors. Look for log line like:
`KafkaService - Kafka consumer connected` (no `ECONNREFUSED` errors).

- [ ] **Step 6: Commit (if any adjustments were needed)**

If any fixes were required during testing, commit them:
```bash
git add -A
git commit -m "fix: adjustments from integration testing kafka-kraft migration"
```
