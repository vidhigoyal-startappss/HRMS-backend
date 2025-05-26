import {
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Leave, LeaveDocument } from './schemas/leave.schema';

@Injectable()
export class LeaveService {
  constructor(
    @InjectModel(Leave.name) private leaveModel: Model<LeaveDocument>,
  ) {}

  async applyLeave(user: { userId: string; customPermissions: Record<string, string[]> }, data: any) {
    // Check if the user has 'write' permission for the 'leaves' resource
    if (!user.customPermissions['leaves']?.includes('write')) {
      throw new ForbiddenException('You do not have permission to apply for leave');
    }

    const leave = new this.leaveModel({
      ...data,
      userId: user.userId,
      status: 'Pending',
    });
    return leave.save();
  }

  async fetchLeaves(user: { userId: string; customPermissions: Record<string, string[]> }) {
    // Check if the user has 'read' permission for the 'leaves' resource
    if (!user.customPermissions['leaves']?.includes('read')) {
      throw new ForbiddenException('You do not have permission to view leaves');
    }

    // Admin can view all leaves
    if (user.customPermissions['leaves'].includes('readAll')) {
      return this.leaveModel.find().exec();
    }

    // Non-admin users can only view their own leaves
    return this.leaveModel.find({ userId: user.userId }).exec();
  }

  async updateLeaveStatus(
    user: { userId: string; customPermissions: Record<string, string[]> },
    id: string,
    status: string,
  ) {
    const validStatuses = ['Pending', 'Approved', 'Rejected'];
    if (!validStatuses.includes(status)) {
      throw new BadRequestException(
        `Invalid status. Allowed values are: ${validStatuses.join(', ')}`,
      );
    }

    // Check if the user has 'update' permission for the 'leaves' resource
    if (!user.customPermissions['leaves']?.includes('update')) {
      throw new ForbiddenException('You do not have permission to update leave status');
    }

    const leave = await this.leaveModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!leave) {
      throw new BadRequestException('Leave request not found');
    }

    return leave;
  }
}