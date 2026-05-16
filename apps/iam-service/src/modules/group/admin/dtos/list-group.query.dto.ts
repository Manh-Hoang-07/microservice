import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { BaseListQueryDto } from '@package/common';
import { BasicStatus } from '../../../../common/enums/basic-status.enum';

export class ListGroupsAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  type?: string;

  @IsOptional()
  @IsEnum(BasicStatus)
  status?: BasicStatus;
}

export class ListGroupMembersAdminQueryDto extends BaseListQueryDto {}
