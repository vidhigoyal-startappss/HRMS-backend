import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckInDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  location: string; 
}

export class CheckInResponse {
  @ApiProperty()
  userId : string;

  @ApiProperty()
  role:string

  @ApiProperty()
  checkInTime:string

  @ApiProperty()
  location:string

  @ApiProperty()
  checkedOut:boolean

  @ApiProperty()
  leave:boolean

  @ApiProperty()
  id:string

  @ApiProperty()
  createdAt:string

  @ApiProperty()
  updatedAt:string
}
