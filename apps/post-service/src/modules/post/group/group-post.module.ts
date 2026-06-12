import { Module } from '@nestjs/common';
import { GroupPostController } from './controllers/group-post.controller';
import { GroupPostService } from './services/group-post.service';
import { AdminPostService } from '../admin/services/post.service';
import { PostRepository } from '../repositories/post.repository';
import { CategoryModule } from '../../category/category.module';

@Module({
  imports: [CategoryModule],
  controllers: [GroupPostController],
  // Delegator dung lai AdminPostService (bo nao CRUD) + PostRepository.
  // Xac thuc nhom do GroupPermissionGuard (global) lo, khong can IamClient.
  providers: [GroupPostService, AdminPostService, PostRepository],
})
export class GroupPostModule {}
