import {
  IsString,
  IsOptional,
  IsEnum,
  IsInt,
  MaxLength,
} from 'class-validator';
import { AboutSectionType } from '../../enums/about-section-type.enum';

export class CreateAboutDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  slug?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  image?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  video_url?: string;

  @IsOptional()
  @IsEnum(AboutSectionType)
  section_type?: AboutSectionType;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsInt()
  sort_order?: number;
}
