import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InternalGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const secret = request.headers['x-internal-secret'];
    const expected = this.config.get<string>('INTERNAL_API_SECRET') || this.config.get<string>('app.internalApiSecret');
    if (!expected || secret !== expected) {
      throw new UnauthorizedException('Invalid or missing internal API secret');
    }
    return true;
  }
}
