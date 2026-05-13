import { IsString, IsOptional, MaxLength, IsEnum } from 'class-validator';
import { BasicStatus } from '../../../../common/enums/basic-status.enum';

export class UpdateContextDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsEnum(BasicStatus)
  status?: BasicStatus;
}
