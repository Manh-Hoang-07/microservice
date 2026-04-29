import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class GalleryRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: Prisma.GalleryWhereInput, options: { skip: number; take: number }) {
    return this.prisma.gallery.findMany({
      where,
      orderBy: { sort_order: 'asc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(where: Prisma.GalleryWhereInput) {
    return this.prisma.gallery.count({ where });
  }

  findById(id: bigint) {
    return this.prisma.gallery.findUnique({ where: { id } });
  }

  findFirst(where: Prisma.GalleryWhereInput) {
    return this.prisma.gallery.findFirst({ where });
  }

  create(data: Prisma.GalleryCreateInput) {
    return this.prisma.gallery.create({ data });
  }

  update(id: bigint, data: Prisma.GalleryUpdateInput) {
    return this.prisma.gallery.update({ where: { id }, data });
  }

  delete(id: bigint) {
    return this.prisma.gallery.delete({ where: { id } });
  }
}
