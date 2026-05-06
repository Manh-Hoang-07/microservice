import { Injectable, NotFoundException, Optional } from '@nestjs/common';
import { PrimaryKey } from 'src/types';
import { RedisService } from '@package/redis';
import { I18nService } from 'nestjs-i18n';
import { t, createPaginationMeta, parseQueryOptions } from '@package/common';
import { CommentFilter, CommentRepository } from '../../repositories/comment.repository';

@Injectable()
export class AdminCommentService {
  constructor(
    private readonly commentRepo: CommentRepository,
    private readonly i18n: I18nService,
    @Optional() private readonly redis?: RedisService,
  ) {}

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: CommentFilter = {};
    if (query.comic_id) filter.comic_id = query.comic_id;
    if (query.chapter_id) filter.chapter_id = query.chapter_id;
    if (query.user_id) filter.user_id = query.user_id;
    if (query.status) filter.status = query.status;

    const skipCount = query.skipCount === true || query.skipCount === 'true';
    const [data, total] = await Promise.all([
      this.commentRepo.findMany(filter, options),
      skipCount ? Promise.resolve(0) : this.commentRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async updateStatus(id: PrimaryKey, status: string) {
    const comment = await this.commentRepo.findById(id);
    if (!comment) throw new NotFoundException(t(this.i18n, 'comic.COMMENT_NOT_FOUND'));
    const result = await this.commentRepo.update(id, { status });
    await this.incrementVersion('comic:public:comments:v');
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
