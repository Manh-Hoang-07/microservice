import { IsOptional, IsString, MaxLength } from 'class-validator';
import { BaseListQueryDto } from '@package/common';

export class ListProvincesPublicQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  code?: string;
}

export class ListProvinceWardsPublicQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  code?: string;
}
