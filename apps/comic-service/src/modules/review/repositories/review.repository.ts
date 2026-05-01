import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
import { toPrimaryKey } from 'src/types';
import { PrismaService } from '../../../database/prisma.service';

export interface ReviewFilter {
  comic_id?: any;
  user_id?: any;
  rating?: number;
}

@Injectable()
export class ReviewRepository {
  constructor(private readonly prisma: PrismaService) {}

  private buildWhere(filter: ReviewFilter): Prisma.ReviewWhereInput {
    const where: Prisma.ReviewWhereInput = {};
    if (filter.comic_id !== undefined) where.comic_id = toPrimaryKey(filter.comic_id);
    if (filter.user_id !== undefined) where.user_id = toPrimaryKey(filter.user_id);
    if (filter.rating !== undefined) where.rating = filter.rating;
    return where;
  }

  findMany(filter: ReviewFilter, options: { skip: number; take: number }) {
    return this.prisma.review.findMany({
      where: this.buildWhere(filter),
      orderBy: { created_at: 'desc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(filter: ReviewFilter) {
    return this.prisma.review.count({ where: this.buildWhere(filter) });
  }

  findById(id: any) {
    return this.prisma.review.findUnique({ where: { id: toPrimaryKey(id) } });
  }

  upsert(userId: any, comicId: any, data: { rating: number; content?: string }) {
    const uid = toPrimaryKey(userId);
    const cid = toPrimaryKey(comicId);
    return this.prisma.review.upsert({
      where: { user_id_comic_id: { user_id: uid, comic_id: cid } },
      create: { user_id: uid, comic_id: cid, rating: data.rating, content: data.content },
      update: { rating: data.rating, content: data.content },
    });
  }

  delete(id: any) {
    return this.prisma.review.delete({ where: { id: toPrimaryKey(id) } });
  }

  aggregateRating(comicId: any) {
    return this.prisma.review.aggregate({
      where: { comic_id: toPrimaryKey(comicId) },
      _count: true,
      _sum: { rating: true },
    });
  }

  aggregateRatingForFilter(filter: ReviewFilter) {
    return this.prisma.review.aggregate({
      where: this.buildWhere(filter),
      _avg: { rating: true },
      _count: true,
    });
  }

  async syncRatingStats(comicId: any) {
    const cid = toPrimaryKey(comicId);
    const agg = await this.aggregateRating(cid);
    return this.prisma.stats.upsert({
      where: { comic_id: cid },
      create: {
        comic_id: cid,
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
