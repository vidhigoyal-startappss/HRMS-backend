import { IsString } from 'class-validator';

export class EducationDetailsDTO {
  @IsString()
  highestQualification: string;

  @IsString()
  university: string;

  @IsString()
  yearOfPassing: string;

  @IsString()
  grade: string;
}
