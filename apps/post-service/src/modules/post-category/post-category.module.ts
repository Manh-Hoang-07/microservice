import { Module } from '@nestjs/common';
import { AdminPostCategoryController } from './admin/controllers/post-category.controller';
import { AdminPostCategoryService } from './admin/services/post-category.service';
import { PublicPostCategoryController } from './public/controllers/post-category.controller';
import { PublicPostCategoryService } from './public/services/post-category.service';

@Module({
  controllers: [AdminPostCategoryController, PublicPostCategoryController],
  providers: [AdminPostCategoryService, PublicPostCategoryService],
})
export class PostCategoryModule {}
