import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { GroupAwareService, getSessionUserId } from '@package/common';
import { PrimaryKey } from 'src/types';
import { UserAdminRepository } from '../../repositories/user-admin.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { AdminChangePasswordDto } from '../dtos/admin-change-password.dto';
import { ChangeStatusDto } from '../dtos/change-status.dto';

@Injectable()
export class AdminUserService extends GroupAwareService<UserAdminRepository> {
  constructor(
    private readonly userRepo: UserAdminRepository,
    private readonly configService: ConfigService,
  ) {
    super(userRepo);
  }

  protected transform(entity: any) {
    if (!entity) return entity;
    const { password, rememberToken, ...rest } = entity;
    return rest;
  }

  async create(dto: CreateUserDto) {
    await this.assertUnique({
      email: dto.email,
      username: dto.username,
      phone: dto.phone,
    });

    const rounds = this.configService.get<number>('BCRYPT_ROUNDS', 12);
    const hashedPassword = await bcrypt.hash(dto.password, rounds);

    const actorId = getSessionUserId();
    const { profile: profileDto, ...rest } = dto;
    const profileData = profileDto
      ? this.buildProfileData(profileDto)
      : undefined;

    const user = await this.userRepo.createWithProfile(
      { ...rest, password: hashedPassword, createdUserId: actorId, updatedUserId: actorId },
      profileData,
    );

    return this.getOne(user.id);
  }

  async update(id: bigint, dto: UpdateUserDto) {
    await this.getOne(id);

    await this.assertUnique(
      { email: dto.email, username: dto.username, phone: dto.phone },
      id,
    );

    const actorId = getSessionUserId();
    const { profile: profileDto, password, ...rest } = dto;
    const updateData: Record<string, any> = { ...rest, updatedUserId: actorId };

    if (password) {
      const rounds = this.configService.get<number>('BCRYPT_ROUNDS', 12);
      updateData.password = await bcrypt.hash(password, rounds);
    }

    const profileData = profileDto
      ? this.buildProfileData(profileDto)
      : undefined;

    await this.userRepo.updateWithProfile(id, updateData, profileData);
    return this.getOne(id);
  }

  async delete(id: PrimaryKey) {
    await this.getOne(id);
    await this.userRepo.delete(id);
    return { success: true };
  }

  async changePassword(id: PrimaryKey, dto: AdminChangePasswordDto) {
    await this.getOne(id);
    const rounds = this.configService.get<number>('BCRYPT_ROUNDS', 12);
    const hashedPassword = await bcrypt.hash(dto.password, rounds);
    await this.userRepo.update(id, { password: hashedPassword });
    return { success: true };
  }

  async changeStatus(id: PrimaryKey, dto: ChangeStatusDto) {
    await this.getOne(id);
    await this.userRepo.update(id, { status: dto.status });
    return { success: true };
  }

  private async assertUnique(
    fields: { email?: string; username?: string; phone?: string },
    excludeId?: PrimaryKey,
  ) {
    const conflict = await this.userRepo.checkUnique(fields, excludeId);
    if (conflict) {
      throw new BadRequestException(
        `${conflict.field} "${conflict.value}" is already taken`,
      );
    }
  }

  private buildProfileData(profile: Record<string, any>): Record<string, any> {
    const data: Record<string, any> = { ...profile };
    const actorId = getSessionUserId();
    if (actorId) {
      data.createdUserId = actorId;
      data.updatedUserId = actorId;
    }
    return data;
  }
}
