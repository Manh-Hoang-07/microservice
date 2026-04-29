import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class ComicCategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: Prisma.ComicCategoryWhereInput, options: { skip: number; take: number }) {
    return this.prisma.comicCategory.findMany({
      where,
      orderBy: { name: 'asc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(where: Prisma.ComicCategoryWhereInput) {
    return this.prisma.comicCategory.count({ where });
  }

  findById(id: bigint) {
    return this.prisma.comicCategory.findUnique({ where: { id } });
  }

  findFirst(where: Prisma.ComicCategoryWhereInput) {
    return this.prisma.comicCategory.findFirst({ where });
  }

  findAll() {
    return this.prisma.comicCategory.findMany({
      select: { id: true, name: true, slug: true, description: true },
      orderBy: { name: 'asc' },
    });
  }

  create(data: Prisma.ComicCategoryCreateInput) {
    return this.prisma.comicCategory.create({ data });
  }

  update(id: bigint, data: Prisma.ComicCategoryUpdateInput) {
    return this.prisma.comicCategory.update({ where: { id }, data });
  }

  delete(id: bigint) {
    return this.prisma.comicCategory.delete({ where: { id } });
  }
}
