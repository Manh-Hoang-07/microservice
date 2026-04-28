import {
  ExecutionContext,
  Injectable,
  HttpException,
  Logger,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import {
  PERMS_REQUIRED_KEY,
  PUBLIC_PERMISSION,
} from '@/common/auth/decorators';
import { ResponseUtil, RequestContext } from '@/common/shared/utils';
import { CheckpointTracker } from '@/core/logger/checkpoint-tracker';
import { extractBearerToken } from './jwt-token.helper';
import { RbacPermission } from '@/modules/system/rbac/rbac.constants';
import { Auth } from '@/common/auth/utils';
import {
  AUTHORIZATION_SERVICE,
  IAuthorizationService,
} from '../interfaces/authorization.interface';

@Injectable()
export class SecurityGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(SecurityGuard.name);

  constructor(
    private readonly reflector: Reflector,
    @Inject(AUTHORIZATION_SERVICE)
    private readonly authz: IAuthorizationService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const tracker = RequestContext.get<CheckpointTracker>('tracker');
    tracker?.addCheckpoint('security_guard_enter');

    const request = context.switchToHttp().getRequest();
    const token = extractBearerToken(request.headers.authorization);

    // 1. Get permission metadata
    const permissions =
      this.reflector.getAllAndOverride<string[]>(PERMS_REQUIRED_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) || [];

    // 2. Default deny: no @Permission() decorator → 403
    if (!permissions.length) {
      throw new HttpException(ResponseUtil.forbidden('Access denied.'), 403);
    }

    // 3. Handle Public Routes
    if (permissions.includes(PUBLIC_PERMISSION)) {
      if (token) {
        await this.handlePassportAuth(context).catch(() => null);
        if (request.user) {
          RequestContext.set('user', request.user);
          RequestContext.set('userId', request.user.id ?? null);
        }
      }
      tracker?.addCheckpoint('security_guard_end');
      return true;
    }

    // 4. Handle Protected Routes
    const isUserOnly = permissions.some((p) =>
      [RbacPermission.USER, 'user'].includes(p as any),
    );

    const needsRbac = !isUserOnly;

    // Parallelize: JWT auth + blacklist check + group scope
    const authPromise = this.handlePassportAuth(context);
    const blacklistPromise = token
      ? this.authz.isTokenBlacklisted(token)
      : Promise.resolve(false);
    const groupPromise = needsRbac
      ? this.authz.resolveGroupScope(context)
      : Promise.resolve(null);

    const [isAuthOk, isBlocked, groupId] = await Promise.all([
      authPromise,
      blacklistPromise,
      groupPromise,
    ]);

    // Re-sync RequestContext after passport callback
    if (request.user) {
      RequestContext.set('user', request.user);
      RequestContext.set('userId', request.user.id ?? null);
    }
    tracker?.addCheckpoint('security_auth_parallel_end');

    // 5. Validate Results
    if (!isAuthOk) {
      throw new HttpException(ResponseUtil.unauthorized('Auth required'), 401);
    }

    if (isBlocked) {
      this.clearAuth(request);
      throw new HttpException(
        ResponseUtil.unauthorized('Token is blacklisted'),
        401,
      );
    }

    // 6. Final RBAC Check
    if (needsRbac) {
      const userId: bigint | null = Auth.id(context) ?? request.user?.id ?? null;
      if (!userId) {
        throw new HttpException(
          ResponseUtil.unauthorized('User identity lost'),
          401,
        );
      }

      const hasPerms = await this.authz.hasPermissions(
        userId,
        groupId,
        permissions,
      );
      if (!hasPerms) {
        const res = ResponseUtil.forbidden(
          `Access denied. Need: ${permissions.join(',')}`,
        );
        throw new HttpException(res, res.httpStatus || 403);
      }
      tracker?.addCheckpoint('security_rbac_check_end');
    }

    tracker?.addCheckpoint('security_guard_end');
    return true;
  }

  handleRequest(
    err: any,
    user: any,
    _info: any,
    context: ExecutionContext,
  ): any {
    const request = context.switchToHttp().getRequest();
    if (err || !user) {
      this.clearAuth(request);
      return null;
    }
    this.setAuthContext(request, user);
    return user;
  }

  private async handlePassportAuth(
    context: ExecutionContext,
  ): Promise<boolean> {
    try {
      const result = super.canActivate(context);
      if (result instanceof Promise) return await result;
      if (typeof (result as any)?.toPromise === 'function')
        return await (result as any).toPromise();
      return result as boolean;
    } catch (err) {
      if (
        !(err instanceof HttpException) &&
        !(err as any)?.status &&
        !(err as any)?.statusCode
      ) {
        this.logger.warn(
          `Passport auth unexpected error: ${(err as Error)?.message}`,
        );
      }
      return false;
    }
  }

  private clearAuth(request: any): void {
    request.user = null;
    request.userId = null;
    RequestContext.set('user', null);
    RequestContext.set('userId', null);
  }

  private setAuthContext(request: any, user: any): void {
    request.user = user;
    request.userId = user?.id ?? null;
    RequestContext.set('user', user);
    RequestContext.set('userId', user?.id ?? null);
  }
}
