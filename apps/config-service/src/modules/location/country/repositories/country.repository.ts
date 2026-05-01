import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../../database/prisma.service';
import { toPrimaryKey } from '../../../../types';

export interface CountryFilter {
  name?: string;
  code?: string;
  status?: string;
}

@Injectable()
export class CountryRepository {
  constructor(private readonly prisma: PrismaService) {}

  private buildWhere(filter: CountryFilter): Prisma.CountryWhereInput {
    const where: Prisma.CountryWhereInput = {};
    if (filter.name) where.name = { contains: filter.name };
    if (filter.code) where.code = filter.code;
    if (filter.status) where.status = filter.status;
    return where;
  }

  findMany(filter: CountryFilter, options: { skip: number; take: number }) {
    return this.prisma.country.findMany({
      where: this.buildWhere(filter),
      skip: options.skip,
      take: options.take,
    });
  }

  count(filter: CountryFilter) {
    return this.prisma.country.count({ where: this.buildWhere(filter) });
  }

  findById(id: any) {
    return this.prisma.country.findUnique({ where: { id: toPrimaryKey(id) } });
  }

  create(data: Record<string, any>) {
    return this.prisma.country.create({ data: data as Prisma.CountryCreateInput });
  }

  update(id: any, data: Record<string, any>) {
    return this.prisma.country.update({
      where: { id: toPrimaryKey(id) },
      data: data as Prisma.CountryUpdateInput,
    });
  }

  delete(id: any) {
    return this.prisma.country.delete({ where: { id: toPrimaryKey(id) } });
  }
}
