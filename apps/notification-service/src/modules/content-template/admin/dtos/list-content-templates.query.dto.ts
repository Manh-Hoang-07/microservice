import { IsOptional, IsString, MaxLength } from 'class-validator';
import { BaseListQueryDto } from '@package/common';

export class ListContentTemplatesAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  type?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  category?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  status?: string;
}
