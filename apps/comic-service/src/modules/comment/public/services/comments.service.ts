import { Injectable } from '@nestjs/common';
import { createPaginationMeta } from '@package/common';
import { ComicCommentRepository } from '../../repositories/comic-comment.repository';

@Injectable()
export class PublicCommentService {
  constructor(private readonly commentRepo: ComicCommentRepository) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = { status: 'visible', parent_id: null };
    if (query.comic_id) where.comic_id = BigInt(query.comic_id);
    if (query.chapter_id) where.chapter_id = BigInt(query.chapter_id);

    const [data, total] = await Promise.all([
      this.commentRepo.findManyPublic(where, { skip, take: limit }),
      this.commentRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }
}
