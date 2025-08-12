import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { string,array } from 'joi';
import { LeavesDto } from './basic-details.dto';

export class LoginDto {
@ApiProperty({ description: 'The email address of the user', example: 'user@gmail.com' })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({ description: 'The password of the user', example: 'password' })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}

export class RegisterResponse {

  @ApiProperty()
  message:string;

  @ApiProperty()
  userId : string;

  @ApiProperty()
  role : string;

  @ApiProperty()
  createdBy : string;

  @ApiProperty()
  employeeId : string;

}

export class customPermissionResponse {

  @ApiProperty()
   users : [];

   @ApiProperty()
   leaves : [];

   @ApiProperty()
   attendance : [];

}

export class userLoginResponse {
  @ApiProperty()
   id :string;

    @ApiProperty()
   email :string;

     @ApiProperty()
   role :string;

     @ApiProperty()
   customPermission:customPermissionResponse;


     @ApiProperty()
   employeeId :string;

     @ApiProperty()
   name :string;
}
export class LoginResponse {
  @ApiProperty()
  accessToken:string;
 
  @ApiProperty()
   user: userLoginResponse;

}

export class MyResponse {
  @ApiProperty()
  userId : string

  @ApiProperty()
  name:string

  @ApiProperty()
  email:string

  @ApiProperty()
  role:string

  @ApiProperty()
  customePermission:customPermissionResponse

  @ApiProperty()
  leaves:LeavesDto
}


export class getEmployee {
 @ApiProperty()
 id : string;

 @ApiProperty()
 email : string;

 @ApiProperty()
 password : string;

@ApiProperty()
role:string;

@ApiProperty()
 employeeId : string;

@ApiProperty()
createdBy :string;

@ApiProperty()
customPermission: customPermissionResponse;

@ApiProperty()
 profileImage : string;

@ApiProperty()
isDeletd: boolean;

@ApiProperty()
v : 0;

@ApiProperty()
accountHolderName: string;

@ApiProperty()
accountNumber: string;

@ApiProperty()
address: string;
@ApiProperty()
adharNumber: string;
@ApiProperty()
bankName: string;
@ApiProperty()
branchName: string;
@ApiProperty()
city: string;
@ApiProperty()
country: string;
@ApiProperty()
department: string;
@ApiProperty()
designation: string;
@ApiProperty()
dob: string;
@ApiProperty()
employmentType: string;
@ApiProperty()
firstName: string;
@ApiProperty()
gender: string;
@ApiProperty()
grade: string;
@ApiProperty()
ifscCode: string;
@ApiProperty()
institution: string;
@ApiProperty()
joiningDate: string;
@ApiProperty()
lastName: string;
@ApiProperty()
panNumber: string;
@ApiProperty()
phone: string;
@ApiProperty()
qualification: string;
@ApiProperty()
state: string;
@ApiProperty()
yearOfpassing: number;
@ApiProperty()
zipCode: string;

}

export class getAllEmployeesResponse {

  @ApiProperty()
  users:getEmployee
}

export class userDeleteResponse{
  @ApiProperty()
  message:string;
}

export class checkFirstUserResponse{
  @ApiProperty()
  isFirst:boolean;
}

export class FileUploadDTO {
  @ApiProperty()
  file:any
}

export class FileUploadResponse {
 @ApiProperty()
 message:string
}