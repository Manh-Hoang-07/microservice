import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
import { toPrimaryKey } from 'src/types';
import { PrismaService } from '../../../database/prisma.service';

export interface BannerLocationFilter {
  search?: string;
  status?: string;
  code?: string;
}

@Injectable()
export class BannerLocationRepository {
  constructor(private readonly prisma: PrismaService) {}

  private buildWhere(filter: BannerLocationFilter): Prisma.BannerLocationWhereInput {
    const where: Prisma.BannerLocationWhereInput = {};
    if (filter.search) {
      where.OR = [
        { name: { contains: filter.search } },
        { code: { contains: filter.search } },
      ];
    }
    if (filter.status) where.status = filter.status;
    if (filter.code) where.code = filter.code;
    return where;
  }

  findMany(filter: BannerLocationFilter, options: { skip: number; take: number }) {
    return this.prisma.bannerLocation.findMany({
      where: this.buildWhere(filter),
      orderBy: { created_at: 'desc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(filter: BannerLocationFilter) {
    return this.prisma.bannerLocation.count({ where: this.buildWhere(filter) });
  }

  findById(id: any) {
    return this.prisma.bannerLocation.findUnique({
      where: { id: toPrimaryKey(id) },
      include: { banners: true },
    });
  }

  findByCode(code: string) {
    return this.prisma.bannerLocation.findUnique({ where: { code } });
  }

  findCodeConflict(code: string, excludeId: any) {
    return this.prisma.bannerLocation.findFirst({
      where: { code, NOT: { id: toPrimaryKey(excludeId) } },
    });
  }

  create(data: Record<string, any>) {
    return this.prisma.bannerLocation.create({
      data: data as Prisma.BannerLocationUncheckedCreateInput,
    });
  }

  update(id: any, data: Record<string, any>) {
    return this.prisma.bannerLocation.update({
      where: { id: toPrimaryKey(id) },
      data: data as Prisma.BannerLocationUncheckedUpdateInput,
    });
  }

  delete(id: any) {
    return this.prisma.bannerLocation.delete({ where: { id: toPrimaryKey(id) } });
  }
}
