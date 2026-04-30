import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrimaryKey } from 'src/types';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class BannerLocationRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: Prisma.BannerLocationWhereInput, options: { skip: number; take: number }) {
    return this.prisma.bannerLocation.findMany({
      where,
      orderBy: { created_at: 'desc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(where: Prisma.BannerLocationWhereInput) {
    return this.prisma.bannerLocation.count({ where });
  }

  findById(id: PrimaryKey) {
    return this.prisma.bannerLocation.findUnique({ where: { id }, include: { banners: true } });
  }

  findByCode(code: string) {
    return this.prisma.bannerLocation.findUnique({ where: { code } });
  }

  findFirst(where: Prisma.BannerLocationWhereInput) {
    return this.prisma.bannerLocation.findFirst({ where });
  }

  create(data: Prisma.BannerLocationCreateInput) {
    return this.prisma.bannerLocation.create({ data });
  }

  update(id: PrimaryKey, data: Prisma.BannerLocationUpdateInput) {
    return this.prisma.bannerLocation.update({ where: { id }, data });
  }

  delete(id: PrimaryKey) {
    return this.prisma.bannerLocation.delete({ where: { id } });
  }
}
