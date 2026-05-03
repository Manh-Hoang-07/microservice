import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
} from 'class-validator';
import { ProjectStatus } from '../../enums/project-status.enum';

const URL_OPTS = { require_protocol: true, protocols: ['http', 'https'] };

export class CreateProjectDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  short_description?: string;

  @IsOptional()
  @IsUrl(URL_OPTS, { message: 'cover_image must be an http(s) URL.' })
  @MaxLength(500)
  cover_image?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  location?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  area?: string;

  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;

  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  client_name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  budget?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(200)
  images?: any[];

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  sort_order?: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  seo_title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  seo_description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  seo_keywords?: string;
}
