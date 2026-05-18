import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KAFKA_PRODUCER } from '@package/common';
import { RabbitmqClientModule, RabbitmqProducerService } from '@package/rabbitmq-client';
import { AuthOutboxCronService } from '../kafka/services/outbox-relay.service';

@Module({
  imports: [
    RabbitmqClientModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('RABBITMQ_URL', 'amqp://localhost:5672'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthOutboxCronService,
    { provide: KAFKA_PRODUCER, useExisting: RabbitmqProducerService },
  ],
  exports: [KAFKA_PRODUCER],
})
export class RabbitmqModule {}
