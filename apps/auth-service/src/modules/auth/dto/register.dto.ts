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
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  username?: string;

  @IsNotEmpty({ message: 'Email cannot be empty.' })
  @IsEmail({}, { message: 'Invalid email.' })
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters.' })
  password: string;

  @IsString()
  @Validate(MatchConstraint, ['password'], { message: 'Passwords do not match.' })
  confirmPassword: string;

  @IsNotEmpty({ message: 'OTP cannot be empty.' })
  @IsString()
  otp: string;
}
