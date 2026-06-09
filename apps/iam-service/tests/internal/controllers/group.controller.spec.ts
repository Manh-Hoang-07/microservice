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

function makeMockGroupRepo(userGroups) {
  return {
    findUserGroups: jest.fn().mockResolvedValue(userGroups),
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('InternalGroupController.getMembership', () => {
  it('should return isMember=false when user has no groups', async () => {
    const repo = makeMockGroupRepo([]);
    const controller = new InternalGroupController(repo as any);

    const result = await controller.getMembership({ userId: '1', groupId: '10' });

    expect(result).toEqual({ isMember: false, isOwner: false });
    expect(repo.findUserGroups).toHaveBeenCalledWith('1');
  });

  it('should return isMember=true, isOwner=false for a regular member', async () => {
    const repo = makeMockGroupRepo([makeUserGroup('10', '999')]);
    const controller = new InternalGroupController(repo as any);

    const result = await controller.getMembership({ userId: '1', groupId: '10' });

    expect(result).toEqual({ isMember: true, isOwner: false });
  });

  it('should return isMember=true, isOwner=true when userId matches ownerId', async () => {
    const repo = makeMockGroupRepo([makeUserGroup('10', '1')]);
    const controller = new InternalGroupController(repo as any);

    const result = await controller.getMembership({ userId: '1', groupId: '10' });

    expect(result).toEqual({ isMember: true, isOwner: true });
  });

  it('should return isMember=false when groupId does not match', async () => {
    const repo = makeMockGroupRepo([makeUserGroup('99', '1')]);
    const controller = new InternalGroupController(repo as any);

    const result = await controller.getMembership({ userId: '1', groupId: '10' });

    expect(result).toEqual({ isMember: false, isOwner: false });
  });

  it('should return isOwner=false when ownerId is null', async () => {
    const repo = makeMockGroupRepo([makeUserGroup('10', null)]);
    const controller = new InternalGroupController(repo as any);

    const result = await controller.getMembership({ userId: '1', groupId: '10' });

    expect(result).toEqual({ isMember: true, isOwner: false });
  });
});
