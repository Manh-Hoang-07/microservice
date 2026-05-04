import { IsString, MinLength, MaxLength } from 'class-validator';

export class AdminChangePasswordDto {
  @IsString()
  @MinLength(6)
  @MaxLength(72)
  password: string;
}
