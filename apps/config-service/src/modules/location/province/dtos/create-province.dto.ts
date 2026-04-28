import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateProvinceDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  code: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  type: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone_code?: string;

  @IsNotEmpty()
  country_id: any;

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
