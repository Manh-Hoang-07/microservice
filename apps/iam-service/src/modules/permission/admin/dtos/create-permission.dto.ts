import { IsString, IsOptional, MaxLength, IsIn } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  @MaxLength(120)
  code: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  name?: string;

  @IsOptional()
  @IsIn(['context', 'system'])
  scope?: string;

  @IsOptional()
  @IsString()
  parent_id?: string;
}
