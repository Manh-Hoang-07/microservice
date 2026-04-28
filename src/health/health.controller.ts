import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Permission } from '@/common/auth/decorators';
import { PrismaService } from '@/core/database/prisma/prisma.service';
import { RedisUtil } from '@/core/utils/redis.util';
import { KafkaService } from '@/kafka/kafka.service';

interface ServiceStatus {
  status: 'ok' | 'degraded' | 'down';
  latency_ms?: number;
  detail?: string;
}

interface HealthResponse {
  status: 'ok' | 'degraded' | 'down';
  timestamp: string;
  uptime_seconds: number;
  version: string;
  services: {
    database: ServiceStatus;
    redis: ServiceStatus;
    kafka: ServiceStatus;
  };
}

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisUtil,
    private readonly kafka: KafkaService,
  ) {}

  @Get()
  @Permission('public')
  @ApiOperation({ summary: 'Liveness + readiness probe' })
  async check(): Promise<HealthResponse> {
    const [db, redisStatus] = await Promise.all([
      this.checkDatabase(),
      this.checkRedis(),
    ]);

    const kafkaStatus: ServiceStatus = this.kafka.enabled
      ? { status: 'ok', detail: 'connected' }
      : { status: 'ok', detail: 'disabled (EVENT_DRIVER=local)' };

    const allOk = db.status === 'ok' && redisStatus.status === 'ok';

    return {
      status: allOk ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime_seconds: Math.floor(process.uptime()),
      version: process.env.npm_package_version ?? '1.0.0',
      services: {
        database: db,
        redis: redisStatus,
        kafka: kafkaStatus,
      },
    };
  }

  private async checkDatabase(): Promise<ServiceStatus> {
    const start = Date.now();
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'ok', latency_ms: Date.now() - start };
    } catch (err) {
      return {
        status: 'down',
        latency_ms: Date.now() - start,
        detail: (err as Error).message,
      };
    }
  }

  private async checkRedis(): Promise<ServiceStatus> {
    if (!this.redis.isEnabled()) {
      return { status: 'ok', detail: 'disabled' };
    }
    const start = Date.now();
    try {
      await this.redis.get('health:probe');
      return { status: 'ok', latency_ms: Date.now() - start };
    } catch (err) {
      return {
        status: 'degraded',
        latency_ms: Date.now() - start,
        detail: (err as Error).message,
      };
    }
  }
}
