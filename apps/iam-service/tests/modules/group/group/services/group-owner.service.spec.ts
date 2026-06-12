// ---------------------------------------------------------------------------
// Module mocks
// ---------------------------------------------------------------------------
jest.mock('@package/common', () => ({
  t: (_, key) => key,
  parseQueryOptions: (q) => ({ skip: 0, take: 10, page: q?.page ?? 1 }),
  createPaginationMeta: (opts, total) => ({ total, page: opts.page, take: opts.take }),
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
import { NotFoundException } from '@nestjs/common';
import { GroupOwnerService } from '../../../../../src/modules/group/group/services/group-owner.service';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeGroup(id) {
  return { id: BigInt(id) };
}

function makeService({
  group = undefined,
  memberIds = [],
  members = [],
  memberCount = 0,
  roles = [],
  allGroupRoles = [],
} = {}) {
  const groupRepo = {
    findById: jest.fn().mockResolvedValue(group),
    findMemberIds: jest.fn().mockResolvedValue(memberIds),
    getMembers: jest.fn().mockResolvedValue(members),
    countMembers: jest.fn().mockResolvedValue(memberCount),
    addMember: jest.fn().mockResolvedValue({}),
    removeMember: jest.fn().mockResolvedValue({ count: 1 }),
  };
  const memberRoleRepo = {
    findByUserAndGroup: jest.fn().mockResolvedValue(roles),
    assign: jest.fn().mockResolvedValue({}),
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
  it('returns roles for a member', async () => {
    const roles = [{ roleId: BigInt(1), role: { code: 'group_editor' } }];
    const { service } = makeService({ group: makeGroup('10'), roles });

    const result = await service.getMemberRoles('10', '5');

    expect(result).toEqual(roles);
  });

  it('throws NotFoundException when group not found', async () => {
    const { service } = makeService({ group: null });
    await expect(service.getMemberRoles('10', '5')).rejects.toThrow(NotFoundException);
  });
});

// ---------------------------------------------------------------------------
// Tests — assignRole
// ---------------------------------------------------------------------------
describe('GroupOwnerService.assignRole', () => {
  it('assigns role when target is a member', async () => {
    const { service, memberRoleRepo } = makeService({
      group: makeGroup('10'),
      memberIds: [BigInt('5'), BigInt('6')],
    });

    const result = await service.assignRole('10', '5', { roleId: '1' });

    expect(result.message).toBe('group.ROLE_ASSIGNED');
    expect(memberRoleRepo.assign).toHaveBeenCalledWith('5', '10', '1');
  });

  it('throws NotFoundException when target is not a member', async () => {
    const { service } = makeService({
      group: makeGroup('10'),
      memberIds: [BigInt('6')],
    });

    await expect(service.assignRole('10', '5', { roleId: '1' })).rejects.toThrow(NotFoundException);
  });

  it('throws NotFoundException when group not found', async () => {
    const { service } = makeService({ group: null });
    await expect(service.assignRole('10', '5', { roleId: '1' })).rejects.toThrow(NotFoundException);
  });
});

// ---------------------------------------------------------------------------
// Tests — removeRole
// ---------------------------------------------------------------------------
describe('GroupOwnerService.removeRole', () => {
  it('removes role', async () => {
    const { service, memberRoleRepo } = makeService({ group: makeGroup('10') });

    const result = await service.removeRole('10', '5', '1');

    expect(result.message).toBe('group.ROLE_REVOKED');
    expect(memberRoleRepo.remove).toHaveBeenCalledWith('5', '10', '1');
  });

  it('throws NotFoundException when group not found', async () => {
    const { service } = makeService({ group: null });
    await expect(service.removeRole('10', '5', '1')).rejects.toThrow(NotFoundException);
  });
});

// ---------------------------------------------------------------------------
// Tests — syncRoles
// ---------------------------------------------------------------------------
describe('GroupOwnerService.syncRoles', () => {
  it('syncs roles when target is a member', async () => {
    const { service, memberRoleRepo } = makeService({
      group: makeGroup('10'),
      memberIds: [BigInt('5')],
    });

    const result = await service.syncRoles('10', '5', { roleIds: ['1', '2'] });

    expect(result.message).toBe('group.ROLES_SYNCED');
    expect(memberRoleRepo.syncRoles).toHaveBeenCalledWith('5', '10', ['1', '2']);
  });

  it('throws NotFoundException when target is not a member', async () => {
    const { service } = makeService({
      group: makeGroup('10'),
      memberIds: [BigInt('6')],
    });

    await expect(service.syncRoles('10', '5', { roleIds: ['1'] })).rejects.toThrow(NotFoundException);
  });
});

// ---------------------------------------------------------------------------
// Tests — getMembers
// ---------------------------------------------------------------------------
describe('GroupOwnerService.getMembers', () => {
  it('returns paginated members', async () => {
    const members = [{ userId: BigInt('5'), groupId: BigInt('10'), joinedAt: new Date() }];
    const { service, groupRepo } = makeService({
      group: makeGroup('10'),
      members,
      memberCount: 1,
    });

    const result = await service.getMembers('10', {});

    expect(result.data).toEqual(members);
    expect(result.meta.total).toBe(1);
    expect(groupRepo.getMembers).toHaveBeenCalledWith('10', 0, 10);
    expect(groupRepo.countMembers).toHaveBeenCalledWith('10');
  });

  it('throws NotFoundException when group not found', async () => {
    const { service } = makeService({ group: null });
    await expect(service.getMembers('10', {})).rejects.toThrow(NotFoundException);
  });
});

// ---------------------------------------------------------------------------
// Tests — addMember
// ---------------------------------------------------------------------------
describe('GroupOwnerService.addMember', () => {
  it('adds a member', async () => {
    const { service, groupRepo } = makeService({ group: makeGroup('10') });

    const result = await service.addMember('10', { userId: '5' });

    expect(result.message).toBe('group.MEMBER_ADDED');
    expect(groupRepo.addMember).toHaveBeenCalledWith('10', '5');
  });

  it('throws NotFoundException when group not found', async () => {
    const { service } = makeService({ group: null });
    await expect(service.addMember('10', { userId: '5' })).rejects.toThrow(NotFoundException);
  });
});

// ---------------------------------------------------------------------------
// Tests — removeMember
// ---------------------------------------------------------------------------
describe('GroupOwnerService.removeMember', () => {
  it('removes a member', async () => {
    const { service, groupRepo } = makeService({ group: makeGroup('10') });

    const result = await service.removeMember('10', '5');

    expect(result.message).toBe('group.MEMBER_REMOVED');
    expect(groupRepo.removeMember).toHaveBeenCalledWith('10', '5');
  });

  it('throws NotFoundException when group not found', async () => {
    const { service } = makeService({ group: null });
    await expect(service.removeMember('10', '5')).rejects.toThrow(NotFoundException);
  });
});

// ---------------------------------------------------------------------------
// Tests — getAssignableRoles
// ---------------------------------------------------------------------------
describe('GroupOwnerService.getAssignableRoles', () => {
  it('returns all group roles', async () => {
    const all = [
      { id: BigInt(1), code: 'group_manager', name: 'Quản lý nhóm' },
      { id: BigInt(2), code: 'group_post_editor', name: 'Biên tập' },
    ];
    const { service, memberRoleRepo } = makeService({ group: makeGroup('10'), allGroupRoles: all });

    const result = await service.getAssignableRoles('10');

    expect(result).toEqual(all);
    expect(memberRoleRepo.findAllGroupRoles).toHaveBeenCalled();
  });

  it('throws NotFoundException when group not found', async () => {
    const { service } = makeService({ group: null });
    await expect(service.getAssignableRoles('10')).rejects.toThrow(NotFoundException);
  });
});
