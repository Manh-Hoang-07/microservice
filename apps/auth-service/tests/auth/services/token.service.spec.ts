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

jest.mock('@package/redis', () => ({
  RedisService: jest.fn(),
}));

jest.mock('../../../src/jwks/services/jwks.service', () => ({
  JwksService: jest.fn(),
}));

jest.mock('src/types', () => ({
  toPrimaryKey: (v: string) => BigInt(v),
  PrimaryKey: BigInt,
}), { virtual: true });

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { TokenService } from '../../../src/modules/auth/services/token.service';
import { parseDurationToSeconds } from '@package/common';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeMockJwksService() {
  return {
    signToken: jest.fn(),
    verifyToken: jest.fn(),
  };
}

function makeMockConfigService() {
  const store: Record<string, any> = {
    'jwt.expiresIn': '1h',
    'jwt.refreshExpiresIn': '7d',
  };
  return {
    get: jest.fn((key: string) => store[key]),
    _store: store,
  };
}

function makeMockRedisService() {
  return {
    isEnabled: jest.fn().mockReturnValue(true),
    multi: jest.fn().mockResolvedValue(undefined),
    get: jest.fn(),
    smembers: jest.fn(),
    del: jest.fn(),
    deleteMany: jest.fn(),
  };
}

function buildService() {
  const jwksService = makeMockJwksService();
  const config = makeMockConfigService();
  const redis = makeMockRedisService();

  const service = new TokenService(
    jwksService as any,
    config as any,
    redis as any,
  );

  return { service, jwksService, config, redis };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('TokenService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // -----------------------------------------------------------------------
  // generateTokens()
  // -----------------------------------------------------------------------
  describe('generateTokens()', () => {
    it('returns access + refresh tokens with JTI', async () => {
      const { service, jwksService } = buildService();

      jwksService.signToken
        .mockResolvedValueOnce('access-jwt')
        .mockResolvedValueOnce('refresh-jwt');

      const result = await service.generateTokens(1n, 'user@example.com');

      expect(result.accessToken).toBe('access-jwt');
      expect(result.refreshToken).toBe('refresh-jwt');
      expect(result.refreshJti).toBeDefined();
      expect(typeof result.refreshJti).toBe('string');
      expect(result.accessTtlSec).toBe(3600);
      expect(result.refreshTtlSec).toBe(604800);
    });

    it('calls jwksService.signToken with correct payload', async () => {
      const { service, jwksService } = buildService();

      jwksService.signToken
        .mockResolvedValueOnce('access-jwt')
        .mockResolvedValueOnce('refresh-jwt');

      const result = await service.generateTokens(1n, 'user@example.com');

      // First call: access token
      expect(jwksService.signToken).toHaveBeenCalledTimes(2);
      const [accessPayload, accessExp] = jwksService.signToken.mock.calls[0];
      expect(accessPayload).toEqual({ sub: '1', email: 'user@example.com' });
      expect(accessExp).toBe('1h');

      // Second call: refresh token
      const [refreshPayload, refreshExp] = jwksService.signToken.mock.calls[1];
      expect(refreshPayload).toEqual(
        expect.objectContaining({
          sub: '1',
          email: 'user@example.com',
          jti: result.refreshJti,
          type: 'refresh',
        }),
      );
      expect(refreshExp).toBe('7d');
    });
  });

  // -----------------------------------------------------------------------
  // storeRefreshJti()
  // -----------------------------------------------------------------------
  describe('storeRefreshJti()', () => {
    it('stores in Redis via multi', async () => {
      const { service, redis } = buildService();

      await service.storeRefreshJti(1n, 'jti-abc', 604800);

      expect(redis.multi).toHaveBeenCalledWith([
        ['SET', 'auth:refresh:1:jti-abc', '1', 'EX', 604800],
        ['SADD', 'auth:user:1:refresh-jtis', 'jti-abc'],
        ['EXPIRE', 'auth:user:1:refresh-jtis', 604800],
      ]);
    });

    it('throws when Redis is disabled', async () => {
      const { service, redis } = buildService();
      redis.isEnabled.mockReturnValue(false);

      await expect(service.storeRefreshJti(1n, 'jti-abc', 604800)).rejects.toThrow(
        'Refresh-token store unavailable (Redis disabled)',
      );
    });
  });

  // -----------------------------------------------------------------------
  // isRefreshActive()
  // -----------------------------------------------------------------------
  describe('isRefreshActive()', () => {
    it('returns true when key exists', async () => {
      const { service, redis } = buildService();
      redis.get.mockResolvedValue('1');

      const result = await service.isRefreshActive(1n, 'jti-abc');

      expect(result).toBe(true);
      expect(redis.get).toHaveBeenCalledWith('auth:refresh:1:jti-abc');
    });

    it('returns false when key is missing', async () => {
      const { service, redis } = buildService();
      redis.get.mockResolvedValue(null);

      const result = await service.isRefreshActive(1n, 'jti-abc');

      expect(result).toBe(false);
    });

    it('returns false when Redis is disabled', async () => {
      const { service, redis } = buildService();
      redis.isEnabled.mockReturnValue(false);

      const result = await service.isRefreshActive(1n, 'jti-abc');

      expect(result).toBe(false);
      expect(redis.get).not.toHaveBeenCalled();
    });
  });

  // -----------------------------------------------------------------------
  // revokeRefreshJti()
  // -----------------------------------------------------------------------
  describe('revokeRefreshJti()', () => {
    it('deletes key and removes from set', async () => {
      const { service, redis } = buildService();

      await service.revokeRefreshJti(1n, 'jti-abc');

      expect(redis.multi).toHaveBeenCalledWith([
        ['DEL', 'auth:refresh:1:jti-abc'],
        ['SREM', 'auth:user:1:refresh-jtis', 'jti-abc'],
      ]);
    });
  });

  // -----------------------------------------------------------------------
  // revokeAllUserSessions()
  // -----------------------------------------------------------------------
  describe('revokeAllUserSessions()', () => {
    it('renames set, deletes all keys, and cleans snapshot', async () => {
      const { service, redis } = buildService();

      redis.smembers.mockResolvedValue(['jti-1', 'jti-2']);
      redis.deleteMany.mockResolvedValue(undefined);
      redis.del.mockResolvedValue(undefined);

      const dateSpy = jest.spyOn(Date, 'now').mockReturnValue(1700000000000);

      await service.revokeAllUserSessions(1n);

      // Should rename the set to a snapshot key
      expect(redis.multi).toHaveBeenCalledWith([
        ['RENAME', 'auth:user:1:refresh-jtis', 'auth:user:1:refresh-jtis:revoke:1700000000000'],
      ]);

      // Should fetch jtis from snapshot
      expect(redis.smembers).toHaveBeenCalledWith(
        'auth:user:1:refresh-jtis:revoke:1700000000000',
      );

      // Should delete individual refresh keys
      expect(redis.deleteMany).toHaveBeenCalledWith([
        'auth:refresh:1:jti-1',
        'auth:refresh:1:jti-2',
      ]);

      // Should clean up the snapshot key
      expect(redis.del).toHaveBeenCalledWith(
        'auth:user:1:refresh-jtis:revoke:1700000000000',
      );

      dateSpy.mockRestore();
    });
  });

  // -----------------------------------------------------------------------
  // verifyRefreshToken()
  // -----------------------------------------------------------------------
  describe('verifyRefreshToken()', () => {
    it('rejects non-refresh tokens', async () => {
      const { service, jwksService } = buildService();
      jwksService.verifyToken.mockResolvedValue({ sub: '1', type: 'access' });

      await expect(service.verifyRefreshToken('access-jwt')).rejects.toThrow(
        'Not a refresh token',
      );
    });
  });
});
