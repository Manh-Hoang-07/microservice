import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { BaseListQueryDto } from '@package/common';
import { BasicStatus } from '../../../../common/enums/status.enum';

export class ListStaffAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsEnum(BasicStatus)
  status?: BasicStatus;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  department?: string;
}

export class ListStaffPublicQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  department?: string;
}
