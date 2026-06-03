import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { t } from '@package/common';
import { StatsRepository } from '../../repositories/stats.repository';
import { PostRepository } from '../../../post/repositories/post.repository';
import { DailyStatsQueryDto } from '../dtos/stats-query.dto';
import { toPrimaryKey } from 'src/types';

const MAX_DAYS = 90;
const DEFAULT_DAYS = 29;

@Injectable()
export class StatsAdminService {
  constructor(
    private readonly statsRepo: StatsRepository,
    private readonly postRepo: PostRepository,
    private readonly i18n: I18nService,
  ) {}

  async getOverview() {
    const data = await this.statsRepo.getOverview();
    return {
      posts: data.postCounts,
      views: {
        total: data.totalViews,
        today: data.viewsToday,
        last7Days: data.viewsLast7Days,
        last30Days: data.viewsLast30Days,
      },
    };
  }

  async getPostDailyStats(id: string, query: DailyStatsQueryDto) {
    let postId: bigint;
    try {
      postId = toPrimaryKey(id);
    } catch {
      throw new BadRequestException('Invalid post ID');
    }

    const post = await this.postRepo.findById(postId);
    if (!post) throw new NotFoundException(t(this.i18n, 'post.POST_NOT_FOUND'));

    const end = query.endDate ? new Date(query.endDate) : new Date();
    end.setHours(23, 59, 59, 999);

    let start: Date;
    if (query.startDate) {
      start = new Date(query.startDate);
      start.setHours(0, 0, 0, 0);
    } else {
      start = new Date(end);
      start.setDate(start.getDate() - DEFAULT_DAYS);
      start.setHours(0, 0, 0, 0);
    }

    // Cap tối đa 90 ngày để tránh query quá lớn
    const diffDays = Math.ceil((end.getTime() - start.getTime()) / 86400000);
    if (diffDays > MAX_DAYS) {
      start = new Date(end);
      start.setDate(start.getDate() - MAX_DAYS);
      start.setHours(0, 0, 0, 0);
    }

    const [stats, daily] = await Promise.all([
      this.statsRepo.getPostStats(postId),
      this.statsRepo.getDailyStatsForPost(postId, start, end),
    ]);

    return {
      postId: post.id,
      name: post.name,
      slug: post.slug,
      totalViews: stats?.viewCount ?? BigInt(0),
      daily: daily.map((d) => ({
        date: d.statDate.toISOString().slice(0, 10),
        viewCount: d.viewCount,
      })),
    };
  }
}
