import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
import { PrismaService } from '../../../../database/prisma.service';
import { toPrimaryKey } from '../../../../types';

export interface ProvinceFilter {
  name?: string;
  code?: string;
  status?: string;
  country_id?: any;
}

@Injectable()
export class ProvinceRepository {
  constructor(private readonly prisma: PrismaService) {}

  private buildWhere(filter: ProvinceFilter): Prisma.ProvinceWhereInput {
    const where: Prisma.ProvinceWhereInput = {};
    if (filter.name) where.name = { contains: filter.name, mode: 'insensitive' };
    if (filter.code) where.code = filter.code;
    if (filter.status) where.status = filter.status;
    if (filter.country_id !== undefined && filter.country_id !== null) {
      where.country_id = toPrimaryKey(filter.country_id);
    }
    return where;
  }

  countWards(provinceId: any) {
    return this.prisma.ward.count({ where: { province_id: toPrimaryKey(provinceId) } });
  }

  findMany(filter: ProvinceFilter, options: { skip: number; take: number }) {
    return this.prisma.province.findMany({
      where: this.buildWhere(filter),
      skip: options.skip,
      take: options.take,
    });
  }

  count(filter: ProvinceFilter) {
    return this.prisma.province.count({ where: this.buildWhere(filter) });
  }

  findById(id: any) {
    return this.prisma.province.findUnique({ where: { id: toPrimaryKey(id) } });
  }

  create(data: Record<string, any>) {
    const payload: any = { ...data };
    if (payload.country_id !== undefined && payload.country_id !== null) {
      payload.country_id = toPrimaryKey(payload.country_id);
    }
    return this.prisma.province.create({ data: payload as Prisma.ProvinceCreateInput });
  }

  update(id: any, data: Record<string, any>) {
    const payload: any = { ...data };
    if (payload.country_id !== undefined && payload.country_id !== null) {
      payload.country_id = toPrimaryKey(payload.country_id);
    }
    return this.prisma.province.update({
      where: { id: toPrimaryKey(id) },
      data: payload as Prisma.ProvinceUpdateInput,
    });
  }

  delete(id: any) {
    return this.prisma.province.delete({ where: { id: toPrimaryKey(id) } });
  }
}
