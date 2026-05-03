import { IsBooleanString, IsIn, IsOptional } from 'class-validator';
import { BaseListQueryDto } from '@package/common';

export class ListGalleryAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsIn(['active', 'inactive', 'draft'])
  status?: string;

  @IsOptional()
  @IsBooleanString()
  featured?: string;
}

export class ListGalleryPublicQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsBooleanString()
  featured?: string;
}
