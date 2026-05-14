import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class AdminChangePasswordDto {
  @IsString()
  @MinLength(6)
  @MaxLength(72)
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(72)
  passwordConfirmation?: string;
}
