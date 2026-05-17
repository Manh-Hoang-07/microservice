// ---------------------------------------------------------------------------
// Module mocks -- must come before any import
// ---------------------------------------------------------------------------
jest.mock('@package/common', () => ({
  t: (_i18n: any, key: string) => key,
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

jest.mock('../../../src/core/database/prisma.service', () => ({
  PrismaService: jest.fn(),
}));

jest.mock('../../../src/rbac/repositories/rbac.repository', () => ({
  RbacRepository: jest.fn(),
}));

jest.mock('../../../src/rbac/services/rbac-cache.service', () => ({
  RbacCacheService: jest.fn(),
}));

jest.mock('../../../src/rbac/services/rbac-permission-index.service', () => ({
  RbacPermissionIndexService: jest.fn(),
}));

jest.mock('../../../src/rbac/services/rbac-role-assignment.service', () => ({
  RbacRoleAssignmentService: jest.fn(),
}));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { ForbiddenException } from '@nestjs/common';
import { RbacService } from '../../../src/rbac/services/rbac.service';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeMockRbacCache() {
  return {
    getPermissions: jest.fn(),
    setPermissions: jest.fn(),
    bumpVersion: jest.fn(),
    clearAllUserCaches: jest.fn(),
  };
}

function makeMockPermissionIndex() {
  return {
    prepare: jest.fn(),
    matchesAssigned: jest.fn(),
    hasAnyRequiredFromAssigned: jest.fn(),
  };
}

function makeMockRoleAssignment() {
  return {
    getActivePermissionCodes: jest.fn(),
    assignRoleToUser: jest.fn(),
    syncUserRoles: jest.fn(),
  };
}

function makeMockRbacRepo() {
  return {
    getPermissionCodesForRoles: jest.fn(),
    getExistingRoleIds: jest.fn(),
  };
}

function makeMockI18n() {
  return {} as any;
}

function createService(overrides: Record<string, any> = {}) {
  const rbacCache = overrides.rbacCache ?? makeMockRbacCache();
  const permIndex = overrides.permIndex ?? makeMockPermissionIndex();
  const roleAssignment = overrides.roleAssignment ?? makeMockRoleAssignment();
  const rbacRepo = overrides.rbacRepo ?? makeMockRbacRepo();
  const i18n = overrides.i18n ?? makeMockI18n();

  const service = new (RbacService as any)(
    rbacCache,
    permIndex,
    roleAssignment,
    rbacRepo,
    i18n,
  );

  return { service, rbacCache, permIndex, roleAssignment, rbacRepo, i18n };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('RbacService', () => {
  // --- hasPermissions ---
  describe('hasPermissions', () => {
    it('should return true when user has any of the required permissions', async () => {
      const { service, rbacCache, permIndex } = createService();
      rbacCache.getPermissions.mockResolvedValue({ cached: true, codes: ['role.view'] });
      permIndex.hasAnyRequiredFromAssigned.mockReturnValue(true);

      const result = await service.hasPermissions('1', ['role.view']);
      expect(result).toBe(true);
      expect(permIndex.hasAnyRequiredFromAssigned).toHaveBeenCalledWith(
        new Set(['role.view']),
        ['role.view'],
      );
    });

    it('should return false when user lacks required permissions', async () => {
      const { service, rbacCache, permIndex } = createService();
      rbacCache.getPermissions.mockResolvedValue({ cached: true, codes: ['role.view'] });
      permIndex.hasAnyRequiredFromAssigned.mockReturnValue(false);

      const result = await service.hasPermissions('1', ['system.manage']);
      expect(result).toBe(false);
    });
  });

  // --- getPermissions ---
  describe('getPermissions', () => {
    it('should return cached permissions when available', async () => {
      const { service, rbacCache } = createService();
      rbacCache.getPermissions.mockResolvedValue({ cached: true, codes: ['a', 'b'] });

      const result = await service.getPermissions('1');
      expect(result).toEqual(new Set(['a', 'b']));
    });

    it('should refresh when cache miss', async () => {
      const { service, rbacCache, permIndex, roleAssignment } = createService();
      rbacCache.getPermissions.mockResolvedValue({ cached: false, codes: [] });
      permIndex.prepare.mockResolvedValue(undefined);
      roleAssignment.getActivePermissionCodes.mockResolvedValue(['x', 'y']);
      rbacCache.setPermissions.mockResolvedValue(undefined);

      const result = await service.getPermissions('1');
      expect(result).toEqual(new Set(['x', 'y']));
      expect(permIndex.prepare).toHaveBeenCalled();
      expect(roleAssignment.getActivePermissionCodes).toHaveBeenCalledWith('1');
      expect(rbacCache.setPermissions).toHaveBeenCalledWith('1', ['x', 'y']);
    });

    it('should filter out empty strings from codes', async () => {
      const { service, rbacCache } = createService();
      rbacCache.getPermissions.mockResolvedValue({ cached: true, codes: ['a', '', 'b'] });

      const result = await service.getPermissions('1');
      expect(result).toEqual(new Set(['a', 'b']));
    });
  });

  // --- refreshPermissions / single-flight ---
  describe('refreshPermissions', () => {
    it('should coalesce concurrent refreshes (single-flight)', async () => {
      const { service, rbacCache, permIndex, roleAssignment } = createService();
      let resolveRefresh!: () => void;
      const blockingPromise = new Promise<void>((r) => { resolveRefresh = r; });

      permIndex.prepare.mockReturnValue(blockingPromise);
      roleAssignment.getActivePermissionCodes.mockResolvedValue(['perm1']);
      rbacCache.setPermissions.mockResolvedValue(undefined);
      rbacCache.getPermissions.mockResolvedValue({ cached: true, codes: ['perm1'] });

      // Fire two concurrent refreshes for the same user
      const p1 = service.refreshPermissions('1');
      const p2 = service.refreshPermissions('1');

      // Unblock
      resolveRefresh();
      const [r1, r2] = await Promise.all([p1, p2]);

      expect(r1).toEqual(new Set(['perm1']));
      expect(r2).toEqual(new Set(['perm1']));
      // prepare was called only once because the second call joined the in-flight
      expect(permIndex.prepare).toHaveBeenCalledTimes(1);
    });
  });

  // --- assertCallerCanGrantRole (privilege escalation) ---
  describe('assertCallerCanGrantRole', () => {
    it('should pass when actor has system.manage', async () => {
      const { service, rbacCache, permIndex, rbacRepo } = createService();
      rbacRepo.getPermissionCodesForRoles.mockResolvedValue(new Set(['role.create']));
      rbacCache.getPermissions.mockResolvedValue({ cached: true, codes: ['system.manage'] });
      permIndex.matchesAssigned.mockImplementation(
        (assigned: Set<string>, code: string) => assigned.has('system.manage') && code === 'system.manage',
      );

      await expect(service.assertCallerCanGrantRole('1', [BigInt(10)])).resolves.toBeUndefined();
    });

    it('should throw ForbiddenException on privilege escalation', async () => {
      const { service, rbacCache, permIndex, rbacRepo } = createService();
      rbacRepo.getPermissionCodesForRoles.mockResolvedValue(new Set(['admin.secret']));
      rbacCache.getPermissions.mockResolvedValue({ cached: true, codes: ['role.view'] });
      permIndex.matchesAssigned.mockReturnValue(false);

      await expect(
        service.assertCallerCanGrantRole('1', [BigInt(10)]),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should pass with empty roleIds', async () => {
      const { service } = createService();
      await expect(service.assertCallerCanGrantRole('1', [])).resolves.toBeUndefined();
    });

    it('should pass when target codes set is empty', async () => {
      const { service, rbacRepo, rbacCache } = createService();
      rbacRepo.getPermissionCodesForRoles.mockResolvedValue(new Set());
      // getPermissions should not even be called
      await expect(service.assertCallerCanGrantRole('1', [BigInt(1)])).resolves.toBeUndefined();
      expect(rbacCache.getPermissions).not.toHaveBeenCalled();
    });
  });

  // --- assertCallerCanGrantPermissionCodes ---
  describe('assertCallerCanGrantPermissionCodes', () => {
    it('should pass with empty targetCodes', async () => {
      const { service } = createService();
      await expect(
        service.assertCallerCanGrantPermissionCodes('1', []),
      ).resolves.toBeUndefined();
    });

    it('should pass when actor has system.manage', async () => {
      const { service, rbacCache, permIndex } = createService();
      rbacCache.getPermissions.mockResolvedValue({ cached: true, codes: ['system.manage'] });
      permIndex.matchesAssigned.mockImplementation(
        (assigned: Set<string>, code: string) =>
          assigned.has('system.manage') && code === 'system.manage',
      );

      await expect(
        service.assertCallerCanGrantPermissionCodes('1', ['role.create']),
      ).resolves.toBeUndefined();
    });

    it('should throw ForbiddenException when actor lacks target code', async () => {
      const { service, rbacCache, permIndex } = createService();
      rbacCache.getPermissions.mockResolvedValue({ cached: true, codes: ['role.view'] });
      permIndex.matchesAssigned.mockReturnValue(false);

      await expect(
        service.assertCallerCanGrantPermissionCodes('1', ['admin.secret']),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should pass when actor holds all target codes', async () => {
      const { service, rbacCache, permIndex } = createService();
      rbacCache.getPermissions.mockResolvedValue({ cached: true, codes: ['role.create'] });
      permIndex.matchesAssigned.mockImplementation(
        (assigned: Set<string>, code: string) => assigned.has(code),
      );

      await expect(
        service.assertCallerCanGrantPermissionCodes('1', ['role.create']),
      ).resolves.toBeUndefined();
    });
  });

  // --- assignRoleToUser ---
  describe('assignRoleToUser', () => {
    it('should assign role, bump version, clear cache and refresh', async () => {
      const { service, rbacCache, permIndex, roleAssignment, rbacRepo } = createService();
      // assertCallerCanGrantRole stubs
      rbacRepo.getPermissionCodesForRoles.mockResolvedValue(new Set());
      // assignRoleToUser
      roleAssignment.assignRoleToUser.mockResolvedValue(undefined);
      rbacCache.bumpVersion.mockResolvedValue(undefined);
      rbacCache.clearAllUserCaches.mockResolvedValue(undefined);
      // refreshPermissions stubs
      permIndex.prepare.mockResolvedValue(undefined);
      roleAssignment.getActivePermissionCodes.mockResolvedValue(['p1']);
      rbacCache.setPermissions.mockResolvedValue(undefined);

      await service.assignRoleToUser('u1', '1', { id: 'actor1' });

      expect(roleAssignment.assignRoleToUser).toHaveBeenCalledWith('u1', '1');
      expect(rbacCache.bumpVersion).toHaveBeenCalled();
      expect(rbacCache.clearAllUserCaches).toHaveBeenCalledWith('u1');
    });
  });

  // --- syncUserRoles ---
  describe('syncUserRoles', () => {
    it('should check existing roles can be revoked then sync', async () => {
      const { service, rbacCache, permIndex, roleAssignment, rbacRepo } = createService();
      // assertCallerCanGrantRole for new roles => pass (empty target codes)
      rbacRepo.getPermissionCodesForRoles.mockResolvedValue(new Set());
      rbacRepo.getExistingRoleIds.mockResolvedValue([BigInt(5)]);
      roleAssignment.syncUserRoles.mockResolvedValue({ before: [], after: [] });
      rbacCache.bumpVersion.mockResolvedValue(undefined);
      rbacCache.clearAllUserCaches.mockResolvedValue(undefined);
      permIndex.prepare.mockResolvedValue(undefined);
      roleAssignment.getActivePermissionCodes.mockResolvedValue([]);
      rbacCache.setPermissions.mockResolvedValue(undefined);

      await service.syncUserRoles('u1', ['1'], { id: 'actor' });

      expect(rbacRepo.getExistingRoleIds).toHaveBeenCalledWith('u1');
      expect(roleAssignment.syncUserRoles).toHaveBeenCalled();
      expect(rbacCache.bumpVersion).toHaveBeenCalled();
    });

    it('should skip existing-role revocation check when no existing roles', async () => {
      const { service, rbacCache, permIndex, roleAssignment, rbacRepo } = createService();
      rbacRepo.getPermissionCodesForRoles.mockResolvedValue(new Set());
      rbacRepo.getExistingRoleIds.mockResolvedValue([]); // no existing roles
      roleAssignment.syncUserRoles.mockResolvedValue({ before: [], after: [] });
      rbacCache.bumpVersion.mockResolvedValue(undefined);
      rbacCache.clearAllUserCaches.mockResolvedValue(undefined);
      permIndex.prepare.mockResolvedValue(undefined);
      roleAssignment.getActivePermissionCodes.mockResolvedValue([]);
      rbacCache.setPermissions.mockResolvedValue(undefined);

      await service.syncUserRoles('u1', ['1'], { id: 'actor' });

      // assertCallerCanGrantRole called once for new roles, NOT called for existing
      expect(rbacRepo.getPermissionCodesForRoles).toHaveBeenCalledTimes(1);
    });
  });

  // --- hasCode ---
  describe('hasCode', () => {
    it('should delegate to permissionIndexService.matchesAssigned', () => {
      const { service, permIndex } = createService();
      permIndex.matchesAssigned.mockReturnValue(true);

      const result = service.hasCode(new Set(['a']), 'a');
      expect(result).toBe(true);
      expect(permIndex.matchesAssigned).toHaveBeenCalledWith(new Set(['a']), 'a');
    });
  });
});
