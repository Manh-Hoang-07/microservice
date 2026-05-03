import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'Match', async: false })
export class MatchConstraint implements ValidatorConstraintInterface {
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
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  @Matches(/^[a-zA-Z0-9_]+$/, { message: 'Username may only contain letters, digits and underscore.' })
  @MinLength(3)
  @MaxLength(50)
  username?: string;

  @IsNotEmpty({ message: 'Email cannot be empty.' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  @IsEmail({}, { message: 'Invalid email.' })
  email: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Matches(/^\+?[0-9]{6,20}$/, { message: 'Invalid phone number.' })
  @MaxLength(20)
  phone?: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters.' })
  @MaxLength(72, { message: 'Password is too long.' })
  password: string;

  @IsString()
  @Validate(MatchConstraint, ['password'], { message: 'Passwords do not match.' })
  confirmPassword: string;

  @IsNotEmpty({ message: 'OTP cannot be empty.' })
  @IsString()
  @Matches(/^\d{6}$/, { message: 'OTP must be 6 digits.' })
  otp: string;
}
