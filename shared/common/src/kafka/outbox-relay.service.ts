import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Producer } from 'kafkajs';
import { IdempotencyService } from './idempotency.service';

export interface OutboxRelayOptions {
  clientId: string;
  tableName: string;
  topicMap: Record<string, string>;
}

// Allowlist of outbox table names. Add new entries here when a new service
// wires up outbox publishing. We use $queryRawUnsafe with the table name
// interpolated into the SQL — this allowlist is the only thing standing
// between a stray refactor and a SQL-injection vector.
const ALLOWED_TABLE_NAMES = new Set<string>([
  'authOutbox',
  'comicOutbox',
  'postOutbox',
  'marketingOutbox',
  'iamOutbox',
  'notificationOutbox',
]);

@Injectable()
export class OutboxRelayService implements OnModuleDestroy {
  private readonly logger = new Logger(OutboxRelayService.name);
  private producer: Producer | null = null;
  private prisma: any;
  private shuttingDown = false;

  constructor(
    private readonly config: ConfigService,
    private readonly idempotency: IdempotencyService,
  ) {}

  async onModuleDestroy() {
    // Tell the cron to skip future ticks; in-flight ticks finish their loop
    // (they don't check this flag mid-iteration, but `relay` short-circuits
    // when the producer is gone, so they fail fast after disconnect).
    this.shuttingDown = true;
    try {
      await this.producer?.disconnect();
    } catch (err) {
      this.logger.warn(`Kafka producer disconnect failed: ${(err as Error).message}`);
    } finally {
      this.producer = null;
    }
  }

  /**
   * Initialize with Prisma instance and options.
   * Call this in onModuleInit of the consuming module.
   */
  init(prisma: any, options: OutboxRelayOptions) {
    this.prisma = prisma;

    if (this.config.get<boolean>('kafka.enabled')) {
      const kafka = new Kafka({
        clientId: options.clientId,
        brokers: this.config.get<string[]>('kafka.brokers') || ['localhost:9093'],
      });
      this.producer = kafka.producer();
      this.producer.connect().catch((err) => {
        this.logger.error('Kafka producer connect failed', err);
        this.producer = null;
      });
    }
  }

  getProducer(): Producer | null {
    return this.producer;
  }

  isEnabled(): boolean {
    return this.producer !== null;
  }

  /**
   * Atomically claim a batch of unpublished outbox rows and publish them.
   *
   * Uses `FOR UPDATE SKIP LOCKED` so multiple replicas / cron ticks each
   * grab a distinct slice, instead of all racing on the same 100 rows and
   * publishing duplicates. (Kafka consumers must be idempotent regardless,
   * but this turns "every replica double-publishes everything" into "rare
   * crash-window duplicates only".)
   *
   * The claim runs in a transaction:
   *   1. SELECT ... FOR UPDATE SKIP LOCKED → lock rows
   *   2. UPDATE published=true → release lock at COMMIT
   * Then we publish OUTSIDE the transaction. If publish fails, the row is
   * already marked published — same trade-off as Postgres at-least-once
   * outbox patterns. To recover lost events on publish failure, manual
   * re-publish from a deadletter table is the standard pattern.
   */
  async relay(tableName: string, topicMap: Record<string, string>) {
    if (this.shuttingDown) return;
    if (!this.producer || !this.prisma) return;

    // Hard allowlist before any string interpolation reaches SQL. Defense in
    // depth: the only callers today pass hardcoded strings, but a future
    // refactor that accidentally accepts user input shouldn't become a SQLi.
    if (!ALLOWED_TABLE_NAMES.has(tableName)) {
      this.logger.error(`Refusing to relay from unknown table "${tableName}" — not in allowlist`);
      return;
    }

    // Leader election: only one replica per cron interval should poll the
    // outbox. SKIP LOCKED would let the others run safely but waste DB calls
    // and produce noisier logs. TTL = 45s (cron is every 30s, 1.5x slack so
    // a slow tick doesn't release the lock mid-run).
    const acquired = await this.idempotency.tryLeaderLock(`outbox-relay:${tableName}`, 45);
    if (!acquired) return;

    let claimed: any[] = [];
    try {
      claimed = await this.prisma.$transaction(async (tx: any) => {
        // Postgres-only: SKIP LOCKED makes concurrent relays cooperative.
        // tableName has been allowlisted above so the interpolation is safe.
        const rows: any[] = await tx.$queryRawUnsafe(
          `SELECT id, event_type, payload
             FROM "${tableName}"
            WHERE published = false
            ORDER BY created_at ASC
            LIMIT 100
              FOR UPDATE SKIP LOCKED`,
        );
        if (!rows.length) return [];

        const ids = rows.map((r) => r.id);
        await tx[tableName].updateMany({
          where: { id: { in: ids } },
          data: { published: true },
        });
        return rows;
      });
    } catch (err) {
      this.logger.error('Outbox relay claim failed', err);
      return;
    }

    if (!claimed.length) return;

    for (const event of claimed) {
      const topic = topicMap[event.event_type];
      if (!topic) continue;

      // Cross-replica idempotency: even though SKIP LOCKED prevents two
      // replicas from claiming the same outbox row, a recovery path that
      // re-publishes from the dead-letter table (or a hand-run script) could
      // re-publish event_id. Redis NX claim makes that a true no-op rather
      // than a duplicate Kafka send.
      const eventIdStr = String(event.id);
      const claim = await this.idempotency.claim(`outbox:${topic}`, eventIdStr);
      if (!claim) {
        this.logger.debug(`Outbox event ${event.id} → ${topic} already claimed elsewhere`);
        continue;
      }

      try {
        const payload = event.payload as any;
        const key =
          payload?.comic_id?.toString() ||
          payload?.post_id?.toString() ||
          payload?.user_id?.toString() ||
          eventIdStr;

        await this.producer.send({
          topic,
          messages: [{
            key,
            value: JSON.stringify(event.payload),
            // Attach event_id to the message header so downstream consumers
            // can use it for their own idempotency claims (matches the
            // payload?.id || payload?.event_id lookup in KafkaService).
            headers: { 'event-id': eventIdStr },
          }],
        });
      } catch (err) {
        // Release the claim so a future relay tick CAN retry. Without this,
        // Redis would hold the lock for 24h and the event would stay lost.
        await this.idempotency.release(`outbox:${topic}`, eventIdStr);
        this.logger.error(
          `Failed to publish event ${event.id} (${event.event_type}) — already marked published in DB; claim released for retry`,
          err,
        );
      }
    }
  }
}
