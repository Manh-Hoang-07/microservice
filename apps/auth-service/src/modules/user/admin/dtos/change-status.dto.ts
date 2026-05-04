import { IsString, Matches } from 'class-validator';

export class ChangeStatusDto {
  @IsString()
  @Matches(/^(active|inactive|locked)$/, {
    message: 'status must be one of: active, inactive, locked',
  })
  status: string;
}
