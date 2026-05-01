import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as jose from 'jose';

export const PERMS_KEY = 'perms_required';
export const PUBLIC = 'public';
export const USER = 'user';

/**
 * JwtLocalGuard — dùng cho microservices (Storage, Gateway, v.v.)
 * Verify JWT bằng JWKS public key từ Auth Service.
 * Khi AUTH_JWKS_URL không được set (local dev), guard bypass authentication.
 */
@Injectable()
export class JwtLocalGuard implements CanActivate {
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

    // No decorator → deny
    if (!permissions.length) return false;

    // Public route → allow always
    if (permissions.includes(PUBLIC)) {
      await this.trySetUser(context);
      return true;
    }

    // User/protected route → verify JWT
    const token = this.extractToken(context);
    if (!token) throw new UnauthorizedException('Token required');

    const jwksUrl = this.config.get<string>('AUTH_JWKS_URL');

    // Dev mode: no JWKS URL → bypass auth (trust request)
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
      const request = context.switchToHttp().getRequest();
      request.user = payload;
    } catch {
      // optional auth on public route — ignore errors
    }
  }

  private async verifyToken(
    token: string,
    jwksUrl: string,
  ): Promise<jose.JWTPayload> {
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
