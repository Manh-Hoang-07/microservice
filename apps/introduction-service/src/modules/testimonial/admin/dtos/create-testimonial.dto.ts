import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Max,
  Min,
} from 'class-validator';
import { BasicStatus } from '../../../../common/enums/status.enum';

const URL_OPTS = { require_protocol: true, protocols: ['http', 'https'] };

export class CreateTestimonialDto {
  @IsString()
  @MaxLength(255)
  client_name: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  client_position?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  client_company?: string;

  @IsOptional()
  @IsUrl(URL_OPTS, { message: 'client_avatar must be an http(s) URL.' })
  @MaxLength(500)
  client_avatar?: string;

  @IsString()
  @MaxLength(5000)
  content: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsNumber()
  project_id?: number;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsEnum(BasicStatus)
  status?: BasicStatus;

  @IsOptional()
  @IsInt()
  @Min(0)
  sort_order?: number;
}
