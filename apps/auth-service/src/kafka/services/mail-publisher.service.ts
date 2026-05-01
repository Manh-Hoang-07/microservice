import { Injectable, Logger, OnModuleInit, OnModuleDestroy, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Producer } from 'kafkajs';
import { MAIL_SEND_TOPIC, MailSendEvent } from '@package/shared-types';

@Injectable()
export class MailPublisher implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MailPublisher.name);
  private producer: Producer | null = null;

  constructor(private readonly config: ConfigService) {}

  async onModuleInit(): Promise<void> {
    if (!this.config.get<boolean>('kafka.enabled')) {
      this.logger.warn(
        'EVENT_DRIVER != kafka — mail publishing disabled. Mail-dependent endpoints (OTP, password reset) will fail with 503.',
      );
      return;
    }
    const brokers = this.config.get<string[]>('kafka.brokers') ?? [];
    if (!brokers.length) {
      throw new Error('KAFKA_BROKERS is required when EVENT_DRIVER=kafka');
    }
    const kafka = new Kafka({ clientId: 'auth-mail', brokers });
    this.producer = kafka.producer();
    await this.producer.connect();
    this.logger.log(`Mail publisher connected (brokers=${brokers.join(',')})`);
  }

  async onModuleDestroy(): Promise<void> {
    await this.producer?.disconnect().catch(() => undefined);
    this.producer = null;
  }

  async publish(payload: MailSendEvent): Promise<void> {
    if (!this.producer) {
      throw new ServiceUnavailableException(
        'Mail service is unavailable. Set EVENT_DRIVER=kafka and ensure Kafka is reachable.',
      );
    }
    await this.producer.send({
      topic: MAIL_SEND_TOPIC,
      messages: [{ key: payload.to, value: JSON.stringify(payload) }],
    });
  }
}
