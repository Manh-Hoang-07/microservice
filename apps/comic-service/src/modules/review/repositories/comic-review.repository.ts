import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';
import { PrimaryKey } from 'src/types';

@Injectable()
export class ComicReviewRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: Prisma.ComicReviewWhereInput, options: { skip: number; take: number }) {
    return this.prisma.comicReview.findMany({
      where,
      orderBy: { created_at: 'desc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(where: Prisma.ComicReviewWhereInput) {
    return this.prisma.comicReview.count({ where });
  }

  findById(id: PrimaryKey) {
    return this.prisma.comicReview.findUnique({ where: { id } });
  }

  upsert(userId: PrimaryKey, comicId: PrimaryKey, data: { rating: number; content?: string }) {
    return this.prisma.comicReview.upsert({
      where: { user_id_comic_id: { user_id: userId, comic_id: comicId } },
      create: { user_id: userId, comic_id: comicId, rating: data.rating, content: data.content },
      update: { rating: data.rating, content: data.content },
    });
  }

  delete(id: PrimaryKey) {
    return this.prisma.comicReview.delete({ where: { id } });
  }

  aggregateRating(comicId: PrimaryKey) {
    return this.prisma.comicReview.aggregate({
      where: { comic_id: comicId },
      _count: true,
      _sum: { rating: true },
    });
  }

  aggregateRatingWithAvg(where: Prisma.ComicReviewWhereInput) {
    return this.prisma.comicReview.aggregate({
      where,
      _avg: { rating: true },
      _count: true,
    });
  }

  async syncRatingStats(comicId: PrimaryKey) {
    const agg = await this.aggregateRating(comicId);
    return this.prisma.comicStats.upsert({
      where: { comic_id: comicId },
      create: {
        comic_id: comicId,
        rating_count: BigInt(agg._count || 0),
        rating_sum: BigInt(agg._sum?.rating || 0),
      },
      update: {
        rating_count: BigInt(agg._count || 0),
        rating_sum: BigInt(agg._sum?.rating || 0),
      },
    });
  }
}
