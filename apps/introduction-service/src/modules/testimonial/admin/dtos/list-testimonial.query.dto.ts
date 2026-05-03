import { IsBooleanString, IsIn, IsOptional, IsString, Matches } from 'class-validator';
import { BaseListQueryDto } from '@package/common';

export class ListTestimonialAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsIn(['active', 'inactive', 'draft'])
  status?: string;

  @IsOptional()
  @IsBooleanString()
  featured?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'project_id must be numeric.' })
  project_id?: string;
}

export class ListTestimonialPublicQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsBooleanString()
  featured?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'project_id must be numeric.' })
  project_id?: string;
}
