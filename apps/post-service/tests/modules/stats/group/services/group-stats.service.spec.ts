// ---------------------------------------------------------------------------
// Module mocks
// ---------------------------------------------------------------------------
jest.mock('../../../../../src/modules/stats/admin/services/stats.service', () => ({ StatsAdminService: jest.fn() }));

// ---------------------------------------------------------------------------
import { GroupStatsService } from '../../../../../src/modules/stats/group/services/group-stats.service';

function makeService() {
  const stats = {
    getOverview: jest.fn().mockResolvedValue({ posts: {}, views: {} }),
    getPostDailyStats: jest.fn().mockResolvedValue({ postId: BigInt(1), daily: [] }),
  };
  const service = new GroupStatsService(stats as any);
  return { service, stats };
}

describe('GroupStatsService (delegator)', () => {
  afterEach(() => jest.clearAllMocks());

  it('getOverview truyen groupId xuong admin service', async () => {
    const { service, stats } = makeService();
    await service.getOverview('10');
    expect(stats.getOverview).toHaveBeenCalledWith('10');
  });

  it('getPostDailyStats truyen groupId de verify pham vi', async () => {
    const { service, stats } = makeService();
    await service.getPostDailyStats('10', '5', { startDate: '2026-01-01' } as any);
    expect(stats.getPostDailyStats).toHaveBeenCalledWith('5', { startDate: '2026-01-01' }, '10');
  });
});
