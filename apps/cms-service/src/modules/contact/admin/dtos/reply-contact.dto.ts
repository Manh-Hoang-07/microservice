import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

/**
 * The reply field is stored as TEXT and surfaced to admins. Cap length to
 * keep the column / response sizes bounded; previously this came in as a
 * raw `@Body('reply') reply: string` with no validation at all.
 */
export class ReplyContactDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(20_000)
  reply: string;
}
