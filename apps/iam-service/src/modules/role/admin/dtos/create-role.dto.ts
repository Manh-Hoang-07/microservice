import { IsEnum, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { RoleType } from '../../enums/role-type.enum';

export class CreateRoleDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Matches(/^[a-z][a-z0-9_.-]{1,99}$/i, {
    message: 'code must start with a letter and contain only letters, digits, underscore, dot, dash.',
  })
  code: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  name?: string;

  @IsOptional()
  @IsEnum(RoleType)
  roleType?: RoleType;

  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'parentId must be numeric.' })
  parentId?: string;
}
