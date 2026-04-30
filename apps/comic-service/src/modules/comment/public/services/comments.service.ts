import { Injectable } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { ComicCommentRepository } from '../../repositories/comic-comment.repository';

@Injectable()
export class PublicCommentService {
  constructor(private readonly commentRepo: ComicCommentRepository) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const where: any = { status: 'visible', parent_id: null };
    if (query.comic_id) where.comic_id = BigInt(query.comic_id);
    if (query.chapter_id) where.chapter_id = BigInt(query.chapter_id);

    const [data, total] = await Promise.all([
      this.commentRepo.findManyPublic(where, options),
      this.commentRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }
}
