import { Injectable } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { PostCommentRepository } from '../../repositories/post-comment.repository';

@Injectable()
export class PublicPostCommentService {
  constructor(private readonly commentRepo: PostCommentRepository) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const where: any = { status: 'visible', parent_id: null };
    if (query.post_id) where.post_id = BigInt(query.post_id);

    const [data, total] = await Promise.all([
      this.commentRepo.findManyPublic(where, options),
      this.commentRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }
}
