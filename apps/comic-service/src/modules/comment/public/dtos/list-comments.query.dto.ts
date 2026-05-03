import { IsOptional, IsString, Matches } from 'class-validator';
import { BaseListQueryDto } from '@package/common';

/**
 * Public comment listing — `status` and `parent_id` are forced server-side
 * (`status='visible'`, top-level comments only), so they intentionally are
 * NOT exposed here. Only `comic_id` / `chapter_id` are caller-controlled.
 */
export class ListCommentsPublicQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'comic_id must be numeric.' })
  comic_id?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'chapter_id must be numeric.' })
  chapter_id?: string;
}
