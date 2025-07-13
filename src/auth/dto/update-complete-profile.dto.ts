import { BasicDetailsDto } from './basic-details.dto';
import { EducationDetailsDto } from './education-details.dto';
import { BankDetailsDto } from './bank-details.dto';
import { Type } from 'class-transformer';
import { ValidateNested, IsOptional, IsNumber, Min } from 'class-validator';

export class UpdateCompleteProfileDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => BasicDetailsDto)
  basicDetails?: BasicDetailsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => EducationDetailsDto)
  educationDetails?: EducationDetailsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => BankDetailsDto)
  bankDetails?: BankDetailsDto;

  @IsOptional()
  @IsNumber()
  @Min(0)
  paidLeaveAllowed?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  wfhAllowed?: number;
}
