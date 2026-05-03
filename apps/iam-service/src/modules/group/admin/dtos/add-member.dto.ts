import { IsString, Matches } from 'class-validator';

export class AddMemberDto {
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'userId must be numeric.' })
  userId: string;
}
