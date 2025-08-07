import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsIn,
  MinLength,
  IsOptional,
  IsObject,
  IsMongoId
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description :"Email Id is required",example:"user@gmail.com"})
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description :"Password is required",example:"password"})
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiProperty({ description :"Role is required",example:"role"})
  @IsString()
  @IsNotEmpty()
  @IsIn(['SuperAdmin', 'Admin', 'Manager', 'HR', 'Employee'], {
    message: 'Role must be Admin, Manager, HR, or Employee',
  })
  role: string;


  @IsOptional()
  @IsObject({ message: 'Custom permissions must be an object' })
  customPermissions?: Record<string, string[]>;

}
