import { IsString, IsNumber, IsOptional, MaxLength } from 'class-validator';

export class CreatePostCommentDto {
  @IsNumber()
  post_id: number;

  @IsOptional()
  @IsNumber()
  parent_id?: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  guest_name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  guest_email?: string;

  @IsString()
  @MaxLength(5000)
  content: string;
}
