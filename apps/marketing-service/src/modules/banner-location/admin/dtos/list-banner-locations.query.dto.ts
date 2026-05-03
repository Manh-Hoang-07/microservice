import { IsIn, IsOptional } from 'class-validator';
import { BaseListQueryDto } from '@package/common';

export class ListBannerLocationsAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsIn(['draft', 'active', 'inactive'])
  status?: string;
}
