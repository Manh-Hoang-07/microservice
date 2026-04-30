import { Injectable } from '@nestjs/common';
import { UserRoleRepository } from '../../repositories/user-role.repository';
import { RbacService } from '../../../../rbac/services/rbac.service';
import { RbacCacheService } from '../../../../rbac/services/rbac-cache.service';
import { AssignRoleDto } from '../dtos/assign-role.dto';
import { SyncUserRolesDto } from '../dtos/sync-user-roles.dto';

@Injectable()
export class UserRoleService {
  constructor(
    private readonly repo: UserRoleRepository,
    private readonly rbacService: RbacService,
    private readonly rbacCache: RbacCacheService,
  ) {}

  getUserRoles(userId: string, groupId?: string) {
    return this.repo.getUserRoles(
      BigInt(userId),
      groupId ? BigInt(groupId) : undefined,
    );
  }

  async assignRole(userId: string, dto: AssignRoleDto) {
    await this.rbacService.assignRoleToUser(userId, dto.roleId, dto.groupId);
    return { assigned: true };
  }

  async removeRole(userId: string, roleId: string, groupId: string) {
    await this.repo.removeRole(BigInt(userId), BigInt(roleId), BigInt(groupId));
    await this.rbacCache.clearAllUserCaches(userId);
    return { removed: true };
  }

  async syncRoles(userId: string, dto: SyncUserRolesDto) {
    await this.rbacService.syncRolesInGroup(userId, dto.groupId, dto.roleIds);
    return { synced: true };
  }
}
