import { Module } from '@nestjs/common';
import { AdminPostCategoryController } from './admin/controllers/post-category.controller';
import { AdminPostCategoryService } from './admin/services/post-category.service';
import { PublicPostCategoryController } from './public/controllers/post-category.controller';
import { PublicPostCategoryService } from './public/services/post-category.service';
import { PostCategoryRepository } from './repositories/post-category.repository';

@Module({
  controllers: [AdminPostCategoryController, PublicPostCategoryController],
  providers: [PostCategoryRepository, AdminPostCategoryService, PublicPostCategoryService],
  exports: [PostCategoryRepository],
})
export class PostCategoryModule {}
