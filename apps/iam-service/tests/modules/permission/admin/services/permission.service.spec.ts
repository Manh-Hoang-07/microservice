// ---------------------------------------------------------------------------
// Module mocks -- must come before any import
// ---------------------------------------------------------------------------
jest.mock('@package/common', () => ({
  t: (_i18n: any, key: string) => key,
  parseQueryOptions: jest.fn((q: any) => ({ skip: 0, take: 10, orderBy: {} })),
  createPaginationMeta: jest.fn((_opts, total) => ({ total })),
}));

jest.mock('@package/bootstrap', () => ({ FileLogger: jest.fn() }));

jest.mock('nestjs-i18n', () => ({
  I18nContext: { current: () => ({ lang: 'en' }) },
  I18nService: jest.fn(),
}));

jest.mock('src/types', () => ({
  toPrimaryKey: (v: string) => BigInt(v),
}), { virtual: true });

jest.mock('src/generated/prisma', () => ({
  PrismaClient: jest.fn(),
  Prisma: {},
}), { virtual: true });

jest.mock('@prisma/adapter-pg', () => ({
  PrismaPg: jest.fn(),
}));

jest.mock('../../../../../src/core/database/prisma.service', () => ({
  PrismaService: jest.fn(),
}));

jest.mock('../../../../../src/modules/permission/repositories/permission.repository', () => ({
  PermissionRepository: jest.fn(),
}));

jest.mock('../../../../../src/rbac/services/rbac-cache.service', () => ({
  RbacCacheService: jest.fn(),
}));

jest.mock('../../../../../src/rbac/services/rbac-permission-index.service', () => ({
  RbacPermissionIndexService: jest.fn(),
}));

jest.mock('@package/redis', () => ({
  RedisService: jest.fn(),
}));

jest.mock('../../../../../src/rbac/repositories/rbac.repository', () => ({
  RbacRepository: jest.fn(),
}));

jest.mock('../../../../../src/helpers/hierarchy.helper', () => ({
  assertNoCycle: jest.fn(),
}));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { ConflictException, NotFoundException } from '@nestjs/common';
import { PermissionService } from '../../../../../src/modules/permission/admin/services/permission.service';
import { assertNoCycle } from '../../../../../src/helpers/hierarchy.helper';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeMockRepo() {
  return {
    findMany: jest.fn(),
    count: jest.fn(),
    findById: jest.fn(),
    findByCode: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    getParentId: jest.fn(),
  };
}

function makeMockRbacCache() {
  return { bumpVersion: jest.fn().mockResolvedValue(undefined) };
}

function makeMockPermIndex() {
  return { publishRefresh: jest.fn().mockResolvedValue(undefined) };
}

function makeMockRbacService() {
  // By default the caller is a super-admin so existing tests stay green.
  // Tests that exercise the hierarchy restriction override hasCode.
  return {
    getPermissions: jest.fn().mockResolvedValue(new Set(['system.manage'])),
    hasCode: jest.fn((assigned: Set<string>, need: string) => assigned.has(need)),
  };
}

function makeMockI18n() {
  return {} as any;
}

function createService(overrides: Record<string, any> = {}) {
  const repo = overrides.repo ?? makeMockRepo();
  const rbacCache = overrides.rbacCache ?? makeMockRbacCache();
  const permIndex = overrides.permIndex ?? makeMockPermIndex();
  const rbacService = overrides.rbacService ?? makeMockRbacService();
  const i18n = overrides.i18n ?? makeMockI18n();

  const service = new (PermissionService as any)(repo, rbacCache, permIndex, rbacService, i18n);
  return { service, repo, rbacCache, permIndex, rbacService, i18n };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('PermissionService', () => {
  // --- getOne ---
  describe('getOne', () => {
    it('should return the permission when found', async () => {
      const { service, repo } = createService();
      const perm = { id: BigInt(1), code: 'role.view' };
      repo.findById.mockResolvedValue(perm);

      const result = await service.getOne(BigInt(1));
      expect(result).toEqual(perm);
    });

    it('should throw NotFoundException when not found', async () => {
      const { service, repo } = createService();
      repo.findById.mockResolvedValue(null);

      await expect(service.getOne(BigInt(999))).rejects.toThrow(NotFoundException);
    });
  });

  // --- create ---
  describe('create', () => {
    it('should create permission when code is unique', async () => {
      const { service, repo, rbacCache, permIndex } = createService();
      repo.findByCode.mockResolvedValue(null);
      const created = { id: BigInt(1), code: 'new.perm' };
      repo.create.mockResolvedValue(created);

      const result = await service.create(
        { code: 'new.perm', name: 'New Perm' } as any,
        BigInt(100),
      );
      expect(result).toEqual(created);
      expect(rbacCache.bumpVersion).toHaveBeenCalled();
      expect(permIndex.publishRefresh).toHaveBeenCalled();
    });

    it('should throw ConflictException when code already exists', async () => {
      const { service, repo } = createService();
      repo.findByCode.mockResolvedValue({ id: BigInt(1) });

      await expect(
        service.create({ code: 'existing', name: 'Dup' } as any, BigInt(100)),
      ).rejects.toThrow(ConflictException);
    });

    it('should not pass scope to repo (field deprecated)', async () => {
      const { service, repo } = createService();
      repo.findByCode.mockResolvedValue(null);
      repo.create.mockResolvedValue({ id: BigInt(1) });

      await service.create({ code: 'test', name: 'Test' } as any, BigInt(100));
      expect(repo.create).toHaveBeenCalledWith(
        expect.not.objectContaining({ scope: expect.anything() }),
      );
    });

    it('should connect parent when parentId provided', async () => {
      const { service, repo } = createService();
      repo.findByCode.mockResolvedValue(null);
      repo.create.mockResolvedValue({ id: BigInt(2) });

      await service.create(
        { code: 'child', name: 'Child', parentId: BigInt(1) } as any,
        BigInt(100),
      );
      expect(repo.create).toHaveBeenCalledWith(
        expect.objectContaining({ parent: { connect: { id: BigInt(1) } } }),
      );
    });

    it('refuses to set parentId on create when caller lacks system.manage', async () => {
      const rbacService = {
        getPermissions: jest.fn().mockResolvedValue(new Set(['permission.manage'])),
        hasCode: jest.fn((assigned: Set<string>, need: string) => assigned.has(need)),
      };
      const { service, repo } = createService({ rbacService });
      repo.findByCode.mockResolvedValue(null);

      await expect(
        service.create({ code: 'evil', name: 'Evil', parentId: BigInt(1) } as any, BigInt(100)),
      ).rejects.toThrow(/HIERARCHY_RESTRICTED/);
      expect(repo.create).not.toHaveBeenCalled();
    });
  });

  // --- update ---
  describe('update', () => {
    it('should update and bump cache/index', async () => {
      const { service, repo, rbacCache, permIndex } = createService();
      repo.findById.mockResolvedValue({ id: BigInt(1) });
      repo.update.mockResolvedValue({ id: BigInt(1), name: 'Updated' });

      const result = await service.update(BigInt(1), { name: 'Updated' } as any, BigInt(100));
      expect(result.name).toBe('Updated');
      expect(rbacCache.bumpVersion).toHaveBeenCalled();
      expect(permIndex.publishRefresh).toHaveBeenCalled();
    });

    it('refuses parentId change when caller lacks system.manage', async () => {
      const rbacService = {
        getPermissions: jest.fn().mockResolvedValue(new Set(['permission.manage'])),
        hasCode: jest.fn((assigned: Set<string>, need: string) => assigned.has(need)),
      };
      const { service, repo } = createService({ rbacService });
      // Existing permission with parentId=5, attacker tries to repoint to 99.
      repo.findById.mockResolvedValue({ id: BigInt(1), code: 'system.manage', parentId: BigInt(5) });

      await expect(
        service.update(BigInt(1), { parentId: BigInt(99) } as any, BigInt(100)),
      ).rejects.toThrow(/HIERARCHY_RESTRICTED/);
      expect(repo.update).not.toHaveBeenCalled();
    });

    it('allows non-hierarchy updates without system.manage', async () => {
      const rbacService = {
        getPermissions: jest.fn().mockResolvedValue(new Set(['permission.manage'])),
        hasCode: jest.fn((assigned: Set<string>, need: string) => assigned.has(need)),
      };
      const { service, repo } = createService({ rbacService });
      repo.findById.mockResolvedValue({ id: BigInt(1), code: 'x', parentId: null });
      repo.update.mockResolvedValue({ id: BigInt(1), name: 'Renamed' });

      await expect(
        service.update(BigInt(1), { name: 'Renamed' } as any, BigInt(100)),
      ).resolves.toEqual(expect.objectContaining({ name: 'Renamed' }));
    });

    it('should check for cycles when parentId is provided', async () => {
      const { service, repo } = createService();
      repo.findById.mockResolvedValue({ id: BigInt(1) });
      repo.update.mockResolvedValue({ id: BigInt(1) });

      await service.update(BigInt(1), { parentId: BigInt(2) } as any, BigInt(100));
      expect(assertNoCycle).toHaveBeenCalledWith(
        BigInt(1),
        BigInt(2),
        expect.any(Function),
        'permission.CYCLE_DETECTED',
      );
    });

    it('should disconnect parent when parentId is explicitly null', async () => {
      const { service, repo } = createService();
      repo.findById.mockResolvedValue({ id: BigInt(1) });
      repo.update.mockResolvedValue({ id: BigInt(1) });

      await service.update(BigInt(1), { parentId: null } as any, BigInt(100));
      expect(repo.update).toHaveBeenCalledWith(
        BigInt(1),
        expect.objectContaining({ parent: { disconnect: true } }),
      );
    });

    it('should throw NotFoundException when permission not found', async () => {
      const { service, repo } = createService();
      repo.findById.mockResolvedValue(null);

      await expect(
        service.update(BigInt(999), { name: 'X' } as any, BigInt(100)),
      ).rejects.toThrow(NotFoundException);
    });
  });

  // --- delete ---
  describe('delete', () => {
    it('should delete and bump cache/index', async () => {
      const { service, repo, rbacCache, permIndex } = createService();
      repo.findById.mockResolvedValue({ id: BigInt(1), code: 'comic.manage' });
      repo.delete.mockResolvedValue(undefined);

      const result = await service.delete(BigInt(1));
      expect(result.message).toBe('permission.DELETED');
      expect(rbacCache.bumpVersion).toHaveBeenCalled();
      expect(permIndex.publishRefresh).toHaveBeenCalled();
    });

    it('should throw NotFoundException when not found', async () => {
      const { service, repo } = createService();
      repo.findById.mockResolvedValue(null);

      await expect(service.delete(BigInt(999))).rejects.toThrow(NotFoundException);
    });

    it('refuses to delete system.manage', async () => {
      const { service, repo } = createService();
      repo.findById.mockResolvedValue({ id: BigInt(1), code: 'system.manage' });

      await expect(service.delete(BigInt(1))).rejects.toThrow(/SYSTEM_MANAGE_PROTECTED/);
      expect(repo.delete).not.toHaveBeenCalled();
    });
  });

  // --- getList ---
  describe('getList', () => {
    it('should return paginated results', async () => {
      const { service, repo } = createService();
      repo.findMany.mockResolvedValue([{ id: BigInt(1) }]);
      repo.count.mockResolvedValue(1);

      const result = await service.getList({} as any);
      expect(result.data).toHaveLength(1);
    });

    it('should skip count when skipCount is true', async () => {
      const { service, repo } = createService();
      repo.findMany.mockResolvedValue([]);

      await service.getList({ skipCount: 'true' } as any);
      expect(repo.count).not.toHaveBeenCalled();
    });
  });
});
