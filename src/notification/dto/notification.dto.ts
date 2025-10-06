import { IsNotEmpty, IsMongoId } from "class-validator";
import { Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export class CreateNotificationDto {
  @ApiProperty()
  @IsMongoId()
  recipient: string | Types.ObjectId;
  @ApiProperty()
  @IsNotEmpty()
  title: string;
  @ApiProperty()
  message?: string;
  @ApiProperty()
  type?: string;
  @ApiProperty()
  relatedModule?: string;
}
export class notificationUserResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  recipient: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  isRead: boolean;

  @ApiProperty()
  type: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}

export class deleteNotificationResponse {
  @ApiProperty()
  message: string;
}

export class markAllResponse {
  @ApiProperty()
  modifiedCount: 1;
}

