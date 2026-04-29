import { Module } from '@nestjs/common';
import { OutboxRelayService } from './services/outbox-relay.service';

@Module({
  providers: [OutboxRelayService],
})
export class KafkaModule {}
