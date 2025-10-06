import {
  IsString,
  IsDateString,
  IsNotEmpty,
  IsOptional,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class EducationDetailsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  qualification: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  institution: string;
  @IsNotEmpty()
  @ApiProperty()
  yearOfPassing: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  grade: string;
}
