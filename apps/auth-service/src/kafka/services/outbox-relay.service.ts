import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { OutboxRelayService } from '@package/common';
import { PrismaService } from '../../database/prisma.service';

const TABLE_NAME = 'authOutbox';
const TOPIC_MAP: Record<string, string> = {
  'user.registered': 'user.registered',
  'user.password.reset': 'user.password.reset',
};

@Injectable()
export class AuthOutboxCronService implements OnModuleInit {
  constructor(
    private readonly outboxRelay: OutboxRelayService,
    private readonly prisma: PrismaService,
  ) {}

  onModuleInit() {
    this.outboxRelay.init(this.prisma, {
      clientId: 'auth-service-outbox',
      tableName: TABLE_NAME,
      topicMap: TOPIC_MAP,
    });
  }

  // Relay every 30 seconds (was every 5s). The faster cadence produced
  // ~12 idle queries/min per service × 5 services = 60 idle queries/min on
  // every DB. Bump if/when traffic actually stalls events at this interval.
  @Cron('*/30 * * * * *')
  async relayOutbox() {
    await this.outboxRelay.relay(TABLE_NAME, TOPIC_MAP);
  }
}
