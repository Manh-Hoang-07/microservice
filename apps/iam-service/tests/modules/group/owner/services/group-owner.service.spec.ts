// ---------------------------------------------------------------------------
// Module mocks
// ---------------------------------------------------------------------------
jest.mock('@package/common', () => ({
  t: (_, key) => key,
}));

jest.mock('nestjs-i18n', () => ({
  I18nContext: { current: () => ({ lang: 'en' }) },
  I18nService: jest.fn(),
}));

jest.mock('src/generated/prisma', () => ({ PrismaClient: jest.fn(), Prisma: {} }), { virtual: true });
jest.mock('@prisma/adapter-pg', () => ({ PrismaPg: jest.fn() }));
jest.mock('src/core/database/prisma.service', () => ({ PrismaService: jest.fn() }), { virtual: true });
jest.mock('src/modules/group/repositories/group.repository', () => ({ GroupRepository: jest.fn() }), { virtual: true });
jest.mock('src/modules/group/repositories/group-member-role.repository', () => ({ GroupMemberRoleRepository: jest.fn() }), { virtual: true });
jest.mock('src/types', () => ({ toPrimaryKey: (v) => BigInt(v) }), { virtual: true });

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { GroupOwnerService } from '../../../../../src/modules/group/owner/services/group-owner.service';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeGroup(id, ownerId) {
  return { id: BigInt(id), ownerId: ownerId ? BigInt(ownerId) : null };
}

function makeService({ group = undefined, memberIds = [] as bigint[], roles = [], assignResult = {} } = {}) {
  const groupRepo = {
    findById: jest.fn().mockResolvedValue(group),
    findMemberIds: jest.fn().mockResolvedValue(memberIds),
  };
  const memberRoleRepo = {
    findByUserAndGroup: jest.fn().mockResolvedValue(roles),
    assign: jest.fn().mockResolvedValue(assignResult),
    remove: jest.fn().mockResolvedValue({ count: 1 }),
    syncRoles: jest.fn().mockResolvedValue(undefined),
  };
  const i18n = {} as any;
  const service = new GroupOwnerService(groupRepo as any, memberRoleRepo as any, i18n);
  return { service, groupRepo, memberRoleRepo };
}

// ---------------------------------------------------------------------------
// Tests — getMemberRoles
// ---------------------------------------------------------------------------
describe('GroupOwnerService.getMemberRoles', () => {
  it('should return roles for group member when caller is owner', async () => {
    const roles = [{ roleId: BigInt(1), role: { code: 'group_editor' } }];
    const { service } = makeService({
      group: makeGroup('10', '99'),
      roles,
    });

    const result = await service.getMemberRoles('10', '5', '99');

    expect(result).toEqual(roles);
  });

  it('should throw NotFoundException when group not found', async () => {
    const { service } = makeService({ group: null });

    await expect(service.getMemberRoles('10', '5', '99')).rejects.toThrow(NotFoundException);
  });

  it('should throw ForbiddenException when caller is not owner', async () => {
    const { service } = makeService({ group: makeGroup('10', '999') });

    await expect(service.getMemberRoles('10', '5', '1')).rejects.toThrow(ForbiddenException);
  });
});

// ---------------------------------------------------------------------------
// Tests — assignRole
// ---------------------------------------------------------------------------
describe('GroupOwnerService.assignRole', () => {
  it('should assign role when caller is owner and target is member', async () => {
    const { service, memberRoleRepo } = makeService({
      group: makeGroup('10', '99'),
      memberIds: [BigInt('5'), BigInt('6')],
    });

    const result = await service.assignRole('10', '5', { roleId: '1' }, '99');

    expect(result.message).toBe('group.ROLE_ASSIGNED');
    expect(memberRoleRepo.assign).toHaveBeenCalledWith('5', '10', '1');
  });

  it('should throw NotFoundException when target user is not a member', async () => {
    const { service } = makeService({
      group: makeGroup('10', '99'),
      memberIds: [BigInt('6')],
    });

    await expect(service.assignRole('10', '5', { roleId: '1' }, '99')).rejects.toThrow(NotFoundException);
  });

  it('should throw ForbiddenException when caller is not owner', async () => {
    const { service } = makeService({ group: makeGroup('10', '999') });

    await expect(service.assignRole('10', '5', { roleId: '1' }, '1')).rejects.toThrow(ForbiddenException);
  });
});

// ---------------------------------------------------------------------------
// Tests — removeRole
// ---------------------------------------------------------------------------
describe('GroupOwnerService.removeRole', () => {
  it('should remove role when caller is owner', async () => {
    const { service, memberRoleRepo } = makeService({ group: makeGroup('10', '99') });

    const result = await service.removeRole('10', '5', '1', '99');

    expect(result.message).toBe('group.ROLE_REVOKED');
    expect(memberRoleRepo.remove).toHaveBeenCalledWith('5', '10', '1');
  });

  it('should throw ForbiddenException when caller is not owner', async () => {
    const { service } = makeService({ group: makeGroup('10', '999') });

    await expect(service.removeRole('10', '5', '1', '1')).rejects.toThrow(ForbiddenException);
  });
});

// ---------------------------------------------------------------------------
// Tests — syncRoles
// ---------------------------------------------------------------------------
describe('GroupOwnerService.syncRoles', () => {
  it('should sync roles when caller is owner and target is member', async () => {
    const { service, memberRoleRepo } = makeService({
      group: makeGroup('10', '99'),
      memberIds: [BigInt('5')],
    });

    const result = await service.syncRoles('10', '5', { roleIds: ['1', '2'] }, '99');

    expect(result.message).toBe('group.ROLES_SYNCED');
    expect(memberRoleRepo.syncRoles).toHaveBeenCalledWith('5', '10', ['1', '2']);
  });

  it('should throw NotFoundException when target user is not a member', async () => {
    const { service } = makeService({
      group: makeGroup('10', '99'),
      memberIds: [BigInt('6')],
    });

    await expect(service.syncRoles('10', '5', { roleIds: ['1'] }, '99')).rejects.toThrow(NotFoundException);
  });
});
