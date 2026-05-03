import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @MinLength(1)
  @MaxLength(255)
  name: string;

  @IsEmail()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  @MaxLength(255)
  email: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Matches(/^\+?[0-9 .-]{6,50}$/, { message: 'phone format invalid.' })
  @MaxLength(50)
  phone?: string;

  // Cap message length so a flood of submissions can't fill the DB. 5KB is
  // generous for a contact form; longer threads belong in a ticketing tool.
  @IsString()
  @MinLength(1)
  @MaxLength(5000)
  message: string;
}
