import { IsBooleanString, IsEnum, IsOptional, IsString, Matches } from 'class-validator';
import { BaseListQueryDto } from '@package/common';
import { PostStatus } from '../../enums/post-status.enum';
import { PostType } from '../../enums/post-type.enum';

export class ListPostsAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsEnum(PostStatus)
  status?: PostStatus;

  @IsOptional()
  @IsEnum(PostType)
  post_type?: PostType;

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
