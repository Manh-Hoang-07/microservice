import {
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
  MaxLength,
  IsDateString,
} from 'class-validator';

export class CreateBannerDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  subtitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  image?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  mobile_image?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  link?: string;

  @IsOptional()
  @IsString()
  link_target?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  button_text?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  button_color?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  text_color?: string;

  @IsNumber()
  location_id: number;

  @IsOptional()
  @IsNumber()
  sort_order?: number;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  status?: string;

  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;
}
