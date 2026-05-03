import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import { BaseListQueryDto } from '@package/common';

export class ListCertificateAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsIn(['active', 'inactive', 'draft'])
  status?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  type?: string;
}

export class ListCertificatePublicQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  type?: string;
}
