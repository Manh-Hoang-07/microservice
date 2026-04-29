import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../../database/prisma.service';
import { toPrimaryKey } from '../../../../common/core/primary-key.util';

@Injectable()
export class ProvinceRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: Prisma.ProvinceWhereInput, options: { skip: number; take: number }) {
    return this.prisma.province.findMany({ where, skip: options.skip, take: options.take });
  }

  count(where: Prisma.ProvinceWhereInput) {
    return this.prisma.province.count({ where });
  }

  findById(id: any) {
    return this.prisma.province.findUnique({ where: { id: toPrimaryKey(id) } });
  }

  create(data: Prisma.ProvinceCreateInput) {
    return this.prisma.province.create({ data });
  }

  update(id: any, data: Prisma.ProvinceUpdateInput) {
    return this.prisma.province.update({ where: { id: toPrimaryKey(id) }, data });
  }

  delete(id: any) {
    return this.prisma.province.delete({ where: { id: toPrimaryKey(id) } });
  }
}
