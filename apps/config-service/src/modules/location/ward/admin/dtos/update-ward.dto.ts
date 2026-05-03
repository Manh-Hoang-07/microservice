import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateWardDto {
  @IsOptional()
  province_id?: any;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  type?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  code?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  status?: string;
}
