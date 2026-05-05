import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { timingSafeEqual } from 'crypto';
import { I18nService } from 'nestjs-i18n';
import { t } from '@package/common';
import { JwksService } from '../../jwks/services/jwks.service';
import { TokenBlacklistService } from '../security/services/token-blacklist.service';

const PERMS_KEY = 'perms_required';

@Injectable()
export class AuthJwtGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly config: ConfigService,
    private readonly jwksService: JwksService,
    private readonly i18n: I18nService,
    private readonly tokenBlacklistService: TokenBlacklistService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.getAllAndOverride<string[]>(PERMS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? [];

    if (!permissions.length) return false;

    if (permissions.includes('public')) {
      await this.trySetUser(context);
      return true;
    }

    if (permissions.includes('internal')) {
      return this.checkInternal(context);
    }

    const token = this.extractToken(context);
    if (!token) throw new UnauthorizedException(t(this.i18n,'auth.TOKEN_REQUIRED'));

    let payload: any;
    try {
      payload = await this.jwksService.verifyToken(token);
    } catch {
      throw new UnauthorizedException(t(this.i18n,'auth.INVALID_TOKEN'));
    }

    // Refresh tokens carry { type: 'refresh' } and must never authorize
    // protected resources, even though they are signed by the same keypair.
    if (payload?.type === 'refresh') {
      throw new UnauthorizedException(t(this.i18n,'auth.INVALID_TOKEN'));
    }

    if (await this.tokenBlacklistService.has(token)) {
      throw new UnauthorizedException(t(this.i18n,'auth.INVALID_TOKEN'));
    }

    context.switchToHttp().getRequest().user = payload;
    return true;
  }

  private async trySetUser(context: ExecutionContext): Promise<void> {
    const token = this.extractToken(context);
    if (!token) return;
    try {
      const payload = await this.jwksService.verifyToken(token);
      if ((payload as any)?.type === 'refresh') return;
      if (await this.tokenBlacklistService.has(token)) return;
      context.switchToHttp().getRequest().user = payload;
    } catch {
      // optional auth on public route — ignore errors
    }
  }

  private checkInternal(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const secret = request.headers['x-internal-secret'] as string | undefined;
    const expected = this.config.get<string>('INTERNAL_API_SECRET') || this.config.get<string>('app.internalApiSecret');
    if (!expected) {
      throw new UnauthorizedException(t(this.i18n,'auth.INVALID_INTERNAL_SECRET'));
    }
    if (!secret || secret.length !== expected.length ||
        !timingSafeEqual(Buffer.from(secret), Buffer.from(expected))) {
      throw new UnauthorizedException(t(this.i18n,'auth.INVALID_INTERNAL_SECRET'));
    }
    return true;
  }

  private extractToken(context: ExecutionContext): string | null {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers?.authorization as string | undefined;
    if (!auth?.startsWith('Bearer ')) return null;
    return auth.slice(7);
  }
}
