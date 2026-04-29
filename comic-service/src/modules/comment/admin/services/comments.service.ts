import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { createPaginationMeta } from '../../../../common/pagination.helper';

@Injectable()
export class AdminCommentService {
  constructor(private readonly prisma: PrismaService) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.comic_id) where.comic_id = BigInt(query.comic_id);
    if (query.status) where.status = query.status;

    const [data, total] = await Promise.all([
      this.prisma.comicComment.findMany({
        where,
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.comicComment.count({ where }),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async updateStatus(id: bigint, status: string) {
    const comment = await this.prisma.comicComment.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException('Comment not found');
    return this.prisma.comicComment.update({ where: { id }, data: { status } });
  }
}
