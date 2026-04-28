import {
  IsOptional,
  IsInt,
  IsString,
  IsEnum,
  IsBoolean,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BasicStatus } from './create-menu.dto';

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
  q?: string;

  @IsOptional()
  @IsEnum(BasicStatus)
  status?: BasicStatus;

  @IsOptional()
  parent_id?: any;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  show_in_menu?: boolean;

  @IsOptional()
  @IsString()
  group?: string;

  @IsOptional()
  @IsString()
  sort?: string = 'sort_order:ASC';
}
