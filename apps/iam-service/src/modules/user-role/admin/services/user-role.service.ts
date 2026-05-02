import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { UserRoleRepository } from '../../repositories/user-role.repository';
import { RbacService } from '../../../../rbac/services/rbac.service';
import { RbacCacheService } from '../../../../rbac/services/rbac-cache.service';
import { RbacRepository } from '../../../../rbac/repositories/rbac.repository';
import { PERM } from '../../../../rbac/constants/rbac.constants';
import { AssignRoleDto } from '../dtos/assign-role.dto';
import { SyncUserRolesDto } from '../dtos/sync-user-roles.dto';

@Injectable()
export class UserRoleService {
  constructor(
    private readonly repo: UserRoleRepository,
    private readonly rbacService: RbacService,
    private readonly rbacCache: RbacCacheService,
    private readonly rbacRepo: RbacRepository,
    private readonly i18n: I18nService,
  ) {}

  private t(key: string, args?: Record<string, unknown>): string {
    const lang = I18nContext.current()?.lang ?? 'en';
    return this.i18n.t(key, { lang, args }) as string;
  }

  getUserRoles(userId: string, groupId?: string) {
    return this.repo.getUserRoles(
      BigInt(userId),
      groupId ? BigInt(groupId) : undefined,
    );
  }

  async assignRole(
    userId: string,
    dto: AssignRoleDto,
    actor: { id: string; groupId?: string | null },
  ) {
    await this.rbacService.assignRoleToUser(userId, dto.roleId, dto.groupId, {
      id: actor.id,
      groupId: actor.groupId ?? null,
    });
    return { assigned: true };
  }

  async removeRole(
    userId: string,
    roleId: string,
    groupId: string,
    actor: { id: string; groupId?: string | null },
  ) {
    // Caller priv check — must already hold what's being revoked.
    await this.rbacService.assertCallerCanGrantRole(actor.id, actor.groupId ?? null, [
      BigInt(roleId),
    ]);

    // Last-admin protection: if removing this role would drop the last
    // user with `system.manage`, refuse.
    const targetCodes = await this.rbacRepo.getPermissionCodesForRoles([BigInt(roleId)]);
    if (targetCodes.has(PERM.SYSTEM.MANAGE)) {
      const remaining = await this.rbacRepo.countUsersWithPermission(PERM.SYSTEM.MANAGE);
      if (remaining <= 1) {
        throw new ForbiddenException(this.t('rbac.LAST_SYSTEM_ADMIN_PROTECTED'));
      }
    }

    const count = await this.repo.removeRole(
      BigInt(userId),
      BigInt(roleId),
      BigInt(groupId),
    );
    if (count === 0) {
      throw new NotFoundException(this.t('rbac.USER_ROLE_ASSIGNMENT_NOT_FOUND'));
    }

    await this.rbacCache.bumpVersion();
    await this.rbacCache.clearAllUserCaches(userId);
    return { removed: true };
  }

  async syncRoles(
    userId: string,
    dto: SyncUserRolesDto,
    actor: { id: string; groupId?: string | null },
  ) {
    await this.rbacService.syncRolesInGroup(
      userId,
      dto.groupId,
      dto.roleIds,
      { id: actor.id, groupId: actor.groupId ?? null },
    );
    return { synced: true };
  }
}
