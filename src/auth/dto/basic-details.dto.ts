import {
  IsString,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsObject,
  IsNumber,
  IsDefined,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
export class LeavesDto {
  @IsNumber()
  @ApiProperty()
  @IsOptional()
  plLeft?: number;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  wfhLeft?: number;
}

export class BasicDetailsDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  phone: string;

  @IsDateString()
  @ApiProperty()
  @IsNotEmpty()
  dob: Date;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  address?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  city?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  state?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  zipCode?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  country?: string;

  @IsDateString()
  @ApiProperty()
  @IsOptional()
  joiningDate?: Date;

  @IsString()
  @ApiProperty()
  @IsOptional()
  designation?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  department?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  profileImage?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  employmentType?: string;

  // @IsDefined()
  // @ValidateNested()
  // @Type(() => LeavesDto)
  // // leaves: LeavesDto;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  emergencyContactPersonName: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  emergencyContactEmail: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  currentAddress: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  permanentAddress: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  ctc: string;
}
