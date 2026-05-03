import { Controller, Get, Inject, Optional, ServiceUnavailableException, SetMetadata } from '@nestjs/common';

const PERMS_KEY = 'perms_required';

/**
 * Per-service liveness/readiness probes.
 *
 * - `GET /health` (alias `/health/live`) is a cheap liveness check that
 *   only confirms the process is up. Use for k8s `livenessProbe`.
 * - `GET /health/ready` is the readiness check — pings DB/Redis if they're
 *   provided. Returns 503 if any required dependency is down so a load
 *   balancer can take the pod out of rotation. Use for k8s `readinessProbe`.
 *
 * Dependencies are wired in via DI tokens that consuming services optionally
 * provide. The shared module never creates real Prisma/Redis instances —
 * services bind their own to `HEALTH_DB_PROBE` / `HEALTH_REDIS_PROBE`.
 */
export type HealthProbe = () => Promise<void>;

@Controller('health')
export class HealthController {
  constructor(
    @Inject('HEALTH_SERVICE_NAME') private readonly serviceName: string,
    @Optional() @Inject('HEALTH_DB_PROBE') private readonly dbProbe?: HealthProbe,
    @Optional() @Inject('HEALTH_REDIS_PROBE') private readonly redisProbe?: HealthProbe,
  ) {}

  @Get()
  @SetMetadata(PERMS_KEY, ['public'])
  check() {
    return this.live();
  }

  @Get('live')
  @SetMetadata(PERMS_KEY, ['public'])
  live() {
    return {
      status: 'ok',
      service: this.serviceName,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('ready')
  @SetMetadata(PERMS_KEY, ['public'])
  async ready() {
    const checks: Record<string, 'ok' | 'fail'> = {};
    let healthy = true;

    if (this.dbProbe) {
      try {
        await this.dbProbe();
        checks.db = 'ok';
      } catch {
        checks.db = 'fail';
        healthy = false;
      }
    }
    if (this.redisProbe) {
      try {
        await this.redisProbe();
        checks.redis = 'ok';
      } catch {
        checks.redis = 'fail';
        healthy = false;
      }
    }

    const body = {
      status: healthy ? 'ok' : 'degraded',
      service: this.serviceName,
      timestamp: new Date().toISOString(),
      checks,
    };
    if (!healthy) throw new ServiceUnavailableException(body);
    return body;
  }
}
