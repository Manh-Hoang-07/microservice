import { IsString, Matches } from 'class-validator';

export class AssignMemberRoleDto {
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'roleId must be numeric.' })
  roleId: string;
}
