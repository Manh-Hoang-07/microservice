import { Injectable } from '@nestjs/common';
import { StatsAdminService } from '../../admin/services/stats.service';
import { DailyStatsQueryDto } from '../../admin/dtos/stats-query.dto';

/**
 * Thong ke trong pham vi nhom = thong ke cua cac bai viet thuoc nhom.
 * Delegate sang StatsAdminService voi scope groupId.
 */
@Injectable()
export class GroupStatsService {
  constructor(private readonly stats: StatsAdminService) {}

  getOverview(groupId: string) {
    return this.stats.getOverview(groupId);
  }

  getPostDailyStats(groupId: string, id: string, query: DailyStatsQueryDto) {
    return this.stats.getPostDailyStats(id, query, groupId);
  }
}
