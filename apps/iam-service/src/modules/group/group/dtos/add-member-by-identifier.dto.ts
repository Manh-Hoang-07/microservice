import { IsEmail, IsOptional, IsString, MaxLength, ValidateIf } from 'class-validator';

export class AddMemberByIdentifierDto {
  @ValidateIf((o) => !o.username)
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @ValidateIf((o) => !o.email)
  @IsString()
  @MaxLength(100)
  username?: string;
}
