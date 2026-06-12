import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PermissionGroup, ParseBigIntPipe, session } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { GroupPostService } from '../services/group-post.service';
import { CreatePostDto } from '../../admin/dtos/create-post.dto';
import { UpdatePostDto } from '../../admin/dtos/update-post.dto';
import { ListPostsAdminQueryDto } from '../../admin/dtos/list-posts.query.dto';

/**
 * Bai viet trong pham vi nhom. `@PermissionGroup` = dang nhap + thuoc nhom +
 * co quyen thao tac (owner co full quyen loai nhom). groupId lay tu route param.
 */
@Controller('groups/:groupId/posts')
export class GroupPostController {
  constructor(private readonly service: GroupPostService) {}

  @PermissionGroup('post.view')
  @Get()
  list(@Param('groupId') groupId: string, @Query() query: ListPostsAdminQueryDto) {
    return this.service.list(groupId, query);
  }

  // Khai bao truoc :id de khong bi route param nuot.
  @PermissionGroup('post.view')
  @Get('categories')
  categories(@Param('groupId') _groupId: string) {
    return this.service.getCategories();
  }

  @PermissionGroup('post.view')
  @Get(':id')
  getOne(@Param('groupId') groupId: string, @Param('id', ParseBigIntPipe) id: bigint) {
    return this.service.getOne(groupId, id);
  }

  @PermissionGroup('post.create')
  @Post()
  create(@Param('groupId') groupId: string, @Body() dto: CreatePostDto) {
    const actorId = session()?.userId ? toPrimaryKey(session()!.userId!) : undefined;
    return this.service.create(groupId, dto, actorId);
  }

  @PermissionGroup('post.update')
  @Put(':id')
  update(
    @Param('groupId') groupId: string,
    @Param('id', ParseBigIntPipe) id: bigint,
    @Body() dto: UpdatePostDto,
  ) {
    const actorId = session()?.userId ? toPrimaryKey(session()!.userId!) : undefined;
    return this.service.update(groupId, id, dto, actorId);
  }

  @PermissionGroup('post.delete')
  @Delete(':id')
  remove(@Param('groupId') groupId: string, @Param('id', ParseBigIntPipe) id: bigint) {
    return this.service.remove(groupId, id);
  }
}
