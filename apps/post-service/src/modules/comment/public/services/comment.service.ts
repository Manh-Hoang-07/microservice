import { BadRequestException, Injectable } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { CommentFilter, CommentRepository } from '../../repositories/comment.repository';

@Injectable()
export class PublicCommentService {
  constructor(private readonly commentRepo: CommentRepository) {}

  async getList(query: any = {}) {
    // Require `post_id` on the public list. Without this the endpoint dumps
    // every visible comment site-wide, which is both a privacy issue (any
    // user's comment text is browsable) and a perf foot-gun.
    if (!query.post_id) {
      throw new BadRequestException('post_id query parameter is required');
    }

    // Cap public list at 50 comments/page; replies are capped server-side.
    const options = parseQueryOptions(query, { defaultTake: 20, maxTake: 50 });

    const filter: CommentFilter = {
      status: 'visible',
      parent_id: null,
      post_id: query.post_id,
    };

    const [data, total] = await Promise.all([
      this.commentRepo.findManyWithReplies(filter, options),
      this.commentRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }
}
