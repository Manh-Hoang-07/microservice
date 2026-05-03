import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendOtpDto {
  @IsNotEmpty({ message: 'Email cannot be empty.' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  @IsEmail({}, { message: 'Invalid email.' })
  email: string;
}
