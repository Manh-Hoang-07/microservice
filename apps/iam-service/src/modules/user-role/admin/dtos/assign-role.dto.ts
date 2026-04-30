import { IsString } from 'class-validator';

export class AssignRoleDto {
  @IsString()
  roleId: string;

  @IsString()
  groupId: string;
}
