import { Injectable } from '@nestjs/common';
import { RbacCacheService } from './rbac-cache.service';
import { RbacPermissionIndexService } from './rbac-permission-index.service';
import { RbacRoleAssignmentService } from './rbac-role-assignment.service';
import { RbacId, NullableRbacId } from '../rbac.constants';

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
  ) {}

  async hasPermissions(
    userId: RbacId,
    groupId: NullableRbacId,
    required: string[],
  ): Promise<boolean> {
    const assigned = await this.getPermissions(userId, groupId);
    return this.permissionIndexService.hasAnyRequiredFromAssigned(assigned, required);
  }

  async getPermissions(userId: RbacId, groupId: NullableRbacId): Promise<Set<string>> {
    const read = await this.rbacCache.getPermissions(userId, groupId);
    if (read.cached) {
      return toAssignedSet(read.codes);
    }
    return this.refreshPermissions(userId, groupId);
  }

  async refreshPermissions(userId: RbacId, groupId: NullableRbacId): Promise<Set<string>> {
    const key = this.scopeKey(userId, groupId);
    const pending = this.refreshInFlight.get(key);
    if (pending) {
      await pending;
      const fromCache = await this.rbacCache.getPermissions(userId, groupId);
      return toAssignedSet(fromCache.codes);
    }

    const refreshPromise = (async () => {
      await this.permissionIndexService.prepare();
      const codes = await this.roleAssignmentService.getActivePermissionCodes(userId, groupId);
      const set = toAssignedSet(codes);
      await this.rbacCache.setPermissions(userId, groupId, Array.from(set));
      return set;
    })();

    this.refreshInFlight.set(key, refreshPromise);
    try {
      const result = await refreshPromise;
      return result;
    } finally {
      this.refreshInFlight.delete(key);
    }
  }

  async assignRoleToUser(userId: RbacId, roleId: RbacId, groupId: RbacId): Promise<void> {
    await this.roleAssignmentService.assignRoleToUser(userId, roleId, groupId);
    await this.refreshPermissions(userId, groupId);
  }

  async syncRolesInGroup(
    userId: RbacId,
    groupId: RbacId,
    roleIds: RbacId[],
    skipValidation = false,
  ): Promise<void> {
    await this.roleAssignmentService.syncRolesInGroup(userId, groupId, roleIds, skipValidation);
    await this.refreshPermissions(userId, groupId);
  }

  hasCode(assigned: Set<string>, need: string): boolean {
    return this.permissionIndexService.matchesAssigned(assigned, need);
  }

  private scopeKey(userId: RbacId, groupId: NullableRbacId): string {
    return `${userId}:${groupId === null ? 'system' : groupId}`;
  }
}
