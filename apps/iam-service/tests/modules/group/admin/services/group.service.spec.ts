// ---------------------------------------------------------------------------
// Module mocks -- must come before any import
// ---------------------------------------------------------------------------
jest.mock('@package/common', () => {
  class CrudService {
    constructor(protected readonly repository: any) {}
    protected async prepareFilters(q) { return q; }
    protected prepareQuery(q) { return { page: 1, limit: 10, ...q }; }
    async getList(q = {}) {
      const normalized = this.prepareQuery(q);
      const filtered = await this.prepareFilters(normalized);
      if (filtered === false) return { data: [], meta: { total: 0 } };
      return this.repository.findAll(filtered);
    }
    async getOne(id) {
      const entity = await this.repository.findById(id);
      if (!entity) { const e: any = new Error('Not found'); e.status = 404; throw e; }
      return entity;
    }
    protected transform(e) { return e; }
  }

  return {
    t: (_, key) => key,
    CrudService,
    parseQueryOptions: jest.fn(() => ({ skip: 0, take: 10 })),
    createPaginationMeta: jest.fn((_, total) => ({ total })),
    getSessionUserId: jest.fn().mockReturnValue(BigInt(100)),
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

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { ConflictException, NotFoundException } from '@nestjs/common';
import { GroupService } from '../../../../../src/modules/group/admin/services/group.service';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeMockRepo() {
  return {
    findAll: jest.fn().mockResolvedValue({ data: [], meta: { total: 0 } }),
    findById: jest.fn(),
    findByCode: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    getMembers: jest.fn(),
    countMembers: jest.fn(),
    addMember: jest.fn(),
    removeMember: jest.fn(),
    // Run the callback with a fake tx so create/update flows execute.
    withTransaction: jest.fn((fn) => fn({})),
  };
}

function makeMockMemberRoleRepo() {
  return {
    assignByRoleCode: jest.fn(),
  };
}

function createService() {
  const repo = makeMockRepo();
  const memberRoleRepo = makeMockMemberRoleRepo();
  const i18n = {} as any;
  const service = new GroupService(repo as any, memberRoleRepo as any, i18n);
  return { service, repo, memberRoleRepo };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('GroupService', () => {
  afterEach(() => jest.clearAllMocks());

  describe('getOne', () => {
    it('returns the group when found', async () => {
      const { service, repo } = createService();
      const group = { id: BigInt(1), code: 'team-a', name: 'Team A' };
      repo.findById.mockResolvedValue(group);
      const result = await service.getOne(BigInt(1));
      expect(result).toEqual(group);
    });

    it('throws NotFoundException when not found', async () => {
      const { service, repo } = createService();
      repo.findById.mockResolvedValue(null);
      await expect(service.getOne(BigInt(999))).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('creates a group when code is unique', async () => {
      const { service, repo } = createService();
      repo.findByCode.mockResolvedValue(null);
      const created = { id: BigInt(1), code: 'team-b' };
      repo.create.mockResolvedValue(created);

      const result = await service.create({ type: 'team', code: 'team-b', name: 'Team B' } as any);
      expect(result).toEqual(created);
      expect(repo.create).toHaveBeenCalledWith(
        expect.objectContaining({ createdUserId: BigInt(100) }),
        expect.anything(),
      );
    });

    it('throws ConflictException when code exists', async () => {
      const { service, repo } = createService();
      repo.findByCode.mockResolvedValue({ id: BigInt(1) });
      await expect(service.create({ code: 'dup' } as any)).rejects.toThrow(ConflictException);
    });

    it('includes ownerId when provided', async () => {
      const { service, repo } = createService();
      repo.findByCode.mockResolvedValue(null);
      repo.create.mockResolvedValue({ id: BigInt(1) });

      await service.create({ type: 'team', code: 'x', name: 'X', ownerId: '50' } as any);
      expect(repo.create).toHaveBeenCalledWith(
        expect.objectContaining({ ownerId: '50' }),
        expect.anything(),
      );
      // Owner is always added as a member.
      expect(repo.addMember).toHaveBeenCalledWith(BigInt(1), '50', expect.anything());
    });

    it('assigns the group_manager role to the owner (khong phu thuoc loai nhom)', async () => {
      const { service, repo, memberRoleRepo } = createService();
      repo.findByCode.mockResolvedValue(null);
      repo.create.mockResolvedValue({ id: BigInt(7) });

      await service.create({ type: 'post', code: 'p', name: 'P', ownerId: '50' } as any);
      expect(memberRoleRepo.assignByRoleCode).toHaveBeenCalledWith(
        '50', BigInt(7), 'group_manager', expect.anything(),
      );
    });

    it('does not touch owner setup when no ownerId', async () => {
      const { service, repo, memberRoleRepo } = createService();
      repo.findByCode.mockResolvedValue(null);
      repo.create.mockResolvedValue({ id: BigInt(1) });

      await service.create({ type: 'post', code: 'x', name: 'X' } as any);
      expect(repo.addMember).not.toHaveBeenCalled();
      expect(memberRoleRepo.assignByRoleCode).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('updates the group and returns result', async () => {
      const { service, repo } = createService();
      repo.findById.mockResolvedValue({ id: BigInt(1) });
      repo.update.mockResolvedValue({ id: BigInt(1), name: 'Updated' });

      const result = await service.update(BigInt(1), { name: 'Updated' } as any);
      expect(result.name).toBe('Updated');
      expect(repo.update).toHaveBeenCalledWith(
        BigInt(1),
        expect.objectContaining({ updatedUserId: BigInt(100) }),
        expect.anything(),
      );
    });

    it('nullifies ownerId when explicitly set to falsy', async () => {
      const { service, repo } = createService();
      repo.findById.mockResolvedValue({ id: BigInt(1) });
      repo.update.mockResolvedValue({ id: BigInt(1) });

      await service.update(BigInt(1), { ownerId: null } as any);
      expect(repo.update).toHaveBeenCalledWith(
        BigInt(1),
        expect.objectContaining({ ownerId: null }),
        expect.anything(),
      );
    });

    it('assigns group_manager to the owner when owner is set', async () => {
      const { service, repo, memberRoleRepo } = createService();
      repo.findById.mockResolvedValue({ id: BigInt(1), type: 'comic' });
      repo.update.mockResolvedValue({ id: BigInt(1) });

      await service.update(BigInt(1), { ownerId: '99' } as any);
      expect(repo.addMember).toHaveBeenCalledWith(BigInt(1), '99', expect.anything());
      expect(memberRoleRepo.assignByRoleCode).toHaveBeenCalledWith(
        '99', BigInt(1), 'group_manager', expect.anything(),
      );
    });
  });

  describe('delete', () => {
    it('deletes the group', async () => {
      const { service, repo } = createService();
      repo.findById.mockResolvedValue({ id: BigInt(1) });
      repo.delete.mockResolvedValue({});

      const result = await service.delete(BigInt(1));
      expect(result.message).toBe('group.DELETED');
      expect(repo.delete).toHaveBeenCalledWith(BigInt(1));
    });

    it('throws NotFoundException when not found', async () => {
      const { service, repo } = createService();
      repo.findById.mockResolvedValue(null);
      await expect(service.delete(BigInt(999))).rejects.toThrow(NotFoundException);
    });
  });

  describe('getMembers', () => {
    it('returns paginated members', async () => {
      const { service, repo } = createService();
      repo.findById.mockResolvedValue({ id: BigInt(1) });
      repo.getMembers.mockResolvedValue([{ userId: 'u1' }]);
      repo.countMembers.mockResolvedValue(1);

      const result = await service.getMembers(BigInt(1), {});
      expect(result.data).toHaveLength(1);
      expect(result.meta).toBeDefined();
    });
  });

  describe('addMember', () => {
    it('adds member', async () => {
      const { service, repo } = createService();
      repo.findById.mockResolvedValue({ id: BigInt(1) });

      const result = await service.addMember(BigInt(1), { userId: BigInt(42) } as any);
      expect(result.message).toBe('group.MEMBER_ADDED');
      expect(repo.addMember).toHaveBeenCalledWith(BigInt(1), BigInt(42));
    });
  });

  describe('removeMember', () => {
    it('removes member', async () => {
      const { service, repo } = createService();
      repo.findById.mockResolvedValue({ id: BigInt(1) });

      const result = await service.removeMember(BigInt(1), BigInt(42));
      expect(result.message).toBe('group.MEMBER_REMOVED');
      expect(repo.removeMember).toHaveBeenCalledWith(BigInt(1), BigInt(42));
    });
  });
});
