// ---------------------------------------------------------------------------
// Module mocks — must come before any import that transitively loads them.
// ---------------------------------------------------------------------------
jest.mock('@package/common', () => ({
  t: (_i18n: any, key: string) => key,
  parseDurationToSeconds: jest.fn((v: string, d: number) => d),
}));

jest.mock('nestjs-i18n', () => ({
  I18nContext: { current: () => ({ lang: 'en' }) },
  I18nService: jest.fn(),
}));

jest.mock('../../../src/jwks/services/jwks.service', () => ({
  JwksService: jest.fn(),
}));

jest.mock('../../../src/core/security/services/token-blacklist.service', () => ({
  TokenBlacklistService: jest.fn(),
}));

jest.mock('src/types', () => ({
  toPrimaryKey: (v: string) => BigInt(v),
  PrimaryKey: BigInt,
}), { virtual: true });

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { AuthJwtGuard } from '../../../src/core/guards/auth-jwt.guard';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function mockContext(headers: Record<string, string> = {}): ExecutionContext {
  const req = { headers, user: undefined as any };
  return {
    getHandler: jest.fn(),
    getClass: jest.fn(),
    switchToHttp: () => ({ getRequest: () => req }),
  } as any;
}

function getReqFromContext(ctx: ExecutionContext) {
  return ctx.switchToHttp().getRequest() as any;
}

function makeMockReflector(permissions: string[] | undefined = undefined) {
  return {
    getAllAndOverride: jest.fn().mockReturnValue(permissions),
  };
}

function makeMockConfigService(values: Record<string, string | undefined> = {}) {
  return {
    get: jest.fn((key: string) => values[key]),
  };
}

function makeMockJwksService() {
  return {
    verifyToken: jest.fn(),
  };
}

function makeMockI18nService() {
  return {
    t: jest.fn((key: string) => key),
  };
}

function makeMockTokenBlacklistService() {
  return {
    has: jest.fn().mockResolvedValue(false),
  };
}

function buildGuard(options: {
  permissions?: string[];
  configValues?: Record<string, string | undefined>;
} = {}) {
  const reflector = makeMockReflector(options.permissions);
  const configService = makeMockConfigService(options.configValues ?? {});
  const jwksService = makeMockJwksService();
  const i18nService = makeMockI18nService();
  const tokenBlacklistService = makeMockTokenBlacklistService();

  const iamClient = {
    isConfigured: jest.fn().mockReturnValue(false),
    checkPermissions: jest.fn().mockResolvedValue(true),
  };

  const guard = new AuthJwtGuard(
    reflector as any,
    configService as any,
    jwksService as any,
    i18nService as any,
    tokenBlacklistService as any,
    iamClient as any,
  );

  return {
    guard,
    reflector,
    configService,
    jwksService,
    i18nService,
    tokenBlacklistService,
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('AuthJwtGuard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // -----------------------------------------------------------------------
  // No permissions set
  // -----------------------------------------------------------------------
  it('returns false when no permissions set', async () => {
    const { guard } = buildGuard({ permissions: undefined });
    const ctx = mockContext();

    const result = await guard.canActivate(ctx);

    expect(result).toBe(false);
  });

  // -----------------------------------------------------------------------
  // Public routes
  // -----------------------------------------------------------------------
  describe('public routes', () => {
    it('returns true for public route without token', async () => {
      const { guard } = buildGuard({ permissions: ['public'] });
      const ctx = mockContext();

      const result = await guard.canActivate(ctx);

      expect(result).toBe(true);
      expect(getReqFromContext(ctx).user).toBeUndefined();
    });

    it('sets req.user when valid token provided', async () => {
      const { guard, jwksService } = buildGuard({ permissions: ['public'] });
      const payload = { sub: '1', type: 'access', email: 'user@example.com' };
      jwksService.verifyToken.mockResolvedValue(payload);

      const ctx = mockContext({ authorization: 'Bearer valid-token' });
      const result = await guard.canActivate(ctx);

      expect(result).toBe(true);
      expect(getReqFromContext(ctx).user).toEqual(payload);
    });

    it('does NOT set req.user for invalid token', async () => {
      const { guard, jwksService } = buildGuard({ permissions: ['public'] });
      jwksService.verifyToken.mockRejectedValue(new Error('invalid'));

      const ctx = mockContext({ authorization: 'Bearer bad-token' });
      const result = await guard.canActivate(ctx);

      expect(result).toBe(true);
      expect(getReqFromContext(ctx).user).toBeUndefined();
    });

    it('does NOT set req.user for refresh token', async () => {
      const { guard, jwksService } = buildGuard({ permissions: ['public'] });
      jwksService.verifyToken.mockResolvedValue({ sub: '1', type: 'refresh' });

      const ctx = mockContext({ authorization: 'Bearer refresh-token' });
      const result = await guard.canActivate(ctx);

      expect(result).toBe(true);
      expect(getReqFromContext(ctx).user).toBeUndefined();
    });
  });

  // -----------------------------------------------------------------------
  // Protected routes
  // -----------------------------------------------------------------------
  describe('protected routes', () => {
    it('throws when no token', async () => {
      const { guard } = buildGuard({ permissions: ['read:users'] });
      const ctx = mockContext();

      await expect(guard.canActivate(ctx)).rejects.toThrow(UnauthorizedException);
    });

    it('authenticates valid token and sets req.user', async () => {
      const { guard, jwksService } = buildGuard({ permissions: ['read:users'] });
      const payload = { sub: '1', type: 'access', email: 'user@example.com' };
      jwksService.verifyToken.mockResolvedValue(payload);

      const ctx = mockContext({ authorization: 'Bearer valid-token' });
      const result = await guard.canActivate(ctx);

      expect(result).toBe(true);
      expect(getReqFromContext(ctx).user).toEqual(payload);
    });

    it('throws for invalid/expired token', async () => {
      const { guard, jwksService } = buildGuard({ permissions: ['read:users'] });
      jwksService.verifyToken.mockRejectedValue(new Error('expired'));

      const ctx = mockContext({ authorization: 'Bearer expired-token' });

      await expect(guard.canActivate(ctx)).rejects.toThrow(UnauthorizedException);
    });

    it('rejects refresh tokens on protected routes', async () => {
      const { guard, jwksService } = buildGuard({ permissions: ['read:users'] });
      jwksService.verifyToken.mockResolvedValue({ sub: '1', type: 'refresh' });

      const ctx = mockContext({ authorization: 'Bearer refresh-token' });

      await expect(guard.canActivate(ctx)).rejects.toThrow(UnauthorizedException);
    });

    it('rejects blacklisted tokens', async () => {
      const { guard, jwksService, tokenBlacklistService } = buildGuard({
        permissions: ['read:users'],
      });
      jwksService.verifyToken.mockResolvedValue({ sub: '1', type: 'access' });
      tokenBlacklistService.has.mockResolvedValue(true);

      const ctx = mockContext({ authorization: 'Bearer blacklisted-token' });

      await expect(guard.canActivate(ctx)).rejects.toThrow(UnauthorizedException);
    });
  });

  // -----------------------------------------------------------------------
  // Internal routes
  // -----------------------------------------------------------------------
  describe('internal routes', () => {
    it('accepts valid secret (timing-safe)', async () => {
      const { guard } = buildGuard({
        permissions: ['internal'],
        configValues: { INTERNAL_API_SECRET: 'my-secret-key' },
      });

      const ctx = mockContext({ 'x-internal-secret': 'my-secret-key' });
      const result = await guard.canActivate(ctx);

      expect(result).toBe(true);
    });

    it('rejects wrong secret', async () => {
      const { guard } = buildGuard({
        permissions: ['internal'],
        configValues: { INTERNAL_API_SECRET: 'correct-secret' },
      });

      const ctx = mockContext({ 'x-internal-secret': 'wrong-secret!' });

      await expect(guard.canActivate(ctx)).rejects.toThrow(UnauthorizedException);
    });

    it('rejects when no secret configured', async () => {
      const { guard } = buildGuard({
        permissions: ['internal'],
        configValues: {},
      });

      const ctx = mockContext({ 'x-internal-secret': 'any-secret' });

      await expect(guard.canActivate(ctx)).rejects.toThrow(UnauthorizedException);
    });
  });
});
