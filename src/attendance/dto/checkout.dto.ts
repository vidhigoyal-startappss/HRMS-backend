import {ApiProperty} from "@nestjs/swagger"

export  class CheckOutDto{
}


export class CheckOutResponse {
 
@ApiProperty()
id:string;
 
@ApiProperty()
userId: string;

@ApiProperty()
role:string;

@ApiProperty()
checkInTime:string;

@ApiProperty()
locaion:string;

@ApiProperty()
checkedOut:string;

@ApiProperty()
leave:boolean;

@ApiProperty()
createdAt:string;

@ApiProperty()
updatedAt:string;

@ApiProperty()
checkOutTime:string;

@ApiProperty()
totalHours:string;
}

export class todayResponse{
 
@ApiProperty()
id:string;
 
@ApiProperty()
userId: string;

@ApiProperty()
role:string;

@ApiProperty()
checkInTime:string;

@ApiProperty()
locaion:string;

@ApiProperty()
checkedOut:string;

@ApiProperty()
leave:boolean;

@ApiProperty()
createdAt:string;

@ApiProperty()
updatedAt:string;

@ApiProperty()
checkOutTime:string;

@ApiProperty()
totalHours:string;
}

export class myResponse{
 
@ApiProperty()
id:string;
 
@ApiProperty()
userId: string;

@ApiProperty()
role:string;

@ApiProperty()
checkInTime:string;

@ApiProperty()
locaion:string;

@ApiProperty()
checkedOut:string;

@ApiProperty()
leave:boolean;

@ApiProperty()
createdAt:string;

@ApiProperty()
updatedAt:string;

@ApiProperty()
checkOutTime:string;

@ApiProperty()
totalHours:string;
}

export class userResponse {
  @ApiProperty()
  name:string
  @ApiProperty()
  email:string
  @ApiProperty()
  role:string
  @ApiProperty()
  profileImg:string
}

export class getTodayAllResponse {

  @ApiProperty()
  id:string

  @ApiProperty()
  checkInTime:string

  @ApiProperty()
  checkOutTime:string

  @ApiProperty()
  totalHours:string

  @ApiProperty()
  location:string

  @ApiProperty()
  user:userResponse
}

export class myTodayResponse{
 
@ApiProperty()
id:string;
 
@ApiProperty()
userId: string;

@ApiProperty()
role:string;

@ApiProperty()
checkInTime:string;

@ApiProperty()
locaion:string;

@ApiProperty()
checkedOut:string;

@ApiProperty()
leave:boolean;

@ApiProperty()
createdAt:string;

@ApiProperty()
updatedAt:string;

@ApiProperty()
checkOutTime:string;

@ApiProperty()
totalHours:string;
}
