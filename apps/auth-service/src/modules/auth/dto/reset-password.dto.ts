import { IsNotEmpty, IsString, MinLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ description: 'Email address', example: 'user@example.com' })
  @IsNotEmpty({ message: 'Email cannot be empty.' })
  @IsEmail({}, { message: 'Invalid email.' })
  email: string;

  @ApiProperty({ description: 'OTP code sent to email', example: '123456' })
  @IsNotEmpty({ message: 'OTP cannot be empty.' })
  @IsString()
  otp: string;

  @ApiProperty({ description: 'New password', minLength: 6, example: 'NewP@ssw0rd' })
  @IsNotEmpty({ message: 'Password cannot be empty.' })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters.' })
  password: string;

  @ApiProperty({ description: 'Confirm new password', minLength: 6, example: 'NewP@ssw0rd' })
  @IsNotEmpty({ message: 'Confirm password cannot be empty.' })
  @IsString()
  @MinLength(6)
  confirmPassword: string;
}
