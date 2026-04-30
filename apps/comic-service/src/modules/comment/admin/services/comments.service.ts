import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { PrimaryKey } from 'src/types';
import { ComicCommentRepository } from '../../repositories/comic-comment.repository';

@Injectable()
export class AdminCommentService {
  constructor(private readonly commentRepo: ComicCommentRepository) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const where: any = {};
    if (query.comic_id) where.comic_id = BigInt(query.comic_id);
    if (query.status) where.status = query.status;

    const [data, total] = await Promise.all([
      this.commentRepo.findMany(where, options),
      this.commentRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async updateStatus(id: PrimaryKey, status: string) {
    const comment = await this.commentRepo.findById(id);
    if (!comment) throw new NotFoundException('Comment not found');
    return this.commentRepo.update(id, { status });
  }
}
