import { IsEnum } from 'class-validator';
import { UserStatus } from '../../enums/user-status.enum';

export class ChangeStatusDto {
  @IsEnum(UserStatus)
  status: UserStatus;
}
