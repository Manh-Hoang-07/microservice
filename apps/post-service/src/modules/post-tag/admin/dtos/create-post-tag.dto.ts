import { IsString, IsOptional, IsBoolean, MaxLength } from 'class-validator';

export class CreatePostTagDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
