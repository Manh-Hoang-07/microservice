import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrimaryKey } from 'src/types';
import { AdminCommentService } from '../../admin/services/comment.service';
import { CommentRepository } from '../../repositories/comment.repository';

/**
 * Binh luan trong pham vi nhom = binh luan tren cac bai viet thuoc nhom.
 * Delegate sang AdminCommentService, tiem scope groupId; kiem duyet (doi
 * trang thai) chi cho comment thuoc bai viet cua nhom.
 */
@Injectable()
export class GroupCommentService {
  constructor(
    private readonly comments: AdminCommentService,
    private readonly commentRepo: CommentRepository,
  ) {}

  list(groupId: string, query: any) {
    return this.comments.getList({ ...query, groupId });
  }

  async updateStatus(groupId: string, id: PrimaryKey, status: string) {
    await this.assertInGroup(id, groupId);
    return this.comments.updateStatus(id, status);
  }

  /** Chong kiem duyet comment cua bai viet thuoc nhom khac. */
  private async assertInGroup(id: PrimaryKey, groupId: string) {
    const row = await this.commentRepo.findPostGroupId(id);
    if (!row || String((row as any).post?.groupId ?? '') !== groupId) {
      throw new ForbiddenException('Bình luận không thuộc nhóm này.');
    }
  }
}
