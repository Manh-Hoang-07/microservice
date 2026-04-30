import { Module } from '@nestjs/common';
import { OutboxRelayService } from '@package/common';
import { AuthOutboxCronService } from './services/outbox-relay.service';
import { MailPublisher } from './services/mail-publisher.service';

@Module({
  providers: [OutboxRelayService, AuthOutboxCronService, MailPublisher],
  exports: [MailPublisher],
})
export class KafkaModule {}
