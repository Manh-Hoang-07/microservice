import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
} from 'class-validator';
import { CertificateType } from '../../enums/certificate-type.enum';
import { BasicStatus } from '../../../../common/enums/status.enum';

const URL_OPTS = { require_protocol: true, protocols: ['http', 'https'] };

export class CreateCertificateDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsUrl(URL_OPTS, { message: 'image must be an http(s) URL.' })
  @MaxLength(500)
  image?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  issued_by?: string;

  @IsOptional()
  @IsDateString()
  issued_date?: string;

  @IsOptional()
  @IsDateString()
  expiry_date?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  certificate_number?: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  description?: string;

  @IsOptional()
  @IsEnum(CertificateType)
  type?: CertificateType;

  @IsOptional()
  @IsEnum(BasicStatus)
  status?: BasicStatus;

  @IsOptional()
  @IsInt()
  @Min(0)
  sort_order?: number;
}
