import { IsIn, IsOptional } from 'class-validator';
import { BaseListQueryDto } from '@package/common';

export class ListPermissionsAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: string;

  @IsOptional()
  @IsIn(['context', 'system'])
  scope?: string;
}
