import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrimaryKey } from 'src/types';
import { AdminPostService } from '../../admin/services/post.service';
import { PostRepository } from '../../repositories/post.repository';
import { CategoryRepository } from '../../../category/repositories/category.repository';
import { CreatePostDto } from '../../admin/dtos/create-post.dto';
import { UpdatePostDto } from '../../admin/dtos/update-post.dto';

/**
 * API bai viet pham vi nhom. KHONG viet lai logic CRUD — delegate sang
 * AdminPostService (bo nao dung chung), chi tiem scope groupId:
 *  - list: loc cung theo group
 *  - create: gan group (route param thang the, chong spoof body)
 *  - getOne/update/remove: kiem tra post thuoc dung nhom truoc khi thao tac
 *
 * Xac thuc "thuoc nhom + co quyen" do @PermissionGroup + GroupPermissionGuard lo.
 */
@Injectable()
export class GroupPostService {
  constructor(
    private readonly posts: AdminPostService,
    private readonly postRepo: PostRepository,
    private readonly categoryRepo: CategoryRepository,
  ) {}

  list(groupId: string, query: any) {
    return this.posts.getList({ ...query, groupId });
  }

  async getOne(groupId: string, id: PrimaryKey) {
    await this.assertInGroup(id, groupId);
    return this.posts.getOne(id);
  }

  create(groupId: string, dto: CreatePostDto, actorId?: PrimaryKey) {
    // groupId tu route param đặt sau cùng → ghi đè mọi groupId trong body.
    return this.posts.create({ ...dto, groupId } as any, actorId);
  }

  async update(groupId: string, id: PrimaryKey, dto: UpdatePostDto, actorId?: PrimaryKey) {
    await this.assertInGroup(id, groupId);
    return this.posts.update(id, dto, actorId);
  }

  async remove(groupId: string, id: PrimaryKey) {
    await this.assertInGroup(id, groupId);
    return this.posts.delete(id);
  }

  getCategories() {
    return this.categoryRepo.findRootActiveTree();
  }

  /** Chong sua/xoa bai viet thuoc nhom khac qua route cua nhom minh. */
  private async assertInGroup(id: PrimaryKey, groupId: string) {
    const post = await this.postRepo.findById(id);
    if (!post || String((post as any).groupId ?? '') !== groupId) {
      throw new ForbiddenException('Bài viết không thuộc nhóm này.');
    }
  }
}
