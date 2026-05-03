import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProvinceDto {
  @IsOptional()
  @IsString()
  @MaxLength(20)
  code?: string;

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
  phone_code?: string;

  @IsOptional()
  country_id?: any;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  status?: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  code_bnv?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  code_tms?: string;
}
