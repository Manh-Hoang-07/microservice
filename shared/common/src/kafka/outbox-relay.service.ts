import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { Kafka, Producer } from 'kafkajs';

export interface OutboxRelayOptions {
  clientId: string;
  tableName: string;
  topicMap: Record<string, string>;
}

@Injectable()
export class OutboxRelayService {
  private readonly logger = new Logger(OutboxRelayService.name);
  private producer: Producer | null = null;
  private prisma: any;

  constructor(
    private readonly config: ConfigService,
  ) {}

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

  async relay(tableName: string, topicMap: Record<string, string>) {
    if (!this.producer || !this.prisma) return;

    try {
      const events = await this.prisma[tableName].findMany({
        where: { published: false },
        take: 100,
        orderBy: { created_at: 'asc' },
      });

      if (!events.length) return;

      for (const event of events) {
        const topic = topicMap[event.event_type];
        if (!topic) continue;

        try {
          const payload = event.payload as any;
          const key = payload?.comic_id?.toString()
            || payload?.post_id?.toString()
            || payload?.user_id?.toString()
            || String(event.id);

          await this.producer.send({
            topic,
            messages: [{ key, value: JSON.stringify(event.payload) }],
          });

          await this.prisma[tableName].update({
            where: { id: event.id },
            data: { published: true },
          });
        } catch (err) {
          this.logger.error(`Failed to publish event ${event.id}`, err);
        }
      }
    } catch (err) {
      this.logger.error('Outbox relay error', err);
    }
  }
}
