import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async countUsers(): Promise<number> {
  return this.userModel.countDocuments().exec();
}

async findByEmail(email: string): Promise<User | null> {
  return this.userModel.findOne({ email }).exec();
}

async create(userData: { email: string; password: string; role: string }) {
  const newUser = new this.userModel(userData);
  return newUser.save();
}

}
