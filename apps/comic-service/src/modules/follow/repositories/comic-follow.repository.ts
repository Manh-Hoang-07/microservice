import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrimaryKey } from 'src/types';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class ComicFollowRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: Prisma.ComicFollowWhereInput, options: { skip: number; take: number }) {
    return this.prisma.comicFollow.findMany({
      where,
      include: {
        comic: { select: { id: true, title: true, slug: true, cover_image: true, stats: true } },
      },
      orderBy: { created_at: 'desc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(where: Prisma.ComicFollowWhereInput) {
    return this.prisma.comicFollow.count({ where });
  }

  findUnique(userId: PrimaryKey, comicId: PrimaryKey) {
    return this.prisma.comicFollow.findUnique({
      where: { user_id_comic_id: { user_id: userId, comic_id: comicId } },
    });
  }

  create(userId: PrimaryKey, comicId: PrimaryKey) {
    return this.prisma.comicFollow.create({ data: { user_id: userId, comic_id: comicId } });
  }

  delete(userId: PrimaryKey, comicId: PrimaryKey) {
    return this.prisma.comicFollow.delete({
      where: { user_id_comic_id: { user_id: userId, comic_id: comicId } },
    });
  }

  async syncFollowCount(comicId: PrimaryKey) {
    const count = await this.prisma.comicFollow.count({ where: { comic_id: comicId } });
    return this.prisma.comicStats.upsert({
      where: { comic_id: comicId },
      create: { comic_id: comicId, follow_count: BigInt(count) },
      update: { follow_count: BigInt(count) },
    });
  }

  createOutbox(data: Prisma.ComicOutboxCreateInput) {
    return this.prisma.comicOutbox.create({ data });
  }
}
