import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Permission, session } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { AdminCategoryService } from '../services/category.service';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { ListCategoriesAdminQueryDto } from '../dtos/list-categories.query.dto';

@Controller('admin/comic-categories')
export class AdminCategoryController {
  constructor(private readonly categoryService: AdminCategoryService) {}

  @Permission('comic.manage')
  @Get()
  async getList(@Query() query: ListCategoriesAdminQueryDto) {
    return this.categoryService.getList(query);
  }

  @Permission('comic.manage')
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.categoryService.getOne(toPrimaryKey(id));
  }

  @Permission('comic.manage')
  @Post()
  async create(@Body() dto: CreateCategoryDto) {
    const ctx = session()!;
    const actorId = ctx.userId ? toPrimaryKey(ctx.userId) : undefined;
    return this.categoryService.create(dto, actorId);
  }

  @Permission('comic.manage')
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    const ctx = session()!;
    const actorId = ctx.userId ? toPrimaryKey(ctx.userId) : undefined;
    return this.categoryService.update(toPrimaryKey(id), dto, actorId);
  }

  @Permission('comic.manage')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.categoryService.delete(toPrimaryKey(id));
  }
}
