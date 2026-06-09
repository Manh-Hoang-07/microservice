// ---------------------------------------------------------------------------
// Module mocks
// ---------------------------------------------------------------------------
jest.mock('@package/common', () => ({
  Internal: () => () => {},
  InternalGuard: jest.fn(),
}));

jest.mock('src/generated/prisma', () => ({ PrismaClient: jest.fn(), Prisma: {} }), { virtual: true });
jest.mock('@prisma/adapter-pg', () => ({ PrismaPg: jest.fn() }));
jest.mock('../../../src/core/database/prisma.service', () => ({ PrismaService: jest.fn() }));
jest.mock('../../../src/modules/group/repositories/group.repository', () => ({ GroupRepository: jest.fn() }));
jest.mock('../../../src/modules/group/repositories/group-member-role.repository', () => ({ GroupMemberRoleRepository: jest.fn() }));
jest.mock('src/types', () => ({ toPrimaryKey: (v) => BigInt(v) }), { virtual: true });

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { InternalGroupController } from '../../../src/internal/controllers/group.controller';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeUserGroup(groupId, ownerId) {
  return {
    groupId: BigInt(groupId),
    userId: BigInt('1'),
    joinedAt: new Date(),
    group: {
      id: BigInt(groupId),
      code: 'GRP',
      name: 'Test Group',
      type: 'team',
      status: 'active',
      description: null,
      ownerId: ownerId ? BigInt(ownerId) : null,
      metadata: null,
    },
  };
}

function makeController(userGroups, permissionCodes: string[] = []) {
  const groupRepo = { findUserGroups: jest.fn().mockResolvedValue(userGroups) };
  const memberRoleRepo = { getPermissionCodes: jest.fn().mockResolvedValue(permissionCodes) };
  const controller = new InternalGroupController(groupRepo as any, memberRoleRepo as any);
  return { controller, groupRepo, memberRoleRepo };
}

// ---------------------------------------------------------------------------
// Tests — getMembership
// ---------------------------------------------------------------------------
describe('InternalGroupController.getMembership', () => {
  it('should return isMember=false when user has no groups', async () => {
    const { controller, groupRepo } = makeController([]);

    const result = await controller.getMembership({ userId: '1', groupId: '10' });

    expect(result).toEqual({ isMember: false, isOwner: false });
    expect(groupRepo.findUserGroups).toHaveBeenCalledWith('1');
  });

  it('should return isMember=true, isOwner=false for a regular member', async () => {
    const { controller } = makeController([makeUserGroup('10', '999')]);

    const result = await controller.getMembership({ userId: '1', groupId: '10' });

    expect(result).toEqual({ isMember: true, isOwner: false });
  });

  it('should return isMember=true, isOwner=true when userId matches ownerId', async () => {
    const { controller } = makeController([makeUserGroup('10', '1')]);

    const result = await controller.getMembership({ userId: '1', groupId: '10' });

    expect(result).toEqual({ isMember: true, isOwner: true });
  });

  it('should return isMember=false when groupId does not match', async () => {
    const { controller } = makeController([makeUserGroup('99', '1')]);

    const result = await controller.getMembership({ userId: '1', groupId: '10' });

    expect(result).toEqual({ isMember: false, isOwner: false });
  });

  it('should return isOwner=false when ownerId is null', async () => {
    const { controller } = makeController([makeUserGroup('10', null)]);

    const result = await controller.getMembership({ userId: '1', groupId: '10' });

    expect(result).toEqual({ isMember: true, isOwner: false });
  });
});

// ---------------------------------------------------------------------------
// Tests — checkPermission
// ---------------------------------------------------------------------------
describe('InternalGroupController.checkPermission', () => {
  it('should return allowed=true when permission is in the list', async () => {
    const { controller, memberRoleRepo } = makeController([], ['post.update', 'comic.update']);

    const result = await controller.checkPermission({ userId: '1', groupId: '10', permission: 'post.update' });

    expect(result).toEqual({ allowed: true });
    expect(memberRoleRepo.getPermissionCodes).toHaveBeenCalledWith('1', '10');
  });

  it('should return allowed=false when permission is not in the list', async () => {
    const { controller } = makeController([], ['post.update']);

    const result = await controller.checkPermission({ userId: '1', groupId: '10', permission: 'comic.delete' });

    expect(result).toEqual({ allowed: false });
  });

  it('should return allowed=false when user has no permissions', async () => {
    const { controller } = makeController([], []);

    const result = await controller.checkPermission({ userId: '1', groupId: '10', permission: 'post.update' });

    expect(result).toEqual({ allowed: false });
  });
});
