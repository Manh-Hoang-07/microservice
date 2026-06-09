import { IsArray, IsString, Matches } from 'class-validator';

export class SyncMemberRolesDto {
  @IsArray()
  @IsString({ each: true })
  @Matches(/^\d{1,20}$/, { each: true, message: 'Each roleId must be numeric.' })
  roleIds: string[];
}
