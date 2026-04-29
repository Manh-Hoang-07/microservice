import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class BannerRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: Prisma.BannerWhereInput, options: { skip: number; take: number }) {
    return this.prisma.banner.findMany({
      where,
      include: { location: true },
      orderBy: { sort_order: 'asc' },
      skip: options.skip,
      take: options.take,
    });
  }

  findManyPublic(where: Prisma.BannerWhereInput, options: { skip: number; take: number }) {
    return this.prisma.banner.findMany({
      where,
      include: { location: { select: { id: true, code: true, name: true } } },
      orderBy: { sort_order: 'asc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(where: Prisma.BannerWhereInput) {
    return this.prisma.banner.count({ where });
  }

  findById(id: bigint) {
    return this.prisma.banner.findUnique({ where: { id }, include: { location: true } });
  }

  create(data: any) {
    return this.prisma.banner.create({ data });
  }

  update(id: bigint, data: any) {
    return this.prisma.banner.update({ where: { id }, data });
  }

  delete(id: bigint) {
    return this.prisma.banner.delete({ where: { id } });
  }
}
