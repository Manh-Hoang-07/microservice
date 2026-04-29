import { Module } from '@nestjs/common';
import { OutboxRelayService } from '@package/common';
import { AuthOutboxCronService } from './services/outbox-relay.service';

@Module({
  providers: [OutboxRelayService, AuthOutboxCronService],
})
export class KafkaModule {}
