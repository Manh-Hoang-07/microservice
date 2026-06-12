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
import { GroupOwnerService } from '../../../../../src/modules/group/group/services/group-owner.service';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeGroup(id, ownerId, type = 'post') {
  return { id: BigInt(id), ownerId: ownerId ? BigInt(ownerId) : null, type };
}

function makeService({
  group = undefined,
  memberIds = [] as bigint[],
  roles = [],
  assignResult = {},
  allGroupRoles = [] as any[],
} = {}) {
  const groupRepo = {
    findById: jest.fn().mockResolvedValue(group),
    findMemberIds: jest.fn().mockResolvedValue(memberIds),
  };
  const memberRoleRepo = {
    findByUserAndGroup: jest.fn().mockResolvedValue(roles),
    assign: jest.fn().mockResolvedValue(assignResult),
    remove: jest.fn().mockResolvedValue({ count: 1 }),
    syncRoles: jest.fn().mockResolvedValue(undefined),
    findAllGroupRoles: jest.fn().mockResolvedValue(allGroupRoles),
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
      roleCodes: ['group_post_writer', 'group_post_editor'],
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

// ---------------------------------------------------------------------------
// Tests — gan vai tro KHONG con loc theo loai nhom (danh sach phang)
// ---------------------------------------------------------------------------
describe('GroupOwnerService — gan vai tro nhom (phang)', () => {
  it('assignRole gan duoc bat ky group role (khong guardrail theo loai)', async () => {
    const { service, memberRoleRepo } = makeService({
      group: makeGroup('10', '99', 'post'),
      memberIds: [BigInt('5')],
    });

    await service.assignRole('10', '5', { roleId: '1' }, '99');
    expect(memberRoleRepo.assign).toHaveBeenCalledWith('5', '10', '1');
  });

  it('syncRoles thay toan bo vai tro, khong guardrail', async () => {
    const { service, memberRoleRepo } = makeService({
      group: makeGroup('10', '99', 'post'),
      memberIds: [BigInt('5')],
    });

    await service.syncRoles('10', '5', { roleIds: ['1', '2'] }, '99');
    expect(memberRoleRepo.syncRoles).toHaveBeenCalledWith('5', '10', ['1', '2']);
  });
});

// ---------------------------------------------------------------------------
// Tests — getAssignableRoles (tra ve TAT CA group role)
// ---------------------------------------------------------------------------
describe('GroupOwnerService.getAssignableRoles', () => {
  it('tra ve tat ca group role khi caller la owner', async () => {
    const all = [
      { id: BigInt(1), code: 'group_manager', name: 'Quản lý nhóm' },
      { id: BigInt(2), code: 'group_post_editor', name: 'Biên tập' },
    ];
    const { service, memberRoleRepo } = makeService({ group: makeGroup('10', '99'), allGroupRoles: all });

    const result = await service.getAssignableRoles('10', '99');

    expect(result).toEqual(all);
    expect(memberRoleRepo.findAllGroupRoles).toHaveBeenCalled();
  });

  it('throw ForbiddenException khi caller khong phai owner', async () => {
    const { service } = makeService({ group: makeGroup('10', '999') });
    await expect(service.getAssignableRoles('10', '1')).rejects.toThrow(ForbiddenException);
  });
});
