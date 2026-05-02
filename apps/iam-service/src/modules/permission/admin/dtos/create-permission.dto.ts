import { IsIn, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  @Matches(/^[a-z][a-z0-9_.-]{1,119}$/i, {
    message: 'code must start with a letter and contain only letters, digits, underscore, dot, dash.',
  })
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
  @Matches(/^\d{1,20}$/, { message: 'parent_id must be numeric.' })
  parent_id?: string;
}
