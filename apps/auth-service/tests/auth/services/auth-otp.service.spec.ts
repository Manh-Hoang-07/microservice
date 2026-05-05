import { ForbiddenException } from '@nestjs/common';

jest.mock('@package/common', () => ({
  t: (_i18n: any, key: string) => key,
}));

import { AuthOtpService } from '../../../src/modules/auth/services/auth-otp.service';

jest.mock('../../../src/modules/auth/utils/otp.helper', () => ({
  generateOtp: jest.fn(() => '123456'),
  buildOtpKey: jest.fn((type: string, email: string) => `otp:${type}:${email}`),
}));

function makeRedis(overrides: Record<string, jest.Mock> = {}) {
  return {
    get: jest.fn().mockResolvedValue(null),
    set: jest.fn().mockResolvedValue('OK'),
    del: jest.fn().mockResolvedValue(1),
    getdel: jest.fn().mockResolvedValue(null),
    ...overrides,
  } as any;
}

function makeMailPublisher(overrides: Record<string, jest.Mock> = {}) {
  return {
    publish: jest.fn(),
    ...overrides,
  } as any;
}

function makeConfig(values: Record<string, string | undefined> = {}) {
  return { get: jest.fn((k: string) => values[k]) } as any;
}

function makeAttemptLimiter(overrides: Record<string, jest.Mock> = {}) {
  return {
    check: jest.fn().mockResolvedValue({ isLocked: false }),
    add: jest.fn(),
    reset: jest.fn(),
    ...overrides,
  } as any;
}

function makeI18n() {
  return {
    t: jest.fn((key: string, opts?: any) => key),
  } as any;
}

function buildService(deps: {
  redis?: any;
  mailPublisher?: any;
  config?: any;
  attemptLimiter?: any;
  i18n?: any;
} = {}) {
  return new AuthOtpService(
    deps.redis ?? makeRedis(),
    deps.mailPublisher ?? makeMailPublisher(),
    deps.config ?? makeConfig({ OTP_TTL_SECONDS: '300' }),
    deps.attemptLimiter ?? makeAttemptLimiter(),
    deps.i18n ?? makeI18n(),
  );
}

describe('AuthOtpService', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('verifyAndDelete()', () => {
    it('returns true and resets attempts on correct OTP', async () => {
      const redis = makeRedis({ getdel: jest.fn().mockResolvedValue('123456') });
      const attemptLimiter = makeAttemptLimiter();
      const svc = buildService({ redis, attemptLimiter });

      const result = await svc.verifyAndDelete('register', 'user@test.com', '123456');

      expect(result).toBe(true);
      expect(redis.getdel).toHaveBeenCalledWith('otp:register:user@test.com');
      expect(attemptLimiter.reset).toHaveBeenCalledWith('otp:verify:register', 'user@test.com');
      expect(attemptLimiter.add).not.toHaveBeenCalled();
    });

    it('returns false and records failed attempt on wrong OTP', async () => {
      const redis = makeRedis({ getdel: jest.fn().mockResolvedValue('123456') });
      const attemptLimiter = makeAttemptLimiter();
      const svc = buildService({ redis, attemptLimiter });

      const result = await svc.verifyAndDelete('register', 'user@test.com', '999999');

      expect(result).toBe(false);
      expect(attemptLimiter.add).toHaveBeenCalledWith(
        'otp:verify:register',
        'user@test.com',
        expect.objectContaining({ maxAttempts: 5, lockoutSeconds: 900, windowSeconds: 300 }),
      );
      expect(attemptLimiter.reset).not.toHaveBeenCalled();
    });

    it('returns false when no OTP exists in Redis (expired/not sent)', async () => {
      const redis = makeRedis({ getdel: jest.fn().mockResolvedValue(null) });
      const attemptLimiter = makeAttemptLimiter();
      const svc = buildService({ redis, attemptLimiter });

      const result = await svc.verifyAndDelete('register', 'user@test.com', '123456');

      expect(result).toBe(false);
      expect(attemptLimiter.add).toHaveBeenCalled();
    });

    it('throws ForbiddenException when account is locked from too many attempts', async () => {
      const attemptLimiter = makeAttemptLimiter({
        check: jest.fn().mockResolvedValue({ isLocked: true, remainingMinutes: 15 }),
        add: jest.fn(),
        reset: jest.fn(),
      });
      const redis = makeRedis();
      const svc = buildService({ redis, attemptLimiter });

      await expect(
        svc.verifyAndDelete('register', 'user@test.com', '123456'),
      ).rejects.toThrow(ForbiddenException);

      expect(redis.getdel).not.toHaveBeenCalled();
    });

    it('deletes OTP atomically on success (uses getdel)', async () => {
      const redis = makeRedis({ getdel: jest.fn().mockResolvedValue('555555') });
      const svc = buildService({ redis });

      await svc.verifyAndDelete('forgot-password', 'a@b.com', '555555');

      expect(redis.getdel).toHaveBeenCalledTimes(1);
      expect(redis.getdel).toHaveBeenCalledWith('otp:forgot-password:a@b.com');
      // Ensures we use getdel (atomic get+delete) rather than separate get then del
      expect(redis.get).not.toHaveBeenCalled();
      expect(redis.del).not.toHaveBeenCalled();
    });
  });

  describe('sendRegisterOtp()', () => {
    it('publishes mail and stores OTP in Redis', async () => {
      const redis = makeRedis();
      const mailPublisher = makeMailPublisher();
      const svc = buildService({ redis, mailPublisher });

      await svc.sendRegisterOtp('user@test.com');

      expect(mailPublisher.publish).toHaveBeenCalledWith({
        to: 'user@test.com',
        templateCode: 'send_otp_register',
        variables: { otp: '123456' },
      });
      expect(redis.set).toHaveBeenCalledWith('otp:register:user@test.com', '123456', 300);
    });

    it('cleans up Redis key if mail publish fails', async () => {
      const redis = makeRedis();
      const mailPublisher = makeMailPublisher({
        publish: jest.fn().mockRejectedValue(new Error('Kafka down')),
      });
      const svc = buildService({ redis, mailPublisher });

      await expect(svc.sendRegisterOtp('user@test.com')).rejects.toThrow('Kafka down');

      expect(redis.del).toHaveBeenCalledWith('otp:register:user@test.com');
      expect(redis.set).not.toHaveBeenCalled();
    });
  });
});
