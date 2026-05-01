import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class LogoutDto {
  @ApiPropertyOptional({ description: 'Refresh token to revoke (single-session logout)' })
  @IsOptional()
  @IsString()
  refreshToken?: string;
}
