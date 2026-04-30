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
    await this.prisma.roleContext.deleteMany({ where: { context_id: contextId } });
    if (roleIds.length) {
      await this.prisma.roleContext.createMany({
        data: roleIds.map((rid) => ({ role_id: rid, context_id: contextId })),
        skipDuplicates: true,
      });
    }
  }
}
