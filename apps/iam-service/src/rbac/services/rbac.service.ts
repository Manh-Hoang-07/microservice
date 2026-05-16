import { ForbiddenException, Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { t } from '@package/common';
import { RbacCacheService } from './rbac-cache.service';
import { RbacPermissionIndexService } from './rbac-permission-index.service';
import { RbacRoleAssignmentService } from './rbac-role-assignment.service';
import { RbacRepository } from '../repositories/rbac.repository';
import { PERM } from '../constants/rbac.constants';
import { RbacId } from '../types';
import { toPrimaryKey } from 'src/types';

function toAssignedSet(codes: Iterable<string>): Set<string> {
  return new Set(
    Array.from(codes).filter((c) => typeof c === 'string' && c.length > 0),
  );
}

@Injectable()
export class RbacService {
  private readonly refreshInFlight = new Map<string, Promise<Set<string>>>();

  constructor(
    private readonly rbacCache: RbacCacheService,
    private readonly permissionIndexService: RbacPermissionIndexService,
    private readonly roleAssignmentService: RbacRoleAssignmentService,
    private readonly rbacRepo: RbacRepository,
    private readonly i18n: I18nService,
  ) {}

  async hasPermissions(userId: RbacId, required: string[]): Promise<boolean> {
    const assigned = await this.getPermissions(userId);
    return this.permissionIndexService.hasAnyRequiredFromAssigned(assigned, required);
  }

  async getPermissions(userId: RbacId): Promise<Set<string>> {
    const read = await this.rbacCache.getPermissions(userId);
    if (read.cached) return toAssignedSet(read.codes);
    return this.refreshPermissions(userId);
  }

  async refreshPermissions(userId: RbacId): Promise<Set<string>> {
    const key = String(userId);
    const pending = this.refreshInFlight.get(key);
    if (pending) {
      await pending;
      const fromCache = await this.rbacCache.getPermissions(userId);
      return toAssignedSet(fromCache.codes);
    }

    const refreshPromise = (async () => {
      await this.permissionIndexService.prepare();
      const codes = await this.roleAssignmentService.getActivePermissionCodes(userId);
      const set = toAssignedSet(codes);
      await this.rbacCache.setPermissions(userId, Array.from(set));
      return set;
    })();

    this.refreshInFlight.set(key, refreshPromise);
    try {
      return await refreshPromise;
    } finally {
      this.refreshInFlight.delete(key);
    }
  }

  /**
   * Guard against privilege escalation: caller must already hold every
   * permission contained in the role they want to grant.
   */
  async assertCallerCanGrantRole(
    actorId: RbacId,
    roleIds: (string | bigint)[],
  ): Promise<void> {
    if (!roleIds.length) return;
    const targetCodes = await this.rbacRepo.getPermissionCodesForRoles(roleIds.map(toPrimaryKey));
    if (!targetCodes.size) return;

    const callerEffective = await this.getPermissions(actorId);
    if (this.permissionIndexService.matchesAssigned(callerEffective, PERM.SYSTEM.MANAGE)) {
      return;
    }

    for (const code of targetCodes) {
      if (!this.permissionIndexService.matchesAssigned(callerEffective, code)) {
        throw new ForbiddenException(
          t(this.i18n, 'rbac.PRIVILEGE_ESCALATION_BLOCKED', { code }),
        );
      }
    }
  }

  /** Variant of assertCallerCanGrantRole that takes raw permission codes. */
  async assertCallerCanGrantPermissionCodes(
    actorId: RbacId,
    targetCodes: string[],
  ): Promise<void> {
    if (!targetCodes.length) return;

    const callerEffective = await this.getPermissions(actorId);
    if (this.permissionIndexService.matchesAssigned(callerEffective, PERM.SYSTEM.MANAGE)) return;

    for (const code of targetCodes) {
      if (!this.permissionIndexService.matchesAssigned(callerEffective, code)) {
        throw new ForbiddenException(
          t(this.i18n, 'rbac.PRIVILEGE_ESCALATION_BLOCKED', { code }),
        );
      }
    }
  }

  async assignRoleToUser(
    userId: RbacId,
    roleId: RbacId,
    actor: { id: RbacId },
  ): Promise<void> {
    await this.assertCallerCanGrantRole(actor.id, [toPrimaryKey(roleId)]);
    await this.roleAssignmentService.assignRoleToUser(userId, roleId);
    await this.rbacCache.bumpVersion();
    await this.rbacCache.clearAllUserCaches(userId);
    await this.refreshPermissions(userId);
  }

  async syncUserRoles(
    userId: RbacId,
    roleIds: RbacId[],
    actor: { id: RbacId },
  ): Promise<void> {
    const targetIds = roleIds.map((r) => toPrimaryKey(r));

    await this.assertCallerCanGrantRole(actor.id, targetIds);

    const existing = await this.rbacRepo.getExistingRoleIds(userId);
    if (existing.length) {
      await this.assertCallerCanGrantRole(actor.id, existing);
    }

    await this.roleAssignmentService.syncUserRoles(userId, roleIds);
    await this.rbacCache.bumpVersion();
    await this.rbacCache.clearAllUserCaches(userId);
    await this.refreshPermissions(userId);
  }

  hasCode(assigned: Set<string>, need: string): boolean {
    return this.permissionIndexService.matchesAssigned(assigned, need);
  }
}
