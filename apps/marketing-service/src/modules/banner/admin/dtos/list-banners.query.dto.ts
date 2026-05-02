import { IsIn, IsOptional, IsString, Matches } from 'class-validator';
import { BaseListQueryDto } from '@package/common';

export class ListBannersAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsIn(['draft', 'active', 'inactive'])
  status?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'location_id must be numeric.' })
  location_id?: string;
}
