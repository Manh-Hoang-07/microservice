import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { createPaginationMeta } from '../../../../common/pagination.helper';

@Injectable()
export class PublicCommentService {
  constructor(private readonly prisma: PrismaService) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = { status: 'visible' };
    if (query.comic_id) where.comic_id = BigInt(query.comic_id);
    if (query.chapter_id) where.chapter_id = BigInt(query.chapter_id);
    // Top-level comments only (no parent)
    where.parent_id = null;

    const [data, total] = await Promise.all([
      this.prisma.comicComment.findMany({
        where,
        include: {
          replies: {
            where: { status: 'visible' },
            orderBy: { created_at: 'asc' },
          },
        },
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.comicComment.count({ where }),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }
}
