import { BadRequestException, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { GroupPermissionGuard } from '../../src/guards/group-permission.guard';
import { PERM_GROUP_KEY } from '../../src/decorators/permission-group.decorator';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function buildReflector(meta: any): any {
  return { getAllAndOverride: jest.fn().mockReturnValue(meta) };
}

function buildConfig(map: Record<string, any> = {}): any {
  return { get: jest.fn((key: string) => map[key]) };
}

function buildRedis(overrides: Partial<any> = {}): any {
  const stub: any = {
    isEnabled: jest.fn().mockReturnValue(true),
    hgetall: jest.fn().mockResolvedValue({ version: '1' }),
    get: jest.fn().mockResolvedValue(null),
    set: jest.fn().mockResolvedValue(undefined),
    getOrSet: jest.fn().mockImplementation(async (key: string, factory: any, ttl: number) => {
      const cached = await stub.get(key);
      if (cached !== null && cached !== undefined) return JSON.parse(cached);
      const fresh = await factory();
      await stub.set(key, JSON.stringify(fresh), ttl);
      return fresh;
    }),
    ...overrides,
  };
  return stub;
}

function buildContext(req: any): any {
  return {
    switchToHttp: () => ({ getRequest: () => req }),
    getHandler: () => undefined,
    getClass: () => undefined,
  };
}

/** Stub GET /internal/groups/member-permissions → { codes }. */
function mockFetchCodes(codes: string[]) {
  return jest.fn().mockResolvedValue({ ok: true, json: async () => ({ codes }) });
}

const META = { permission: 'post.update', param: 'groupId' };

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('GroupPermissionGuard', () => {
  const originalFetch = global.fetch;
  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => {
    global.fetch = originalFetch;
    process.env.NODE_ENV = originalEnv;
  });

  it('cho qua khi route khong dung @PermissionGroup', async () => {
    const guard = new GroupPermissionGuard(buildReflector(undefined), buildConfig());
    await expect(
      guard.canActivate(buildContext({ user: { sub: '1' }, params: { groupId: '10' } })),
    ).resolves.toBe(true);
  });

  it('reject khi chua dang nhap', async () => {
    const guard = new GroupPermissionGuard(buildReflector(META), buildConfig());
    await expect(
      guard.canActivate(buildContext({ user: undefined, params: { groupId: '10' } })),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('reject BadRequest khi thieu groupId', async () => {
    const guard = new GroupPermissionGuard(buildReflector(META), buildConfig());
    await expect(
      guard.canActivate(buildContext({ user: { sub: '1' }, params: {} })),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  describe('dev-mode bypass khi thieu IAM_INTERNAL_URL', () => {
    it('cho qua khi NODE_ENV=development', async () => {
      process.env.NODE_ENV = 'development';
      const guard = new GroupPermissionGuard(buildReflector(META), buildConfig());
      await expect(
        guard.canActivate(buildContext({ user: { sub: '1' }, params: { groupId: '10' } })),
      ).resolves.toBe(true);
    });

    it('fail-closed khi NODE_ENV=production', async () => {
      process.env.NODE_ENV = 'production';
      const guard = new GroupPermissionGuard(buildReflector(META), buildConfig());
      await expect(
        guard.canActivate(buildContext({ user: { sub: '1' }, params: { groupId: '10' } })),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });
  });

  describe('IAM call + caching', () => {
    const config = { IAM_INTERNAL_URL: 'http://iam:3002/api/iam', INTERNAL_API_SECRET: 's' };

    it('cho qua khi user co quyen trong nhom + cache key dung dinh dang', async () => {
      global.fetch = mockFetchCodes(['post.view', 'post.update']);
      const redis = buildRedis();
      const guard = new GroupPermissionGuard(buildReflector(META), buildConfig(config), redis);
      await expect(
        guard.canActivate(buildContext({ user: { sub: '42' }, params: { groupId: '10' } })),
      ).resolves.toBe(true);
      const url = (global.fetch as jest.Mock).mock.calls[0][0];
      expect(url).toContain('/internal/groups/member-permissions?userId=42&groupId=10');
      expect(redis.set).toHaveBeenCalledWith(
        expect.stringMatching(/^rbac:group:v1:u:42:g:10$/),
        expect.any(String),
        expect.any(Number),
      );
    });

    it('throw Forbidden khi user khong co quyen yeu cau', async () => {
      global.fetch = mockFetchCodes(['post.view']);
      const guard = new GroupPermissionGuard(buildReflector(META), buildConfig(config), buildRedis());
      await expect(
        guard.canActivate(buildContext({ user: { sub: '42' }, params: { groupId: '10' } })),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('dung cache khi hit, khong goi IAM', async () => {
      global.fetch = jest.fn();
      const redis = buildRedis({ get: jest.fn().mockResolvedValue(JSON.stringify(['post.update'])) });
      const guard = new GroupPermissionGuard(buildReflector(META), buildConfig(config), redis);
      await expect(
        guard.canActivate(buildContext({ user: { sub: '42' }, params: { groupId: '10' } })),
      ).resolves.toBe(true);
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('treat IAM 4xx as deny', async () => {
      global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 403, json: async () => ({}) });
      const guard = new GroupPermissionGuard(buildReflector(META), buildConfig(config), buildRedis());
      await expect(
        guard.canActivate(buildContext({ user: { sub: '42' }, params: { groupId: '10' } })),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('khong co redis van hoat dong', async () => {
      global.fetch = mockFetchCodes(['post.update']);
      const guard = new GroupPermissionGuard(buildReflector(META), buildConfig(config));
      await expect(
        guard.canActivate(buildContext({ user: { sub: '1' }, params: { groupId: '10' } })),
      ).resolves.toBe(true);
    });
  });

  it('PERM_GROUP_KEY duoc dung khi reflect metadata', () => {
    const reflector = buildReflector(META);
    new GroupPermissionGuard(reflector, buildConfig()).canActivate(
      buildContext({ user: { sub: '1' }, params: { groupId: '10' } }),
    ).catch(() => {});
    expect(reflector.getAllAndOverride).toHaveBeenCalledWith(PERM_GROUP_KEY, expect.any(Array));
  });
});
