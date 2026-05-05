// ---------------------------------------------------------------------------
// Module mocks — must come before any import that transitively loads them.
// ---------------------------------------------------------------------------
jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
}));

jest.mock('@package/common', () => ({
  t: (_i18n: any, key: string) => key,
  parseDurationToSeconds: jest.fn((v: string, d: number) => d),
}));

jest.mock('nestjs-i18n', () => ({
  I18nContext: { current: () => ({ lang: 'en' }) },
  I18nService: jest.fn(),
}));

jest.mock('src/generated/prisma', () => ({
  Prisma: {
    PrismaClientKnownRequestError: class PrismaClientKnownRequestError extends Error {
      code: string;
      meta: any;
      constructor(msg: string, { code, meta }: { code: string; meta?: any }) {
        super(msg);
        this.code = code;
        this.meta = meta;
      }
    },
  },
}), { virtual: true });

jest.mock('../../../src/modules/auth/repositories/user.repository', () => ({
  UserRepository: jest.fn(),
}));

jest.mock('../../../src/modules/auth/services/auth-otp.service', () => ({
  AuthOtpService: jest.fn(),
}));

jest.mock('../../../src/modules/auth/dto/register.dto', () => ({
  RegisterDto: jest.fn(),
}));

jest.mock('../../../src/modules/auth/utils/user.util', () => ({
  safeUser: (user: any) => user,
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
import { RegistrationService } from '../../../src/modules/auth/services/registration.service';
import * as bcrypt from 'bcryptjs';
import { Prisma } from 'src/generated/prisma';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeMockUserRepo() {
  return {
    findByEmail: jest.fn(),
    findByUsername: jest.fn(),
    findByPhone: jest.fn(),
    create: jest.fn(),
    withTransaction: jest.fn(),
    enqueueOutboxEvent: jest.fn(),
  };
}

function makeMockOtpService() {
  return {
    verifyAndDelete: jest.fn(),
  };
}

function makeMockI18nService() {
  return {
    t: jest.fn((key: string) => key),
  };
}

function makeMockConfigService() {
  const store: Record<string, any> = {
    BCRYPT_ROUNDS: '10',
  };
  return {
    get: jest.fn((key: string) => store[key]),
    _store: store,
  };
}

function buildService() {
  const userRepo = makeMockUserRepo();
  const otpService = makeMockOtpService();
  const i18n = makeMockI18nService();
  const config = makeMockConfigService();

  const mockLogSession = {
    addDebug: jest.fn().mockReturnThis(),
    addException: jest.fn().mockReturnThis(),
    save: jest.fn(),
  };
  const fileLogger = {
    create: jest.fn().mockReturnValue(mockLogSession),
  };

  const service = new RegistrationService(
    userRepo as any,
    otpService as any,
    i18n as any,
    config as any,
    fileLogger as any,
  );

  return { service, userRepo, otpService, i18n, config, fileLogger, mockLogSession };
}

const baseDto = {
  email: 'User@Example.com',
  username: 'testuser',
  password: 'StrongP@ss1',
  name: 'Test User',
  otp: '123456',
  phone: undefined as string | undefined,
};

const fakeUser = {
  id: 1n,
  email: 'user@example.com',
  username: 'testuser',
  name: 'Test User',
  phone: null,
  status: 'active',
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('RegistrationService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // -----------------------------------------------------------------------
  // register()
  // -----------------------------------------------------------------------
  describe('register()', () => {
    it('succeeds with valid OTP, creates user, and enqueues outbox event', async () => {
      const { service, userRepo, otpService } = buildService();

      userRepo.findByEmail.mockResolvedValue(null);
      userRepo.findByUsername.mockResolvedValue(null);
      otpService.verifyAndDelete.mockResolvedValue(true);
      (bcrypt.hash as jest.Mock).mockResolvedValue('$2a$hashed');
      userRepo.withTransaction.mockImplementation(async (cb: Function) => {
        return cb({});
      });
      userRepo.create.mockResolvedValue(fakeUser);
      userRepo.enqueueOutboxEvent.mockResolvedValue(undefined);

      const result = await service.register(baseDto);

      expect(result.user).toEqual(fakeUser);
      expect(userRepo.create).toHaveBeenCalled();
      expect(userRepo.enqueueOutboxEvent).toHaveBeenCalledWith(
        'user.registered',
        expect.objectContaining({
          user_id: '1',
          email: 'user@example.com',
          username: 'testuser',
        }),
        expect.anything(),
      );
    });

    it('validates uniqueness BEFORE consuming OTP', async () => {
      const { service, userRepo, otpService } = buildService();

      userRepo.findByEmail.mockResolvedValue({ id: 2n });

      await expect(service.register(baseDto)).rejects.toThrow(BadRequestException);

      // OTP should never be consumed if uniqueness fails
      expect(otpService.verifyAndDelete).not.toHaveBeenCalled();
    });

    it('throws BadRequestException for invalid OTP', async () => {
      const { service, userRepo, otpService } = buildService();

      userRepo.findByEmail.mockResolvedValue(null);
      userRepo.findByUsername.mockResolvedValue(null);
      otpService.verifyAndDelete.mockResolvedValue(false);

      await expect(service.register(baseDto)).rejects.toThrow(BadRequestException);
    });

    it('throws for duplicate email (validateUniqueness)', async () => {
      const { service, userRepo } = buildService();

      userRepo.findByEmail.mockResolvedValue({ id: 2n });

      await expect(service.register(baseDto)).rejects.toThrow(BadRequestException);
      try {
        await service.register(baseDto);
      } catch (err: any) {
        expect(err.message).toBe('auth.EMAIL_IN_USE');
      }
    });

    it('throws for duplicate username', async () => {
      const { service, userRepo } = buildService();

      userRepo.findByEmail.mockResolvedValue(null);
      userRepo.findByUsername.mockResolvedValue({ id: 2n });

      await expect(service.register(baseDto)).rejects.toThrow(BadRequestException);
      try {
        await service.register(baseDto);
      } catch (err: any) {
        expect(err.message).toBe('auth.USERNAME_IN_USE');
      }
    });

    it('throws for duplicate phone', async () => {
      const { service, userRepo } = buildService();
      const dtoWithPhone = { ...baseDto, phone: '0123456789' };

      userRepo.findByEmail.mockResolvedValue(null);
      userRepo.findByUsername.mockResolvedValue(null);
      userRepo.findByPhone.mockResolvedValue({ id: 2n });

      await expect(service.register(dtoWithPhone)).rejects.toThrow(BadRequestException);
      try {
        await service.register(dtoWithPhone);
      } catch (err: any) {
        expect(err.message).toBe('auth.PHONE_IN_USE');
      }
    });

    it('catches P2002 race condition on email', async () => {
      const { service, userRepo, otpService } = buildService();

      userRepo.findByEmail.mockResolvedValue(null);
      userRepo.findByUsername.mockResolvedValue(null);
      otpService.verifyAndDelete.mockResolvedValue(true);
      (bcrypt.hash as jest.Mock).mockResolvedValue('$2a$hashed');

      const p2002Error = new (Prisma.PrismaClientKnownRequestError as any)(
        'Unique constraint failed',
        { code: 'P2002', meta: { target: ['email'] } },
      );
      userRepo.withTransaction.mockRejectedValue(p2002Error);

      await expect(service.register(baseDto)).rejects.toThrow(BadRequestException);
      try {
        await service.register(baseDto);
      } catch (err: any) {
        expect(err.message).toBe('auth.EMAIL_IN_USE');
      }
    });

    it('catches P2002 race condition on username', async () => {
      const { service, userRepo, otpService } = buildService();

      userRepo.findByEmail.mockResolvedValue(null);
      userRepo.findByUsername.mockResolvedValue(null);
      otpService.verifyAndDelete.mockResolvedValue(true);
      (bcrypt.hash as jest.Mock).mockResolvedValue('$2a$hashed');

      const p2002Error = new (Prisma.PrismaClientKnownRequestError as any)(
        'Unique constraint failed',
        { code: 'P2002', meta: { target: ['username'] } },
      );
      userRepo.withTransaction.mockRejectedValue(p2002Error);

      await expect(service.register(baseDto)).rejects.toThrow(BadRequestException);
      try {
        await service.register(baseDto);
      } catch (err: any) {
        expect(err.message).toBe('auth.USERNAME_IN_USE');
      }
    });

    it('lowercases email', async () => {
      const { service, userRepo, otpService } = buildService();

      userRepo.findByEmail.mockResolvedValue(null);
      userRepo.findByUsername.mockResolvedValue(null);
      otpService.verifyAndDelete.mockResolvedValue(true);
      (bcrypt.hash as jest.Mock).mockResolvedValue('$2a$hashed');
      userRepo.withTransaction.mockImplementation(async (cb: Function) => cb({}));
      userRepo.create.mockResolvedValue(fakeUser);
      userRepo.enqueueOutboxEvent.mockResolvedValue(undefined);

      await service.register({ ...baseDto, email: 'USER@EXAMPLE.COM' });

      expect(userRepo.findByEmail).toHaveBeenCalledWith('user@example.com');
      expect(otpService.verifyAndDelete).toHaveBeenCalledWith(
        'register',
        'user@example.com',
        baseDto.otp,
      );
    });
  });
});
