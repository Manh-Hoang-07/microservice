import { Controller, Get, Query } from '@nestjs/common';
import { Authenticated, session, ResponseUtil, ParseBigIntPipe } from '@package/common';
import { GroupChapterService } from '../services/group-chapter.service';

@Authenticated()
@Controller('comics/group')
export class GroupChapterController {
  constructor(private readonly service: GroupChapterService) {}

  @Get('chapters')
  async getGroupChapters(
    @Query('groupId', ParseBigIntPipe) groupId: bigint,
    @Query('page') page = '1',
    @Query('limit') limit = '20',
  ) {
    const userId = String(session()!.userId!);
    const currentPage = Math.max(Number(page) || 1, 1);
    const take = Math.min(Number(limit) || 20, 100);
    const skip = (currentPage - 1) * take;

    const { items, total } = await this.service.getGroupChapters(
      userId,
      String(groupId),
      { skip, take },
    );

    return ResponseUtil.paginated(items, currentPage, take, total);
  }
}
