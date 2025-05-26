import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../auth/schemas/user.schema';

@Injectable()
export class ManageUsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  private hasPermission(user: { customPermissions?: Record<string, string[]> }, permission: string): boolean {
    // Check if user has the required permission on the 'users' resource
    return user.customPermissions?.['users']?.includes(permission) ?? false;
  }

  async createUser(currentUser: { customPermissions?: Record<string, string[]>; role: string }, userData: Partial<User>) {
    if (!this.hasPermission(currentUser, 'write')) {
      throw new ForbiddenException('You do not have permission to create users');
    }

    if (currentUser.role === 'Manager' && userData.role !== 'Employee') {
      throw new ForbiddenException('Managers can only create Employees');
    }

    const user = new this.userModel(userData);
    return user.save();
  }

  async removeUser(currentUser: { customPermissions?: Record<string, string[]>; role: string }, userId: string) {
    if (!this.hasPermission(currentUser, 'delete')) {
      throw new ForbiddenException('You do not have permission to remove users');
    }

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (currentUser.role === 'Manager' && user.role !== 'Employee') {
      throw new ForbiddenException('Managers can only remove Employees');
    }

    return this.userModel.deleteOne({ _id: userId });
  }

  async findAll(currentUser: { customPermissions?: Record<string, string[]> }) {
    if (!this.hasPermission(currentUser, 'read')) {
      throw new ForbiddenException('You do not have permission to view users');
    }

    return this.userModel.find().select('-password').exec();
  }
}
