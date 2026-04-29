import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta } from '@package/common';
import { ComicCommentRepository } from '../../repositories/comic-comment.repository';

@Injectable()
export class AdminCommentService {
  constructor(private readonly commentRepo: ComicCommentRepository) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.comic_id) where.comic_id = BigInt(query.comic_id);
    if (query.status) where.status = query.status;

    const [data, total] = await Promise.all([
      this.commentRepo.findMany(where, { skip, take: limit }),
      this.commentRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async updateStatus(id: bigint, status: string) {
    const comment = await this.commentRepo.findById(id);
    if (!comment) throw new NotFoundException('Comment not found');
    return this.commentRepo.update(id, { status });
  }
}
