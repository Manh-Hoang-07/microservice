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
import { ProfileDto } from './create-user.dto';
import { UserStatus } from '../../enums/user-status.enum';

export class UpdateUserDto {
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

  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(72)
  password?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  image?: string;

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProfileDto)
  profile?: ProfileDto;
}
