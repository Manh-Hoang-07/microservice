import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { PrimaryKey } from 'src/types';
import { PostCommentRepository } from '../../repositories/post-comment.repository';

@Injectable()
export class AdminPostCommentService {
  constructor(private readonly commentRepo: PostCommentRepository) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const where: any = {};
    if (query.post_id) where.post_id = BigInt(query.post_id);
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
