import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Max,
  Min,
} from 'class-validator';
import { BasicStatus } from '../../../../common/enums/status.enum';

export class CreateTestimonialDto {
  @IsString()
  @MaxLength(255)
  clientName: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  clientPosition?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  clientCompany?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  clientAvatar?: string;

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
  projectId?: number;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsEnum(BasicStatus)
  status?: BasicStatus;

  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;
}
