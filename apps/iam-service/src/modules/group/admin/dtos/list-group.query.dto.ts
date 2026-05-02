import { IsIn, IsOptional, IsString, Matches, MaxLength } from 'class-validator';
import { BaseListQueryDto } from '@package/common';

export class ListGroupsAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  type?: string;

  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'context_id must be numeric.' })
  context_id?: string;
}

export class ListGroupMembersAdminQueryDto extends BaseListQueryDto {}
