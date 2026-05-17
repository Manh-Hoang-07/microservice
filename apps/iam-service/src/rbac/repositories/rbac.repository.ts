import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { toPrimaryKey } from 'src/types';
import { RbacId } from '../types';

function toPk(id: RbacId): bigint {
  return toPrimaryKey(id);
}

@Injectable()
export class RbacRepository {
  constructor(private readonly prisma: PrismaService) {}

  findPermissions() {
    return this.prisma.permission.findMany({
      where: { status: 'active' },
      select: { id: true, code: true, parentId: true },
    });
  }

  assignRoleToUser(userId: RbacId, roleId: RbacId) {
    return this.prisma.userRoleAssignment.createMany({
      data: [{ userId: toPk(userId), roleId: toPk(roleId) }],
      skipDuplicates: true,
    });
  }

  findRoleByCode(code: string) {
    return this.prisma.role.findFirst({ where: { code, status: 'active' } });
  }

  revokeRoleFromUser(userId: RbacId, roleId: RbacId) {
    return this.prisma.userRoleAssignment.deleteMany({
      where: { userId: toPk(userId), roleId: toPk(roleId) },
    });
  }

  async syncUserRoles(
    userId: RbacId,
    roleIds: RbacId[],
  ): Promise<{ before: bigint[]; after: bigint[] }> {
    const normalizedRoleIds = this.normalizeRoleIds(roleIds);

    return this.prisma.$transaction(
      async (tx) => {
        const existing = await tx.userRoleAssignment.findMany({
          where: { userId: toPk(userId) },
          select: { roleId: true },
        });
        const before = existing.map((e) => e.roleId);

        await tx.userRoleAssignment.deleteMany({
          where: { userId: toPk(userId) },
        });

        if (normalizedRoleIds.length > 0) {
          await tx.userRoleAssignment.createMany({
            data: normalizedRoleIds.map((rid) => ({
              userId: toPk(userId),
              roleId: toPk(rid),
            })),
            skipDuplicates: true,
          });
        }
        return { before, after: normalizedRoleIds.map((id) => toPk(id)) };
      },
      { isolationLevel: 'Serializable' },
    );
  }

  /**
   * Resolve the user's effective permission codes, expanding the role
   * hierarchy: a user who holds role X also inherits every permission
   * attached to X's ancestor roles (parent → parent's parent → ...).
   *
   * Implemented as a Postgres recursive CTE so the entire walk happens
   * in one round-trip and `UNION` naturally dedupes even if legacy data
   * contains a cycle.
   *
   * Permissions are global (no group/context scope).
   */
  async getActivePermissionCodes(userId: RbacId): Promise<string[]> {
    const uid = toPk(userId);
    const rows = await this.prisma.$queryRaw<Array<{ code: string }>>`
      WITH RECURSIVE role_tree AS (
        SELECT r.id, r.parent_id
        FROM roles r
        INNER JOIN user_role_assignments ura ON ura.role_id = r.id
        WHERE ura.user_id = ${uid} AND r.status = 'active'
        UNION
        SELECT p.id, p.parent_id
        FROM roles p
        INNER JOIN role_tree rt ON p.id = rt.parent_id
        WHERE p.status = 'active'
      )
      SELECT DISTINCT perm.code
      FROM role_tree rt
      INNER JOIN role_has_permissions rhp ON rhp.role_id = rt.id
      INNER JOIN permissions perm ON perm.id = rhp.permission_id
      WHERE perm.status = 'active'
    `;
    const out = new Set<string>();
    for (const r of rows) {
      if (typeof r.code === 'string' && r.code.length) out.add(r.code);
    }
    return Array.from(out);
  }

  /** Get existing role IDs for a user (for pre-sync validation). */
  async getExistingRoleIds(userId: RbacId): Promise<bigint[]> {
    const rows = await this.prisma.userRoleAssignment.findMany({
      where: { userId: toPk(userId) },
      select: { roleId: true },
    });
    return rows.map((r) => r.roleId);
  }

  /** Number of users currently holding a given permission via any role. */
  async countUsersWithPermission(permissionCode: string): Promise<number> {
    const rows = await this.prisma.userRoleAssignment.findMany({
      where: {
        role: {
          status: 'active',
          permissions: { some: { permission: { code: permissionCode, status: 'active' } } },
        },
      },
      select: { userId: true },
      distinct: ['userId'],
    });
    return rows.length;
  }

  /**
   * Number of users holding `permissionCode` via active roles OTHER than the
   * given role. Used to verify it is safe to delete a role without leaving
   * the system with zero admins.
   */
  async countUsersWithPermissionExcludingRole(
    permissionCode: string,
    excludedRoleId: string | bigint,
  ): Promise<number> {
    const excluded = typeof excludedRoleId === 'bigint' ? excludedRoleId : BigInt(excludedRoleId);
    const rows = await this.prisma.userRoleAssignment.findMany({
      where: {
        roleId: { not: excluded },
        role: {
          status: 'active',
          permissions: { some: { permission: { code: permissionCode, status: 'active' } } },
        },
      },
      select: { userId: true },
      distinct: ['userId'],
    });
    return rows.length;
  }

  /** Permission codes contained in a given role (active permissions only). */
  async getPermissionCodesForRoles(roleIds: (string | bigint)[]): Promise<Set<string>> {
    if (!roleIds.length) return new Set();
    const rows = await this.prisma.roleHasPermission.findMany({
      where: { roleId: { in: roleIds.map((id) => typeof id === 'bigint' ? id : BigInt(id)) }, permission: { status: 'active' } },
      select: { permission: { select: { code: true } } },
    });
    const out = new Set<string>();
    for (const r of rows as any[]) {
      const code = r?.permission?.code;
      if (typeof code === 'string' && code.length) out.add(code);
    }
    return out;
  }

  private normalizeRoleIds(roleIds: RbacId[] | null | undefined): RbacId[] {
    if (!Array.isArray(roleIds)) return [];
    return roleIds.filter(
      (id) => id !== null && id !== undefined && `${id}`.trim().length > 0,
    );
  }
}
