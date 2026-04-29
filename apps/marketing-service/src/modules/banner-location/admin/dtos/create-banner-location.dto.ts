import { IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateBannerLocationDto {
  @IsString()
  @MaxLength(100)
  code: string;

  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  status?: string;
}
