import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import { BaseListQueryDto } from '@package/common';

export class ListAboutAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsIn(['active', 'inactive', 'draft'])
  status?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  section_type?: string;
}

export class ListAboutPublicQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  section_type?: string;
}
