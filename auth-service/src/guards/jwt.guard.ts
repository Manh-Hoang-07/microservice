import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jose from 'jose';
import { JwksService } from '../jwks/services/jwks.service';

export const PERMS_KEY = 'perms_required';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwksService: JwksService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.getAllAndOverride<string[]>(PERMS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? [];

    // No decorator → deny
    if (!permissions.length) return false;

    // Public route → allow always
    if (permissions.includes('public')) {
      await this.trySetUser(context);
      return true;
    }

    // User/protected route → verify JWT
    const token = this.extractToken(context);
    if (!token) throw new UnauthorizedException('Token required');

    // Dev mode bypass
    if (!this.jwksService.hasKeys()) {
      context.switchToHttp().getRequest().user = { id: 0, sub: 'dev' };
      return true;
    }

    try {
      const publicKey = await this.jwksService.getPublicKey();
      const { payload } = await jose.jwtVerify(token, publicKey);
      context.switchToHttp().getRequest().user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private async trySetUser(context: ExecutionContext): Promise<void> {
    const token = this.extractToken(context);
    if (!token || !this.jwksService.hasKeys()) return;
    try {
      const publicKey = await this.jwksService.getPublicKey();
      const { payload } = await jose.jwtVerify(token, publicKey);
      context.switchToHttp().getRequest().user = payload;
    } catch {
      // optional auth on public route — ignore errors
    }
  }

  private extractToken(context: ExecutionContext): string | null {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers?.authorization as string | undefined;
    if (!auth?.startsWith('Bearer ')) return null;
    return auth.slice(7);
  }
}
