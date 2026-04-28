import { Injectable, ExecutionContext } from '@nestjs/common';
import { IAuthorizationService } from '../interfaces/authorization.interface';
import { NullableRbacId, RbacId } from '@/modules/system/rbac/rbac.types';
import { TokenBlacklistService } from '@/core/security/token-blacklist.service';
import { RbacService } from '@/modules/system/rbac/services/rbac.service';
import { RbacAuthorizationOrchestrator } from '@/modules/system/rbac/services/rbac-authorization.orchestrator';

@Injectable()
export class LocalAuthorizationService implements IAuthorizationService {
  constructor(
    private readonly tokenBlacklist: TokenBlacklistService,
    private readonly rbac: RbacService,
    private readonly rbacAuthz: RbacAuthorizationOrchestrator,
  ) {}

  async isTokenBlacklisted(token: string): Promise<boolean> {
    if (!this.tokenBlacklist) return false;
    return this.tokenBlacklist.has(token);
  }

  async resolveGroupScope(_context: ExecutionContext): Promise<NullableRbacId> {
    return this.rbacAuthz.resolveActiveGroupScopeForRbac();
  }

  async hasPermissions(
    userId: RbacId,
    groupId: NullableRbacId,
    permissions: string[],
  ): Promise<boolean> {
    await this.rbac.prepare();
    return this.rbac.hasPermissions(userId, groupId, permissions);
  }
}
