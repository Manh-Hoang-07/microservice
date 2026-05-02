import { IsOptional, IsString } from 'class-validator';

export class RefreshTokenDto {
  // Refresh token may also come from cookie; controller validates presence.
  @IsOptional()
  @IsString()
  refreshToken?: string;
}
