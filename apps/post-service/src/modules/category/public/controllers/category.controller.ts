import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@package/common';
import { PublicCategoryService } from '../services/category.service';

@ApiTags('Public Post Categories')
@Controller('public/post-categories')
export class PublicCategoryController {
  constructor(private readonly categoryService: PublicCategoryService) {}

  @Public()
  @Get()
  async getAll() {
    return this.categoryService.getAll();
  }
}
