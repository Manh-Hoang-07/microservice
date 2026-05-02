import { ArrayMaxSize, ArrayUnique, IsArray, IsString, Matches } from 'class-validator';

export class SyncUserRolesDto {
  @IsArray()
  @ArrayUnique()
  @ArrayMaxSize(500)
  @IsString({ each: true })
  @Matches(/^\d{1,20}$/, { each: true, message: 'roleIds must be numeric.' })
  roleIds: string[];

  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'groupId must be numeric.' })
  groupId: string;
}
