import { IsNotEmpty, IsString } from 'class-validator';

export class ApplyLeaveDto {
  @IsNotEmpty()
  @IsString()
  startDate: string;

  @IsNotEmpty()
  @IsString()
  endDate: string;

  @IsNotEmpty()
  @IsString()
  reason: string;
}
