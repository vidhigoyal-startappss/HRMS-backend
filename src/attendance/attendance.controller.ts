import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('attendance')
@UseGuards(JwtAuthGuard)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('mark')
  async markAttendance(@Req() req, @Body() body: any) {
    return this.attendanceService.markAttendance(req.user, body);
  }

  @Get()
  async getAttendance(@Req() req) {
    return this.attendanceService.getAttendance(req.user);
  }
}
