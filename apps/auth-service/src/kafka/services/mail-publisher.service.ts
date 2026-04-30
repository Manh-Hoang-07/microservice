import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Producer } from 'kafkajs';

export const MAIL_SEND_TOPIC = 'mail.send';

export interface MailSendPayload {
  to: string;
  templateCode: string;
  variables?: Record<string, unknown>;
}

@Injectable()
export class MailPublisher implements OnModuleInit, OnModuleDestroy {
  private producer: Producer | null = null;

  constructor(private readonly config: ConfigService) {}

  async onModuleInit(): Promise<void> {
    if (!this.config.get<boolean>('kafka.enabled')) return;
    const brokers = this.config.get<string[]>('kafka.brokers') ?? [];
    const kafka = new Kafka({ clientId: 'auth-mail', brokers });
    this.producer = kafka.producer();
    await this.producer.connect().catch(() => {
      this.producer = null;
    });
  }

  async onModuleDestroy(): Promise<void> {
    await this.producer?.disconnect().catch(() => undefined);
  }

  isEnabled(): boolean {
    return this.producer !== null;
  }

  async publish(payload: MailSendPayload): Promise<void> {
    if (!this.producer) return;
    await this.producer.send({
      topic: MAIL_SEND_TOPIC,
      messages: [{ key: payload.to, value: JSON.stringify(payload) }],
    });
  }
}
