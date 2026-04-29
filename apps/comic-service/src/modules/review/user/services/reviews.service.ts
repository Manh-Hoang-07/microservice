import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { CreateReviewDto } from '../dtos/create-review.dto';

@Injectable()
export class UserReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdate(userId: bigint, dto: CreateReviewDto) {
    const comicId = BigInt(dto.comic_id);

    const review = await this.prisma.comicReview.upsert({
      where: {
        user_id_comic_id: { user_id: userId, comic_id: comicId },
      },
      create: {
        user_id: userId,
        comic_id: comicId,
        rating: dto.rating,
        content: dto.content,
      },
      update: {
        rating: dto.rating,
        content: dto.content,
      },
    });

    await this.syncRatingStats(comicId);
    return review;
  }

  async delete(userId: bigint, id: bigint) {
    const review = await this.prisma.comicReview.findUnique({ where: { id } });
    if (!review) throw new NotFoundException('Review not found');
    if (review.user_id !== userId) throw new ForbiddenException('Not your review');

    await this.prisma.comicReview.delete({ where: { id } });
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
