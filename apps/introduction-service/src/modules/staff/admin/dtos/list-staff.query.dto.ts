import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import { BaseListQueryDto } from '@package/common';

export class ListStaffAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsIn(['active', 'inactive', 'draft'])
  status?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  department?: string;
}

export class ListStaffPublicQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  department?: string;
}
