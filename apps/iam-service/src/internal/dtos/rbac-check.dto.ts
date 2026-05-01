import { IsArray, IsOptional, IsString } from 'class-validator';

export class RbacCheckDto {
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  groupId?: string;

  @IsArray()
  @IsString({ each: true })
  permissions: string[];
}
