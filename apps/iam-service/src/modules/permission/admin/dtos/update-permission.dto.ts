import { IsIn, IsOptional, IsString, Matches, MaxLength } from 'class-validator';

export class UpdatePermissionDto {
  @IsOptional()
  @IsString()
  @MaxLength(150)
  name?: string;

  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: string;

  @IsOptional()
  @IsString()
  @Matches(/^(\d{1,20})?$/, { message: 'parent_id must be numeric or empty.' })
  parent_id?: string | null;
}
