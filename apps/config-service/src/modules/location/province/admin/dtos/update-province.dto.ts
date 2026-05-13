import { IsEnum, IsOptional, IsString, Matches, MaxLength } from 'class-validator';
import { BasicStatus } from '../../../../../common/enums/basic-status.enum';

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
  phoneCode?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'countryId must be numeric.' })
  countryId?: string;

  @IsOptional()
  @IsEnum(BasicStatus)
  status?: BasicStatus;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  note?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  codeBnv?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  codeTms?: string;
}
