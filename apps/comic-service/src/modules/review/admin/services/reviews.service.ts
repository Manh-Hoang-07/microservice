import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { createPaginationMeta } from '../../../../common/pagination.helper';

@Injectable()
export class AdminReviewService {
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

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async delete(id: bigint) {
    const review = await this.prisma.comicReview.findUnique({ where: { id } });
    if (!review) throw new NotFoundException('Review not found');

    await this.prisma.comicReview.delete({ where: { id } });

    // Sync rating stats
    await this.syncRatingStats(review.comic_id);

    return { success: true };
  }

  private async syncRatingStats(comicId: bigint) {
    const agg = await this.prisma.comicReview.aggregate({
      where: { comic_id: comicId },
      _count: true,
      _sum: { rating: true },
    });

    await this.prisma.comicStats.upsert({
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
