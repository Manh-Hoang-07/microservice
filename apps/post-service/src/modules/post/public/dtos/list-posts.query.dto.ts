import { IsBooleanString, IsIn, IsOptional, IsString, Matches } from 'class-validator';
import { BaseListQueryDto } from '@package/common';

export class ListPostsPublicQueryDto extends BaseListQueryDto {
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

  // Frontend sometimes uses `post_category_id` as alias.
  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'post_category_id must be numeric.' })
  post_category_id?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'tag_id must be numeric.' })
  tag_id?: string;

  // Frontend sometimes uses `post_tag_id` as alias.
  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'post_tag_id must be numeric.' })
  post_tag_id?: string;
}
