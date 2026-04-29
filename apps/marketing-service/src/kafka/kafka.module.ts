import { Module } from '@nestjs/common';
import { OutboxRelayService } from '@package/common';
import { MarketingOutboxCronService } from './services/outbox-relay.service';

@Module({
  providers: [OutboxRelayService, MarketingOutboxCronService],
})
export class KafkaModule {}
