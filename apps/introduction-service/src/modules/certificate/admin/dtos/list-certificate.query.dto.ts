import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { BaseListQueryDto } from '@package/common';
import { BasicStatus } from '../../../../common/enums/status.enum';

export class ListCertificateAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsEnum(BasicStatus)
  status?: BasicStatus;

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
