import { IsEnum, IsOptional } from 'class-validator';
import { BaseListQueryDto } from '@package/common';
import { BasicStatus } from '../../../../common/enums/status.enum';

export class ListFaqAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsEnum(BasicStatus)
  status?: BasicStatus;
}

export class ListFaqPublicQueryDto extends BaseListQueryDto {}
