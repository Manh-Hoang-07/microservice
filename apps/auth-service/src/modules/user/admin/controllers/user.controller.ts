import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Permission } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { AdminUserService } from '../services/user.service';
import { UserQueryDto } from '../dtos/user-query.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { AdminChangePasswordDto } from '../dtos/admin-change-password.dto';
import { ChangeStatusDto } from '../dtos/change-status.dto';

@Controller('admin/users')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @Permission('user.manage')
  @Get()
  getList(@Query() query: UserQueryDto) {
    return this.adminUserService.getList(query);
  }

  @Permission('user.manage')
  @Get('simple')
  getSimpleList(@Query() query: UserQueryDto) {
    return this.adminUserService.getSimpleList(query);
  }

  @Permission('user.manage')
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.adminUserService.getOne(toPrimaryKey(id));
  }

  @Permission('user.manage')
  @Post()
  create(@Body() dto: CreateUserDto, @Req() req: Request) {
    const actorId = (req as any).user?.sub
      ? toPrimaryKey((req as any).user.sub)
      : undefined;
    return this.adminUserService.create(dto, actorId);
  }

  @Permission('user.manage')
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @Req() req: Request,
  ) {
    const actorId = (req as any).user?.sub
      ? toPrimaryKey((req as any).user.sub)
      : undefined;
    return this.adminUserService.update(toPrimaryKey(id), dto, actorId);
  }

  @Permission('user.manage')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.adminUserService.delete(toPrimaryKey(id));
  }

  @Permission('user.manage')
  @Patch(':id/password')
  changePassword(
    @Param('id') id: string,
    @Body() dto: AdminChangePasswordDto,
  ) {
    return this.adminUserService.changePassword(toPrimaryKey(id), dto);
  }

  @Permission('user.manage')
  @Patch(':id/status')
  changeStatus(@Param('id') id: string, @Body() dto: ChangeStatusDto) {
    return this.adminUserService.changeStatus(toPrimaryKey(id), dto);
  }
}
