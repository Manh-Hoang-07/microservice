jest.mock('bcryptjs', () => ({ hash: jest.fn().mockResolvedValue('hashed-pw') }));
jest.mock('src/types', () => ({ PrimaryKey: BigInt }), { virtual: true });
jest.mock('../../../src/modules/user/repositories/user-admin.repository', () => ({ UserAdminRepository: jest.fn() }));
jest.mock('../../../src/modules/user/admin/dtos/create-user.dto', () => ({ CreateUserDto: jest.fn() }));
jest.mock('../../../src/modules/user/admin/dtos/update-user.dto', () => ({ UpdateUserDto: jest.fn() }));
jest.mock('../../../src/modules/user/admin/dtos/admin-change-password.dto', () => ({ AdminChangePasswordDto: jest.fn() }));
jest.mock('../../../src/modules/user/admin/dtos/change-status.dto', () => ({ ChangeStatusDto: jest.fn() }));
jest.mock('../../../src/modules/user/admin/dtos/user-query.dto', () => ({ UserQueryDto: jest.fn() }));
jest.mock('src/clients/iam.client', () => ({ IamClient: jest.fn() }), { virtual: true });
jest.mock('@package/common', () => ({
  getSessionGroupId: jest.fn().mockReturnValue(null),
  parseQueryOptions: jest.fn(() => ({ skip: 0, take: 10 })),
  createPaginationMeta: jest.fn((_opts, total) => ({ total })),
}));

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { AdminUserService } from '../../../src/modules/user/admin/services/user.service';
import { UserAdminRepository } from '../../../src/modules/user/repositories/user-admin.repository';
import { getSessionGroupId } from '@package/common';
const mockGetSessionGroupId = getSessionGroupId as jest.MockedFunction<typeof getSessionGroupId>;

describe('AdminUserService', () => {
  let service: AdminUserService;
  let userRepo: jest.Mocked<Partial<UserAdminRepository>>;
  let configService: jest.Mocked<Partial<ConfigService>>;
  let iamClient: { getGroupMemberIds: jest.Mock };

  const mockUser = {
    id: 1n,
    email: 'test@example.com',
    username: 'testuser',
    phone: '0123456789',
    password: 'secret',
    rememberToken: 'token123',
    status: 1,
  };

  const sanitizedUser = {
    id: 1n,
    email: 'test@example.com',
    username: 'testuser',
    phone: '0123456789',
    status: 1,
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

    iamClient = { getGroupMemberIds: jest.fn() };

    service = new AdminUserService(
      userRepo as any,
      configService as any,
      iamClient as any,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockGetSessionGroupId.mockReturnValue(null);
  });

  describe('getList', () => {
    it('should delegate to repository findAll', async () => {
      const query = { page: 1, limit: 10 };
      const expected = { data: [mockUser], total: 1 };
      userRepo.findAll!.mockResolvedValue(expected);

      const result = await service.getList(query as any);

      expect(userRepo.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(expected);
    });

    it('filtra por group quando getSessionGroupId retorna groupId', async () => {
      const memberIds = [1n, 3n, 7n];
      mockGetSessionGroupId.mockReturnValue(5n);
      iamClient.getGroupMemberIds.mockResolvedValue(memberIds);
      userRepo.findAll!.mockResolvedValue({ data: [], meta: { total: 0 } });

      await service.getList({ page: 1, limit: 10 } as any);

      expect(iamClient.getGroupMemberIds).toHaveBeenCalledWith('5');
      expect(userRepo.findAll).toHaveBeenCalledWith(
        expect.objectContaining({ userIds: memberIds }),
      );
    });

    it('retorna vazio imediatamente quando group sem membros', async () => {
      mockGetSessionGroupId.mockReturnValue(5n);
      iamClient.getGroupMemberIds.mockResolvedValue([]);

      const result = await service.getList({ page: 1, limit: 10 } as any);

      expect(userRepo.findAll).not.toHaveBeenCalled();
      expect(result.data).toEqual([]);
    });

    it('não filtra por group quando system context (null)', async () => {
      mockGetSessionGroupId.mockReturnValue(null);
      const expected = { data: [mockUser], total: 1 };
      userRepo.findAll!.mockResolvedValue(expected);
      const query = { page: 1, limit: 10 };

      const result = await service.getList(query as any);

      expect(iamClient.getGroupMemberIds).not.toHaveBeenCalled();
      expect(userRepo.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(expected);
    });
  });

  describe('getSimpleList', () => {
    it('filtra por group quando getSessionGroupId retorna groupId', async () => {
      mockGetSessionGroupId.mockReturnValue(8n);
      iamClient.getGroupMemberIds.mockResolvedValue([2n, 4n]);
      userRepo.findAllSimple!.mockResolvedValue({ data: [] });

      await service.getSimpleList({} as any);

      expect(iamClient.getGroupMemberIds).toHaveBeenCalledWith('8');
      expect(userRepo.findAllSimple).toHaveBeenCalledWith(
        expect.objectContaining({ userIds: [2n, 4n] }),
      );
    });

    it('retorna vazio quando group sem membros', async () => {
      mockGetSessionGroupId.mockReturnValue(8n);
      iamClient.getGroupMemberIds.mockResolvedValue([]);

      const result = await service.getSimpleList({} as any);

      expect(userRepo.findAllSimple).not.toHaveBeenCalled();
      expect(result.data).toEqual([]);
    });

    it('não filtra quando system context', async () => {
      mockGetSessionGroupId.mockReturnValue(null);
      userRepo.findAllSimple!.mockResolvedValue({ data: [] });
      const query = { limit: 50 };

      await service.getSimpleList(query as any);

      expect(userRepo.findAllSimple).toHaveBeenCalledWith(query);
    });
  });

  describe('getOne', () => {
    it('should return sanitized user without password and rememberToken', async () => {
      userRepo.findById!.mockResolvedValue(mockUser);

      const result = await service.getOne(1n);

      expect(userRepo.findById).toHaveBeenCalledWith(1n);
      expect(result).toEqual(sanitizedUser);
      expect(result).not.toHaveProperty('password');
      expect(result).not.toHaveProperty('rememberToken');
    });

    it('should throw NotFoundException when user not found', async () => {
      userRepo.findById!.mockResolvedValue(null);

      await expect(service.getOne(1n)).rejects.toThrow(NotFoundException);
      await expect(service.getOne(1n)).rejects.toThrow('User not found');
    });
  });

  describe('create', () => {
    const createDto = {
      email: 'new@example.com',
      username: 'newuser',
      phone: '0987654321',
      password: 'plaintext',
    };

    it('should hash password, call createWithProfile, and return sanitized user', async () => {
      userRepo.checkUnique!.mockResolvedValue(null);
      userRepo.createWithProfile!.mockResolvedValue({ id: 2n });
      userRepo.findById!.mockResolvedValue({ ...mockUser, id: 2n });

      const actorId = 10n;
      const result = await service.create(createDto as any, actorId);

      expect(bcrypt.hash).toHaveBeenCalledWith('plaintext', 12);
      expect(userRepo.createWithProfile).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'new@example.com',
          username: 'newuser',
          phone: '0987654321',
          password: 'hashed-pw',
          createdUserId: actorId,
          updatedUserId: actorId,
        }),
        undefined,
      );
      expect(result).not.toHaveProperty('password');
      expect(result).not.toHaveProperty('rememberToken');
    });

    it('should throw BadRequestException for duplicate email', async () => {
      userRepo.checkUnique!.mockResolvedValue({ field: 'email', value: 'new@example.com' });

      await expect(service.create(createDto as any)).rejects.toThrow(BadRequestException);
      await expect(service.create(createDto as any)).rejects.toThrow(
        'email "new@example.com" is already taken',
      );
    });

    it('should include profile data with actor IDs when provided', async () => {
      const dtoWithProfile = {
        ...createDto,
        profile: { first_name: 'John', last_name: 'Doe' },
      };
      const actorId = 10n;

      userRepo.checkUnique!.mockResolvedValue(null);
      userRepo.createWithProfile!.mockResolvedValue({ id: 3n });
      userRepo.findById!.mockResolvedValue({ ...mockUser, id: 3n });

      await service.create(dtoWithProfile as any, actorId);

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
      userRepo.findById!.mockResolvedValue(mockUser);
      userRepo.checkUnique!.mockResolvedValue(null);
    });

    it('should update user and profile data', async () => {
      const dtoWithProfile = {
        ...updateDto,
        profile: { first_name: 'Jane' },
      };
      const actorId = 5n;

      await service.update(1n, dtoWithProfile as any, actorId);

      expect(userRepo.updateWithProfile).toHaveBeenCalledWith(
        1n,
        expect.objectContaining({
          email: 'updated@example.com',
          username: 'updateduser',
          phone: '0111222333',
          updatedUserId: actorId,
        }),
        expect.objectContaining({
          first_name: 'Jane',
          createdUserId: actorId,
          updatedUserId: actorId,
        }),
      );
    });

    it('should hash password when included in update', async () => {
      const dtoWithPassword = { ...updateDto, password: 'newpass' };

      await service.update(1n, dtoWithPassword as any, 5n);

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
    it('should delete user and return success', async () => {
      userRepo.findById!.mockResolvedValue(mockUser);
      userRepo.delete!.mockResolvedValue(undefined);

      const result = await service.delete(1n);

      expect(userRepo.findById).toHaveBeenCalledWith(1n);
      expect(userRepo.delete).toHaveBeenCalledWith(1n);
      expect(result).toEqual({ success: true });
    });
  });

  describe('changePassword', () => {
    it('should hash and update password', async () => {
      userRepo.findById!.mockResolvedValue(mockUser);
      userRepo.update!.mockResolvedValue(undefined);

      const result = await service.changePassword(1n, { password: 'newpassword' } as any);

      expect(bcrypt.hash).toHaveBeenCalledWith('newpassword', 12);
      expect(userRepo.update).toHaveBeenCalledWith(1n, { password: 'hashed-pw' });
      expect(result).toEqual({ success: true });
    });
  });

  describe('changeStatus', () => {
    it('should update user status', async () => {
      userRepo.findById!.mockResolvedValue(mockUser);
      userRepo.update!.mockResolvedValue(undefined);

      const result = await service.changeStatus(1n, { status: 0 } as any);

      expect(userRepo.update).toHaveBeenCalledWith(1n, { status: 0 });
      expect(result).toEqual({ success: true });
    });
  });
});
