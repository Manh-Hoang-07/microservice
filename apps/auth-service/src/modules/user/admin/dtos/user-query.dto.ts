import { IsOptional, IsString, IsEnum, Matches } from 'class-validator';
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

  /** Comma-separated user IDs, e.g. "1,2,3" */
  @IsOptional()
  @IsString()
  @Matches(/^\d+(,\d+)*$/, { message: 'ids must be comma-separated numbers' })
  ids?: string;
}
