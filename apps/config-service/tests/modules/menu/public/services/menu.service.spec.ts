// ---------------------------------------------------------------------------
// Module mocks
// ---------------------------------------------------------------------------
jest.mock('@package/redis', () => ({
  ...jest.requireActual('@package/redis'),
  RedisService: jest.fn(),
}));
jest.mock('@package/bootstrap', () => ({ FileLogger: jest.fn() }));

jest.mock('../../../../../src/modules/menu/repositories/menu.repository', () => ({
  MenuRepository: jest.fn(),
}));

jest.mock('../../../../../src/modules/menu/helpers/menu.helper', () => ({
  buildMenuTree: jest.fn((menus: any[]) => menus),
  filterPublicMenus: jest.fn((menus: any[]) => menus),
}));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { PublicMenuService } from '../../../../../src/modules/menu/public/services/menu.service';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeMockMenuRepo() {
  return {
    findAllWithChildren: jest.fn().mockResolvedValue([]),
  };
}

function makeMockRedis(enabled = true) {
  return {
    isEnabled: jest.fn().mockReturnValue(enabled),
    get: jest.fn().mockResolvedValue(null),
    set: jest.fn().mockResolvedValue('OK'),
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('PublicMenuService', () => {
  afterEach(() => jest.restoreAllMocks());

  it('should return public menu tree from DB on cache miss', async () => {
    const repo = makeMockMenuRepo();
    const redis = makeMockRedis();
    const service = new PublicMenuService(repo as any, redis as any);

    const menus = [
      { id: '1', name: 'Home', show_in_menu: true, status: 'active' },
      { id: '2', name: 'Hidden', show_in_menu: false, status: 'active' },
    ];
    repo.findAllWithChildren.mockResolvedValue(menus);

    const result = await service.getPublicMenuTree();

    expect(repo.findAllWithChildren).toHaveBeenCalledWith({
      status: 'active',
      context: 'client',
    });
    // Only show_in_menu items pass the .filter
    expect(result).toBeDefined();
  });

  it('should return cached value from Redis', async () => {
    const repo = makeMockMenuRepo();
    const redis = makeMockRedis();
    const cached = [{ id: '1', name: 'Cached' }];
    redis.get.mockResolvedValue(JSON.stringify(cached));

    const service = new PublicMenuService(repo as any, redis as any);
    const result = await service.getPublicMenuTree();

    expect(result).toEqual(cached);
    expect(repo.findAllWithChildren).not.toHaveBeenCalled();
  });

  it('should work without Redis', async () => {
    const repo = makeMockMenuRepo();
    repo.findAllWithChildren.mockResolvedValue([
      { id: '1', name: 'NoRedis', show_in_menu: true },
    ]);

    const service = new PublicMenuService(repo as any, undefined);
    const result = await service.getPublicMenuTree();

    expect(result).toBeDefined();
  });
});
