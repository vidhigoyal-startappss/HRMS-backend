import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto ,notificationUserResponse,deleteNotificationResponse,markAllResponse} from './dto/notification.dto';
import { ApiBody,ApiParam,ApiCreatedResponse,ApiOkResponse } from '@nestjs/swagger';
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiBody({type:CreateNotificationDto})
  @ApiCreatedResponse({type:CreateNotificationDto})
  @Post()
  create(@Body() dto: CreateNotificationDto) {
    return this.notificationService.create(dto);
  }

  @ApiOkResponse({type:notificationUserResponse})
  @Get(':userId')
  getUserNotifications(@Param('userId') userId: string) {
    return this.notificationService.getUserNotifications(userId);
  }
    
  @ApiOkResponse({type:notificationUserResponse})
  @Patch('read/:id')
  markAsRead(@Param('id') id: string) {
    return this.notificationService.markAsRead(id);
  }

  @ApiOkResponse({type:markAllResponse})
  @Patch(':userId/read-all')
  markAllAsRead(@Param('userId') userId: string) {
    return this.notificationService.markAllAsRead(userId);
  }

  @ApiOkResponse({type:deleteNotificationResponse})
  @Delete(':id')
  deleteNotification(@Param('id') id: string) {
    return this.notificationService.deleteNotification(id);
  }
}
