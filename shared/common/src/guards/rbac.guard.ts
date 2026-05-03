import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { PERMS_KEY } from '../decorators/permission.decorator';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly config: ConfigService,
  ) {}

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
      // Fail-closed in production: a missing IAM_INTERNAL_URL means RBAC
      // cannot be evaluated, so reject the request rather than silently
      // promoting every authenticated user to admin. Outside production we
      // skip the check so local dev / tests don't need IAM running.
      const env = this.config.get<string>('NODE_ENV') ?? process.env.NODE_ENV;
      if (env === 'production') {
        throw new ForbiddenException('Permission service not configured');
      }
      return true;
    }

    const secret =
      this.config.get<string>('INTERNAL_API_SECRET') ||
      this.config.get<string>('app.internalApiSecret') ||
      '';
    const groupId = (request.headers['x-group-id'] as string) || undefined;

    let res: Response;
    try {
      res = await fetch(`${iamUrl}/internal/rbac/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-internal-secret': secret,
        },
        body: JSON.stringify({
          userId: String(user.sub),
          groupId,
          permissions,
        }),
      });
    } catch {
      throw new ForbiddenException('Permission check unavailable');
    }

    if (!res.ok) throw new ForbiddenException('Permission denied');
    const data = (await res.json()) as { allowed: boolean };
    if (!data.allowed) throw new ForbiddenException('Permission denied');
    return true;
  }
}
