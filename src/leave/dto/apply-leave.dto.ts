import { IsDateString, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApplyLeaveDto {
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  startDate: Date;

  @IsOptional()
  @IsDateString()
    @ApiProperty()
  endDate: Date;

  @IsNotEmpty()
  @IsString()
    @ApiProperty()
  reason: string;

  @IsNotEmpty()
    @ApiProperty()
  @IsIn(['fullday', 'halfday'])
  dayType: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsIn(['sick', 'casual', 'work']) 
  leaveType: string;

  @IsOptional()
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

  @IsOptional()
  @IsNumber()
  unpaidDays: number;
}


export class userIdResponse {
  @ApiProperty()
  id:string

  @ApiProperty()
  email:string

  @ApiProperty()
  firstName:string

  @ApiProperty()
  lastName :string
}


export class LeaveResponse {
 
  @ApiProperty()
  id:string;

  @ApiProperty()
  userId:userIdResponse;

  @ApiProperty()
  startDate:string;

  @ApiProperty()
  endDate:string;

  @ApiProperty()
  reason :string;

  @ApiProperty()
  dayType:string;

  @ApiProperty()
  leaveType:string;

  @ApiProperty()
  noOfDays:string;

  @ApiProperty()
  status:string;

  @ApiProperty()
  createdAt:string;

  @ApiProperty()
  updatedAt:string;

  @ApiProperty()
  v:number;

  @ApiProperty()
  approvedBy:userIdResponse;

  @ApiProperty()
  paidDays:number;

  @ApiProperty()
  unpaidDays:number;

}

export class updateStatusDTO {

  @ApiProperty()
  status:string

}

export class updateResponse {
  @ApiProperty()
  userId:string
  @ApiProperty()
  startDate:string
  @ApiProperty()
  endDate:string
  @ApiProperty()
  reason:string
  @ApiProperty()
  dayType:string
  @ApiProperty()
  leaveType:string
  @ApiProperty()
  noOfDays:number
  @ApiProperty()
  paidDays:number
  @ApiProperty()
  unpaidDays:number
  @ApiProperty()
  approvedBy:string
  @ApiProperty()
  status:string
  @ApiProperty()
  id:string
  @ApiProperty()
  createdAt:string
  @ApiProperty()
  updatedAt:string
}

export class applyLeaveResponse {

  @ApiProperty()
  userId:string;

  @ApiProperty()
  startDate:string;

  @ApiProperty()
  endDate:string;

  @ApiProperty()
  reason:string;

  @ApiProperty()
  dayType:string;


  @ApiProperty()
  leaveType:string;

  @ApiProperty()
  noOfDays:number;
  @ApiProperty()
  status:string;
  @ApiProperty()
  id:string;
  @ApiProperty()
  createdAt:string;
  @ApiProperty()
  updated:string;
 
}