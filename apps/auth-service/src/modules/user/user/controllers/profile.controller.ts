import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Permission } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { ProfileService } from '../services/profile.service';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { ChangePasswordDto } from '../dtos/change-password.dto';

@Controller('user/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Permission('user')
  @Get()
  async getProfile(@Req() req: Request) {
    return this.profileService.getProfile(toPrimaryKey((req as any).user.sub));
  }

  @Permission('user')
  @Patch()
  async updateProfile(
    @Req() req: Request,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.profileService.updateProfile(
      toPrimaryKey((req as any).user.sub),
      dto,
    );
  }

  @Permission('user')
  @Patch('change-password')
  async changePassword(
    @Req() req: Request,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.profileService.changePassword(
      toPrimaryKey((req as any).user.sub),
      dto,
    );
  }
}
