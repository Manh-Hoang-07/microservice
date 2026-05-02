import { Controller, Get } from '@nestjs/common';
import { Public } from '@package/common';
import { PublicCategoryService } from '../services/category.service';

@Controller('public/post-categories')
export class PublicCategoryController {
  constructor(private readonly categoryService: PublicCategoryService) {}

  @Public()
  @Get()
  async getAll() {
    return this.categoryService.getAll();
  }
}
