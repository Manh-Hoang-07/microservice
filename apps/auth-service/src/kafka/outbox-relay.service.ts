import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../database/prisma.service';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class OutboxRelayService {
  private readonly logger = new Logger(OutboxRelayService.name);
  private producer: Producer | null = null;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {
    if (config.get<boolean>('kafka.enabled')) {
      const kafka = new Kafka({
        clientId: 'auth-service-outbox',
        brokers: config.get<string[]>('kafka.brokers') || ['localhost:9093'],
      });
      this.producer = kafka.producer();
      this.producer.connect().catch((err) => {
        this.logger.error('Kafka producer connect failed', err);
        this.producer = null;
      });
    }
  }

  @Cron('*/5 * * * * *')
  async relayOutbox() {
    if (!this.producer) return;

    try {
      const events = await this.prisma.authOutbox.findMany({
        where: { published: false },
        take: 100,
        orderBy: { created_at: 'asc' },
      });

      if (!events.length) return;

      for (const event of events) {
        const topic = this.getTopicForEvent(event.event_type);
        if (!topic) continue;

        try {
          await this.producer.send({
            topic,
            messages: [
              {
                key: String(event.id),
                value: JSON.stringify(event.payload),
              },
            ],
          });

          await this.prisma.authOutbox.update({
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

  private getTopicForEvent(eventType: string): string | null {
    const topicMap: Record<string, string> = {
      'user.registered': 'user.registered',
      'user.password.reset': 'user.password.reset',
    };
    return topicMap[eventType] ?? null;
  }
}
