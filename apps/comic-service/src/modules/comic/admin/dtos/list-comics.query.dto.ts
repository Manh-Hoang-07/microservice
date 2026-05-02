import { Transform } from 'class-transformer';
import { IsBooleanString, IsIn, IsOptional, IsString, Matches, MaxLength } from 'class-validator';
import { BaseListQueryDto } from '@package/common';

export class ListComicsAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsIn(['draft', 'published', 'scheduled'])
  status?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  author?: string;

  @IsOptional()
  @IsBooleanString()
  is_featured?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'category_id must be numeric.' })
  category_id?: string;
}

export class ListComicsPublicQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsBooleanString()
  is_featured?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'category_id must be numeric.' })
  category_id?: string;

  // Frontend sometimes uses `comic_category_id` as alias.
  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'comic_category_id must be numeric.' })
  comic_category_id?: string;
}

export class ListChaptersBySlugQueryDto extends BaseListQueryDto {}
