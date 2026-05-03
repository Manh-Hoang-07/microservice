import { Module } from '@nestjs/common';
import { OutboxRelayService } from '@package/common';
import { PostOutboxCronService } from './services/outbox-relay.service';

@Module({
  providers: [OutboxRelayService, PostOutboxCronService],
})
export class KafkaModule {}
