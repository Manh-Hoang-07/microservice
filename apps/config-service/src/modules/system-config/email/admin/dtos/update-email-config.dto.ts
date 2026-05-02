import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

const toBool = ({ value }: { value: any }) =>
  value === true || value === 'true' || value === '1' || value === 1;

// Valid SMTP host: hostname or IP, no protocol/path. Blocks SSRF tricks like
// embedded URLs and rejects obvious metadata endpoints in user input.
const SMTP_HOST_RE = /^(?!169\.254\.|0\.|127\.|10\.|192\.168\.)[A-Za-z0-9._-]{1,253}$/;

export class UpdateEmailConfigDto {
  @IsString()
  @IsOptional()
  @MaxLength(255)
  @Matches(SMTP_HOST_RE, { message: 'smtp_host must be a public hostname.' })
  smtp_host?: string;

  @IsInt()
  @IsOptional()
  @Min(1)
  @Max(65535)
  @Type(() => Number)
  smtp_port?: number;

  @IsBoolean()
  @IsOptional()
  @Transform(toBool)
  smtp_secure?: boolean;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  smtp_username?: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  @MaxLength(500)
  smtp_password?: string;

  @IsEmail()
  @IsOptional()
  @MaxLength(255)
  from_email?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  from_name?: string;

  @IsEmail()
  @IsOptional()
  @MaxLength(255)
  reply_to_email?: string;
}
