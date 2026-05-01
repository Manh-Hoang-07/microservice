import { Injectable } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { CommentFilter, CommentRepository } from '../../repositories/comment.repository';

@Injectable()
export class PublicCommentService {
  constructor(private readonly commentRepo: CommentRepository) {}

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: CommentFilter = {
      status: 'visible',
      parent_id: null,
    };
    if (query.post_id) filter.post_id = query.post_id;

    const [data, total] = await Promise.all([
      this.commentRepo.findManyWithReplies(filter, options),
      this.commentRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }
}
