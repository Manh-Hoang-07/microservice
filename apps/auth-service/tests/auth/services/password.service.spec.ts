// ---------------------------------------------------------------------------
// Module mocks — must come before any import that transitively loads them.
// ---------------------------------------------------------------------------
jest.mock('bcryptjs', () => ({ hash: jest.fn().mockResolvedValue('hashed') }));

jest.mock('@package/common', () => ({
  t: (_i18n: any, key: string) => key,
  parseDurationToSeconds: jest.fn((v: string, d: number) => d),
}));

jest.mock('nestjs-i18n', () => ({
  I18nContext: { current: () => ({ lang: 'en' }) },
  I18nService: jest.fn(),
}));

jest.mock('../../../src/modules/auth/repositories/user.repository', () => ({
  UserRepository: jest.fn(),
}));

jest.mock('../../../src/core/security/services/attempt-limiter.service', () => ({
  AttemptLimiterService: jest.fn(),
}));

jest.mock('../../../src/modules/auth/services/auth-otp.service', () => ({
  AuthOtpService: jest.fn(),
}));

jest.mock('../../../src/modules/auth/services/token.service', () => ({
  TokenService: jest.fn(),
}));

jest.mock('../../../src/modules/auth/dto/forgot-password.dto', () => ({
  ForgotPasswordDto: jest.fn(),
}));

jest.mock('../../../src/modules/auth/dto/reset-password.dto', () => ({
  ResetPasswordDto: jest.fn(),
}));

jest.mock('src/types', () => ({
  toPrimaryKey: (v: string) => BigInt(v),
  PrimaryKey: BigInt,
}), { virtual: true });

jest.mock('@package/bootstrap', () => ({
  FileLogger: jest.fn(),
}));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { BadRequestException } from '@nestjs/common';
import { PasswordService } from '../../../src/modules/auth/services/password.service';
import * as bcrypt from 'bcryptjs';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeMockUserRepo() {
  return {
    findByEmail: jest.fn(),
    update: jest.fn(),
    withTransaction: jest.fn(async (cb: (tx: any) => Promise<void>) => cb('tx')),
    enqueueOutboxEvent: jest.fn(),
  };
}

function makeMockOtpService() {
  return {
    sendForgotPasswordOtp: jest.fn(),
    verifyAndDelete: jest.fn(),
  };
}

function makeMockAttemptLimiterService() {
  return {
    check: jest.fn(),
    add: jest.fn(),
    reset: jest.fn(),
  };
}

function makeMockTokenService() {
  return {
    revokeAllUserSessions: jest.fn(),
  };
}

function makeMockI18nService() {
  return {
    t: jest.fn((key: string) => key),
  };
}

function makeMockConfigService() {
  return {
    get: jest.fn((key: string) => {
      if (key === 'BCRYPT_ROUNDS') return '10';
      return undefined;
    }),
  };
}

function buildService() {
  const userRepo = makeMockUserRepo();
  const otpService = makeMockOtpService();
  const attemptLimiterService = makeMockAttemptLimiterService();
  const tokenService = makeMockTokenService();
  const i18nService = makeMockI18nService();
  const configService = makeMockConfigService();

  const mockLogSession = {
    addDebug: jest.fn().mockReturnThis(),
    addException: jest.fn().mockReturnThis(),
    save: jest.fn(),
  };
  const fileLogger = {
    create: jest.fn().mockReturnValue(mockLogSession),
  };

  const service = new PasswordService(
    userRepo as any,
    otpService as any,
    attemptLimiterService as any,
    tokenService as any,
    i18nService as any,
    configService as any,
    fileLogger as any,
  );

  return {
    service,
    userRepo,
    otpService,
    attemptLimiterService,
    tokenService,
    i18nService,
    configService,
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('PasswordService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // -----------------------------------------------------------------------
  // forgotPassword()
  // -----------------------------------------------------------------------
  describe('forgotPassword()', () => {
    const dto = { email: 'User@Example.com' };

    it('sends OTP when user exists and is active', async () => {
      const { service, userRepo, otpService } = buildService();

      userRepo.findByEmail.mockResolvedValue({
        id: 1n,
        email: 'user@example.com',
        status: 'active',
      });

      await service.forgotPassword(dto);

      expect(userRepo.findByEmail).toHaveBeenCalledWith('user@example.com');
      expect(otpService.sendForgotPasswordOtp).toHaveBeenCalledWith('user@example.com');
    });

    it('does NOT send OTP when user does not exist (email enumeration safe)', async () => {
      const { service, userRepo, otpService } = buildService();

      userRepo.findByEmail.mockResolvedValue(null);

      await service.forgotPassword(dto);

      expect(userRepo.findByEmail).toHaveBeenCalledWith('user@example.com');
      expect(otpService.sendForgotPasswordOtp).not.toHaveBeenCalled();
    });

    it('does NOT send OTP when user is locked', async () => {
      const { service, userRepo, otpService } = buildService();

      userRepo.findByEmail.mockResolvedValue({
        id: 1n,
        email: 'user@example.com',
        status: 'locked',
      });

      await service.forgotPassword(dto);

      expect(otpService.sendForgotPasswordOtp).not.toHaveBeenCalled();
    });
  });

  // -----------------------------------------------------------------------
  // resetPassword()
  // -----------------------------------------------------------------------
  describe('resetPassword()', () => {
    const dto = {
      email: 'User@Example.com',
      password: 'NewPass123!',
      confirmPassword: 'NewPass123!',
      otp: '123456',
    };

    it('succeeds: verifies OTP, updates password, revokes sessions, resets lockout', async () => {
      const { service, userRepo, otpService, tokenService, attemptLimiterService } = buildService();

      otpService.verifyAndDelete.mockResolvedValue(true);
      userRepo.findByEmail.mockResolvedValue({
        id: 1n,
        email: 'user@example.com',
        status: 'active',
      });

      await service.resetPassword(dto);

      expect(otpService.verifyAndDelete).toHaveBeenCalledWith(
        'forgot-password',
        'user@example.com',
        '123456',
      );
      expect(bcrypt.hash).toHaveBeenCalledWith('NewPass123!', 10);
      expect(userRepo.update).toHaveBeenCalledWith(1n, { password: 'hashed' }, 'tx');
      expect(userRepo.enqueueOutboxEvent).toHaveBeenCalledWith(
        'user.password.reset',
        expect.objectContaining({
          user_id: '1',
          email: 'user@example.com',
        }),
        'tx',
      );
      expect(tokenService.revokeAllUserSessions).toHaveBeenCalledWith(1n);
      expect(attemptLimiterService.reset).toHaveBeenCalledWith('auth:login', 'user@example.com');
    });

    it('throws when passwords do not match', async () => {
      const { service } = buildService();

      const mismatchDto = {
        email: 'User@Example.com',
        password: 'NewPass123!',
        confirmPassword: 'Different456!',
        otp: '123456',
      };

      await expect(service.resetPassword(mismatchDto)).rejects.toThrow(BadRequestException);
    });

    it('throws when OTP is invalid', async () => {
      const { service, otpService } = buildService();

      otpService.verifyAndDelete.mockResolvedValue(false);

      await expect(service.resetPassword(dto)).rejects.toThrow(BadRequestException);
    });

    it('throws when user not found after OTP verification', async () => {
      const { service, otpService, userRepo } = buildService();

      otpService.verifyAndDelete.mockResolvedValue(true);
      userRepo.findByEmail.mockResolvedValue(null);

      await expect(service.resetPassword(dto)).rejects.toThrow(BadRequestException);
    });

    it('throws when user is not active', async () => {
      const { service, otpService, userRepo } = buildService();

      otpService.verifyAndDelete.mockResolvedValue(true);
      userRepo.findByEmail.mockResolvedValue({
        id: 1n,
        email: 'user@example.com',
        status: 'banned',
      });

      await expect(service.resetPassword(dto)).rejects.toThrow(BadRequestException);
    });
  });
});
