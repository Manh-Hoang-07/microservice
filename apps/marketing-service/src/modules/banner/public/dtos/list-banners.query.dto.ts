import { IsOptional, IsString, Matches, MaxLength } from 'class-validator';
import { BaseListQueryDto } from '@package/common';

export class ListBannersPublicQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'location_id must be numeric.' })
  location_id?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  location_code?: string;
}
