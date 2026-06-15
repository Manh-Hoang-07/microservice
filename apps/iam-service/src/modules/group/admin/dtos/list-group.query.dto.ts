import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
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

  @IsOptional()
  @Type(() => String)
  @IsString()
  ownerId?: string;
}

export class ListGroupMembersAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsString()
  roleId?: string;
}
