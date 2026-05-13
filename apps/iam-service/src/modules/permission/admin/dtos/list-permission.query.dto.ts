import { IsEnum, IsOptional } from 'class-validator';
import { BaseListQueryDto } from '@package/common';
import { BasicStatus } from '../../../../common/enums/basic-status.enum';
import { PermissionScope } from '../../enums/permission-scope.enum';

export class ListPermissionsAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsEnum(BasicStatus)
  status?: BasicStatus;

  @IsOptional()
  @IsEnum(PermissionScope)
  scope?: PermissionScope;
}
