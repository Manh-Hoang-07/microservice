import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { PermissionGroup, ParseBigIntPipe } from '@package/common';
import { GroupCommentService } from '../services/group-comment.service';
import { UpdateCommentStatusDto } from '../../admin/dtos/update-comment-status.dto';
import { ListCommentsAdminQueryDto } from '../../admin/dtos/list-comments.query.dto';

/**
 * Binh luan bai viet nhom. Xem = post.view, kiem duyet = post.update
 * (owner co full quyen loai nhom). groupId tu route param.
 */
@Controller('groups/:groupId/post-comments')
export class GroupCommentController {
  constructor(private readonly service: GroupCommentService) {}

  @PermissionGroup('post.view')
  @Get()
  list(@Param('groupId') groupId: string, @Query() query: ListCommentsAdminQueryDto) {
    return this.service.list(groupId, query);
  }

  @PermissionGroup('post.update')
  @Patch(':id')
  updateStatus(
    @Param('groupId') groupId: string,
    @Param('id', ParseBigIntPipe) id: bigint,
    @Body() body: UpdateCommentStatusDto,
  ) {
    return this.service.updateStatus(groupId, id, body.status);
  }
}
