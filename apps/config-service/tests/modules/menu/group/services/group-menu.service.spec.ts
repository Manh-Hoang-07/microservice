// ---------------------------------------------------------------------------
// Module mocks
// ---------------------------------------------------------------------------
jest.mock('@package/bootstrap', () => ({ FileLogger: jest.fn() }));

jest.mock('../../../../../src/modules/menu/repositories/menu.repository', () => ({
  MenuRepository: jest.fn(),
}));

jest.mock('../../../../../src/modules/menu/helpers/menu.helper', () => ({
  buildMenuTree: jest.fn((menus) => menus),
  filterUserMenus: jest.fn((menus) => menus),
}));

jest.mock('../../../../../src/clients/iam.client', () => ({
  IamClient: jest.fn(),
}));

jest.mock('src/types', () => ({ toPrimaryKey: (v) => BigInt(v) }), { virtual: true });

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { ForbiddenException } from '@nestjs/common';
import { GroupMenuService } from '../../../../../src/modules/menu/group/services/group-menu.service';
import { filterUserMenus } from '../../../../../src/modules/menu/helpers/menu.helper';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeMockMenuRepo() {
  return {
    findAllWithChildren: jest.fn().mockResolvedValue([]),
  };
}

function makeMockIamClient(isMember = true, isOwner = false) {
  return {
    getGroupMembership: jest.fn().mockResolvedValue({ isMember, isOwner }),
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('GroupMenuService', () => {
  afterEach(() => jest.restoreAllMocks());

  it('should throw ForbiddenException when user is not a member', async () => {
    const repo = makeMockMenuRepo();
    const iamClient = makeMockIamClient(false, false);

    const service = new GroupMenuService(repo as any, iamClient as any);
    await expect(service.getGroupMenuTree('1', '10')).rejects.toBeInstanceOf(ForbiddenException);
    expect(repo.findAllWithChildren).not.toHaveBeenCalled();
  });

  it('should pass group.member permission for a regular member', async () => {
    const repo = makeMockMenuRepo();
    const iamClient = makeMockIamClient(true, false);
    repo.findAllWithChildren.mockResolvedValue([
      { id: '1', name: 'Bài đăng nhóm', showInMenu: true },
    ]);

    const service = new GroupMenuService(repo as any, iamClient as any);
    await service.getGroupMenuTree('1', '10');

    expect(iamClient.getGroupMembership).toHaveBeenCalledWith('1', '10');
    expect(repo.findAllWithChildren).toHaveBeenCalledWith({ status: 'active', group: 'group' });

    const [, permSet] = (filterUserMenus as jest.Mock).mock.calls.at(-1);
    expect(permSet.has('group.member')).toBe(true);
    expect(permSet.has('group.owner')).toBe(false);
  });

  it('should include group.owner permission when user is owner', async () => {
    const repo = makeMockMenuRepo();
    const iamClient = makeMockIamClient(true, true);
    repo.findAllWithChildren.mockResolvedValue([]);

    const service = new GroupMenuService(repo as any, iamClient as any);
    await service.getGroupMenuTree('1', '10');

    const [, permSet] = (filterUserMenus as jest.Mock).mock.calls.at(-1);
    expect(permSet.has('group.member')).toBe(true);
    expect(permSet.has('group.owner')).toBe(true);
  });

  it('should filter out menus with showInMenu = false', async () => {
    const repo = makeMockMenuRepo();
    const iamClient = makeMockIamClient(true, false);
    repo.findAllWithChildren.mockResolvedValue([
      { id: '1', name: 'Visible', showInMenu: true },
      { id: '2', name: 'Hidden', showInMenu: false },
    ]);

    const service = new GroupMenuService(repo as any, iamClient as any);
    await service.getGroupMenuTree('1', '10');

    const [visibleMenus] = (filterUserMenus as jest.Mock).mock.calls.at(-1);
    expect(visibleMenus).toHaveLength(1);
    expect(visibleMenus[0].id).toBe('1');
  });
});
