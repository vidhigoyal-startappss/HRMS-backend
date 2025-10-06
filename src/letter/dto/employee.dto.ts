import { IsString, IsDateString, IsPhoneNumber } from 'class-validator';

export class EmployeeDto {
  @IsString()
  fullName: string;

  @IsDateString()
  joiningDate: string;

  @IsString()
  designation: string;

  @IsString()
  ctc: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  email: string;
}