import { Injectable, NotFoundException, Optional } from '@nestjs/common';
import { RedisService } from '@package/redis';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { CommentFilter, CommentRepository } from '../../repositories/comment.repository';

@Injectable()
export class AdminCommentService {
  constructor(
    private readonly commentRepo: CommentRepository,
    @Optional() private readonly redis?: RedisService,
  ) {}

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: CommentFilter = {};
    if (query.post_id) filter.post_id = query.post_id;
    if (query.status) filter.status = query.status;
    if (query.user_id) filter.user_id = query.user_id;

    const skipCount = query.skipCount === true || query.skipCount === 'true';
    const [data, total] = await Promise.all([
      this.commentRepo.findMany(filter, options),
      skipCount ? Promise.resolve(0) : this.commentRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async updateStatus(id: any, status: string) {
    const comment = await this.commentRepo.findById(id);
    if (!comment) throw new NotFoundException('Comment not found');
    const result = await this.commentRepo.update(id, { status });
    await this.incrementVersion('post:public:comments:v');
    return result;
  }

  private async incrementVersion(key: string): Promise<void> {
    try {
      if (this.redis?.isEnabled()) {
        await this.redis.incr(key);
      }
    } catch {}
  }
}
