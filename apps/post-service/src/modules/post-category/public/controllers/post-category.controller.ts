import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@package/common';
import { PublicPostCategoryService } from '../services/post-category.service';

@ApiTags('Public Post Categories')
@Controller('public/post-categories')
export class PublicPostCategoryController {
  constructor(private readonly categoryService: PublicPostCategoryService) {}

  @Public()
  @Get()
  async getAll() {
    return this.categoryService.getAll();
  }
}
