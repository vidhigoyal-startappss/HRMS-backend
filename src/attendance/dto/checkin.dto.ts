// src/attendance/dto/checkin.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CheckInDto {
  @IsString()
  @IsNotEmpty()
  location: string; // Area name
}
