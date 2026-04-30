import { IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @MaxLength(100)
  code: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  name?: string;

  @IsOptional()
  @IsString()
  parent_id?: string;
}
