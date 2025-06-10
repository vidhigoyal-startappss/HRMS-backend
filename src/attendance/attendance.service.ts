import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Attendance } from './attendance.schema';
import { Model } from 'mongoose';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name) private attendanceModel: Model<Attendance>,
  ) {}

  async markAttendance(data: CreateAttendanceDto): Promise<Attendance> {
    const exists = await this.attendanceModel.findOne({
      userId: data.userId,
      date: data.date,
    });

    if (exists) {
      throw new BadRequestException('Attendance already marked for this date');
    }

    return this.attendanceModel.create(data);
  }
getAllAttendance(): Promise<Attendance[]> {
    return this.attendanceModel.find().exec();

  return this.attendanceModel.find().exec();
}


  async updateAttendance(id: string, updateData: UpdateAttendanceDto): Promise<Attendance> {
    const updated = await this.attendanceModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updated) {
      throw new NotFoundException(`Attendance with id ${id} not found`);
    }

    return updated;
  }
}
