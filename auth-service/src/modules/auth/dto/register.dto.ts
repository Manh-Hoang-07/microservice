import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@ValidatorConstraint({ name: 'Match', async: false })
class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return value === relatedValue;
  }
  defaultMessage(args: ValidationArguments) {
    return `${args.property} must match ${args.constraints[0]}`;
  }
}

export class RegisterDto {
  @ApiProperty({ description: 'Full name', maxLength: 255, example: 'John Doe' })
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({ description: 'Username (optional)', maxLength: 50, example: 'johndoe' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  username?: string;

  @ApiProperty({ description: 'Email address', example: 'user@example.com' })
  @IsNotEmpty({ message: 'Email cannot be empty.' })
  @IsEmail({}, { message: 'Invalid email.' })
  email: string;

  @ApiPropertyOptional({ description: 'Phone number', maxLength: 20, example: '0912345678' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiProperty({ description: 'Password', minLength: 8, example: 'StrongP@ssw0rd' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters.' })
  password: string;

  @ApiProperty({ description: 'Confirm password', example: 'StrongP@ssw0rd' })
  @IsString()
  @Validate(MatchConstraint, ['password'], { message: 'Passwords do not match.' })
  confirmPassword: string;

  @ApiProperty({ description: 'OTP sent to email', example: '123456' })
  @IsNotEmpty({ message: 'OTP cannot be empty.' })
  @IsString()
  otp: string;
}
