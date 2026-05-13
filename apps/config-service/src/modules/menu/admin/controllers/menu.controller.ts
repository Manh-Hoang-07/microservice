import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { MenuService } from '../services/menu.service';
import { CreateMenuDto } from '../dtos/create-menu.dto';
import { UpdateMenuDto } from '../dtos/update-menu.dto';
import { QueryMenuDto } from '../dtos/query-menu.dto';
import { Permission, session } from '@package/common';

@Controller('admin/menus')
export class AdminMenuController {
  constructor(
    private readonly service: MenuService,
  ) {}

  @Permission('menu.manage')
  @Get()
  async getList(@Query(ValidationPipe) query: QueryMenuDto) {
    return this.service.getList(query);
  }

  @Permission('menu.manage')
  @Get('tree')
  async getTree() {
    return this.service.getTree();
  }

  @Permission('menu.manage')
  @Get(':id')
  async getOne(@Param('id') id: any) {
    return this.service.getOne(id);
  }

  @Permission('menu.manage')
  @Post()
  async create(@Body() dto: CreateMenuDto) {
    const ctx = session()!;
    const userId = ctx.userId;
    return this.service.createWithUser(dto, userId);
  }

  @Permission('menu.manage')
  @Put(':id')
  async update(
    @Param('id') id: any,
    @Body() dto: UpdateMenuDto,
  ) {
    const ctx = session()!;
    const userId = ctx.userId;
    return this.service.updateById(id, dto, userId);
  }

  @Permission('menu.manage')
  @Delete(':id')
  async delete(@Param('id') id: any) {
    return this.service.delete(id);
  }
}
