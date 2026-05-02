import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { PrimaryKey } from 'src/types';

@Injectable()
export class UserRoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  getUserRoles(userId: PrimaryKey, groupId?: PrimaryKey) {
    const where: any = { user_id: userId };
    if (groupId !== undefined) where.group_id = groupId;
    return this.prisma.userRoleAssignment.findMany({
      where,
      include: {
        role: { select: { id: true, code: true, name: true } },
        group: { select: { id: true, code: true, name: true } },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async removeRole(
    userId: PrimaryKey,
    roleId: PrimaryKey,
    groupId: PrimaryKey,
  ): Promise<number> {
    const result = await this.prisma.userRoleAssignment.deleteMany({
      where: { user_id: userId, role_id: roleId, group_id: groupId },
    });
    return result.count;
  }

  async getActiveRoleIdsForUserInGroup(
    userId: PrimaryKey,
    groupId: PrimaryKey | null,
  ): Promise<bigint[]> {
    const where: any = { user_id: userId };
    if (groupId === null) {
      where.group = { context: { type: 'system', status: 'active' }, status: 'active' };
    } else {
      where.group_id = groupId;
    }
    const rows = await this.prisma.userRoleAssignment.findMany({
      where,
      select: { role_id: true },
    });
    return rows.map((r) => r.role_id);
  }
}
