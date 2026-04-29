import { IsNumber, Min } from 'class-validator';

export class CreateBookmarkDto {
  @IsNumber()
  chapter_id: number;

  @IsNumber()
  @Min(1)
  page_number: number;
}
