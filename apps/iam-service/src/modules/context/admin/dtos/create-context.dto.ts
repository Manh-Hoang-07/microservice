import { IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateContextDto {
  @IsString()
  @MaxLength(50)
  type: string;

  @IsString()
  @MaxLength(100)
  code: string;

  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  ref_id?: string;
}
