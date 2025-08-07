import { IsDateString, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApplyLeaveDto {
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({description:"start date is required",example:"21/05/2020"})
  startDate: Date;

  @IsOptional()
  @IsDateString()
    @ApiProperty({description:"End date is required",example:"23/05/2020"})
  endDate: Date;

  @IsNotEmpty()
  @IsString()
    @ApiProperty({description:"Date is Required",example:"give the reason"})
  reason: string;

  @IsNotEmpty()
    @ApiProperty({description:"start date is required",example:"fullday/halfday"})
  @IsIn(['fullday', 'halfday'])
  dayType: string;

  @IsNotEmpty()
  @ApiProperty({description:"leave type",example:"Sick"})
  @IsIn(['sick', 'casual', 'work']) 
  leaveType: string;

  @IsOptional()
    @ApiProperty({description:"Approval Status",example:"Accepted"})
  @IsString()
  status: string;

  @IsOptional()
  @ApiProperty({description:"No of day",example:"3"})
  @IsNumber()
  noOfDays: number;

  @IsOptional()
  @ApiProperty({description:"Name of HR",example:"Hr Name"})
  @IsString()
  approvedBy: string;

  @IsOptional()
  @IsNumber()
  paidDays: number;

  @IsOptional()
  @IsNumber()
  unpaidDays: number;
}
