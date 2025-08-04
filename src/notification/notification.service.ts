import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification, NotificationDocument } from './schema/notification.schema';
import { Model } from 'mongoose';
import { CreateNotificationDto } from './dto/notification.dto';
import { User, UserDocument } from '../auth/schemas/user.schema'; 
import { Types } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
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
    const updated = await this.notificationModel.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }, // Return updated doc
    );
    if (!updated) {
      throw new NotFoundException('Notification not found');
    }
    return updated;
  }

  async markAllAsRead(userId: string) {
    const result = await this.notificationModel.updateMany(
      { recipient: new Types.ObjectId(userId), isRead: false },
      { $set: { isRead: true } },
    );
    return { modifiedCount: result.modifiedCount };
  }


async notifyRoles(
  roles: string[],
  payload: Omit<CreateNotificationDto, 'recipient'>,
  excludeUserId?: string, // optional parameter to exclude actor
) {
  const filter: any = { role: { $in: roles } };

  if (excludeUserId) {
    filter._id = { $ne: new Types.ObjectId(excludeUserId) };
  }

  const users = await this.userModel.find(filter);

  const notifications = users.map((user) => ({
    ...payload,
    recipient: user._id,
  }));

  return this.notificationModel.insertMany(notifications);
}

}
