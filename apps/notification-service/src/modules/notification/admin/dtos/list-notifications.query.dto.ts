import { IsBooleanString, IsIn, IsOptional, IsString, Matches } from 'class-validator';
import { BaseListQueryDto } from '@package/common';

export class ListNotificationsAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'user_id must be numeric.' })
  user_id?: string;

  @IsOptional()
  @IsIn(['info', 'success', 'warning', 'error'])
  type?: string;

  @IsOptional()
  @IsIn(['active', 'archived', 'deleted'])
  status?: string;

  @IsOptional()
  @IsBooleanString()
  is_read?: string;
}
