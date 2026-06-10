import { Controller, Get, Query } from '@nestjs/common';
import { Authenticated, session, ResponseUtil, ParseBigIntPipe } from '@package/common';
import { GroupComicService } from '../services/group-comic.service';

@Authenticated()
@Controller('comics/group')
export class GroupComicController {
  constructor(private readonly service: GroupComicService) {}

  @Get('comics')
  async getGroupComics(
    @Query('groupId', ParseBigIntPipe) groupId: bigint,
    @Query('page') page = '1',
    @Query('limit') limit = '20',
  ) {
    const userId = String(session()!.userId!);
    const currentPage = Math.max(Number(page) || 1, 1);
    const take = Math.min(Number(limit) || 20, 100);
    const skip = (currentPage - 1) * take;

    const { items, total } = await this.service.getGroupComics(
      userId,
      String(groupId),
      { skip, take },
    );

    return ResponseUtil.paginated(items, currentPage, take, total);
  }
}
