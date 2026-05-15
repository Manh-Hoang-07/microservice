import { IsString, Matches } from 'class-validator';

export class AssignRoleDto {
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'roleId must be numeric.' })
  roleId: string;
}
