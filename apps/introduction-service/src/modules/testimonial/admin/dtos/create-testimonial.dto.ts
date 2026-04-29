import {
  IsString,
  IsOptional,
  IsInt,
  IsBoolean,
  IsNumber,
  MaxLength,
  Min,
  Max,
} from 'class-validator';

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
  @IsString()
  @MaxLength(500)
  client_avatar?: string;

  @IsString()
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
  @IsString()
  status?: string;

  @IsOptional()
  @IsInt()
  sort_order?: number;
}
