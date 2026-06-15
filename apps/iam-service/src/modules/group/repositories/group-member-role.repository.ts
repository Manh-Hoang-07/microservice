import { Injectable, Optional } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
import { RedisService } from '@package/redis';
import { PrismaService } from '../../../core/database/prisma.service';
import { toPrimaryKey } from 'src/types';

type Tx = Prisma.TransactionClient | PrismaService;

const ROLE_SELECT = {
  id: true,
  code: true,
  name: true,
  roleType: true,
  status: true,
} satisfies Prisma.RoleSelect;

// Danh sach vai tro nhom — tinh, it thay doi (chi khi seed/deploy).
const ALL_GROUP_ROLES_KEY = 'iam:group_roles';
const ALL_GROUP_ROLES_TTL = 3600;
// userIds theo role trong nhom — invalidate khi gan/thu hoi/sync role.
const ROLE_USERS_TTL = 60;
const roleUsersKey = (groupId: string | bigint, roleId: string | bigint) =>
  `iam:group:${groupId}:role:${roleId}:user_ids`;

// ─── Permission codes cache (user-trong-nhom) ────────────────────────────────
// Tap quyen hieu luc cua 1 user TRONG 1 nhom. Co HAI nguon thay doi:
//   (a) User doi role trong nhom (assign/remove/syncRoles) — KHONG bump version
//       toan cuc → phai del thu cong key cua dung (group,user) do.
//   (b) Admin doi permission cua 1 role toan cuc → bump `rbac:meta.version`
//       (RbacCacheService.bumpVersion) → version trong key thay doi → cache cu
//       tu het hieu luc, khong can del.
// Giai phap NHAT QUAN phu ca hai: nhung version vao key (lo (b)) + del theo
// pattern `iam:v*:group:<g>:user:<u>:perm_codes` trong assign/remove/syncRoles
// (lo (a) — khong biet version cu nen dung wildcard, giong invalidateGroupRoleCaches).
const PERM_CODES_TTL = 60;
const permCodesKey = (version: number, groupId: string | bigint, userId: string | bigint) =>
  `iam:v${version}:group:${groupId}:user:${userId}:perm_codes`;
const permCodesPattern = (groupId: string | bigint, userId: string | bigint) =>
  `iam:v*:group:${groupId}:user:${userId}:perm_codes`;

@Injectable()
export class GroupMemberRoleRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Optional() private readonly redis?: RedisService,
  ) {}

  findByUserAndGroup(userId: string | bigint, groupId: string | bigint) {
    return this.prisma.groupMemberRole.findMany({
      where: {
        userId: toPrimaryKey(userId),
        groupId: toPrimaryKey(groupId),
      },
      include: { role: { select: ROLE_SELECT } },
      orderBy: { roleId: 'asc' },
    });
  }

  findRoleIdsByUserAndGroup(userId: string | bigint, groupId: string | bigint) {
    return this.prisma.groupMemberRole.findMany({
      where: {
        userId: toPrimaryKey(userId),
        groupId: toPrimaryKey(groupId),
      },
      select: { roleId: true },
    });
  }

  /** userIds thuoc nhom co vai tro cu the — dung de filter member list theo role (cache 60s). */
  async findUserIdsByRole(groupId: string | bigint, roleId: string | bigint): Promise<bigint[]> {
    const key = roleUsersKey(groupId, roleId);
    const cached = await this.redis?.get(key);
    if (cached) {
      try {
        return (JSON.parse(cached) as string[]).map(BigInt);
      } catch {
        // cache hong — doc lai tu DB
      }
    }

    const rows = await this.prisma.groupMemberRole.findMany({
      where: { groupId: toPrimaryKey(groupId), roleId: toPrimaryKey(roleId) },
      select: { userId: true },
    });
    const ids = rows.map((r) => r.userId);
    await this.redis?.set(key, JSON.stringify(ids.map(String)), ROLE_USERS_TTL);
    return ids;
  }

  /** Tat ca vai tro nhom (active, roleType='group') — danh sach phang cho FE chon (cache 1h). */
  async findAllGroupRoles() {
    const cached = await this.redis?.get(ALL_GROUP_ROLES_KEY);
    if (cached) {
      try {
        return (JSON.parse(cached) as Array<{ id: string; code: string; name: string }>).map(
          (r) => ({ ...r, id: BigInt(r.id) }),
        );
      } catch {
        // cache hong — doc lai tu DB
      }
    }

    const roles = await this.prisma.role.findMany({
      where: { roleType: 'group', status: 'active' },
      select: { id: true, code: true, name: true },
      orderBy: { id: 'asc' },
    });
    await this.redis?.set(
      ALL_GROUP_ROLES_KEY,
      JSON.stringify(roles.map((r) => ({ ...r, id: String(r.id) }))),
      ALL_GROUP_ROLES_TTL,
    );
    return roles;
  }

  /**
   * Resolve role by code then assign within the same tx. Returns null (no-op)
   * if the role code doesn't exist — so a missing seeded role degrades
   * gracefully instead of breaking group creation.
   */
  async assignByRoleCode(
    userId: string | bigint,
    groupId: string | bigint,
    roleCode: string,
    tx: Tx = this.prisma,
  ) {
    const role = await tx.role.findFirst({ where: { code: roleCode }, select: { id: true } });
    if (!role) return null;
    return this.assign(userId, groupId, role.id, tx);
  }

  async assign(userId: string | bigint, groupId: string | bigint, roleId: string | bigint, tx: Tx = this.prisma) {
    const uid = toPrimaryKey(userId);
    const gid = toPrimaryKey(groupId);
    const rid = toPrimaryKey(roleId);
    const result = await tx.groupMemberRole.upsert({
      where: { userId_groupId_roleId: { userId: uid, groupId: gid, roleId: rid } },
      create: { userId: uid, groupId: gid, roleId: rid },
      update: {},
    });
    await this.redis?.del(roleUsersKey(groupId, roleId));
    // (a) user doi role trong nhom → don perm_codes cua dung (group,user).
    await this.invalidatePermCodes(groupId, userId);
    return result;
  }

  async remove(userId: string | bigint, groupId: string | bigint, roleId: string | bigint, tx: Tx = this.prisma) {
    const result = await tx.groupMemberRole.deleteMany({
      where: {
        userId: toPrimaryKey(userId),
        groupId: toPrimaryKey(groupId),
        roleId: toPrimaryKey(roleId),
      },
    });
    await this.redis?.del(roleUsersKey(groupId, roleId));
    // (a) user doi role trong nhom → don perm_codes cua dung (group,user).
    await this.invalidatePermCodes(groupId, userId);
    return result;
  }

  async syncRoles(userId: string | bigint, groupId: string | bigint, roleIds: (string | bigint)[]) {
    const uid = toPrimaryKey(userId);
    const gid = toPrimaryKey(groupId);
    const rids = roleIds.map(toPrimaryKey);

    await this.prisma.$transaction(async (tx) => {
      await tx.groupMemberRole.deleteMany({ where: { userId: uid, groupId: gid } });
      if (rids.length > 0) {
        await tx.groupMemberRole.createMany({
          data: rids.map((rid) => ({ userId: uid, groupId: gid, roleId: rid })),
          skipDuplicates: true,
        });
      }
    });

    // syncRoles thay doi ca role cu lan moi → xoa toan bo cache role-userids cua nhom.
    await this.invalidateGroupRoleCaches(groupId);
    // (a) user nay doi role trong nhom → don perm_codes cua dung (group,user).
    await this.invalidatePermCodes(groupId, userId);
  }

  private async invalidateGroupRoleCaches(groupId: string | bigint) {
    if (!this.redis) return;
    const keys = await this.redis.keys(`iam:group:${groupId}:role:*:user_ids`);
    if (keys.length) await this.redis.deleteMany(keys);
  }

  /**
   * Don perm_codes cua mot (group,user) cu the bat ke version nao (case (a)).
   * Dung wildcard tren version vi khong biet version cu — nhat quan voi
   * invalidateGroupRoleCaches (codebase da chap nhan `keys`).
   */
  private async invalidatePermCodes(groupId: string | bigint, userId: string | bigint) {
    if (!this.redis) return;
    const keys = await this.redis.keys(permCodesPattern(groupId, userId));
    if (keys.length) await this.redis.deleteMany(keys);
  }

  /** Version toan cuc RBAC (rbac:meta.version) — key perm_codes version-aware (case (b)). */
  private async currentRbacVersion(): Promise<number> {
    const meta = await this.redis?.hgetall('rbac:meta');
    const parsed = Number(meta?.version || 1);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  }

  /**
   * Tap quyen hieu luc cua user trong nhom (DISTINCT permission codes).
   *
   * Cache Redis version-aware (TTL 60s). Raw query gom thang
   * group_member_roles → role_has_permissions → permissions, loc role +
   * permission status='active', tranh `include` long 3 tang.
   */
  async getPermissionCodes(userId: string | bigint, groupId: string | bigint): Promise<string[]> {
    const uid = toPrimaryKey(userId);
    const gid = toPrimaryKey(groupId);

    let cacheKey: string | null = null;
    if (this.redis) {
      const version = await this.currentRbacVersion();
      cacheKey = permCodesKey(version, groupId, userId);
      const cached = await this.redis.get(cacheKey);
      if (cached) {
        try {
          return JSON.parse(cached) as string[];
        } catch {
          // cache hong — doc lai tu DB
        }
      }
    }

    const rows = await this.prisma.$queryRaw<Array<{ code: string }>>`
      SELECT DISTINCT perm.code
      FROM group_member_roles gmr
      INNER JOIN roles r ON r.id = gmr.role_id AND r.status = 'active'
      INNER JOIN role_has_permissions rhp ON rhp.role_id = r.id
      INNER JOIN permissions perm ON perm.id = rhp.permission_id AND perm.status = 'active'
      WHERE gmr.user_id = ${uid} AND gmr.group_id = ${gid}
    `;

    const codes: string[] = [];
    for (const row of rows) {
      if (typeof row.code === 'string' && row.code.length) codes.push(row.code);
    }

    if (this.redis && cacheKey) {
      await this.redis.set(cacheKey, JSON.stringify(codes), PERM_CODES_TTL);
    }
    return codes;
  }
}
