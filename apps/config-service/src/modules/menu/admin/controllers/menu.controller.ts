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
  Req,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { MenuService } from '../services/menu.service';
import { CreateMenuDto } from '../dtos/create-menu.dto';
import { UpdateMenuDto } from '../dtos/update-menu.dto';
import { QueryMenuDto } from '../dtos/query-menu.dto';
import { Permission } from '@package/common';

@ApiTags('Menus')
@ApiBearerAuth('access-token')
@Controller()
export class AdminMenuController {
  constructor(private readonly service: MenuService) {}

  @Permission('menu.manage')
  @Get('menus/admin')
  async getList(@Query(ValidationPipe) query: QueryMenuDto) {
    return this.service.getList(query);
  }

  @Permission('menu.manage')
  @Get('menus/admin/tree')
  async getTree() {
    return this.service.getTree();
  }

  @Permission('menu.manage')
  @Get('menus/admin/:id')
  async getOne(@Param('id') id: any) {
    return this.service.getOne(id);
  }

  @Permission('menu.manage')
  @Post('menus')
  async create(@Body() dto: CreateMenuDto, @Req() req: any) {
    const userId = req.user?.sub ?? req.user?.id;
    return this.service.createWithUser(dto, userId);
  }

  @Permission('menu.manage')
  @Put('menus/:id')
  async update(
    @Param('id') id: any,
    @Body() dto: UpdateMenuDto,
    @Req() req: any,
  ) {
    const userId = req.user?.sub ?? req.user?.id;
    return this.service.updateById(id, dto, userId);
  }

  @Permission('menu.manage')
  @Delete('menus/:id')
  async delete(@Param('id') id: any) {
    return this.service.delete(id);
  }
}
