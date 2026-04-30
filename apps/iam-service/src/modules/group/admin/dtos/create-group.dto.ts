import { IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @MaxLength(50)
  type: string;

  @IsString()
  @MaxLength(100)
  code: string;

  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  context_id: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  owner_id?: string;
}
