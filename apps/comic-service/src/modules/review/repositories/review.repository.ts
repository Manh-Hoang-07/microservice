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

  /**
   * Atomic upsert + counter delta in one transaction. Two concurrent rate
   * calls on the same comic used to both read the same baseline aggregate
   * (read-then-write) and overwrite each other's count. Atomic deltas via
   * Prisma `increment`/`decrement` eliminate that drift.
   */
  upsert(userId: any, comicId: any, data: { rating: number; content?: string }) {
    const uid = toPrimaryKey(userId);
    const cid = toPrimaryKey(comicId);
    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.review.findUnique({
        where: { user_id_comic_id: { user_id: uid, comic_id: cid } },
        select: { rating: true },
      });

      const review = await tx.review.upsert({
        where: { user_id_comic_id: { user_id: uid, comic_id: cid } },
        create: { user_id: uid, comic_id: cid, rating: data.rating, content: data.content },
        update: { rating: data.rating, content: data.content },
      });

      if (existing) {
        const delta = data.rating - existing.rating;
        if (delta !== 0) {
          await tx.stats.upsert({
            where: { comic_id: cid },
            create: { comic_id: cid, rating_sum: BigInt(data.rating), rating_count: BigInt(1) },
            update: { rating_sum: { increment: delta } },
          });
        }
      } else {
        await tx.stats.upsert({
          where: { comic_id: cid },
          create: { comic_id: cid, rating_sum: BigInt(data.rating), rating_count: BigInt(1) },
          update: {
            rating_sum: { increment: data.rating },
            rating_count: { increment: 1 },
          },
        });
      }

      return review;
    });
  }

  /** Hard-delete with atomic counter decrement, all in one transaction. */
  async deleteWithStats(id: any) {
    const rid = toPrimaryKey(id);
    return this.prisma.$transaction(async (tx) => {
      const review = await tx.review.findUnique({
        where: { id: rid },
        select: { id: true, comic_id: true, rating: true },
      });
      if (!review) return null;
      await tx.review.delete({ where: { id: rid } });
      await tx.stats.upsert({
        where: { comic_id: review.comic_id },
        create: { comic_id: review.comic_id, rating_sum: BigInt(0), rating_count: BigInt(0) },
        update: {
          rating_sum: { decrement: review.rating },
          rating_count: { decrement: 1 },
        },
      });
      return review;
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

  /**
   * Recompute rating_sum / rating_count from scratch. Live writes use
   * atomic deltas via `upsert` / `deleteWithStats`; this method is for
   * offline migrations / drift recovery only.
   */
  async syncRatingStats(comicId: any) {
    const cid = toPrimaryKey(comicId);
    return this.prisma.$transaction(async (tx) => {
      const agg = await tx.review.aggregate({
        where: { comic_id: cid },
        _count: true,
        _sum: { rating: true },
      });
      return tx.stats.upsert({
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
    });
  }
}
