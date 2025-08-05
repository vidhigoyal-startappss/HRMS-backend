// import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

// export class ApplyLeaveDto {
//   @IsNotEmpty()
//   @IsString()
//   startDate: Date;

//   @IsOptional()
//   @IsString()
//   endDate: Date;

//   @IsNotEmpty()
//   @IsString()
//   reason: string;

//   @IsNotEmpty()
//   @IsString()
//   dayType: string;

//   @IsNotEmpty()
//   @IsString()
//   leaveType: string;

//   @IsNotEmpty()
//   @IsString()
//   status: string;

//   @IsOptional()
//   @IsNumber()
//   noOfDays: number;

//   @IsOptional()
//   @IsString()
//   approvedBy: string;

//   @IsOptional()
//   @IsNumber()
//   paidDays: number;

//   @IsNumber()
//   @IsOptional()
//   unpaidDays: number;
// }



import { IsDateString, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ApplyLeaveDto {
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsOptional()
  @IsDateString()
  endDate: Date;

  @IsNotEmpty()
  @IsString()
  reason: string;

  @IsNotEmpty()
  @IsIn(['fullday', 'halfday'])
  dayType: string;

  @IsNotEmpty()
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
