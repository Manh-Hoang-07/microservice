import { IsEnum, IsOptional, IsString, Matches, MaxLength } from 'class-validator';
import { BasicStatus } from '../../../../../common/enums/basic-status.enum';

export class UpdateWardDto {
  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'provinceId must be numeric.' })
  provinceId?: string;

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
  @IsEnum(BasicStatus)
  status?: BasicStatus;
}
