import { Module, DynamicModule } from '@nestjs/common';
import { KafkaProducerService } from './kafka-producer.service';

export interface KafkaClientOptions {
  brokers: string[];
  clientId: string;
}

export interface KafkaClientAsyncOptions {
  imports?: any[];
  useFactory: (...args: any[]) => KafkaClientOptions | Promise<KafkaClientOptions>;
  inject?: any[];
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

  static registerAsync(options: KafkaClientAsyncOptions): DynamicModule {
    return {
      module: KafkaClientModule,
      imports: options.imports || [],
      providers: [
        {
          provide: 'KAFKA_OPTIONS',
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        KafkaProducerService,
      ],
      exports: [KafkaProducerService],
      global: true,
    };
  }
}
