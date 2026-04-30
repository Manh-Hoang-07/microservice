import { IsArray, IsString } from 'class-validator';

export class SyncRolesDto {
  @IsArray()
  @IsString({ each: true })
  roleIds: string[];
}
