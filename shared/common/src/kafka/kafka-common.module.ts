import { Global, Module } from '@nestjs/common';
import { RedisModule } from '@package/redis';
import { IdempotencyService } from './idempotency.service';
import { OutboxRelayService } from './outbox-relay.service';

/**
 * Bundle of shared Kafka helpers that need NestJS DI to work:
 *   - IdempotencyService → cross-replica Redis NX claims
 *   - OutboxRelayService → cron-driven outbox publisher
 *
 * Marked @Global so a single import in AppModule makes these injectable
 * across every other module in the service. Without this wrapper they were
 * bare @Injectable() classes exported from `@package/common` — Nest can't
 * resolve them at runtime even though the type imports compile fine.
 *
 * Usage:
 *   imports: [..., CommonKafkaModule]
 */
@Global()
@Module({
  imports: [RedisModule],
  providers: [IdempotencyService, OutboxRelayService],
  exports: [IdempotencyService, OutboxRelayService],
})
export class CommonKafkaModule {}
