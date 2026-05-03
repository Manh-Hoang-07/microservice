import {
  IsOptional,
  IsInt,
  IsString,
  IsEnum,
  IsBoolean,
  Matches,
  MaxLength,
  Min,
  Max,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { BasicStatus } from '../../enums/basic-status.enum';

const toBool = ({ value }: { value: any }) =>
  value === true || value === 'true' || value === '1' || value === 1;

export class QueryMenuDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  q?: string;

  @IsOptional()
  @IsEnum(BasicStatus)
  status?: BasicStatus;

  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'parent_id must be numeric.' })
  parent_id?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(toBool)
  show_in_menu?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  group?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[a-z_]+:(ASC|DESC)$/i, {
    message: 'sort must look like "field:ASC" or "field:DESC".',
  })
  sort?: string = 'sort_order:ASC';
}
