import { IsIn, IsOptional } from 'class-validator';
import { BaseListQueryDto } from '@package/common';

export class ListFaqAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsIn(['active', 'inactive', 'draft'])
  status?: string;
}

export class ListFaqPublicQueryDto extends BaseListQueryDto {}
