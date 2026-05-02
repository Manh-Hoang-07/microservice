import {
  ArrayMaxSize,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';
import { PostStatus } from '../../enums/post-status.enum';
import { PostType } from '../../enums/post-type.enum';

const URL_OPTS = { require_protocol: true, protocols: ['http', 'https'] };
const SLUG_RE = /^[a-z0-9](?:[a-z0-9-]{0,253}[a-z0-9])?$/;

export class CreatePostDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  @Matches(SLUG_RE, { message: 'slug must be lowercase letters, digits and dashes.' })
  @MaxLength(255)
  slug?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  excerpt?: string;

  @IsOptional()
  @IsString()
  // Posts are stored as TEXT — cap at 200KB to bound DB cost / response size.
  @MaxLength(200_000)
  content?: string;

  @IsOptional()
  @IsUrl(URL_OPTS, { message: 'image must be an http(s) URL.' })
  @MaxLength(500)
  image?: string;

  @IsOptional()
  @IsUrl(URL_OPTS, { message: 'cover_image must be an http(s) URL.' })
  @MaxLength(500)
  cover_image?: string;

  @IsOptional()
  @IsEnum(PostStatus)
  status?: PostStatus;

  @IsOptional()
  @IsEnum(PostType)
  post_type?: PostType;

  @IsOptional()
  @IsUrl(URL_OPTS, { message: 'video_url must be an http(s) URL.' })
  @MaxLength(500)
  video_url?: string;

  @IsOptional()
  @IsUrl(URL_OPTS, { message: 'audio_url must be an http(s) URL.' })
  @MaxLength(500)
  audio_url?: string;

  @IsOptional()
  @IsBoolean()
  is_featured?: boolean;

  @IsOptional()
  @IsBoolean()
  is_pinned?: boolean;

  // ISO 8601 date — Prisma converts internally; without IsDateString the
  // field accepted any string and `new Date(invalidStr)` quietly produced
  // `Invalid Date` which Prisma rejects with an opaque 500.
  @IsOptional()
  @IsDateString()
  published_at?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  seo_title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  seo_description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  seo_keywords?: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @ArrayMaxSize(50)
  @IsInt({ each: true })
  @Min(1, { each: true })
  @IsNumber({}, { each: true })
  category_ids?: number[];

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @ArrayMaxSize(50)
  @IsInt({ each: true })
  @Min(1, { each: true })
  @IsNumber({}, { each: true })
  tag_ids?: number[];
}
