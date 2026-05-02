import { IsIn, IsOptional, IsString, Matches } from 'class-validator';
import { BaseListQueryDto } from '@package/common';

/**
 * Admin listing filters for comments. `status` is constrained to the same set
 * accepted by `UpdateCommentStatusDto` so admins can't filter by a value that
 * could never exist in the database.
 */
export class ListCommentsAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'comic_id must be numeric.' })
  comic_id?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'chapter_id must be numeric.' })
  chapter_id?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'user_id must be numeric.' })
  user_id?: string;

  @IsOptional()
  @IsIn(['visible', 'hidden', 'spam', 'deleted'])
  status?: string;
}
