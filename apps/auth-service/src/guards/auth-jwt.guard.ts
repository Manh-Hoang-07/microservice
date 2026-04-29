import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { JwksService } from '../jwks/services/jwks.service';

const PERMS_KEY = 'perms_required';

@Injectable()
export class AuthJwtGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly config: ConfigService,
    private readonly jwksService: JwksService,
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
    if (!token) throw new UnauthorizedException('Token required');

    try {
      const payload = await this.jwksService.verifyToken(token);
      context.switchToHttp().getRequest().user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private async trySetUser(context: ExecutionContext): Promise<void> {
    const token = this.extractToken(context);
    if (!token) return;
    try {
      const payload = await this.jwksService.verifyToken(token);
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

  private extractToken(context: ExecutionContext): string | null {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers?.authorization as string | undefined;
    if (!auth?.startsWith('Bearer ')) return null;
    return auth.slice(7);
  }
}
