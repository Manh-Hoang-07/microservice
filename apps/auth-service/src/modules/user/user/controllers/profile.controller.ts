import {
  Body,
  Controller,
  Get,
  Patch,
} from '@nestjs/common';
import { Permission, session } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { ProfileService } from '../services/profile.service';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { ChangePasswordDto } from '../dtos/change-password.dto';

@Controller('user/profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
  ) {}

  @Permission('user')
  @Get()
  async getProfile() {
    const ctx = session()!;
    return this.profileService.getProfile(toPrimaryKey(ctx.userId!));
  }

  @Permission('user')
  @Patch()
  async updateProfile(
    @Body() dto: UpdateProfileDto,
  ) {
    const ctx = session()!;
    return this.profileService.updateProfile(
      toPrimaryKey(ctx.userId!),
      dto,
    );
  }

  @Permission('user')
  @Patch('change-password')
  async changePassword(
    @Body() dto: ChangePasswordDto,
  ) {
    const ctx = session()!;
    return this.profileService.changePassword(
      toPrimaryKey(ctx.userId!),
      dto,
    );
  }
}
