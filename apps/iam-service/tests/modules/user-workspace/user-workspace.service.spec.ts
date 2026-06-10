jest.mock('@package/common', () => ({
  getSessionUserId: jest.fn(),
}));

jest.mock('../../../src/modules/group/repositories/group.repository', () => ({
  GroupRepository: jest.fn(),
}));

jest.mock('../../../src/rbac/services/rbac.service', () => ({
  RbacService: jest.fn(),
}));

import { getSessionUserId } from '@package/common';
import { UserWorkspaceService } from '../../../src/modules/user-workspace/user/services/user-workspace.service';

const mockGetSessionUserId = getSessionUserId;

function makeGroupRepo(userGroups = []) {
  return { findUserGroups: jest.fn().mockResolvedValue(userGroups) };
}

function makeRbacService(permissions = new Set()) {
  return { getPermissions: jest.fn().mockResolvedValue(permissions) };
}

function makeRow(overrides = {}) {
  return {
    joinedAt: new Date('2026-01-01'),
    group: {
      id: BigInt(1),
      code: 'nhom_1',
      name: 'Nhóm 1',
      type: 'comic',
      status: 'active',
      ownerId: BigInt(42),
      description: null,
      metadata: null,
      ...overrides,
    },
  };
}

describe('UserWorkspaceService', () => {
  let service;
  let groupRepo;
  let rbacService;

  beforeEach(() => {
    groupRepo = makeGroupRepo();
    rbacService = makeRbacService();
    service = new UserWorkspaceService(groupRepo, rbacService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('getWorkspaces()', () => {
    it('trả rỗng khi không có userId trong session', async () => {
      mockGetSessionUserId.mockReturnValue(null);
      const result = await service.getWorkspaces();
      expect(result).toEqual({ data: [] });
      expect(groupRepo.findUserGroups).not.toHaveBeenCalled();
    });

    it('trả chỉ admin khi user có permission nhưng không có nhóm', async () => {
      mockGetSessionUserId.mockReturnValue('99');
      rbacService = makeRbacService(new Set(['group.manage']));
      groupRepo = makeGroupRepo([]);
      service = new UserWorkspaceService(groupRepo, rbacService);

      const result = await service.getWorkspaces();

      expect(result.data).toHaveLength(1);
      expect(result.data[0]).toEqual({
        type: 'admin',
        name: 'Bảng điều khiển quản trị',
        menuApi: '/api/config/user/menus',
      });
    });

    it('trả chỉ các nhóm khi user không có permission admin', async () => {
      mockGetSessionUserId.mockReturnValue('99');
      rbacService = makeRbacService(new Set());
      groupRepo = makeGroupRepo([makeRow({ id: BigInt(1), name: 'Nhóm A', type: 'comic', ownerId: BigInt(99) })]);
      service = new UserWorkspaceService(groupRepo, rbacService);

      const result = await service.getWorkspaces();

      expect(result.data).toHaveLength(1);
      expect(result.data[0]).toMatchObject({
        type: 'group',
        id: '1',
        name: 'Nhóm A',
        groupType: 'comic',
        isOwner: true,
        menuApi: '/api/config/group/menus?groupId=1',
      });
    });

    it('trả cả admin và nhóm khi user có cả hai', async () => {
      mockGetSessionUserId.mockReturnValue('42');
      rbacService = makeRbacService(new Set(['role.manage']));
      groupRepo = makeGroupRepo([
        makeRow({ id: BigInt(1), name: 'Nhóm comic', type: 'comic', ownerId: BigInt(42) }),
        makeRow({ id: BigInt(3), name: 'Nhóm post',  type: 'post',  ownerId: BigInt(55) }),
      ]);
      service = new UserWorkspaceService(groupRepo, rbacService);

      const result = await service.getWorkspaces();

      expect(result.data).toHaveLength(3);
      expect(result.data[0].type).toBe('admin');
      expect(result.data[1]).toMatchObject({ type: 'group', id: '1', isOwner: true });
      expect(result.data[2]).toMatchObject({ type: 'group', id: '3', isOwner: false });
    });

    it('bỏ qua nhóm có status inactive', async () => {
      mockGetSessionUserId.mockReturnValue('99');
      rbacService = makeRbacService(new Set());
      groupRepo = makeGroupRepo([
        makeRow({ id: BigInt(1), status: 'active' }),
        makeRow({ id: BigInt(2), status: 'inactive' }),
      ]);
      service = new UserWorkspaceService(groupRepo, rbacService);

      const result = await service.getWorkspaces();

      expect(result.data).toHaveLength(1);
      expect(result.data[0].id).toBe('1');
    });

    it('isOwner = false khi ownerId là null', async () => {
      mockGetSessionUserId.mockReturnValue('99');
      rbacService = makeRbacService(new Set());
      groupRepo = makeGroupRepo([makeRow({ ownerId: null })]);
      service = new UserWorkspaceService(groupRepo, rbacService);

      const result = await service.getWorkspaces();

      expect(result.data[0].isOwner).toBe(false);
    });

    it('trả rỗng khi không có permission và không có nhóm', async () => {
      mockGetSessionUserId.mockReturnValue('99');
      const result = await service.getWorkspaces();
      expect(result).toEqual({ data: [] });
    });

    it('gọi song song getPermissions và findUserGroups', async () => {
      mockGetSessionUserId.mockReturnValue('99');
      const promiseAll = jest.spyOn(Promise, 'all');

      await service.getWorkspaces();

      expect(promiseAll).toHaveBeenCalledTimes(1);
    });
  });
});
