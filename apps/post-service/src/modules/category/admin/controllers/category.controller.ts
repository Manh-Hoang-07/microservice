import { Controller, Get, Post, Put, Delete, Body, Param, Query, Req } from '@nestjs/common';
import { Permission } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { AdminCategoryService } from '../services/category.service';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { ListCategoriesAdminQueryDto } from '../dtos/list-categories.query.dto';

@Controller('admin/post-categories')
export class AdminCategoryController {
  constructor(private readonly categoryService: AdminCategoryService) {}

  @Permission('post.manage')
  @Get()
  async getList(@Query() query: ListCategoriesAdminQueryDto) {
    return this.categoryService.getList(query);
  }

  @Permission('post.manage')
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.categoryService.getOne(toPrimaryKey(id));
  }

  @Permission('post.manage')
  @Post()
  async create(@Body() dto: CreateCategoryDto, @Req() req: Request) {
    const actorId = (req as any).user?.sub ? toPrimaryKey((req as any).user.sub) : undefined;
    return this.categoryService.create(dto, actorId);
  }

  @Permission('post.manage')
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto, @Req() req: Request) {
    const actorId = (req as any).user?.sub ? toPrimaryKey((req as any).user.sub) : undefined;
    return this.categoryService.update(toPrimaryKey(id), dto, actorId);
  }

  @Permission('post.manage')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.categoryService.delete(toPrimaryKey(id));
  }
}
