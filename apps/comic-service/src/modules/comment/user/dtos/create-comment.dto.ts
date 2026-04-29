import { IsString, IsNumber, IsOptional, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  comic_id: number;

  @IsOptional()
  @IsNumber()
  chapter_id?: number;

  @IsOptional()
  @IsNumber()
  parent_id?: number;

  @IsString()
  @MaxLength(5000)
  content: string;
}
