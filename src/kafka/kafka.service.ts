import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Producer, Consumer, logLevel } from 'kafkajs';

export interface KafkaMessage {
  topic: string;
  key?: string;
  value: Record<string, unknown>;
}

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaService.name);
  private kafka: Kafka | null = null;
  private producer: Producer | null = null;
  private readonly consumers: Consumer[] = [];
  readonly enabled: boolean;

  constructor(private readonly config: ConfigService) {
    this.enabled = config.get<string>('EVENT_DRIVER', 'local') === 'kafka';
  }

  async onModuleInit() {
    if (!this.enabled) {
      this.logger.log('KafkaService disabled (EVENT_DRIVER != kafka)');
      return;
    }

    const brokers = this.config
      .get<string>('KAFKA_BROKERS', 'localhost:9092')
      .split(',')
      .map((b) => b.trim());

    const clientId = this.config.get<string>('KAFKA_CLIENT_ID', 'comic-platform-main');

    this.kafka = new Kafka({
      clientId,
      brokers,
      logLevel: logLevel.WARN,
    });

    this.producer = this.kafka.producer({
      allowAutoTopicCreation: true,
    });

    await this.producer.connect();
    this.logger.log(`Kafka producer connected to ${brokers.join(', ')}`);
  }

  async onModuleDestroy() {
    await this.producer?.disconnect().catch(() => null);
    await Promise.all(this.consumers.map((c) => c.disconnect().catch(() => null)));
  }

  /**
   * Publish a single message. No-op when Kafka is disabled.
   */
  async publish(message: KafkaMessage): Promise<void> {
    if (!this.enabled || !this.producer) {
      this.logger.debug(
        `[Kafka SKIP] topic=${message.topic} key=${message.key ?? '-'} payload=${JSON.stringify(message.value)}`,
      );
      return;
    }

    await this.producer.send({
      topic: message.topic,
      messages: [
        {
          key: message.key ?? null,
          value: JSON.stringify(message.value),
        },
      ],
    });
  }

  /**
   * Publish multiple messages in a single batch.
   */
  async publishBatch(messages: KafkaMessage[]): Promise<void> {
    if (!this.enabled || !this.producer) {
      for (const msg of messages) {
        this.logger.debug(
          `[Kafka SKIP] topic=${msg.topic} key=${msg.key ?? '-'}`,
        );
      }
      return;
    }

    // Group by topic for efficient batching
    const byTopic = messages.reduce<Record<string, { key?: string; value: string }[]>>(
      (acc, msg) => {
        if (!acc[msg.topic]) acc[msg.topic] = [];
        acc[msg.topic].push({
          key: msg.key ?? undefined,
          value: JSON.stringify(msg.value),
        });
        return acc;
      },
      {},
    );

    await this.producer.sendBatch({
      topicMessages: Object.entries(byTopic).map(([topic, msgs]) => ({
        topic,
        messages: msgs,
      })),
    });
  }

  /**
   * Create a consumer and subscribe to topics.
   * Returns the consumer so caller can set up message handler.
   */
  async createConsumer(
    groupId: string,
    topics: string[],
  ): Promise<Consumer | null> {
    if (!this.enabled || !this.kafka) return null;

    const consumer = this.kafka.consumer({ groupId });
    await consumer.connect();
    for (const topic of topics) {
      await consumer.subscribe({ topic, fromBeginning: false });
    }
    this.consumers.push(consumer);
    return consumer;
  }
}
