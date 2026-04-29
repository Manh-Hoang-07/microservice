import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../../database/prisma.service';
import { toPrimaryKey } from '../../../../common/core/primary-key.util';

@Injectable()
export class WardRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: Prisma.WardWhereInput, options: { skip: number; take: number }) {
    return this.prisma.ward.findMany({ where, skip: options.skip, take: options.take });
  }

  count(where: Prisma.WardWhereInput) {
    return this.prisma.ward.count({ where });
  }

  findById(id: any) {
    return this.prisma.ward.findUnique({ where: { id: toPrimaryKey(id) } });
  }

  create(data: Prisma.WardCreateInput) {
    return this.prisma.ward.create({ data });
  }

  update(id: any, data: Prisma.WardUpdateInput) {
    return this.prisma.ward.update({ where: { id: toPrimaryKey(id) }, data });
  }

  delete(id: any) {
    return this.prisma.ward.delete({ where: { id: toPrimaryKey(id) } });
  }
}
