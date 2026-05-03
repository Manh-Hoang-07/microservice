import { IsIn, IsOptional, IsString, Matches, MaxLength } from 'class-validator';

export class UpdateGroupDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: string;

  @IsOptional()
  @IsString()
  @Matches(/^(\d{1,20})?$/, { message: 'owner_id must be numeric or empty.' })
  owner_id?: string | null;
}
