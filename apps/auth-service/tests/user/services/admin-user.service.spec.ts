// ---------------------------------------------------------------------------
// Module mocks — must come before any import that transitively loads them.
// ---------------------------------------------------------------------------
jest.mock('@package/common', () => {
  const actual = jest.requireActual('@package/common');
  return {
    ...actual,
    t: (_i18n: any, key: string) => key,
    getSessionUserId: jest.fn(),
  };
});

jest.mock('bcryptjs', () => ({ hash: jest.fn().mockResolvedValue('hashed-pw') }));
jest.mock('src/types', () => ({ PrimaryKey: BigInt }), { virtual: true });
jest.mock('../../../src/modules/user/repositories/user-admin.repository', () => ({ UserAdminRepository: jest.fn() }));
jest.mock('../../../src/modules/user/admin/dtos/create-user.dto', () => ({ CreateUserDto: jest.fn() }));
jest.mock('../../../src/modules/user/admin/dtos/update-user.dto', () => ({ UpdateUserDto: jest.fn() }));
jest.mock('../../../src/modules/user/admin/dtos/admin-change-password.dto', () => ({ AdminChangePasswordDto: jest.fn() }));
jest.mock('../../../src/modules/user/admin/dtos/change-status.dto', () => ({ ChangeStatusDto: jest.fn() }));
jest.mock('../../../src/modules/user/admin/dtos/user-query.dto', () => ({ UserQueryDto: jest.fn() }));

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { getSessionUserId } from '@package/common';
import { AdminUserService } from '../../../src/modules/user/admin/services/user.service';
import { UserAdminRepository } from '../../../src/modules/user/repositories/user-admin.repository';

const mockedGetSessionUserId = getSessionUserId as jest.MockedFunction<typeof getSessionUserId>;

describe('AdminUserService', () => {
  let service: AdminUserService;
  let userRepo: jest.Mocked<Partial<UserAdminRepository>>;
  let configService: jest.Mocked<Partial<ConfigService>>;
  let i18n: { t: jest.Mock };

  const mockUser = {
    id: 1n,
    email: 'test@example.com',
    username: 'testuser',
    phone: '0123456789',
    password: 'secret',
    rememberToken: 'token123',
    status: 1,
    name: 'Test User',
  };

  const sanitizedUser = {
    id: 1n,
    email: 'test@example.com',
    username: 'testuser',
    phone: '0123456789',
    status: 1,
    name: 'Test User',
  };

  beforeEach(() => {
    userRepo = {
      findAll: jest.fn(),
      findAllSimple: jest.fn(),
      findById: jest.fn(),
      createWithProfile: jest.fn(),
      updateWithProfile: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      checkUnique: jest.fn(),
    };

    configService = {
      get: jest.fn().mockReturnValue(12),
    };

    i18n = { t: jest.fn((key: string) => key) };

    mockedGetSessionUserId.mockReset();
    mockedGetSessionUserId.mockReturnValue(null);

    service = new AdminUserService(
      userRepo as any,
      configService as any,
      i18n as any,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getOne', () => {
    it('should return sanitized user without password and rememberToken', async () => {
      userRepo.findById!.mockResolvedValue(mockUser as any);

      const result = await service.getOne(1n);

      expect(userRepo.findById).toHaveBeenCalledWith(1n);
      expect(result).toEqual(sanitizedUser);
      expect(result).not.toHaveProperty('password');
      expect(result).not.toHaveProperty('rememberToken');
    });

    it('should throw NotFoundException when user not found', async () => {
      userRepo.findById!.mockResolvedValue(null);

      await expect(service.getOne(1n)).rejects.toThrow(NotFoundException);
      await expect(service.getOne(1n)).rejects.toThrow('auth.USER_NOT_FOUND');
    });
  });

  describe('create', () => {
    const createDto = {
      name: 'New User',
      email: 'new@example.com',
      username: 'newuser',
      phone: '0987654321',
      password: 'plaintext',
    };

    it('should hash password, call createWithProfile, and return sanitized user', async () => {
      const actorId = 10n;
      mockedGetSessionUserId.mockReturnValue(actorId);
      userRepo.checkUnique!.mockResolvedValue(null);
      userRepo.createWithProfile!.mockResolvedValue({ id: 2n } as any);
      userRepo.findById!.mockResolvedValue({ ...mockUser, id: 2n } as any);

      const result = await service.create(createDto as any);

      expect(bcrypt.hash).toHaveBeenCalledWith('plaintext', 12);
      expect(userRepo.createWithProfile).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'new@example.com',
          username: 'newuser',
          phone: '0987654321',
          password: 'hashed-pw',
          createdUserId: actorId,
          updatedUserId: actorId,
          searchText: expect.any(String),
        }),
        undefined,
      );
      expect(result).not.toHaveProperty('password');
      expect(result).not.toHaveProperty('rememberToken');
    });

    it('should set createdUserId/updatedUserId to null when no session user', async () => {
      mockedGetSessionUserId.mockReturnValue(null);
      userRepo.checkUnique!.mockResolvedValue(null);
      userRepo.createWithProfile!.mockResolvedValue({ id: 2n } as any);
      userRepo.findById!.mockResolvedValue({ ...mockUser, id: 2n } as any);

      await service.create(createDto as any);

      expect(userRepo.createWithProfile).toHaveBeenCalledWith(
        expect.objectContaining({
          createdUserId: null,
          updatedUserId: null,
        }),
        undefined,
      );
    });

    it('should throw BadRequestException for duplicate email', async () => {
      userRepo.checkUnique!.mockResolvedValue({ field: 'email', value: 'new@example.com' });

      await expect(service.create(createDto as any)).rejects.toThrow(BadRequestException);
      await expect(service.create(createDto as any)).rejects.toThrow('auth.EMAIL_IN_USE');
    });

    it('should include profile data with actor IDs when provided', async () => {
      const actorId = 10n;
      mockedGetSessionUserId.mockReturnValue(actorId);

      const dtoWithProfile = {
        ...createDto,
        profile: { first_name: 'John', last_name: 'Doe' },
      };

      userRepo.checkUnique!.mockResolvedValue(null);
      userRepo.createWithProfile!.mockResolvedValue({ id: 3n } as any);
      userRepo.findById!.mockResolvedValue({ ...mockUser, id: 3n } as any);

      await service.create(dtoWithProfile as any);

      expect(userRepo.createWithProfile).toHaveBeenCalledWith(
        expect.objectContaining({
          password: 'hashed-pw',
          createdUserId: actorId,
          updatedUserId: actorId,
        }),
        expect.objectContaining({
          first_name: 'John',
          last_name: 'Doe',
          createdUserId: actorId,
          updatedUserId: actorId,
        }),
      );
    });
  });

  describe('update', () => {
    const updateDto = {
      email: 'updated@example.com',
      username: 'updateduser',
      phone: '0111222333',
    };

    beforeEach(() => {
      userRepo.findById!.mockResolvedValue(mockUser as any);
      userRepo.checkUnique!.mockResolvedValue(null);
    });

    it('should update user and profile data', async () => {
      const actorId = 5n;
      mockedGetSessionUserId.mockReturnValue(actorId);

      const dtoWithProfile = {
        ...updateDto,
        profile: { first_name: 'Jane' },
      };

      await service.update(1n, dtoWithProfile as any);

      expect(userRepo.updateWithProfile).toHaveBeenCalledWith(
        1n,
        expect.objectContaining({
          email: 'updated@example.com',
          username: 'updateduser',
          phone: '0111222333',
          updatedUserId: actorId,
          searchText: expect.any(String),
        }),
        expect.objectContaining({
          first_name: 'Jane',
          createdUserId: actorId,
          updatedUserId: actorId,
        }),
      );
    });

    it('should hash password when included in update', async () => {
      mockedGetSessionUserId.mockReturnValue(5n);
      const dtoWithPassword = { ...updateDto, password: 'newpass' };

      await service.update(1n, dtoWithPassword as any);

      expect(bcrypt.hash).toHaveBeenCalledWith('newpass', 12);
      expect(userRepo.updateWithProfile).toHaveBeenCalledWith(
        1n,
        expect.objectContaining({ password: 'hashed-pw' }),
        undefined,
      );
    });

    it('should throw NotFoundException for non-existent user', async () => {
      userRepo.findById!.mockResolvedValue(null);

      await expect(service.update(1n, updateDto as any)).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete user and return success with message', async () => {
      userRepo.findById!.mockResolvedValue(mockUser as any);
      userRepo.delete!.mockResolvedValue(undefined as any);

      const result = await service.delete(1n);

      expect(userRepo.findById).toHaveBeenCalledWith(1n);
      expect(userRepo.delete).toHaveBeenCalledWith(1n);
      expect(result).toEqual({ success: true, message: 'auth.USER_DELETED' });
    });
  });

  describe('changePassword', () => {
    it('should hash and update password', async () => {
      userRepo.findById!.mockResolvedValue(mockUser as any);
      userRepo.update!.mockResolvedValue(undefined as any);

      const result = await service.changePassword(1n, { password: 'newpassword' } as any);

      expect(bcrypt.hash).toHaveBeenCalledWith('newpassword', 12);
      expect(userRepo.update).toHaveBeenCalledWith(1n, { password: 'hashed-pw' });
      expect(result).toEqual({ success: true, message: 'auth.PASSWORD_CHANGED' });
    });
  });

  describe('changeStatus', () => {
    it('should update user status', async () => {
      userRepo.findById!.mockResolvedValue(mockUser as any);
      userRepo.update!.mockResolvedValue(undefined as any);

      const result = await service.changeStatus(1n, { status: 0 } as any);

      expect(userRepo.update).toHaveBeenCalledWith(1n, { status: 0 });
      expect(result).toEqual({ success: true, message: 'auth.STATUS_CHANGED' });
    });
  });
});
