import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Permission } from '@package/common';
import { AdminPostCategoryService } from '../services/post-category.service';
import { CreatePostCategoryDto } from '../dtos/create-post-category.dto';
import { UpdatePostCategoryDto } from '../dtos/update-post-category.dto';

@ApiTags('Admin Post Categories')
@Controller('admin/post-categories')
export class AdminPostCategoryController {
  constructor(private readonly categoryService: AdminPostCategoryService) {}

  @Permission('post.manage')
  @Get()
  async getList(@Query() query: any) {
    return this.categoryService.getList(query);
  }

  @Permission('post.manage')
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.categoryService.getOne(BigInt(id));
  }

  @Permission('post.manage')
  @Post()
  async create(@Body() dto: CreatePostCategoryDto) {
    return this.categoryService.create(dto);
  }

  @Permission('post.manage')
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePostCategoryDto) {
    return this.categoryService.update(BigInt(id), dto);
  }

  @Permission('post.manage')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.categoryService.delete(BigInt(id));
  }
}
