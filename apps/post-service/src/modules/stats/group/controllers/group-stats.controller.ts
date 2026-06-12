import { Controller, Get, Param, Query } from '@nestjs/common';
import { PermissionGroup } from '@package/common';
import { GroupStatsService } from '../services/group-stats.service';
import { DailyStatsQueryDto } from '../../admin/dtos/stats-query.dto';

/**
 * Thong ke bai viet nhom. Xem = post.view (owner co full quyen loai nhom).
 * groupId tu route param.
 */
@Controller('groups/:groupId/stats')
export class GroupStatsController {
  constructor(private readonly service: GroupStatsService) {}

  @PermissionGroup('post.view')
  @Get('overview')
  getOverview(@Param('groupId') groupId: string) {
    return this.service.getOverview(groupId);
  }

  @PermissionGroup('post.view')
  @Get('posts/:id/daily')
  getPostDailyStats(
    @Param('groupId') groupId: string,
    @Param('id') id: string,
    @Query() query: DailyStatsQueryDto,
  ) {
    return this.service.getPostDailyStats(groupId, id, query);
  }
}
