import { Module } from '@nestjs/common';
import { OutboxRelayService } from '@package/common';
import { OutboxCronService } from './services/outbox-relay.service';

@Module({
  providers: [OutboxRelayService, OutboxCronService],
})
export class KafkaModule {}
