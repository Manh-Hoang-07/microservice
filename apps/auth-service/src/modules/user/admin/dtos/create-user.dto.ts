import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  ValidateNested,
  IsEmail,
  IsEnum,
} from 'class-validator';
import { Gender } from '../../enums/gender.enum';

export class ProfileDto {
  @IsOptional()
  @IsString()
  birthday?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  countryId?: string;

  @IsOptional()
  @IsString()
  provinceId?: string;

  @IsOptional()
  @IsString()
  wardId?: string;

  @IsOptional()
  @IsString()
  about?: string;
}

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @IsString()
  @MinLength(6)
  @MaxLength(72)
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  image?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProfileDto)
  profile?: ProfileDto;
}
