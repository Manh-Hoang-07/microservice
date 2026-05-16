import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { RbacRepository } from '../repositories/rbac.repository';
import { RbacId } from '../types';

@Injectable()
export class RbacRoleAssignmentService {
  constructor(
    private readonly rbacRepo: RbacRepository,
    private readonly i18n: I18nService,
  ) {}

  async assignRoleToUser(userId: RbacId, roleId: RbacId): Promise<void> {
    await this.rbacRepo.assignRoleToUser(userId, roleId);
  }

  async syncUserRoles(
    userId: RbacId,
    roleIds: RbacId[],
  ): Promise<{ before: bigint[]; after: bigint[] }> {
    return this.rbacRepo.syncUserRoles(userId, roleIds);
  }

  async getActivePermissionCodes(userId: RbacId): Promise<string[]> {
    return this.rbacRepo.getActivePermissionCodes(userId);
  }
}
