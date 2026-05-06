// ---------------------------------------------------------------------------
// Module mocks — must come before any import
// ---------------------------------------------------------------------------
jest.mock('@package/common', () => ({
  createPaginationMeta: jest.fn((opts: any, total: number) => ({ page: 1, total })),
  parseQueryOptions: jest.fn((q: any) => ({ skip: 0, take: q.limit ?? 20 })),
}));

jest.mock('@package/bootstrap', () => ({ FileLogger: jest.fn() }));

jest.mock('nestjs-i18n', () => ({
  I18nContext: { current: () => ({ lang: 'en' }) },
  I18nService: jest.fn(),
}));

jest.mock('@package/redis', () => ({ RedisService: jest.fn() }));

jest.mock('src/types', () => ({ toPrimaryKey: (v: string) => BigInt(v) }), { virtual: true });

jest.mock('../../../../../src/modules/menu/repositories/menu.repository', () => ({
  MenuRepository: jest.fn(),
}));

jest.mock('../../../../../src/modules/menu/helpers/menu.helper', () => ({
  buildMenuTree: jest.fn((menus: any[]) => menus),
}));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { MenuService } from '../../../../../src/modules/menu/admin/services/menu.service';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeMockMenuRepo() {
  return {
    findMany: jest.fn().mockResolvedValue([]),
    count: jest.fn().mockResolvedValue(0),
    findById: jest.fn().mockResolvedValue(null),
    findByCode: jest.fn().mockResolvedValue(null),
    findAllWithChildren: jest.fn().mockResolvedValue([]),
    create: jest.fn().mockImplementation((dto: any) => Promise.resolve({ id: '1', ...dto })),
    update: jest.fn().mockImplementation((id: any, dto: any) => Promise.resolve({ id, ...dto })),
    delete: jest.fn().mockResolvedValue(true),
  };
}

function makeMockI18n() {
  return { t: jest.fn((_key: string) => _key) };
}

function makeMockRedis() {
  return { del: jest.fn().mockResolvedValue(1) };
}

function createService(overrides: any = {}) {
  const repo = overrides.repo ?? makeMockMenuRepo();
  const i18n = overrides.i18n ?? makeMockI18n();
  const redis = overrides.redis ?? makeMockRedis();
  const service = new MenuService(repo as any, i18n as any, redis as any);
  return { service, repo, i18n, redis };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('MenuService (admin)', () => {
  afterEach(() => jest.restoreAllMocks());

  // --- getList ---
  describe('getList', () => {
    it('should return paginated data', async () => {
      const { service, repo } = createService();
      repo.findMany.mockResolvedValue([{ id: '1', name: 'Home' }]);
      repo.count.mockResolvedValue(1);

      const result = await service.getList({ search: 'Home' });

      expect(result.data).toHaveLength(1);
      expect(repo.findMany).toHaveBeenCalled();
      expect(repo.count).toHaveBeenCalled();
    });

    it('should skip count when skipCount is true', async () => {
      const { service, repo } = createService();
      repo.findMany.mockResolvedValue([]);

      await service.getList({ skipCount: true });

      expect(repo.count).not.toHaveBeenCalled();
    });

    it('should pass filter fields correctly', async () => {
      const { service, repo } = createService();
      repo.findMany.mockResolvedValue([]);

      await service.getList({
        q: 'test',
        status: 'active',
        type: 'page',
        parent_id: '1',
        group: 'admin',
      });

      expect(repo.findMany).toHaveBeenCalled();
    });
  });

  // --- getSimpleList ---
  describe('getSimpleList', () => {
    it('should call getList with defaults', async () => {
      const { service, repo } = createService();
      repo.findMany.mockResolvedValue([]);

      const result = await service.getSimpleList();

      expect(result).toBeDefined();
    });
  });

  // --- getOne ---
  describe('getOne', () => {
    it('should return item when found', async () => {
      const { service, repo } = createService();
      const item = { id: '1', name: 'Home' };
      repo.findById.mockResolvedValue(item);

      const result = await service.getOne('1');

      expect(result).toEqual(item);
    });

    it('should throw NotFoundException when not found', async () => {
      const { service, repo } = createService();
      repo.findById.mockResolvedValue(null);

      await expect(service.getOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  // --- create ---
  describe('create', () => {
    it('should create a menu item', async () => {
      const { service, repo, redis } = createService();
      const dto = { name: 'New Menu', code: 'new_menu' };
      repo.findByCode.mockResolvedValue(null);
      repo.create.mockResolvedValue({ id: '1', ...dto });

      const result = await service.create(dto);

      expect(result).toEqual({ id: '1', ...dto });
      expect(repo.create).toHaveBeenCalledWith(dto);
      expect(redis.del).toHaveBeenCalledWith('config:public:menu');
    });

    it('should throw BadRequestException if code already exists', async () => {
      const { service, repo } = createService();
      repo.findByCode.mockResolvedValue({ id: '2', code: 'dup' });

      await expect(service.create({ code: 'dup', name: 'Dup' }))
        .rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if parent not found', async () => {
      const { service, repo } = createService();
      repo.findByCode.mockResolvedValue(null);
      repo.findById.mockResolvedValue(null);

      await expect(service.create({ name: 'Child', parent_id: '999' }))
        .rejects.toThrow(BadRequestException);
    });

    it('should handle P2002 unique constraint error', async () => {
      const { service, repo } = createService();
      repo.findByCode.mockResolvedValue(null);
      repo.create.mockRejectedValue({ code: 'P2002' });

      await expect(service.create({ name: 'Race', code: 'race' }))
        .rejects.toThrow(BadRequestException);
    });

    it('should rethrow non-P2002 errors', async () => {
      const { service, repo } = createService();
      repo.findByCode.mockResolvedValue(null);
      repo.create.mockRejectedValue(new Error('DB down'));

      await expect(service.create({ name: 'Err' }))
        .rejects.toThrow('DB down');
    });
  });

  // --- createWithUser ---
  describe('createWithUser', () => {
    it('should set created_user_id from userId', async () => {
      const { service, repo } = createService();
      repo.findByCode.mockResolvedValue(null);
      const dto = { name: 'User Menu' };

      await service.createWithUser(dto, '42');

      expect(repo.create).toHaveBeenCalledWith(
        expect.objectContaining({ created_user_id: '42' }),
      );
    });
  });

  // --- update ---
  describe('update', () => {
    it('should update a menu item', async () => {
      const { service, repo, redis } = createService();
      repo.findById.mockResolvedValue({ id: '1', code: 'old', name: 'Old' });
      repo.update.mockResolvedValue({ id: '1', name: 'Updated' });

      const result = await service.update('1', { name: 'Updated' });

      expect(result).toEqual({ id: '1', name: 'Updated' });
      expect(redis.del).toHaveBeenCalledWith('config:public:menu');
    });

    it('should check code uniqueness when code changes', async () => {
      const { service, repo } = createService();
      repo.findById.mockResolvedValue({ id: '1', code: 'old_code' });
      repo.findByCode.mockResolvedValue({ id: '2', code: 'taken' });

      await expect(service.update('1', { code: 'taken' }))
        .rejects.toThrow(BadRequestException);
    });

    it('should not check code uniqueness when code unchanged', async () => {
      const { service, repo } = createService();
      repo.findById.mockResolvedValue({ id: '1', code: 'same' });
      repo.update.mockResolvedValue({ id: '1', code: 'same' });

      await service.update('1', { code: 'same' });

      expect(repo.findByCode).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException for non-existent menu', async () => {
      const { service, repo } = createService();
      repo.findById.mockResolvedValue(null);

      await expect(service.update('999', { name: 'X' }))
        .rejects.toThrow(NotFoundException);
    });

    it('should validate parent exists when parent_id set', async () => {
      const { service, repo } = createService();
      // First call: getOne for the menu itself; second call: parent lookup
      repo.findById
        .mockResolvedValueOnce({ id: '1', code: 'menu1', parent_id: null })
        .mockResolvedValueOnce(null) // assertNoCycle walk
        .mockResolvedValueOnce(null); // parent check

      await expect(service.update('1', { parent_id: '99' }))
        .rejects.toThrow(BadRequestException);
    });

    it('should handle P2002 on update', async () => {
      const { service, repo } = createService();
      repo.findById.mockResolvedValue({ id: '1', code: 'x' });
      repo.update.mockRejectedValue({ code: 'P2002' });

      await expect(service.update('1', { name: 'Race' }))
        .rejects.toThrow(BadRequestException);
    });
  });

  // --- updateById ---
  describe('updateById', () => {
    it('should set updated_user_id from userId', async () => {
      const { service, repo } = createService();
      repo.findById.mockResolvedValue({ id: '1', code: 'x' });
      repo.update.mockResolvedValue({ id: '1' });

      await service.updateById('1', { name: 'U' }, '42');

      expect(repo.update).toHaveBeenCalledWith(
        '1',
        expect.objectContaining({ updated_user_id: '42' }),
      );
    });
  });

  // --- delete ---
  describe('delete', () => {
    it('should delete a menu item', async () => {
      const { service, repo, redis } = createService();
      repo.findById.mockResolvedValue({ id: '1' });

      const result = await service.delete('1');

      expect(result).toBe(true);
      expect(repo.delete).toHaveBeenCalledWith('1');
      expect(redis.del).toHaveBeenCalledWith('config:public:menu');
    });

    it('should throw NotFoundException if item does not exist', async () => {
      const { service, repo } = createService();
      repo.findById.mockResolvedValue(null);

      await expect(service.delete('999')).rejects.toThrow(NotFoundException);
    });
  });

  // --- getTree ---
  describe('getTree', () => {
    it('should return tree from all menus', async () => {
      const { service, repo } = createService();
      const menus = [{ id: '1', name: 'Root' }];
      repo.findAllWithChildren.mockResolvedValue(menus);

      const result = await service.getTree();

      expect(result).toEqual(menus); // buildMenuTree is mocked to passthrough
      expect(repo.findAllWithChildren).toHaveBeenCalledWith({});
    });
  });

  // --- cycle detection ---
  describe('assertNoCycle (via update)', () => {
    it('should reject setting parent_id to self', async () => {
      const { service, repo } = createService();
      repo.findById.mockResolvedValue({ id: '1', code: 'self', parent_id: null });

      await expect(service.update('1', { parent_id: '1' }))
        .rejects.toThrow(BadRequestException);
    });

    it('should reject cycle: A -> B -> A', async () => {
      const { service, repo } = createService();
      // getOne finds menu '1'
      repo.findById
        .mockResolvedValueOnce({ id: '1', code: 'a', parent_id: null })
        // assertNoCycle: look up candidate parent '2'
        .mockResolvedValueOnce({ id: '2', parent_id: '1' });

      await expect(service.update('1', { parent_id: '2' }))
        .rejects.toThrow(BadRequestException);
    });

    it('should reject deeper cycle: A -> B -> C -> A', async () => {
      const { service, repo } = createService();
      repo.findById
        .mockResolvedValueOnce({ id: '1', code: 'a', parent_id: null })
        // assertNoCycle: walk from '3' up
        .mockResolvedValueOnce({ id: '3', parent_id: '2' })
        .mockResolvedValueOnce({ id: '2', parent_id: '1' });

      await expect(service.update('1', { parent_id: '3' }))
        .rejects.toThrow(BadRequestException);
    });

    it('should allow valid parent assignment', async () => {
      const { service, repo } = createService();
      repo.findById
        .mockResolvedValueOnce({ id: '1', code: 'a', parent_id: null })
        // assertNoCycle: walk from '2' — no parent
        .mockResolvedValueOnce({ id: '2', parent_id: null })
        // parent validation
        .mockResolvedValueOnce({ id: '2', parent_id: null });
      repo.update.mockResolvedValue({ id: '1', parent_id: '2' });

      const result = await service.update('1', { parent_id: '2' });

      expect(result).toEqual({ id: '1', parent_id: '2' });
    });
  });

  // --- clearMenuCaches ---
  describe('cache clearing', () => {
    it('should work when Redis is undefined', async () => {
      const repo = makeMockMenuRepo();
      const i18n = makeMockI18n();
      const service = new MenuService(repo as any, i18n as any, undefined);

      repo.findByCode.mockResolvedValue(null);
      repo.create.mockResolvedValue({ id: '1' });

      // Should not throw even without Redis
      await expect(service.create({ name: 'NoRedis' })).resolves.toBeDefined();
    });
  });
});
