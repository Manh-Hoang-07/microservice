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

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { RbacRoleAssignmentService } from '../../../src/rbac/services/rbac-role-assignment.service';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeMockRbacRepo() {
  return {
    assignRoleToUser: jest.fn(),
    syncUserRoles: jest.fn(),
    getActivePermissionCodes: jest.fn(),
  };
}

function makeMockI18n() {
  return {} as any;
}

function createService(overrides: Record<string, any> = {}) {
  const rbacRepo = overrides.rbacRepo ?? makeMockRbacRepo();
  const i18n = overrides.i18n ?? makeMockI18n();
  const service = new (RbacRoleAssignmentService as any)(rbacRepo, i18n);
  return { service, rbacRepo, i18n };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('RbacRoleAssignmentService', () => {
  // --- assignRoleToUser ---
  describe('assignRoleToUser', () => {
    it('should delegate to rbacRepo', async () => {
      const { service, rbacRepo } = createService();
      rbacRepo.assignRoleToUser.mockResolvedValue(undefined);

      await service.assignRoleToUser('u1', 'r1');
      expect(rbacRepo.assignRoleToUser).toHaveBeenCalledWith('u1', 'r1');
    });
  });

  // --- syncUserRoles ---
  describe('syncUserRoles', () => {
    it('should delegate to rbacRepo and return before/after', async () => {
      const { service, rbacRepo } = createService();
      rbacRepo.syncUserRoles.mockResolvedValue({ before: [BigInt(2)], after: [BigInt(1)] });

      const result = await service.syncUserRoles('u1', ['r1']);
      expect(result).toEqual({ before: [BigInt(2)], after: [BigInt(1)] });
      expect(rbacRepo.syncUserRoles).toHaveBeenCalledWith('u1', ['r1']);
    });

    it('should handle empty role list', async () => {
      const { service, rbacRepo } = createService();
      rbacRepo.syncUserRoles.mockResolvedValue({ before: [BigInt(1)], after: [] });

      const result = await service.syncUserRoles('u1', []);
      expect(result).toEqual({ before: [BigInt(1)], after: [] });
      expect(rbacRepo.syncUserRoles).toHaveBeenCalledWith('u1', []);
    });
  });

  // --- getActivePermissionCodes ---
  describe('getActivePermissionCodes', () => {
    it('should return codes from repo', async () => {
      const { service, rbacRepo } = createService();
      rbacRepo.getActivePermissionCodes.mockResolvedValue(['perm.a', 'perm.b']);

      const result = await service.getActivePermissionCodes('u1');
      expect(result).toEqual(['perm.a', 'perm.b']);
      expect(rbacRepo.getActivePermissionCodes).toHaveBeenCalledWith('u1');
    });
  });
});
