import { ExecutionContext } from '@nestjs/common';
import { NullableRbacId, RbacId } from '@/modules/system/rbac/rbac.types';

export const AUTHORIZATION_SERVICE = 'AUTHORIZATION_SERVICE';

export interface IAuthorizationService {
  /**
   * Check token blacklist status.
   */
  isTokenBlacklisted(token: string): Promise<boolean>;

  /**
   * Resolve active group scope for RBAC from current request context.
   */
  resolveGroupScope(context: ExecutionContext): Promise<NullableRbacId>;

  /**
   * Check RBAC permissions for given user.
   */
  hasPermissions(
    userId: RbacId,
    groupId: NullableRbacId,
    permissions: string[],
  ): Promise<boolean>;
}
