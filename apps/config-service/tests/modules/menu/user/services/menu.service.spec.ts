// ---------------------------------------------------------------------------
// Module mocks
// ---------------------------------------------------------------------------
jest.mock('@package/bootstrap', () => ({ FileLogger: jest.fn() }));

jest.mock('../../../../../src/modules/menu/repositories/menu.repository', () => ({
  MenuRepository: jest.fn(),
}));

jest.mock('../../../../../src/modules/menu/helpers/menu.helper', () => ({
  buildMenuTree: jest.fn((menus: any[]) => menus),
  filterUserMenus: jest.fn((menus: any[], _perms: Set<string>) => menus),
}));

jest.mock('../../../../../src/clients/iam.client', () => ({
  IamClient: jest.fn(),
}));

jest.mock('src/types', () => ({ toPrimaryKey: (v: string) => BigInt(v) }), { virtual: true });

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { UserMenuService } from '../../../../../src/modules/menu/user/services/menu.service';
import { filterUserMenus } from '../../../../../src/modules/menu/helpers/menu.helper';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeMockMenuRepo() {
  return {
    findAllWithChildren: jest.fn().mockResolvedValue([]),
  };
}

function makeMockIamClient() {
  return {
    getUserPermissions: jest.fn().mockResolvedValue(new Set<string>()),
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('UserMenuService', () => {
  afterEach(() => jest.restoreAllMocks());

  it('should fetch user permissions and return filtered menu tree', async () => {
    const repo = makeMockMenuRepo();
    const iamClient = makeMockIamClient();

    const perms = new Set(['menu.view', 'admin.access']);
    iamClient.getUserPermissions.mockResolvedValue(perms);

    const allMenus = [
      { id: '1', name: 'Public', showInMenu: true, is_public: true },
      { id: '2', name: 'Admin', showInMenu: true, is_public: false, required_permission_code: 'admin.access' },
      { id: '3', name: 'Hidden', showInMenu: false, is_public: true },
    ];
    repo.findAllWithChildren.mockResolvedValue(allMenus);

    const service = new UserMenuService(repo as any, iamClient as any);
    const result = await service.getUserMenuTree('user-1');

    expect(iamClient.getUserPermissions).toHaveBeenCalledWith('user-1');
    expect(repo.findAllWithChildren).toHaveBeenCalledWith({ status: 'active', group: 'admin' });
    // filterUserMenus is called with visible menus only (showInMenu = true)
    expect(filterUserMenus).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ id: '1' }),
        expect.objectContaining({ id: '2' }),
      ]),
      perms,
    );
    expect(result).toBeDefined();
  });

  it('should call IAM with only userId (no groupId)', async () => {
    const repo = makeMockMenuRepo();
    const iamClient = makeMockIamClient();
    repo.findAllWithChildren.mockResolvedValue([]);

    const service = new UserMenuService(repo as any, iamClient as any);
    await service.getUserMenuTree('user-1');

    expect(iamClient.getUserPermissions).toHaveBeenCalledWith('user-1');
  });

  it('should filter out menus with showInMenu = false', async () => {
    const repo = makeMockMenuRepo();
    const iamClient = makeMockIamClient();
    iamClient.getUserPermissions.mockResolvedValue(new Set());

    repo.findAllWithChildren.mockResolvedValue([
      { id: '1', name: 'Visible', showInMenu: true },
      { id: '2', name: 'Invisible', showInMenu: false },
    ]);

    const service = new UserMenuService(repo as any, iamClient as any);
    await service.getUserMenuTree('user-1');

    // filterUserMenus should only receive the visible menu
    expect(filterUserMenus).toHaveBeenCalledWith(
      [expect.objectContaining({ id: '1' })],
      expect.any(Set),
    );
  });
});
