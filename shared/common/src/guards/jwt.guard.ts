import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as jose from 'jose';

const PERMS_KEY = 'perms_required';

@Injectable()
export class JwtGuard implements CanActivate {
  private jwks: jose.JWTVerifyGetKey | null = null;
  private lastFetch = 0;
  private readonly TTL_MS = 24 * 60 * 60 * 1000;

  constructor(
    private readonly reflector: Reflector,
    private readonly config: ConfigService,
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

    // Internal routes bypass JWT
    if (permissions.includes('internal')) {
      return this.checkInternal(context);
    }

    const token = this.extractToken(context);
    if (!token) throw new UnauthorizedException('Token required');

    const jwksUrl = this.config.get<string>('AUTH_JWKS_URL');

    if (!jwksUrl) {
      const request = context.switchToHttp().getRequest();
      request.user = { id: 0, sub: 'dev' };
      return true;
    }

    const payload = await this.verifyToken(token, jwksUrl);
    const request = context.switchToHttp().getRequest();
    request.user = payload;
    return true;
  }

  private async trySetUser(context: ExecutionContext): Promise<void> {
    const token = this.extractToken(context);
    if (!token) return;
    const jwksUrl = this.config.get<string>('AUTH_JWKS_URL');
    if (!jwksUrl) return;
    try {
      const payload = await this.verifyToken(token, jwksUrl);
      context.switchToHttp().getRequest().user = payload;
    } catch {
      // optional auth on public route — ignore errors
    }
  }

  private checkInternal(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const secret = request.headers['x-internal-secret'];
    const expected = this.config.get<string>('INTERNAL_API_SECRET') || this.config.get<string>('app.internalApiSecret');
    if (!expected || secret !== expected) {
      throw new UnauthorizedException('Invalid internal secret');
    }
    return true;
  }

  private async verifyToken(token: string, jwksUrl: string): Promise<jose.JWTPayload> {
    if (!this.jwks || Date.now() - this.lastFetch > this.TTL_MS) {
      this.jwks = jose.createRemoteJWKSet(new URL(jwksUrl));
      this.lastFetch = Date.now();
    }
    const { payload } = await jose.jwtVerify(token, this.jwks);
    return payload;
  }

  private extractToken(context: ExecutionContext): string | null {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers?.authorization as string | undefined;
    if (!auth?.startsWith('Bearer ')) return null;
    return auth.slice(7);
  }
}
