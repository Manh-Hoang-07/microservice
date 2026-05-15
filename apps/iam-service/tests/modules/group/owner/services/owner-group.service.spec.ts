// ---------------------------------------------------------------------------
// Module mocks -- must come before any import
// ---------------------------------------------------------------------------
jest.mock('@package/common', () => {
  // Minimal ListService implementation for tests
  class ListService {
    constructor(protected readonly repository) {}
    protected prepareQuery(q) {
      return { page: 1, limit: 10, ...q };
    }
    protected async prepareFilters(q) {
      return q;
    }
    async getList(query = {}) {
      const normalized = this.prepareQuery(query);
      const filtered = await this.prepareFilters(normalized);
      if (filtered === false) return { data: [], meta: { total: 0 } };
      return this.repository.findAll(filtered);
    }
    async getOne(id) {
      const entity = await this.repository.findById(id);
      if (!entity) throw new Error(`Not found: ${id}`);
      return entity;
    }
  }

  return {
    t: (_, key) => key,
    ListService,
    parseQueryOptions: jest.fn(() => ({ skip: 0, take: 10 })),
    createPaginationMeta: jest.fn((_, total) => ({ total })),
    session: jest.fn(),
  };
});

jest.mock('@package/bootstrap', () => ({ FileLogger: jest.fn() }));

jest.mock('nestjs-i18n', () => ({
  I18nContext: { current: () => ({ lang: 'en' }) },
  I18nService: jest.fn(),
}));

jest.mock('src/types', () => ({
  toPrimaryKey: (v) => BigInt(v),
}), { virtual: true });

jest.mock('src/generated/prisma', () => ({ PrismaClient: jest.fn(), Prisma: {} }), { virtual: true });
jest.mock('@prisma/adapter-pg', () => ({ PrismaPg: jest.fn() }));
jest.mock('../../../../../src/core/database/prisma.service', () => ({ PrismaService: jest.fn() }));
jest.mock('../../../../../src/modules/group/repositories/group.repository', () => ({ GroupRepository: jest.fn() }));
jest.mock('../../../../../src/rbac/services/rbac-cache.service', () => ({ RbacCacheService: jest.fn() }));
jest.mock('../../../../../src/rbac/repositories/rbac.repository', () => ({ RbacRepository: jest.fn() }));
jest.mock('@package/redis', () => ({ RedisService: jest.fn() }));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { BadRequestException } from '@nestjs/common';
import { OwnerGroupService } from '../../../../../src/modules/group/owner/services/owner-group.service';
import { session } from '@package/common';

const mockSession = session as jest.Mock;

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------
function makeService() {
  const groupRepo = {
    findAll: jest.fn().mockResolvedValue({ data: [], meta: { total: 0 } }),
    findById: jest.fn().mockResolvedValue(null),
    getMembers: jest.fn().mockResolvedValue([]),
    countMembers: jest.fn().mockResolvedValue(0),
    addMember: jest.fn().mockResolvedValue({}),
    removeMember: jest.fn().mockResolvedValue({}),
  } as any;

  const rbacCache = {
    clearAllUserCaches: jest.fn().mockResolvedValue(undefined),
  } as any;

  const rbacRepo = {
    findInvalidRolesForContext: jest.fn().mockResolvedValue([]),
    assignRoleToUser: jest.fn().mockResolvedValue({}),
  } as any;

  const prisma = {
    roleContext: { findMany: jest.fn().mockResolvedValue([]) },
    userRoleAssignment: {
      findMany: jest.fn().mockResolvedValue([]),
      deleteMany: jest.fn().mockResolvedValue({}),
    },
    userGroup: { findUnique: jest.fn().mockResolvedValue({ userId: 1n }) },
  } as any;

  const i18n = {} as any;

  const service = new OwnerGroupService(groupRepo, rbacCache, rbacRepo, prisma, i18n);
  return { service, groupRepo, rbacCache, rbacRepo, prisma };
}

const MOCK_GROUP = { id: 10n, contextId: 5n, ownerId: 1n };

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('OwnerGroupService.getList (prepareFilters)', () => {
  afterEach(() => jest.clearAllMocks());

  it('injects ownerId from session into query before calling findAll', async () => {
    const { service, groupRepo } = makeService();
    mockSession.mockReturnValue({ userId: '42' });
    groupRepo.findAll.mockResolvedValue({ data: [MOCK_GROUP], meta: { total: 1 } });

    const result = await service.getList({});

    expect(groupRepo.findAll).toHaveBeenCalledWith(
      expect.objectContaining({ ownerId: '42' }),
    );
    expect(result.data).toEqual([MOCK_GROUP]);
  });

  it('returns empty list when session has no userId', async () => {
    const { service, groupRepo } = makeService();
    mockSession.mockReturnValue(null);

    const result = await service.getList({});

    expect(groupRepo.findAll).not.toHaveBeenCalled();
    expect(result.data).toEqual([]);
  });
});

describe('OwnerGroupService.addMember', () => {
  afterEach(() => jest.clearAllMocks());

  it('calls addMember and clears RBAC cache', async () => {
    const { service, groupRepo, rbacCache } = makeService();
    const result = await service.addMember(10n, '99');
    expect(groupRepo.addMember).toHaveBeenCalledWith(10n, 99n);
    expect(rbacCache.clearAllUserCaches).toHaveBeenCalledWith(99n);
    expect(result.message).toBe('group.MEMBER_ADDED');
  });
});

describe('OwnerGroupService.removeMember', () => {
  afterEach(() => jest.clearAllMocks());

  it('calls removeMember and clears RBAC cache', async () => {
    const { service, groupRepo, rbacCache } = makeService();
    const result = await service.removeMember(10n, '99');
    expect(groupRepo.removeMember).toHaveBeenCalledWith(10n, 99n);
    expect(rbacCache.clearAllUserCaches).toHaveBeenCalledWith(99n);
    expect(result.message).toBe('group.MEMBER_REMOVED');
  });
});

describe('OwnerGroupService.getAvailableRoles', () => {
  afterEach(() => jest.clearAllMocks());

  it('queries roleContext by group contextId and maps to roles', async () => {
    const { service, prisma } = makeService();
    const mockRole = { id: 1n, code: 'viewer', name: 'Viewer', status: 'active' };
    prisma.roleContext.findMany.mockResolvedValue([{ role: mockRole }]);

    const result = await service.getAvailableRoles(MOCK_GROUP);

    expect(prisma.roleContext.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: expect.objectContaining({ contextId: MOCK_GROUP.contextId }) }),
    );
    expect(result).toEqual([mockRole]);
  });
});

describe('OwnerGroupService.assignRole', () => {
  afterEach(() => jest.clearAllMocks());

  it('throws BadRequest when role is not in group context', async () => {
    const { service, rbacRepo } = makeService();
    rbacRepo.findInvalidRolesForContext.mockResolvedValue(['7']);

    await expect(service.assignRole(MOCK_GROUP, '99', '7')).rejects.toThrow(BadRequestException);
    expect(rbacRepo.assignRoleToUser).not.toHaveBeenCalled();
  });

  it('throws BadRequest when userId is not a group member', async () => {
    const { service, prisma } = makeService();
    prisma.userGroup.findUnique.mockResolvedValue(null);

    await expect(service.assignRole(MOCK_GROUP, '99', '7')).rejects.toThrow(BadRequestException);
  });

  it('assigns role and clears cache on success', async () => {
    const { service, rbacRepo, rbacCache } = makeService();
    const result = await service.assignRole(MOCK_GROUP, '99', '7');
    expect(rbacRepo.assignRoleToUser).toHaveBeenCalledWith(99n, 7n, MOCK_GROUP.id);
    expect(rbacCache.clearAllUserCaches).toHaveBeenCalledWith(99n);
    expect(result.message).toBe('group.ROLE_ASSIGNED');
  });
});

describe('OwnerGroupService.revokeRole', () => {
  afterEach(() => jest.clearAllMocks());

  it('deletes assignment and clears cache', async () => {
    const { service, prisma, rbacCache } = makeService();
    const result = await service.revokeRole(MOCK_GROUP, '99', '7');
    expect(prisma.userRoleAssignment.deleteMany).toHaveBeenCalledWith({
      where: { userId: 99n, roleId: 7n, groupId: MOCK_GROUP.id },
    });
    expect(rbacCache.clearAllUserCaches).toHaveBeenCalledWith(99n);
    expect(result.message).toBe('group.ROLE_REVOKED');
  });
});

