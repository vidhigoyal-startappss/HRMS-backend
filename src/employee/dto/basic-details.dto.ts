import { IsString, IsDateString } from 'class-validator';

export class BasicDetailsDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  phoneNumber: string;

  @IsDateString()
  dob: string;

  @IsString()
  gender: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  zipcode: string;

  @IsString()
  country: string;

  @IsDateString()
  joiningDate: string;

  @IsString()
  designation: string;

  @IsString()
  department: string;

  @IsString()
  employmentType: string;
}
