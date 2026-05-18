import { IsBooleanString, IsEnum, IsOptional } from 'class-validator';
import { BaseListQueryDto } from '@package/common';
import { BasicStatus } from '../../../../common/enums/status.enum';

export class ListGalleryAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsEnum(BasicStatus)
  status?: BasicStatus;

  @IsOptional()
  @IsBooleanString()
  featured?: string;
}

export class ListGalleryPublicQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsBooleanString()
  featured?: string;
}
