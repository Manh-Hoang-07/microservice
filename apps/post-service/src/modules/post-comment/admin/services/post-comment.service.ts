import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { createPaginationMeta } from '@package/common';

@Injectable()
export class AdminPostCommentService {
  constructor(private readonly prisma: PrismaService) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.post_id) where.post_id = BigInt(query.post_id);
    if (query.status) where.status = query.status;

    const [data, total] = await Promise.all([
      this.prisma.postComment.findMany({
        where,
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.postComment.count({ where }),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async updateStatus(id: bigint, status: string) {
    const comment = await this.prisma.postComment.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException('Comment not found');
    return this.prisma.postComment.update({ where: { id }, data: { status } });
  }
}
