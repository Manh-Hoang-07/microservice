import { IsOptional, IsString, Matches } from 'class-validator';
import { BaseListQueryDto } from '@package/common';

export class UserQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  @Matches(/^(active|inactive|locked)$/, {
    message: 'status must be one of: active, inactive, locked',
  })
  status?: string;
}
