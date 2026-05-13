import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { BaseListQueryDto } from '@package/common';
import { BasicStatus } from '../../../../../common/enums/basic-status.enum';

export class ListCountriesAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsEnum(BasicStatus)
  status?: BasicStatus;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  code?: string;
}
