import { Global, Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';

/**
 * KafkaModule — global module, cung cấp KafkaService cho toàn bộ app.
 * Hoạt động ở chế độ no-op khi EVENT_DRIVER != 'kafka'.
 */
@Global()
@Module({
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
