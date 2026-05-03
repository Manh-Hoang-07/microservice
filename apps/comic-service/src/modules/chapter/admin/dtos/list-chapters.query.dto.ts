import { IsIn, IsOptional, IsString, Matches } from 'class-validator';
import { BaseListQueryDto } from '@package/common';

export class ListChaptersAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'comic_id must be numeric.' })
  comic_id?: string;

  @IsOptional()
  @IsIn(['draft', 'published', 'scheduled'])
  status?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'team_id must be numeric.' })
  team_id?: string;
}
