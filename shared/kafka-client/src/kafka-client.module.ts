import { Module, DynamicModule } from '@nestjs/common';
import { KafkaProducerService } from './kafka-producer.service';

export interface KafkaClientOptions {
  brokers: string[];
  clientId: string;
}

@Module({})
export class KafkaClientModule {
  static register(options: KafkaClientOptions): DynamicModule {
    return {
      module: KafkaClientModule,
      providers: [
        {
          provide: 'KAFKA_OPTIONS',
          useValue: options,
        },
        KafkaProducerService,
      ],
      exports: [KafkaProducerService],
      global: true,
    };
  }
}
