import { IsBooleanString, IsIn, IsOptional, IsString, Matches } from 'class-validator';
import { BaseListQueryDto } from '@package/common';

export class ListPostsAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsIn(['draft', 'scheduled', 'published', 'archived'])
  status?: string;

  @IsOptional()
  @IsIn(['text', 'video', 'image', 'audio'])
  post_type?: string;

  @IsOptional()
  @IsBooleanString()
  is_featured?: string;

  @IsOptional()
  @IsBooleanString()
  is_pinned?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'category_id must be numeric.' })
  category_id?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'tag_id must be numeric.' })
  tag_id?: string;
}
