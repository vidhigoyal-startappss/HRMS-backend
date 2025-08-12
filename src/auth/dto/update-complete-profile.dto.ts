import { BasicDetailsDto } from './basic-details.dto';
import { EducationDetailsDto } from './education-details.dto';
import { BankDetailsDto } from './bank-details.dto';
import { Type } from 'class-transformer';
import { ValidateNested, IsOptional, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompleteProfileDto {
  @IsOptional()
  @ValidateNested()
  @ApiProperty()
  @Type(() => BasicDetailsDto)
  basicDetails?: BasicDetailsDto;

  @IsOptional()
  @ApiProperty()
  @ValidateNested()
  @Type(() => EducationDetailsDto)
  educationDetails?: EducationDetailsDto;

  @IsOptional()
  @ApiProperty()
  @ValidateNested()
  @Type(() => BankDetailsDto)
  bankDetails?: BankDetailsDto;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  @Min(0)
  paidLeaveAllowed?: number;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  @Min(0)
  wfhAllowed?: number;
}

export class UpdateCompleteResponse {
 
  @ApiProperty()
  basicDetails?: BasicDetailsDto;
  @ApiProperty()
  educationDetails?: EducationDetailsDto;
  @ApiProperty()
  bankDetails?: BankDetailsDto;
  @ApiProperty()
  paidLeaveAllowed?: number;
  @ApiProperty()
  wfhAllowed?: number;
}