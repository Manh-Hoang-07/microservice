import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
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

@Injectable()
export class GroupMemberRoleRepository {
  constructor(private readonly prisma: PrismaService) {}

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

  /** Tat ca vai tro nhom (active, roleType='group') — danh sach phang cho FE chon. */
  findAllGroupRoles() {
    return this.prisma.role.findMany({
      where: { roleType: 'group', status: 'active' },
      select: { id: true, code: true, name: true },
      orderBy: { id: 'asc' },
    });
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

  assign(userId: string | bigint, groupId: string | bigint, roleId: string | bigint, tx: Tx = this.prisma) {
    const uid = toPrimaryKey(userId);
    const gid = toPrimaryKey(groupId);
    const rid = toPrimaryKey(roleId);
    return tx.groupMemberRole.upsert({
      where: { userId_groupId_roleId: { userId: uid, groupId: gid, roleId: rid } },
      create: { userId: uid, groupId: gid, roleId: rid },
      update: {},
    });
  }

  remove(userId: string | bigint, groupId: string | bigint, roleId: string | bigint, tx: Tx = this.prisma) {
    return tx.groupMemberRole.deleteMany({
      where: {
        userId: toPrimaryKey(userId),
        groupId: toPrimaryKey(groupId),
        roleId: toPrimaryKey(roleId),
      },
    });
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
  }

  getPermissionCodes(userId: string | bigint, groupId: string | bigint): Promise<string[]> {
    return this.prisma.groupMemberRole
      .findMany({
        where: {
          userId: toPrimaryKey(userId),
          groupId: toPrimaryKey(groupId),
        },
        include: {
          role: {
            select: {
              permissions: { include: { permission: { select: { code: true } } } },
            },
          },
        },
      })
      .then((rows) => {
        const codes = new Set<string>();
        for (const row of rows) {
          for (const rp of row.role.permissions) {
            codes.add(rp.permission.code);
          }
        }
        return Array.from(codes);
      });
  }
}
