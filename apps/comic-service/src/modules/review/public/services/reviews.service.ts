import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { createPaginationMeta } from '@package/common';

@Injectable()
export class PublicReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.comic_id) where.comic_id = BigInt(query.comic_id);

    const [data, total] = await Promise.all([
      this.prisma.comicReview.findMany({ where, orderBy: { created_at: 'desc' }, skip, take: limit }),
      this.prisma.comicReview.count({ where }),
    ]);

    // Calculate average rating
    const agg = await this.prisma.comicReview.aggregate({
      where,
      _avg: { rating: true },
      _count: true,
    });

    return {
      data,
      meta: createPaginationMeta(page, limit, total),
      stats: {
        average_rating: agg._avg?.rating || 0,
        total_reviews: agg._count || 0,
      },
    };
  }
}
