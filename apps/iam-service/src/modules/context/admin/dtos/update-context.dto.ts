import { IsString, IsOptional, MaxLength, IsIn } from 'class-validator';

export class UpdateContextDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: string;
}
