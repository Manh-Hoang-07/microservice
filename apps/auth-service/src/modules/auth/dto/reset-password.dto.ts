import { IsNotEmpty, IsString, MinLength, IsEmail } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty({ message: 'Email cannot be empty.' })
  @IsEmail({}, { message: 'Invalid email.' })
  email: string;

  @IsNotEmpty({ message: 'OTP cannot be empty.' })
  @IsString()
  otp: string;

  @IsNotEmpty({ message: 'Password cannot be empty.' })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters.' })
  password: string;

  @IsNotEmpty({ message: 'Confirm password cannot be empty.' })
  @IsString()
  @MinLength(6)
  confirmPassword: string;
}
