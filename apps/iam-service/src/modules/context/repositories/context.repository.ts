import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { PrimaryKey } from 'src/types';

@Injectable()
export class ContextRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: any, skip: number, take: number) {
    return this.prisma.context.findMany({ where, skip, take, orderBy: { code: 'asc' } });
  }

  count(where: any) {
    return this.prisma.context.count({ where });
  }

  findById(id: PrimaryKey) {
    return this.prisma.context.findUnique({
      where: { id },
      include: {
        role_contexts: {
          include: { role: { select: { id: true, code: true, name: true } } },
        },
      },
    });
  }

  findByCode(code: string) {
    return this.prisma.context.findUnique({ where: { code } });
  }

  create(data: any) {
    return this.prisma.context.create({ data });
  }

  update(id: PrimaryKey, data: any) {
    return this.prisma.context.update({ where: { id }, data });
  }

  delete(id: PrimaryKey) {
    return this.prisma.context.delete({ where: { id } });
  }

  async syncRoles(contextId: PrimaryKey, roleIds: PrimaryKey[]) {
    await this.prisma.$transaction(
      async (tx) => {
        const before = await tx.roleContext.findMany({
          where: { context_id: contextId },
          select: { role_id: true },
        });
        const beforeIds = new Set(before.map((r) => String(r.role_id)));
        const targetIds = new Set(roleIds.map((id) => String(id)));
        const removed = [...beforeIds].filter((id) => !targetIds.has(id)).map((id) => BigInt(id));

        await tx.roleContext.deleteMany({ where: { context_id: contextId } });
        if (roleIds.length) {
          await tx.roleContext.createMany({
            data: roleIds.map((rid) => ({ role_id: rid, context_id: contextId })),
            skipDuplicates: true,
          });
        }

        // Cascade-clean assignments: any user_role_assignments for a role that
        // is no longer allowed in this context must be removed so the resolver
        // doesn't keep granting them.
        if (removed.length) {
          await tx.userRoleAssignment.deleteMany({
            where: {
              role_id: { in: removed },
              group: { context_id: contextId },
            },
          });
        }
      },
      { isolationLevel: 'Serializable' },
    );
  }

  async countGroups(contextId: PrimaryKey): Promise<number> {
    return this.prisma.group.count({ where: { context_id: contextId } });
  }
}
