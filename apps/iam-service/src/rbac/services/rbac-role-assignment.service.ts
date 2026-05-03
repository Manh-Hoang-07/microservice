import { Injectable } from '@nestjs/common';
import { RbacRepository } from '../repositories/rbac.repository';
import { RbacId } from '../types';

@Injectable()
export class RbacRoleAssignmentService {
  constructor(private readonly rbacRepo: RbacRepository) {}

  async assignRoleToUser(userId: RbacId, roleId: RbacId, groupId: RbacId): Promise<void> {
    await this.rbacRepo.assignRoleToUser(userId, roleId, groupId);
  }

  async syncRolesInGroup(
    userId: RbacId,
    groupId: RbacId,
    roleIds: RbacId[],
    skipValidation = false,
  ): Promise<{ before: bigint[]; after: bigint[] }> {
    return this.rbacRepo.syncRolesInGroup(userId, groupId, roleIds, skipValidation);
  }

  async getActivePermissionCodes(userId: RbacId, groupId: RbacId | null): Promise<string[]> {
    return this.rbacRepo.getActivePermissionCodes(userId, groupId);
  }
}
