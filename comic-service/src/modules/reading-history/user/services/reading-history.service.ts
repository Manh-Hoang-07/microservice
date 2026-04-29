import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { createPaginationMeta } from '../../../../common/pagination.helper';

@Injectable()
export class UserReadingHistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getList(userId: bigint, query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where = { user_id: userId };

    const [data, total] = await Promise.all([
      this.prisma.readingHistory.findMany({
        where,
        include: {
          comic: { select: { id: true, title: true, slug: true, cover_image: true } },
          chapter: { select: { id: true, title: true, chapter_index: true, chapter_label: true } },
        },
        orderBy: { updated_at: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.readingHistory.count({ where }),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async upsert(userId: bigint, comicId: bigint, chapterId: bigint) {
    return this.prisma.readingHistory.upsert({
      where: { user_id_comic_id: { user_id: userId, comic_id: comicId } },
      create: { user_id: userId, comic_id: comicId, chapter_id: chapterId },
      update: { chapter_id: chapterId },
    });
  }

  async clear(userId: bigint, comicId: bigint) {
    await this.prisma.readingHistory.deleteMany({
      where: { user_id: userId, comic_id: comicId },
    });
    return { success: true };
  }
}
