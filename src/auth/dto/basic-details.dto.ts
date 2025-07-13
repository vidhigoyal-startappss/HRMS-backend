import {
  IsString,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsObject,
  IsNumber,
  IsDefined,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
export class LeavesDto {
  @IsNumber()
  @IsOptional()
  plLeft?: number;

  @IsNumber()
  @IsOptional()
  wfhLeft?: number;
}

export class BasicDetailsDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsDateString()
  @IsNotEmpty()
  dob: Date;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  zipCode?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsDateString()
  @IsOptional()
  joiningDate?: Date;

  @IsString()
  @IsOptional()
  designation?: string;

  @IsString()
  @IsOptional()
  department?: string;

  @IsString()
  @IsOptional()
  profileImage?: string;

  @IsString()
  @IsOptional()
  employmentType?: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => LeavesDto) 
  leaves: LeavesDto;

}


