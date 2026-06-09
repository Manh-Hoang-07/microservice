import { IsEnum, IsOptional } from 'class-validator';
import { BaseListQueryDto } from '@package/common';
import { BasicStatus } from '../../../../common/enums/basic-status.enum';
import { RoleType } from '../../enums/role-type.enum';

export class ListRolesAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsEnum(BasicStatus)
  status?: BasicStatus;

  @IsOptional()
  @IsEnum(RoleType)
  roleType?: RoleType;
}
