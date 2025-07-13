import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ApplyLeaveDto {
  @IsNotEmpty()
  @IsString()
  startDate: Date;

  @IsOptional()
  @IsString()
  endDate: Date;

  @IsNotEmpty()
  @IsString()
  reason: string;

  @IsNotEmpty()
  @IsString()
  dayType: string;

  @IsNotEmpty()
  @IsString()
  leaveType: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsOptional()
  @IsNumber()
  noOfDays: number;

  @IsOptional()
  @IsString()
  approvedBy: string;

  @IsOptional()
  @IsNumber()
  paidDays: number;

  @IsNumber()
  @IsOptional()
  unpaidDays: number;
}
