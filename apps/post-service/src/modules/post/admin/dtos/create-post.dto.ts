import {
  IsString,
  IsOptional,
  IsArray,
  IsEnum,
  IsNumber,
  IsBoolean,
  MaxLength,
} from 'class-validator';
import { PostStatus } from '../../enums/post-status.enum';
import { PostType } from '../../enums/post-type.enum';

export class CreatePostDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  slug?: string;

  @IsOptional()
  @IsString()
  excerpt?: string;

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
  cover_image?: string;

  @IsOptional()
  @IsEnum(PostStatus)
  status?: PostStatus;

  @IsOptional()
  @IsEnum(PostType)
  post_type?: PostType;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  video_url?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  audio_url?: string;

  @IsOptional()
  @IsBoolean()
  is_featured?: boolean;

  @IsOptional()
  @IsBoolean()
  is_pinned?: boolean;

  @IsOptional()
  @IsString()
  published_at?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  seo_title?: string;

  @IsOptional()
  @IsString()
  seo_description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  seo_keywords?: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  category_ids?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  tag_ids?: number[];
}
