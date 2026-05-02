import { IsIn, IsOptional } from 'class-validator';
import { BaseListQueryDto } from '@package/common';

export class ListRolesAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: string;
}
