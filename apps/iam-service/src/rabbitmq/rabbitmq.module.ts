import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { KAFKA_PRODUCER } from '@package/common';
import { RabbitmqClientModule, RabbitmqProducerService } from '@package/rabbitmq-client';
import { IamOutboxCronService } from '../kafka/services/outbox-relay.service';
import { RbacEventPublisher } from '../kafka/services/rbac-event-publisher.service';

// OutboxCronService lives in kafka/services/ and is intentionally shared (not duplicated).
// KAFKA_PRODUCER token is reused so existing consumers work unchanged with RabbitMQ.
@Module({
  imports: [
    ScheduleModule.forRoot(),
    RabbitmqClientModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('RABBITMQ_URL', 'amqp://localhost:5672'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    IamOutboxCronService,
    RbacEventPublisher,
    { provide: KAFKA_PRODUCER, useExisting: RabbitmqProducerService },
  ],
  exports: [RbacEventPublisher, KAFKA_PRODUCER],
})
export class RabbitmqModule {}
