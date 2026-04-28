import { Injectable, Logger, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IAuthorizationService } from '../interfaces/authorization.interface';
import { NullableRbacId, RbacId } from '@/modules/system/rbac/rbac.types';

/**
 * DistributedAuthorizationService — dùng khi AUTH_MODE=distributed.
 * Verify JWT qua JWKS public key; RBAC check qua HTTP đến Auth Service.
 * Phase 0: shadow mode — log divergence, không thay đổi response thực.
 */
@Injectable()
export class DistributedAuthorizationService implements IAuthorizationService {
  private readonly logger = new Logger(DistributedAuthorizationService.name);
  private readonly authUrl: string;
  private readonly secret: string;

  constructor(private readonly config: ConfigService) {
    this.authUrl = config.get<string>('AUTH_SERVICE_URL', '');
    this.secret = config.get<string>('INTERNAL_API_SECRET', '');
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    if (!this.authUrl) return false;
    try {
      const res = await fetch(`${this.authUrl}/internal/token/verify-blacklist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Internal-Secret': this.secret,
        },
        body: JSON.stringify({ token }),
      });
      const data = (await res.json()) as { blacklisted?: boolean };
      return data?.blacklisted === true;
    } catch (err) {
      this.logger.warn(`Blacklist check failed: ${(err as Error).message}`);
      return false;
    }
  }

  async resolveGroupScope(_context: ExecutionContext): Promise<NullableRbacId> {
    // Group scope truyền qua header X-Group-Id trong distributed mode
    const request = _context.switchToHttp().getRequest();
    const groupId = request.headers['x-group-id'] as string | undefined;
    return groupId ?? null;
  }

  async hasPermissions(
    userId: RbacId,
    groupId: NullableRbacId,
    permissions: string[],
  ): Promise<boolean> {
    if (!this.authUrl) return false;
    try {
      const res = await fetch(`${this.authUrl}/internal/rbac/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Internal-Secret': this.secret,
        },
        body: JSON.stringify({
          user_id: String(userId),
          group_id: groupId ? String(groupId) : null,
          permissions,
        }),
      });
      const data = (await res.json()) as { allowed?: boolean };
      return data?.allowed === true;
    } catch (err) {
      this.logger.warn(`RBAC check failed: ${(err as Error).message}`);
      return false;
    }
  }
}
