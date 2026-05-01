import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../../database/prisma.service';
import { toPrimaryKey } from '../../../../types';

export interface WardFilter {
  name?: string;
  code?: string;
  status?: string;
  province_id?: any;
}

@Injectable()
export class WardRepository {
  constructor(private readonly prisma: PrismaService) {}

  private buildWhere(filter: WardFilter): Prisma.WardWhereInput {
    const where: Prisma.WardWhereInput = {};
    if (filter.name) where.name = { contains: filter.name };
    if (filter.code) where.code = filter.code;
    if (filter.status) where.status = filter.status;
    if (filter.province_id !== undefined && filter.province_id !== null) {
      where.province_id = toPrimaryKey(filter.province_id);
    }
    return where;
  }

  findMany(filter: WardFilter, options: { skip: number; take: number }) {
    return this.prisma.ward.findMany({
      where: this.buildWhere(filter),
      skip: options.skip,
      take: options.take,
    });
  }

  count(filter: WardFilter) {
    return this.prisma.ward.count({ where: this.buildWhere(filter) });
  }

  findById(id: any) {
    return this.prisma.ward.findUnique({ where: { id: toPrimaryKey(id) } });
  }

  create(data: Record<string, any>) {
    const payload: any = { ...data };
    if (payload.province_id !== undefined && payload.province_id !== null) {
      payload.province_id = toPrimaryKey(payload.province_id);
    }
    return this.prisma.ward.create({ data: payload as Prisma.WardCreateInput });
  }

  update(id: any, data: Record<string, any>) {
    const payload: any = { ...data };
    if (payload.province_id !== undefined && payload.province_id !== null) {
      payload.province_id = toPrimaryKey(payload.province_id);
    }
    return this.prisma.ward.update({
      where: { id: toPrimaryKey(id) },
      data: payload as Prisma.WardUpdateInput,
    });
  }

  delete(id: any) {
    return this.prisma.ward.delete({ where: { id: toPrimaryKey(id) } });
  }
}
