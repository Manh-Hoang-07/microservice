import { IsBooleanString, IsEnum, IsOptional } from 'class-validator';
import { BaseListQueryDto } from '@package/common';
import { ProjectStatus } from '../../enums/project-status.enum';

export class ListProjectAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @IsOptional()
  @IsBooleanString()
  featured?: string;
}

export class ListProjectPublicQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsBooleanString()
  featured?: string;
}
