import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../auth/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getTodayEventsByType(type: string) {
    const today = new Date();
    const todayDayMonth = this.formatDayMonth(today);

    if (type === 'birthday') {
      const users = await this.userModel.find({
        isDeleted: false,
        dob: { $exists: true, $ne: null },
      });

      const birthdays = users.filter((user) => {
        const userDob = new Date(user.dob);
        const userDayMonth = this.formatDayMonth(userDob);
        return userDayMonth === todayDayMonth;
      });
      console.log(birthdays);

      return birthdays.map((user) => ({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImage: user.profileImage,
        title: 'Birthday',
        type: 'birthday',
      }));
    }

    if (type === 'anniversary') {
      const users = await this.userModel.find({
        isDeleted: false,
        joiningDate: { $exists: true, $ne: null },
      });

      const anniversaries = users.filter((user) => {
        const userJoin = new Date(user.joiningDate);
        const userDayMonth = this.formatDayMonth(userJoin);
        return userDayMonth === todayDayMonth;
      });

      return anniversaries.map((user) => ({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImage: user.profileImage,
        title: 'Work Anniversary',
        type: 'anniversary',
      }));
    }

    return [];
  }

  private formatDayMonth(date: Date): string {
  const d = new Date(date);
  const day = d.getDate();         
  const month = d.getMonth() + 1; 
  return `${day}-${month}`;
}
}
