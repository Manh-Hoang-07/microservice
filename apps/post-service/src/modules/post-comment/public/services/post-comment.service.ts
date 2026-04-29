import { Injectable } from '@nestjs/common';
import { createPaginationMeta } from '@package/common';
import { PostCommentRepository } from '../../repositories/post-comment.repository';

@Injectable()
export class PublicPostCommentService {
  constructor(private readonly commentRepo: PostCommentRepository) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = { status: 'visible', parent_id: null };
    if (query.post_id) where.post_id = BigInt(query.post_id);

    const [data, total] = await Promise.all([
      this.commentRepo.findManyPublic(where, { skip, take: limit }),
      this.commentRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }
}
