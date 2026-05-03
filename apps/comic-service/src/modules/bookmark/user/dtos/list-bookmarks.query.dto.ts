import { IsOptional, IsString, Matches } from 'class-validator';
import { BaseListQueryDto } from '@package/common';

export class ListBookmarksQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'chapter_id must be numeric.' })
  chapter_id?: string;
}
