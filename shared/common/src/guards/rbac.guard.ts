import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  Optional,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { CircuitBreakerPolicy } from 'cockatiel';
import { createCircuitBreaker } from '@package/circuit-breaker';
import { RedisService } from '@package/redis';
import { PERMS_KEY } from '../decorators/permission.decorator';

const RBAC_TIMEOUT_MS = 5_000;
const RBAC_CACHE_TTL_S = 60;

@Injectable()
export class RbacGuard implements CanActivate {
  private readonly logger = new Logger(RbacGuard.name);
  private readonly breaker: CircuitBreakerPolicy;

  constructor(
    private readonly reflector: Reflector,
    private readonly config: ConfigService,
    @Optional() @Inject(RedisService) private readonly redis?: RedisService,
  ) {
    this.breaker = createCircuitBreaker({
      halfOpenAfterMs: 10_000,
      maxConsecutiveFailures: 5,
    });

    this.breaker.onBreak(() => {
      this.logger.warn('RBAC circuit opened — IAM service unavailable');
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.getAllAndOverride<string[]>(PERMS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? [];

    if (!permissions.length) return true;
    if (permissions.includes('public') || permissions.includes('internal')) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user?.sub) throw new UnauthorizedException('Authentication required');

    const iamUrl = this.config.get<string>('IAM_INTERNAL_URL');
    if (!iamUrl) {
      const env = this.config.get<string>('NODE_ENV') ?? process.env.NODE_ENV;
      if (env === 'production') {
        throw new ForbiddenException('Permission service not configured');
      }
      return true;
    }

    const userId = String(user.sub);
    const groupId = (request.headers['x-group-id'] as string) || undefined;

    // Check Redis cache first
    const cacheKey = `rbac:${userId}:${permissions.sort().join(',')}:${groupId ?? ''}`;
    try {
      const cached = await this.redis?.get(cacheKey);
      if (cached !== null && cached !== undefined) {
        const result = JSON.parse(cached) as { allowed: boolean };
        if (!result.allowed) throw new ForbiddenException('Permission denied');
        return true;
      }
    } catch (err) {
      if (err instanceof ForbiddenException) throw err;
      // Redis unavailable — fall through to HTTP call
    }

    const secret =
      this.config.get<string>('INTERNAL_API_SECRET') ||
      this.config.get<string>('app.internalApiSecret') ||
      '';

    let data: { allowed: boolean };
    try {
      data = await this.breaker.execute(async () => {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), RBAC_TIMEOUT_MS);
        let res: Response;
        try {
          res = await fetch(`${iamUrl}/internal/rbac/check`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-internal-secret': secret,
            },
            body: JSON.stringify({
              userId,
              groupId,
              permissions,
            }),
            signal: controller.signal,
          });
        } finally {
          clearTimeout(timer);
        }

        if (!res.ok) {
          if (res.status >= 500) {
            throw new Error(`IAM returned ${res.status}`);
          }
          throw new ForbiddenException('Permission denied');
        }

        return (await res.json()) as { allowed: boolean };
      });
    } catch (err) {
      if (err instanceof ForbiddenException) throw err;
      this.logger.error(`RBAC check failed: ${(err as Error).message}`);
      throw new ForbiddenException('Permission check unavailable');
    }

    // Cache the result in Redis
    try {
      await this.redis?.set(cacheKey, JSON.stringify(data), RBAC_CACHE_TTL_S);
    } catch {
      // Redis unavailable — not critical
    }

    if (!data.allowed) throw new ForbiddenException('Permission denied');
    return true;
  }
}
