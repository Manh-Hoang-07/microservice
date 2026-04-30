import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { PrimaryKey } from 'src/types';

@Injectable()
export class PermissionRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: any, skip: number, take: number) {
    return this.prisma.permission.findMany({
      where,
      skip,
      take,
      orderBy: { code: 'asc' },
      include: { parent: { select: { id: true, code: true, name: true } } },
    });
  }

  count(where: any) {
    return this.prisma.permission.count({ where });
  }

  findById(id: PrimaryKey) {
    return this.prisma.permission.findUnique({
      where: { id },
      include: {
        parent: { select: { id: true, code: true, name: true } },
        children: { select: { id: true, code: true, name: true } },
      },
    });
  }

  findByCode(code: string) {
    return this.prisma.permission.findUnique({ where: { code } });
  }

  create(data: any) {
    return this.prisma.permission.create({ data });
  }

  update(id: PrimaryKey, data: any) {
    return this.prisma.permission.update({ where: { id }, data });
  }

  delete(id: PrimaryKey) {
    return this.prisma.permission.delete({ where: { id } });
  }
}
