import { IsBooleanString, IsIn, IsOptional } from 'class-validator';
import { BaseListQueryDto } from '@package/common';

export class ListProjectAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsIn(['planning', 'in_progress', 'completed', 'cancelled'])
  status?: string;

  @IsOptional()
  @IsBooleanString()
  featured?: string;
}

export class ListProjectPublicQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsBooleanString()
  featured?: string;
}
