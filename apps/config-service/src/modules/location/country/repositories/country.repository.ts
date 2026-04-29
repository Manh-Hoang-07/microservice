import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../../database/prisma.service';
import { toPrimaryKey } from '../../../../common/core/primary-key.util';

@Injectable()
export class CountryRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: Prisma.CountryWhereInput, options: { skip: number; take: number }) {
    return this.prisma.country.findMany({ where, skip: options.skip, take: options.take });
  }

  count(where: Prisma.CountryWhereInput) {
    return this.prisma.country.count({ where });
  }

  findById(id: any) {
    return this.prisma.country.findUnique({ where: { id: toPrimaryKey(id) } });
  }

  create(data: Prisma.CountryCreateInput) {
    return this.prisma.country.create({ data });
  }

  update(id: any, data: Prisma.CountryUpdateInput) {
    return this.prisma.country.update({ where: { id: toPrimaryKey(id) }, data });
  }

  delete(id: any) {
    return this.prisma.country.delete({ where: { id: toPrimaryKey(id) } });
  }
}
