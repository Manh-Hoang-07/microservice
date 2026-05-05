// ---------------------------------------------------------------------------
// Module mocks — must come before any import that transitively loads them.
// ---------------------------------------------------------------------------
jest.mock('bcryptjs', () => ({ compare: jest.fn() }));

jest.mock('@package/common', () => ({
  t: (_i18n: any, key: string) => key,
  parseDurationToSeconds: jest.fn((v: string, d: number) => d),
}));

jest.mock('@package/bootstrap', () => ({
  FileLogger: jest.fn(),
}));

jest.mock('nestjs-i18n', () => ({
  I18nContext: { current: () => ({ lang: 'en' }) },
  I18nService: jest.fn(),
}));

jest.mock('../../../src/core/security/services/token-blacklist.service', () => ({
  TokenBlacklistService: jest.fn(),
}));

jest.mock('../../../src/core/security/services/attempt-limiter.service', () => ({
  AttemptLimiterService: jest.fn(),
}));

jest.mock('../../../src/modules/auth/services/token.service', () => ({
  TokenService: jest.fn(),
}));

jest.mock('../../../src/modules/auth/dto/login.dto', () => ({
  LoginDto: jest.fn(),
}));

jest.mock('../../../src/modules/auth/repositories/user.repository', () => ({
  UserRepository: jest.fn(),
}));

// The source imports 'src/types' via tsconfig baseUrl. Jest can't resolve bare
// 'src/' paths, so we register a virtual mock that provides the needed exports.
jest.mock('src/types', () => ({
  toPrimaryKey: (v: string) => BigInt(v),
}), { virtual: true });

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import {
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { LoginService } from '../../../src/modules/auth/services/login.service';
import * as bcrypt from 'bcryptjs';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeMockUserRepo() {
  return {
    findByEmailSelect: jest.fn(),
    updateLastLogin: jest.fn(),
  };
}

function makeMockTokenBlacklistService() {
  return {
    add: jest.fn(),
  };
}

function makeMockTokenService() {
  return {
    generateTokens: jest.fn(),
    storeRefreshJti: jest.fn(),
    verifyAccessToken: jest.fn(),
    getAccessTtlSec: jest.fn().mockReturnValue(3600),
    decodeRefresh: jest.fn(),
    revokeRefreshJti: jest.fn(),
    revokeAllUserSessions: jest.fn(),
    isRefreshActive: jest.fn(),
  };
}

function makeMockAttemptLimiterService() {
  return {
    check: jest.fn(),
    add: jest.fn(),
    reset: jest.fn(),
  };
}

function makeMockI18nService() {
  return {
    t: jest.fn((key: string) => key),
  };
}

function buildService() {
  const userRepo = makeMockUserRepo();
  const tokenBlacklistService = makeMockTokenBlacklistService();
  const tokenService = makeMockTokenService();
  const attemptLimiterService = makeMockAttemptLimiterService();
  const i18nService = makeMockI18nService();

  const mockLogSession = {
    addDebug: jest.fn().mockReturnThis(),
    addException: jest.fn().mockReturnThis(),
    save: jest.fn(),
  };
  const fileLogger = { create: jest.fn().mockReturnValue(mockLogSession) };

  const service = new LoginService(
    userRepo as any,
    tokenBlacklistService as any,
    tokenService as any,
    attemptLimiterService as any,
    i18nService as any,
    fileLogger as any,
  );

  return {
    service,
    userRepo,
    tokenBlacklistService,
    tokenService,
    attemptLimiterService,
    i18nService,
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('LoginService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // -----------------------------------------------------------------------
  // login()
  // -----------------------------------------------------------------------
  describe('login()', () => {
    const dto = { email: 'User@Example.com', password: 'correct-password' };

    it('returns tokens on valid credentials', async () => {
      const { service, userRepo, attemptLimiterService, tokenService } = buildService();

      attemptLimiterService.check.mockResolvedValue({ isLocked: false });
      userRepo.findByEmailSelect.mockResolvedValue({
        id: 1n,
        email: 'user@example.com',
        password: '$2a$hashed',
        status: 'active',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      tokenService.generateTokens.mockResolvedValue({
        accessToken: 'access-jwt',
        refreshToken: 'refresh-jwt',
        refreshJti: 'jti-1',
        accessTtlSec: 3600,
        refreshTtlSec: 604800,
      });

      const result = await service.login(dto);

      expect(result).toEqual({
        token: 'access-jwt',
        refreshToken: 'refresh-jwt',
        expiresIn: 3600,
      });
      expect(userRepo.findByEmailSelect).toHaveBeenCalledWith('user@example.com');
      expect(attemptLimiterService.reset).toHaveBeenCalledWith('auth:login', 'user@example.com');
      expect(userRepo.updateLastLogin).toHaveBeenCalledWith(1n);
      expect(tokenService.storeRefreshJti).toHaveBeenCalledWith(1n, 'jti-1', 604800);
    });

    it('throws ForbiddenException when account is locked', async () => {
      const { service, attemptLimiterService } = buildService();

      attemptLimiterService.check.mockResolvedValue({ isLocked: true, remainingMinutes: 15 });

      await expect(service.login(dto)).rejects.toThrow(ForbiddenException);
    });

    it('throws UnauthorizedException when user is not found', async () => {
      const { service, attemptLimiterService, userRepo } = buildService();

      attemptLimiterService.check.mockResolvedValue({ isLocked: false });
      userRepo.findByEmailSelect.mockResolvedValue(null);

      await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
      expect(attemptLimiterService.add).toHaveBeenCalledWith('auth:login', 'user@example.com');
    });

    it('throws UnauthorizedException for wrong password', async () => {
      const { service, attemptLimiterService, userRepo } = buildService();

      attemptLimiterService.check.mockResolvedValue({ isLocked: false });
      userRepo.findByEmailSelect.mockResolvedValue({
        id: 1n,
        email: 'user@example.com',
        password: '$2a$hashed',
        status: 'active',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
    });

    it('throws ForbiddenException for inactive account', async () => {
      const { service, attemptLimiterService, userRepo } = buildService();

      attemptLimiterService.check.mockResolvedValue({ isLocked: false });
      userRepo.findByEmailSelect.mockResolvedValue({
        id: 1n,
        email: 'user@example.com',
        password: '$2a$hashed',
        status: 'banned',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      await expect(service.login(dto)).rejects.toThrow(ForbiddenException);
    });

    it('records a failed attempt on wrong password', async () => {
      const { service, attemptLimiterService, userRepo } = buildService();

      attemptLimiterService.check.mockResolvedValue({ isLocked: false });
      userRepo.findByEmailSelect.mockResolvedValue({
        id: 1n,
        email: 'user@example.com',
        password: '$2a$hashed',
        status: 'active',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
      expect(attemptLimiterService.add).toHaveBeenCalledWith('auth:login', 'user@example.com');
    });
  });

  // -----------------------------------------------------------------------
  // refreshTokenByValue()
  // -----------------------------------------------------------------------
  describe('refreshTokenByValue()', () => {
    it('returns new tokens on valid refresh', async () => {
      const { service, tokenService } = buildService();

      tokenService.decodeRefresh.mockResolvedValue({
        sub: '1',
        jti: 'old-jti',
        email: 'user@example.com',
      });
      tokenService.isRefreshActive.mockResolvedValue(true);
      tokenService.generateTokens.mockResolvedValue({
        accessToken: 'new-access',
        refreshToken: 'new-refresh',
        refreshJti: 'new-jti',
        accessTtlSec: 3600,
        refreshTtlSec: 604800,
      });

      const result = await service.refreshTokenByValue('old-refresh-token');

      expect(result).toEqual({
        token: 'new-access',
        refreshToken: 'new-refresh',
        expiresIn: 3600,
      });
      expect(tokenService.storeRefreshJti).toHaveBeenCalledWith(1n, 'new-jti', 604800);
    });

    it('revokes old JTI before issuing new tokens', async () => {
      const { service, tokenService } = buildService();

      tokenService.decodeRefresh.mockResolvedValue({
        sub: '1',
        jti: 'old-jti',
        email: 'user@example.com',
      });
      tokenService.isRefreshActive.mockResolvedValue(true);
      tokenService.generateTokens.mockResolvedValue({
        accessToken: 'new-access',
        refreshToken: 'new-refresh',
        refreshJti: 'new-jti',
        accessTtlSec: 3600,
        refreshTtlSec: 604800,
      });

      await service.refreshTokenByValue('old-refresh-token');

      expect(tokenService.revokeRefreshJti).toHaveBeenCalledWith(1n, 'old-jti');
      // revokeRefreshJti must be called before generateTokens
      const revokeOrder = tokenService.revokeRefreshJti.mock.invocationCallOrder[0];
      const generateOrder = tokenService.generateTokens.mock.invocationCallOrder[0];
      expect(revokeOrder).toBeLessThan(generateOrder);
    });

    it('detects refresh token reuse, revokes all sessions, and throws', async () => {
      const { service, tokenService } = buildService();

      tokenService.decodeRefresh.mockResolvedValue({
        sub: '1',
        jti: 'reused-jti',
        email: 'user@example.com',
      });
      tokenService.isRefreshActive.mockResolvedValue(false);

      await expect(service.refreshTokenByValue('reused-token')).rejects.toThrow(
        UnauthorizedException,
      );
      expect(tokenService.revokeAllUserSessions).toHaveBeenCalledWith(1n);
    });

    it('throws for invalid/expired refresh token (decode returns null)', async () => {
      const { service, tokenService } = buildService();

      tokenService.decodeRefresh.mockResolvedValue(null);

      await expect(service.refreshTokenByValue('garbage-token')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  // -----------------------------------------------------------------------
  // logout()
  // -----------------------------------------------------------------------
  describe('logout()', () => {
    it('blacklists access token and revokes refresh JTI', async () => {
      const { service, tokenService, tokenBlacklistService } = buildService();

      tokenService.verifyAccessToken.mockResolvedValue({ sub: '1', type: 'access' });
      tokenService.decodeRefresh.mockResolvedValue({ sub: '1', jti: 'refresh-jti' });

      await service.logout('access-jwt', 'refresh-jwt');

      expect(tokenBlacklistService.add).toHaveBeenCalledWith('access-jwt', 3600);
      expect(tokenService.revokeRefreshJti).toHaveBeenCalledWith(1n, 'refresh-jti');
    });
  });
});
