import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

/**
 * User-side comment DTO. `guest_name` / `guest_email` were intentionally
 * removed: this endpoint is for AUTHENTICATED users, and accepting those
 * fields here let an authenticated user pose as a guest with arbitrary
 * spoofed identity. Guest comments belong on a separate public endpoint
 * with rate-limit + captcha if/when one is added.
 */
export class CreateCommentDto {
  @IsNumber()
  post_id: number;

  @IsOptional()
  @IsNumber()
  parent_id?: number;

  @IsString()
  @MinLength(1)
  @MaxLength(5000)
  content: string;
}
