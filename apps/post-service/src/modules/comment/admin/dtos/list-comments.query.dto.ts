import { IsEnum, IsOptional, IsString, Matches } from 'class-validator';
import { BaseListQueryDto } from '@package/common';
import { CommentStatus } from '../../enums/comment-status.enum';

export class ListCommentsAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'post_id must be numeric.' })
  post_id?: string;

  @IsOptional()
  @IsEnum(CommentStatus)
  status?: CommentStatus;

  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'user_id must be numeric.' })
  user_id?: string;
}
