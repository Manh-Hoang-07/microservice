// ---------------------------------------------------------------------------
// Module mocks
// ---------------------------------------------------------------------------
jest.mock('@package/bootstrap', () => ({ FileLogger: jest.fn() }));

// Keep the real CachedService (pure) but stub the RedisService class.
jest.mock('@package/redis', () => ({
  ...jest.requireActual('@package/redis'),
  RedisService: jest.fn(),
}));

jest.mock('../../../../../src/modules/menu/repositories/menu.repository', () => ({
  MenuRepository: jest.fn(),
}));

jest.mock('../../../../../src/modules/menu/helpers/menu.helper', () => ({
  buildMenuTree: jest.fn((menus: any[]) => menus),
  filterUserMenus: jest.fn((menus: any[], perms: Set<string>) =>
    menus.filter((m: any) => !m.requiredPermissionCode || perms.has(m.requiredPermissionCode)),
  ),
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

function makeFakeRedis() {
  const store = new Map<string, string>();
  return {
    store,
    isEnabled: jest.fn().mockReturnValue(true),
    get: jest.fn(async (k: string) => (store.has(k) ? store.get(k)! : null)),
    set: jest.fn(async (k: string, v: string) => {
      store.set(k, v);
    }),
    incr: jest.fn(async (k: string) => {
      const n = Number(store.get(k) ?? '0') + 1;
      store.set(k, String(n));
      return n;
    }),
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('UserMenuService', () => {
  afterEach(() => jest.clearAllMocks());

  it('queries the active admin-context menus and returns the filtered tree', async () => {
    const repo = makeMockMenuRepo();
    const iamClient = makeMockIamClient();
    const perms = new Set(['admin.access']);
    iamClient.getUserPermissions.mockResolvedValue(perms);

    repo.findAllWithChildren.mockResolvedValue([
      { id: '1', name: 'Public', showInMenu: true },
      { id: '2', name: 'Admin', showInMenu: true, requiredPermissionCode: 'admin.access' },
      { id: '3', name: 'Hidden', showInMenu: false },
    ]);

    const service = new UserMenuService(repo as any, iamClient as any, makeFakeRedis() as any);
    const result = await service.getUserMenuTree('user-1');

    expect(iamClient.getUserPermissions).toHaveBeenCalledWith('user-1');
    expect(repo.findAllWithChildren).toHaveBeenCalledWith({ status: 'active', context: 'admin' });
    // filterUserMenus receives only visible (showInMenu) menus.
    expect(filterUserMenus).toHaveBeenCalledWith(
      [
        expect.objectContaining({ id: '1' }),
        expect.objectContaining({ id: '2' }),
      ],
      perms,
    );
    expect(result).toBeDefined();
  });

  it('caches the raw admin-menu list: second request skips the full-table query', async () => {
    const repo = makeMockMenuRepo();
    const iamClient = makeMockIamClient();
    repo.findAllWithChildren.mockResolvedValue([{ id: '1', name: 'A', showInMenu: true }]);

    const redis = makeFakeRedis();
    const service = new UserMenuService(repo as any, iamClient as any, redis as any);

    await service.getUserMenuTree('user-1');
    await service.getUserMenuTree('user-1');

    // Full-table query ran ONCE (cache hit on the second call)...
    expect(repo.findAllWithChildren).toHaveBeenCalledTimes(1);
    // ...but permissions are still resolved per request (never cached).
    expect(iamClient.getUserPermissions).toHaveBeenCalledTimes(2);
  });

  it('never serves user A the menu filtered for user B (permissions applied per request)', async () => {
    const repo = makeMockMenuRepo();
    const iamClient = makeMockIamClient();
    repo.findAllWithChildren.mockResolvedValue([
      { id: '1', name: 'Public', showInMenu: true },
      { id: '2', name: 'Admin', showInMenu: true, requiredPermissionCode: 'admin.access' },
    ]);

    const redis = makeFakeRedis();
    const service = new UserMenuService(repo as any, iamClient as any, redis as any);

    // User A holds the admin permission → sees both menus.
    iamClient.getUserPermissions.mockResolvedValueOnce(new Set(['admin.access']));
    const aResult = await service.getUserMenuTree('user-A');

    // User B has no permissions → only the public menu, despite the shared cache.
    iamClient.getUserPermissions.mockResolvedValueOnce(new Set<string>());
    const bResult = await service.getUserMenuTree('user-B');

    expect(aResult.map((m: any) => m.id)).toEqual(['1', '2']);
    expect(bResult.map((m: any) => m.id)).toEqual(['1']);
    // Raw list cached → fetched once, but each user filtered independently.
    expect(repo.findAllWithChildren).toHaveBeenCalledTimes(1);
  });

  it('works without Redis (no cache, still correct)', async () => {
    const repo = makeMockMenuRepo();
    const iamClient = makeMockIamClient();
    repo.findAllWithChildren.mockResolvedValue([{ id: '1', name: 'A', showInMenu: true }]);

    const service = new UserMenuService(repo as any, iamClient as any, undefined);

    await service.getUserMenuTree('user-1');
    await service.getUserMenuTree('user-1');

    // No cache → full-table query each time, but never throws.
    expect(repo.findAllWithChildren).toHaveBeenCalledTimes(2);
  });
});
