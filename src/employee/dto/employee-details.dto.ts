import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { AccountCreationDetailsDto } from './account-creation-details.dto';
import { BankDetailsDto } from './bank-details.dto';
import { EducationDetailsDto } from './education-details.dto';

export class EmployeeDetailsDto {
  @ValidateNested()
  @Type(() => AccountCreationDetailsDto)
  accountCreationDetails: AccountCreationDetailsDto;

  @ValidateNested()
  @Type(() => BankDetailsDto)
  bankDetails: BankDetailsDto;

  @ValidateNested()
  @Type(() => EducationDetailsDto)
  educationDetails: EducationDetailsDto;
}
