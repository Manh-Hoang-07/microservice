import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchConstraint } from './register.dto';

export class ResetPasswordDto {
  @IsNotEmpty({ message: 'Email cannot be empty.' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  @IsEmail({}, { message: 'Invalid email.' })
  email: string;

  @IsNotEmpty({ message: 'OTP cannot be empty.' })
  @IsString()
  @Matches(/^\d{6}$/, { message: 'OTP must be 6 digits.' })
  otp: string;

  @IsNotEmpty({ message: 'Password cannot be empty.' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters.' })
  @MaxLength(72)
  password: string;

  @IsNotEmpty({ message: 'Confirm password cannot be empty.' })
  @IsString()
  @Validate(MatchConstraint, ['password'], { message: 'Passwords do not match.' })
  confirmPassword: string;
}
