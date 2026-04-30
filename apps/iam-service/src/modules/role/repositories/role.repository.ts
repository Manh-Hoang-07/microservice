import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { PrimaryKey } from 'src/types';

@Injectable()
export class RoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: any, skip: number, take: number) {
    return this.prisma.role.findMany({
      where,
      skip,
      take,
      orderBy: { code: 'asc' },
      include: { parent: { select: { id: true, code: true, name: true } } },
    });
  }

  count(where: any) {
    return this.prisma.role.count({ where });
  }

  findById(id: PrimaryKey) {
    return this.prisma.role.findUnique({
      where: { id },
      include: {
        parent: { select: { id: true, code: true, name: true } },
        permissions: {
          include: { permission: { select: { id: true, code: true, name: true } } },
        },
        role_contexts: {
          include: { context: { select: { id: true, code: true, name: true } } },
        },
      },
    });
  }

  findByCode(code: string) {
    return this.prisma.role.findFirst({ where: { code } });
  }

  create(data: any) {
    return this.prisma.role.create({ data });
  }

  update(id: PrimaryKey, data: any) {
    return this.prisma.role.update({ where: { id }, data });
  }

  delete(id: PrimaryKey) {
    return this.prisma.role.delete({ where: { id } });
  }

  async syncPermissions(roleId: PrimaryKey, permissionIds: PrimaryKey[]) {
    await this.prisma.roleHasPermission.deleteMany({ where: { role_id: roleId } });
    if (permissionIds.length) {
      await this.prisma.roleHasPermission.createMany({
        data: permissionIds.map((pid) => ({ role_id: roleId, permission_id: pid })),
        skipDuplicates: true,
      });
    }
  }
}
