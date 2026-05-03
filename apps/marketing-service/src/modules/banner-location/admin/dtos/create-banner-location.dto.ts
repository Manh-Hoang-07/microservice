import {
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { BannerStatus } from '../../../banner/enums/banner-status.enum';

export class CreateBannerLocationDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  // Code is referenced by frontend / templating to look up a slot. Keep
  // strict so accidental whitespace / unicode doesn't make a slot un-find-able.
  @Matches(/^[a-z0-9_-]+$/, {
    message: 'code must be lowercase letters, digits, underscore, dash.',
  })
  code: string;

  @IsString()
  @MinLength(1)
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @IsOptional()
  @IsEnum(BannerStatus)
  status?: BannerStatus;
}
