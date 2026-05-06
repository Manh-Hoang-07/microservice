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

jest.mock('../../../../../src/core/database/prisma.service', () => ({
  PrismaService: jest.fn(),
}));

jest.mock('../../../../../src/modules/user-role/repositories/user-role.repository', () => ({
  UserRoleRepository: jest.fn(),
}));

jest.mock('../../../../../src/rbac/repositories/rbac.repository', () => ({
  RbacRepository: jest.fn(),
}));

jest.mock('../../../../../src/rbac/services/rbac.service', () => ({
  RbacService: jest.fn(),
}));

jest.mock('../../../../../src/rbac/services/rbac-cache.service', () => ({
  RbacCacheService: jest.fn(),
}));

jest.mock('../../../../../src/rbac/services/rbac-permission-index.service', () => ({
  RbacPermissionIndexService: jest.fn(),
}));

jest.mock('../../../../../src/rbac/services/rbac-role-assignment.service', () => ({
  RbacRoleAssignmentService: jest.fn(),
}));

jest.mock('@package/redis', () => ({
  RedisService: jest.fn(),
}));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { UserRoleService } from '../../../../../src/modules/user-role/admin/services/user-role.service';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeMockRepo() {
  return {
    getUserRoles: jest.fn(),
    removeRole: jest.fn(),
  };
}

function makeMockRbacService() {
  return {
    assignRoleToUser: jest.fn().mockResolvedValue(undefined),
    assertCallerCanGrantRole: jest.fn().mockResolvedValue(undefined),
    syncRolesInGroup: jest.fn().mockResolvedValue(undefined),
  };
}

function makeMockRbacCache() {
  return {
    bumpVersion: jest.fn().mockResolvedValue(undefined),
    clearAllUserCaches: jest.fn().mockResolvedValue(undefined),
  };
}

function makeMockRbacRepo() {
  return {
    getPermissionCodesForRoles: jest.fn(),
    countUsersWithPermission: jest.fn(),
  };
}

function makeMockI18n() {
  return {} as any;
}

function createService(overrides: Record<string, any> = {}) {
  const repo = overrides.repo ?? makeMockRepo();
  const rbacService = overrides.rbacService ?? makeMockRbacService();
  const rbacCache = overrides.rbacCache ?? makeMockRbacCache();
  const rbacRepo = overrides.rbacRepo ?? makeMockRbacRepo();
  const i18n = overrides.i18n ?? makeMockI18n();

  const service = new (UserRoleService as any)(repo, rbacService, rbacCache, rbacRepo, i18n);
  return { service, repo, rbacService, rbacCache, rbacRepo, i18n };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('UserRoleService', () => {
  // --- getUserRoles ---
  describe('getUserRoles', () => {
    it('should return user roles from repo', () => {
      const { service, repo } = createService();
      const roles = [{ roleId: 'r1', groupId: 'g1' }];
      repo.getUserRoles.mockReturnValue(roles);

      const result = service.getUserRoles('u1', 'g1');
      expect(result).toEqual(roles);
      expect(repo.getUserRoles).toHaveBeenCalledWith('u1', 'g1');
    });

    it('should work without groupId', () => {
      const { service, repo } = createService();
      repo.getUserRoles.mockReturnValue([]);

      service.getUserRoles('u1');
      expect(repo.getUserRoles).toHaveBeenCalledWith('u1', undefined);
    });
  });

  // --- assignRole ---
  describe('assignRole', () => {
    it('should delegate to rbacService.assignRoleToUser', async () => {
      const { service, rbacService } = createService();

      const result = await service.assignRole(
        'u1',
        { roleId: 'r1', groupId: 'g1' } as any,
        { id: 'actor', groupId: null },
      );

      expect(rbacService.assignRoleToUser).toHaveBeenCalledWith('u1', 'r1', 'g1', {
        id: 'actor',
        groupId: null,
      });
      expect(result.message).toBe('rbac.ROLE_ASSIGNED');
    });

    it('should default actor groupId to null when undefined', async () => {
      const { service, rbacService } = createService();

      await service.assignRole(
        'u1',
        { roleId: 'r1', groupId: 'g1' } as any,
        { id: 'actor' },
      );

      expect(rbacService.assignRoleToUser).toHaveBeenCalledWith('u1', 'r1', 'g1', {
        id: 'actor',
        groupId: null,
      });
    });
  });

  // --- removeRole ---
  describe('removeRole', () => {
    it('should remove role, bump version and clear cache', async () => {
      const { service, repo, rbacService, rbacCache, rbacRepo } = createService();
      rbacRepo.getPermissionCodesForRoles.mockResolvedValue(new Set(['role.view']));
      repo.removeRole.mockResolvedValue(1);

      const result = await service.removeRole('u1', 'r1', 'g1', { id: 'actor', groupId: null });

      expect(rbacService.assertCallerCanGrantRole).toHaveBeenCalledWith('actor', null, ['r1']);
      expect(repo.removeRole).toHaveBeenCalledWith('u1', 'r1', 'g1');
      expect(rbacCache.bumpVersion).toHaveBeenCalled();
      expect(rbacCache.clearAllUserCaches).toHaveBeenCalledWith('u1');
      expect(result.message).toBe('rbac.ROLE_REMOVED');
    });

    it('should throw NotFoundException when assignment does not exist', async () => {
      const { service, repo, rbacRepo } = createService();
      rbacRepo.getPermissionCodesForRoles.mockResolvedValue(new Set());
      repo.removeRole.mockResolvedValue(0);

      await expect(
        service.removeRole('u1', 'r1', 'g1', { id: 'actor', groupId: null }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException when removing last system admin', async () => {
      const { service, rbacRepo } = createService();
      rbacRepo.getPermissionCodesForRoles.mockResolvedValue(new Set(['system.manage']));
      rbacRepo.countUsersWithPermission.mockResolvedValue(1);

      await expect(
        service.removeRole('u1', 'r1', 'g1', { id: 'actor', groupId: null }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should allow removing system.manage role when more than one admin remains', async () => {
      const { service, repo, rbacRepo } = createService();
      rbacRepo.getPermissionCodesForRoles.mockResolvedValue(new Set(['system.manage']));
      rbacRepo.countUsersWithPermission.mockResolvedValue(3);
      repo.removeRole.mockResolvedValue(1);

      const result = await service.removeRole('u1', 'r1', 'g1', { id: 'actor', groupId: null });
      expect(result.message).toBe('rbac.ROLE_REMOVED');
    });

    it('should skip last-admin check when role does not contain system.manage', async () => {
      const { service, repo, rbacRepo } = createService();
      rbacRepo.getPermissionCodesForRoles.mockResolvedValue(new Set(['role.view']));
      repo.removeRole.mockResolvedValue(1);

      await service.removeRole('u1', 'r1', 'g1', { id: 'actor', groupId: null });
      expect(rbacRepo.countUsersWithPermission).not.toHaveBeenCalled();
    });
  });

  // --- syncRoles ---
  describe('syncRoles', () => {
    it('should delegate to rbacService.syncRolesInGroup', async () => {
      const { service, rbacService } = createService();

      const result = await service.syncRoles(
        'u1',
        { groupId: 'g1', roleIds: ['r1', 'r2'] } as any,
        { id: 'actor', groupId: 'g5' },
      );

      expect(rbacService.syncRolesInGroup).toHaveBeenCalledWith(
        'u1', 'g1', ['r1', 'r2'], { id: 'actor', groupId: 'g5' },
      );
      expect(result.message).toBe('rbac.ROLES_SYNCED');
    });
  });
});
