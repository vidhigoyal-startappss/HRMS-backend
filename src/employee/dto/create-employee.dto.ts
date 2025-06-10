import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';
import { AccountDTO } from './account.dto';
import { BasicDetailsDTO } from './basic-details.dto';
import { EducationDetailsDTO } from './education-details.dto';
import { BankDetailsDTO } from './bank-details.dto';

export class CreateEmployeeDto {
  @IsDefined()
  @ValidateNested()
  @Type(() => AccountDTO)
  account: AccountDTO;

  @IsDefined()
  @ValidateNested()
  @Type(() => BasicDetailsDTO)
  basicDetails: BasicDetailsDTO;

  @IsDefined()
  @ValidateNested()
  @Type(() => EducationDetailsDTO)
  educationDetails: EducationDetailsDTO;

  @IsDefined()
  @ValidateNested()
  @Type(() => BankDetailsDTO)
  bankDetails: BankDetailsDTO;
}

