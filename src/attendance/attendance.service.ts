import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendance, AttendanceDocument } from './schemas/attendance.schema';

@Injectable()
export class AttendanceService {
  constructor(@InjectModel(Attendance.name) private attendanceModel: Model<AttendanceDocument>) {}

  async markAttendance(user: { userId: string; role: string; customPermissions: Record<string, string[]> }, data: any) {
    // Check 'write' permission for 'attendance' resource
    if (!user.customPermissions?.['attendance']?.includes('write')) {
      throw new ForbiddenException('You do not have permission to mark attendance');
    }

    const attendanceData = {
      ...data,
      date: new Date(),
    };

    if (user.role === 'Employee') {
      attendanceData['user'] = user.userId;
    }

    const attendance = new this.attendanceModel(attendanceData);
    return attendance.save();
  }

  async getAttendance(user: { userId: string; role: string; customPermissions: Record<string, string[]> }) {
    // Check 'read' permission for 'attendance' resource
    if (!user.customPermissions?.['attendance']?.includes('read')) {
      throw new ForbiddenException('You do not have permission to view attendance');
    }

    // If user has 'readAll' permission for attendance (e.g. Admin/Manager)
    if (user.customPermissions['attendance'].includes('readAll')) {
      return this.attendanceModel.find().exec();
    }

    // Otherwise, only fetch the user's own attendance
    return this.attendanceModel.find({ user: user.userId }).exec();
  }
}
