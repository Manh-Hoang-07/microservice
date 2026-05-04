import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InternalGuard implements CanActivate {
  private readonly logger = new Logger(InternalGuard.name);

  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const secret = request.headers['x-internal-secret'];
    const expected =
      this.config.get<string>('INTERNAL_API_SECRET') ||
      this.config.get<string>('app.internalApiSecret');

    // Fail-closed: if no secret is configured, reject all internal requests.
    // This prevents accidentally exposing internal endpoints when the env var
    // is missing.
    if (!expected) {
      this.logger.error('INTERNAL_API_SECRET not configured — rejecting internal request');
      throw new UnauthorizedException('Internal API secret not configured');
    }

    if (secret !== expected) {
      throw new UnauthorizedException('Invalid or missing internal API secret');
    }
    return true;
  }
}
