import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Producer } from 'kafkajs';

export interface OutboxRelayOptions {
  clientId: string;
  tableName: string;
  topicMap: Record<string, string>;
}

@Injectable()
export class OutboxRelayService implements OnModuleDestroy {
  private readonly logger = new Logger(OutboxRelayService.name);
  private producer: Producer | null = null;
  private prisma: any;
  private shuttingDown = false;

  constructor(
    private readonly config: ConfigService,
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

    let claimed: any[] = [];
    try {
      claimed = await this.prisma.$transaction(async (tx: any) => {
        // Postgres-only: SKIP LOCKED makes concurrent relays cooperative.
        // Quote the table name defensively in case it's mixed-case.
        const rows: any[] = await tx.$queryRawUnsafe(
          `SELECT id, event_type, payload
             FROM "${tableName.replace(/"/g, '')}"
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

      try {
        const payload = event.payload as any;
        const key =
          payload?.comic_id?.toString() ||
          payload?.post_id?.toString() ||
          payload?.user_id?.toString() ||
          String(event.id);

        await this.producer.send({
          topic,
          messages: [{ key, value: JSON.stringify(event.payload) }],
        });
      } catch (err) {
        this.logger.error(
          `Failed to publish event ${event.id} (${event.event_type}) — already marked published`,
          err,
        );
      }
    }
  }
}
