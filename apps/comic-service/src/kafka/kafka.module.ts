import { Module } from '@nestjs/common';
import { OutboxRelayService } from '@package/common';
import { ComicOutboxCronService } from './services/outbox-relay.service';

@Module({
  providers: [OutboxRelayService, ComicOutboxCronService],
})
export class KafkaModule {}
