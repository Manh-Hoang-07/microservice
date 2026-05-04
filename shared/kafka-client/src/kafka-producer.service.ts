import { Injectable, Inject, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { KafkaJS } from '@confluentinc/kafka-javascript';
import { KafkaClientOptions } from './kafka-client.module';

type Producer = KafkaJS.Producer;

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
  private kafka: InstanceType<typeof KafkaJS.Kafka>;
  private producer: Producer;

  constructor(
    @Inject('KAFKA_OPTIONS') private readonly options: KafkaClientOptions,
  ) {
    this.kafka = new KafkaJS.Kafka({
      kafkaJS: {
        clientId: options.clientId,
        brokers: options.brokers,
      },
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
