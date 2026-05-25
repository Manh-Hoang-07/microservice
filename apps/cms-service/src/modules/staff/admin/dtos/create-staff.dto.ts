import {
  IsEmail,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';
import { BasicStatus } from '../../../../common/enums/status.enum';

export class CreateStaffDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  position?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  department?: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  bio?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  avatar?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+?[0-9 .-]{6,50}$/, { message: 'phone format invalid.' })
  @MaxLength(50)
  phone?: string;

  @IsOptional()
  @IsObject()
  // Frontend may render `socialLinks[platform]` as `<a href>`. This is an
  // open-redirect surface — applications consuming this field MUST validate
  // each value as `http(s)` before rendering. We don't enforce per-key URL
  // validation here because the schema is open-ended.
  socialLinks?: Record<string, string>;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  experience?: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  expertise?: string;

  @IsOptional()
  @IsEnum(BasicStatus)
  status?: BasicStatus;

  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;
}
