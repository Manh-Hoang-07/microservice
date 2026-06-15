import {
  BadRequestException,
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
import { I18nContext } from 'nestjs-i18n';
import { createCircuitBreaker } from '@package/circuit-breaker';
import { RedisService } from '@package/redis';
import { PERM_GROUP_KEY, PermissionGroupMeta } from '../decorators/permission-group.decorator';
import { RbacVersionTracker } from '../rbac/rbac-version-tracker';
import { jitterTtl } from '../helpers/jitter.helper';
import { commonMsg } from '../i18n/common-messages';

const TIMEOUT_MS = 5_000;
const CACHE_TTL_S = 60;

/**
 * Guard cho `@PermissionGroup(...)`. Chay sau JwtGuard/RbacGuard (đăng ký global).
 *
 * Lay groupId tu route param, hoi IAM tap quyen cua user trong nhom (owner-aware
 * o phia IAM: owner co role manager nen co full quyen loai nhom), roi kiem tra
 * permission yeu cau. Cache tap quyen per user+group, version-hoa giong RbacGuard.
 */
@Injectable()
export class GroupPermissionGuard implements CanActivate {
  private readonly logger = new Logger(GroupPermissionGuard.name);
  private readonly breaker: CircuitBreakerPolicy;
  private readonly versionTracker: RbacVersionTracker;

  constructor(
    private readonly reflector: Reflector,
    private readonly config: ConfigService,
    @Optional() @Inject(RedisService) private readonly redis?: RedisService,
  ) {
    this.versionTracker = new RbacVersionTracker(this.redis);
    this.breaker = createCircuitBreaker({
      halfOpenAfterMs: 10_000,
      maxConsecutiveFailures: 5,
    });
    this.breaker.onBreak(() => {
      this.logger.warn('Group RBAC circuit opened — IAM service unavailable');
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const meta = this.reflector.getAllAndOverride<PermissionGroupMeta>(PERM_GROUP_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!meta) return true; // route khong dung @PermissionGroup

    const lang = I18nContext.current()?.lang ?? 'vi';
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user?.sub) throw new UnauthorizedException(commonMsg(lang, 'AUTHENTICATION_REQUIRED'));

    const groupId = String(request.params?.[meta.param] ?? '').trim();
    if (!groupId) throw new BadRequestException(commonMsg(lang, 'GROUP_ID_REQUIRED'));

    const iamUrl = this.config.get<string>('IAM_INTERNAL_URL');
    if (!iamUrl) {
      const env = this.config.get<string>('NODE_ENV') ?? process.env.NODE_ENV;
      // Bypass only in explicit local development. Staging/prod must fail closed.
      if (env !== 'development') {
        throw new ForbiddenException(commonMsg(lang, 'PERMISSION_SERVICE_NOT_CONFIGURED'));
      }
      return true;
    }

    const userId = String(user.sub);
    const v = await this.versionTracker.get();
    // 1 entry per user+group (tat ca permission tren cung nhom dung chung cache).
    const cacheKey = `rbac:group:v${v}:u:${userId}:g:${groupId}`;
    const secret =
      this.config.get<string>('INTERNAL_API_SECRET') ||
      this.config.get<string>('app.internalApiSecret') ||
      '';

    let codes: string[];
    try {
      const fetchCodes = async () => this.breaker.execute(async () => {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
        let res: Response;
        try {
          res = await fetch(
            `${iamUrl}/internal/groups/member-permissions?userId=${encodeURIComponent(userId)}&groupId=${encodeURIComponent(groupId)}`,
            {
              method: 'GET',
              headers: { 'x-internal-secret': secret },
              signal: controller.signal,
            },
          );
        } finally {
          clearTimeout(timer);
        }

        if (!res.ok) {
          if (res.status >= 500) throw new Error(`IAM returned ${res.status}`);
          return [] as string[]; // 4xx → khong co quyen (deny)
        }
        const body = (await res.json()) as { codes?: string[]; data?: { codes?: string[] } };
        const c = body?.data?.codes ?? body?.codes;
        return Array.isArray(c) ? c : [];
      });

      if (this.redis?.isEnabled()) {
        // Cross-pod single-flight + jittered TTL — see RbacGuard for rationale.
        codes = await this.redis.getOrSetWithLock<string[]>(cacheKey, fetchCodes, jitterTtl(CACHE_TTL_S));
      } else {
        codes = await fetchCodes();
      }
    } catch (err: any) {
      this.logger.error(`Group RBAC check failed: ${(err as Error).message}`);
      throw new ForbiddenException(commonMsg(lang, 'PERMISSION_CHECK_UNAVAILABLE'));
    }

    if (!codes.includes(meta.permission)) {
      throw new ForbiddenException(commonMsg(lang, 'PERMISSION_DENIED'));
    }
    return true;
  }
}
