import { IsString, Matches } from 'class-validator';

export class AssignRoleDto {
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'roleId must be numeric.' })
  roleId: string;

  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'groupId must be numeric.' })
  groupId: string;
}
