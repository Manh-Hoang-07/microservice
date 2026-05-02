import { ArrayMaxSize, ArrayUnique, IsArray, IsString, Matches } from 'class-validator';

export class SyncPermissionsDto {
  @IsArray()
  @ArrayUnique()
  @ArrayMaxSize(500)
  @IsString({ each: true })
  @Matches(/^\d{1,20}$/, { each: true, message: 'permissionIds must be numeric.' })
  permissionIds: string[];
}
