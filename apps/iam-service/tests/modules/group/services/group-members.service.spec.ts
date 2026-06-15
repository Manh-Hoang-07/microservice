// ---------------------------------------------------------------------------
// Module mocks — must come before any import
// ---------------------------------------------------------------------------
jest.mock('@package/common', () => ({
  parseQueryOptions: (q: any) => {
    const page = Number(q?.page) || 1;
    const take = Number(q?.limit) || 10;
    return { page, skip: (page - 1) * take, take };
  },
  createPaginationMeta: (opts: any, total: number) => ({ total, page: opts.page, take: opts.take }),
}));

jest.mock('src/generated/prisma', () => ({ PrismaClient: class {}, Prisma: {} }), { virtual: true });
jest.mock('@prisma/adapter-pg', () => ({ PrismaPg: jest.fn() }));
jest.mock('src/types', () => ({ toPrimaryKey: (v: any) => BigInt(v) }), { virtual: true });
jest.mock('../../../../src/core/database/prisma.service', () => ({ PrismaService: jest.fn() }), { virtual: true });
jest.mock('../../../../src/modules/group/repositories/group.repository', () => ({ GroupRepository: jest.fn() }), { virtual: true });
jest.mock('../../../../src/modules/group/repositories/group-member-role.repository', () => ({ GroupMemberRoleRepository: jest.fn() }), { virtual: true });

import { GroupMembersService } from '../../../../src/modules/group/services/group-members.service';

function makeService({
  memberIds = [] as bigint[],
  roleUserIds = [] as bigint[],
  users = [] as any[],
  memberCount = 0,
} = {}) {
  const groupRepo = {
    findMemberIds: jest.fn().mockResolvedValue(memberIds),
    countMembers: jest.fn().mockResolvedValue(memberCount),
  };
  const memberRoleRepo = {
    findUserIdsByRole: jest.fn().mockResolvedValue(roleUserIds),
  };
  const authClient = {
    getUsersByIds: jest.fn().mockResolvedValue(users),
  };
  const service = new GroupMembersService(groupRepo as any, memberRoleRepo as any, authClient as any);
  return { service, groupRepo, memberRoleRepo, authClient };
}

describe('GroupMembersService.listMembers', () => {
  afterEach(() => jest.clearAllMocks());

  it('returns empty (total 0) when group has no members, without calling auth', async () => {
    const { service, authClient } = makeService({ memberIds: [] });
    const result = await service.listMembers('10', {});
    expect(result.data).toEqual([]);
    expect(result.meta.total).toBe(0);
    expect(authClient.getUsersByIds).not.toHaveBeenCalled();
  });

  describe('no search — paginate ids first, total from DB count', () => {
    it('fetches ONLY the page of ids from auth and uses real countMembers as total', async () => {
      const memberIds = [1n, 2n, 3n, 4n, 5n];
      const users = [{ id: '1' }, { id: '2' }];
      const { service, authClient, groupRepo } = makeService({
        memberIds,
        users,
        memberCount: 4321, // group bigger than the capped id list
      });

      const result = await service.listMembers('10', { page: 1, limit: 2 });

      // Only the first 2 ids are sent to auth — NOT all 5 (no over-fetch).
      expect(authClient.getUsersByIds).toHaveBeenCalledWith(['1', '2']);
      // total comes from the real DB count, not the capped id-array length.
      expect(groupRepo.countMembers).toHaveBeenCalledWith(10n);
      expect(result.meta.total).toBe(4321);
      expect(result.data).toEqual(users);
    });

    it('second page slices the next window of ids', async () => {
      const memberIds = [1n, 2n, 3n, 4n, 5n];
      const { service, authClient } = makeService({ memberIds, memberCount: 5 });

      await service.listMembers('10', { page: 2, limit: 2 });

      expect(authClient.getUsersByIds).toHaveBeenCalledWith(['3', '4']);
    });

    it('does not call auth when the page is beyond the id list', async () => {
      const { service, authClient } = makeService({ memberIds: [1n, 2n], memberCount: 2 });
      const result = await service.listMembers('10', { page: 5, limit: 10 });
      expect(authClient.getUsersByIds).not.toHaveBeenCalled();
      expect(result.meta.total).toBe(2);
    });

    it('roleId filter: total is the intersection size, paginates intersection ids', async () => {
      const { service, authClient, memberRoleRepo } = makeService({
        memberIds: [1n, 2n, 3n, 4n],
        roleUserIds: [2n, 4n],
        memberCount: 4,
      });

      const result = await service.listMembers('10', { roleId: '7', page: 1, limit: 1 });

      expect(memberRoleRepo.findUserIdsByRole).toHaveBeenCalledWith('10', '7');
      // intersection = [2,4]; page 1 limit 1 → ['2']
      expect(authClient.getUsersByIds).toHaveBeenCalledWith(['2']);
      expect(result.meta.total).toBe(2);
    });
  });

  describe('search — JS filter/sort/slice over candidate ids', () => {
    it('filters by name/email/username and sorts', async () => {
      const users = [
        { id: '1', name: 'Bob', email: 'bob@x.com', username: 'bob', status: 'active' },
        { id: '2', name: 'Alice', email: 'alice@x.com', username: 'alice', status: 'active' },
        { id: '3', name: 'Zed', email: 'zed@x.com', username: 'zed', status: 'active' },
      ];
      const { service, authClient } = makeService({ memberIds: [1n, 2n, 3n], users });

      const result = await service.listMembers('10', { search: 'li', sort: 'name:asc' });

      // only Alice matches "li"
      expect(authClient.getUsersByIds).toHaveBeenCalledWith(['1', '2', '3']);
      expect(result.data.map((u: any) => u.id)).toEqual(['2']);
      expect(result.meta.total).toBe(1);
    });
  });
});
