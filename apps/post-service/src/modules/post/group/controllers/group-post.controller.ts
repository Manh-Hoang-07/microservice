import { Controller, Get, Query } from '@nestjs/common';
import { Authenticated, session, ResponseUtil, ParseBigIntPipe } from '@package/common';
import { GroupPostService } from '../services/group-post.service';

@Authenticated()
@Controller('posts/group')
export class GroupPostController {
  constructor(private readonly service: GroupPostService) {}

  @Get('posts')
  async getGroupPosts(
    @Query('groupId', ParseBigIntPipe) groupId: bigint,
    @Query('page') page = '1',
    @Query('limit') limit = '20',
  ) {
    const userId = String(session()!.userId!);
    const currentPage = Math.max(Number(page) || 1, 1);
    const take = Math.min(Number(limit) || 20, 100);
    const skip = (currentPage - 1) * take;

    const { items, total } = await this.service.getGroupPosts(
      userId,
      String(groupId),
      { skip, take },
    );

    return ResponseUtil.paginated(items, currentPage, take, total);
  }

  @Get('post-categories')
  async getGroupPostCategories(
    @Query('groupId', ParseBigIntPipe) groupId: bigint,
  ) {
    const userId = String(session()!.userId!);
    const data = await this.service.getGroupPostCategories(userId, String(groupId));
    return ResponseUtil.success(data);
  }
}
