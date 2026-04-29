import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta } from '@package/common';
import { PostCommentRepository } from '../../repositories/post-comment.repository';

@Injectable()
export class AdminPostCommentService {
  constructor(private readonly commentRepo: PostCommentRepository) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.post_id) where.post_id = BigInt(query.post_id);
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
