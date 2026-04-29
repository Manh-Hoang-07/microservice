import { Injectable, Inject, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';
import { KafkaClientOptions } from './kafka-client.module';

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private producer: Producer;

  constructor(
    @Inject('KAFKA_OPTIONS') private readonly options: KafkaClientOptions,
  ) {
    this.kafka = new Kafka({
      clientId: options.clientId,
      brokers: options.brokers,
    });
    this.producer = this.kafka.producer();
  }

  async onModuleInit() {
    await this.producer.connect();
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }

  async emit(topic: string, payload: any, key?: string) {
    await this.producer.send({
      topic,
      messages: [
        {
          key: key || undefined,
          value: JSON.stringify(payload),
        },
      ],
    });
  }
}
