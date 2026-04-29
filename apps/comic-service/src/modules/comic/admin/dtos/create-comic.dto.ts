import {
  IsString,
  IsOptional,
  IsArray,
  IsEnum,
  IsNumber,
  IsBoolean,
  MaxLength,
} from 'class-validator';
import { ComicStatus } from '../../enums/comic-status.enum';

export class CreateComicDto {
  @IsString()
  @MaxLength(255)
  title: string;

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
  cover_image?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  author?: string;

  @IsOptional()
  @IsEnum(ComicStatus)
  status?: ComicStatus;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  category_ids?: number[];

  @IsOptional()
  @IsBoolean()
  is_featured?: boolean;
}
