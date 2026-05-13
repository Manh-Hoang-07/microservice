import { IsOptional, IsString, IsEnum } from 'class-validator';
import { BaseListQueryDto } from '@package/common';
import { UserStatus } from '../../enums/user-status.enum';

export class UserQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;
}
