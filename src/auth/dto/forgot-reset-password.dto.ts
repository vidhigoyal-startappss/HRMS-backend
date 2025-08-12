import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class ForgotPasswordDto {
  @IsEmail()
  @ApiProperty()
  email: string;
}
export class ForgotPasswordResponse {
  @ApiProperty()
  message: string;
  @ApiProperty()
  token: string;
}

export class ResetPasswordDto {
  @IsString()
  @ApiProperty()
  token: string;

  @IsString()
  @ApiProperty()
  @MinLength(6)
  newPassword: string;
}
export class ResetPasswordResponse {
  @ApiProperty()
  message: string;

}
export class ChangePasswordDto {
  @IsString()
  @ApiProperty()
  token: string;

  @IsString()
    @ApiProperty()
  @MinLength(6)
  newPassword: string;

  @IsString()
    @ApiProperty()
  @MinLength(6)
  oldPassword: string;
}

export class ChangePasswordResponse {

  @ApiProperty()
  message: string;
}