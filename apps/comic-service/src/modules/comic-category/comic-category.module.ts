import { Module } from '@nestjs/common';
import { AdminCategoryController } from './admin/controllers/comic-category.controller';
import { AdminCategoryService } from './admin/services/comic-category.service';
import { PublicCategoryController } from './public/controllers/comic-category.controller';
import { PublicCategoryService } from './public/services/comic-category.service';

@Module({
  controllers: [AdminCategoryController, PublicCategoryController],
  providers: [AdminCategoryService, PublicCategoryService],
})
export class ComicCategoryModule {}
