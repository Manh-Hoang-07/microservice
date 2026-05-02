import { ArrayMaxSize, ArrayUnique, IsArray, IsString, Matches } from 'class-validator';

export class SyncRolesDto {
  @IsArray()
  @ArrayUnique()
  @ArrayMaxSize(500)
  @IsString({ each: true })
  @Matches(/^\d{1,20}$/, { each: true, message: 'roleIds must be numeric.' })
  roleIds: string[];
}
