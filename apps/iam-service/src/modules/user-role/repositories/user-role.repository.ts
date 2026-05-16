import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
import { PrismaService } from '../../../core/database/prisma.service';
import { PrimaryKey, toPrimaryKey } from 'src/types';

export interface UserRoleFilter {
  userId?: any;
  roleId?: any;
}

@Injectable()
export class UserRoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  private buildWhere(filter: UserRoleFilter): Prisma.UserRoleAssignmentWhereInput {
    const where: Prisma.UserRoleAssignmentWhereInput = {};
    const andConditions: Prisma.UserRoleAssignmentWhereInput[] = [];

    if (filter.userId) {
      andConditions.push({ userId: toPrimaryKey(filter.userId) });
    }

    if (filter.roleId) {
      andConditions.push({ roleId: toPrimaryKey(filter.roleId) });
    }

    if (andConditions.length > 0) {
      where.AND = andConditions;
    }

    return where;
  }

  findMany(filter: UserRoleFilter, options: { skip: number; take: number; orderBy?: any }) {
    return this.prisma.userRoleAssignment.findMany({
      where: this.buildWhere(filter),
      include: {
        role: { select: { id: true, code: true, name: true } },
      },
      skip: options.skip,
      take: options.take,
      orderBy: options.orderBy ?? { createdAt: 'desc' },
    });
  }

  count(filter: UserRoleFilter) {
    return this.prisma.userRoleAssignment.count({ where: this.buildWhere(filter) });
  }

  getUserRoles(userId: string | bigint) {
    return this.prisma.userRoleAssignment.findMany({
      where: { userId: toPrimaryKey(userId) },
      include: {
        role: { select: { id: true, code: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async removeRole(userId: string | bigint, roleId: string | bigint): Promise<number> {
    const result = await this.prisma.userRoleAssignment.deleteMany({
      where: {
        userId: toPrimaryKey(userId),
        roleId: toPrimaryKey(roleId),
      },
    });
    return result.count;
  }

  async getActiveRoleIdsForUser(userId: PrimaryKey): Promise<bigint[]> {
    const rows = await this.prisma.userRoleAssignment.findMany({
      where: { userId },
      select: { roleId: true },
    });
    return rows.map((r) => r.roleId);
  }
}
