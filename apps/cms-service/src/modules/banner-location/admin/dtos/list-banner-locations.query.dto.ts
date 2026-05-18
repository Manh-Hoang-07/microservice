import { IsEnum, IsOptional } from 'class-validator';
import { BaseListQueryDto } from '@package/common';
import { BannerStatus } from '../../../banner/enums/banner-status.enum';

export class ListBannerLocationsAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsEnum(BannerStatus)
  status?: BannerStatus;
}
