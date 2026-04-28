import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '@/core/database/prisma/prisma.service';
import { KafkaService } from '@/kafka/kafka.service';

const BATCH_SIZE = 100;
const RELAY_INTERVAL = '*/5 * * * * *'; // every 5 seconds

@Injectable()
export class OutboxRelayService {
  private readonly logger = new Logger(OutboxRelayService.name);
  private isRunning = false;

  constructor(
    private readonly prisma: PrismaService,
    private readonly kafka: KafkaService,
  ) {}

  @Cron(RELAY_INTERVAL)
  async relay() {
    if (!this.kafka.enabled) return;
    if (this.isRunning) return;

    this.isRunning = true;
    try {
      await this.processOutbox();
    } finally {
      this.isRunning = false;
    }
  }

  private async processOutbox(): Promise<void> {
    const events = await this.prisma.comicOutbox.findMany({
      where: { published: false },
      orderBy: { created_at: 'asc' },
      take: BATCH_SIZE,
    });

    if (events.length === 0) return;

    const messages = events.map((e) => ({
      topic: e.event_type,
      key: this.extractKey(e.event_type, e.payload as Record<string, unknown>),
      value: e.payload as Record<string, unknown>,
    }));

    await this.kafka.publishBatch(messages);

    const ids = events.map((e) => e.id);
    await this.prisma.comicOutbox.updateMany({
      where: { id: { in: ids } },
      data: { published: true },
    });

    this.logger.log(`Outbox relay: published ${events.length} event(s)`);
  }

  private extractKey(
    eventType: string,
    payload: Record<string, unknown>,
  ): string | undefined {
    // Partition comic events by comic_id for ordering guarantees
    if (eventType.startsWith('comic.')) {
      return payload['comic_id'] ? String(payload['comic_id']) : undefined;
    }
    if (eventType.startsWith('user.')) {
      return payload['user_id'] ? String(payload['user_id']) : undefined;
    }
    return undefined;
  }
}
