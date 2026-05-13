import { IsEnum, IsOptional, IsString, Matches, MaxLength } from 'class-validator';
import { BaseListQueryDto } from '@package/common';
import { BasicStatus } from '../../../../../common/enums/basic-status.enum';

export class ListWardsAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsEnum(BasicStatus)
  status?: BasicStatus;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  code?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'provinceId must be numeric.' })
  provinceId?: string;
}
