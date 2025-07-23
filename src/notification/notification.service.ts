import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification, NotificationDocument } from './schema/notification.schema';
import { Model } from 'mongoose';
import { CreateNotificationDto } from './dto/notification.dto';
import { User, UserDocument } from '../auth/schemas/user.schema'; 
import { Types } from 'mongoose';
@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(dto: CreateNotificationDto) {
    const notification = new this.notificationModel(dto);
    return notification.save();
  }

async getUserNotifications(userId: string) {
  return this.notificationModel.find({
      recipient: new Types.ObjectId(userId), 
  }).sort({ createdAt: -1 });
}

  async markAsRead(notificationId: string) {
    return this.notificationModel.findByIdAndUpdate(notificationId, { isRead: true });
  }

  
  async notifyRoles(
    roles: string[],
    payload: Omit<CreateNotificationDto, 'recipient'>,
  ) {
    const users = await this.userModel.find({ role: { $in: roles } });

    const notifications = users.map((user) => ({
      ...payload,
      recipient: user._id,
    }));

    return this.notificationModel.insertMany(notifications);
  }
}
