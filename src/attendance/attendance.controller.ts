import {
  Controller,
  Post,
  Put,
  Get,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { CheckInDto } from './dto/checkin.dto';
import { User } from '../auth/decorators/user.decorator';
import { JwtPayload } from '../auth/strategy/jwt-payload.interface';
import { CheckOutDto } from './dto/checkout.dto';

@Controller('/attendance')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  // ✅ 1. Check-In
  @Post('check-in')
  @Permissions({ resource: 'attendance', action: 'write' })
  async checkIn(
    @User() user: JwtPayload,
    @Body() dto: CheckInDto,
  ) {
    return this.attendanceService.checkIn(user, dto);
  }

  // ✅ 2. Check-Out
  @Put('check-out')
  @Permissions({ resource: 'attendance', action: 'write' })
  async checkOut(@User() user: JwtPayload, @Body() dto: CheckOutDto) {
    return this.attendanceService.checkOut(user);
  }

  // ✅ 3. Get today's attendance for logged-in user
  @Get('today')
  @Permissions({ resource: 'attendance', action: 'read' })
  async getTodayAttendance(@User() user: JwtPayload) {
    return this.attendanceService.getTodayAttendance(user);
  }

  // ✅ 4. Get full attendance history for logged-in user
  @Get('my')
  @Permissions({ resource: 'attendance', action: 'read' })
  async getMyAttendance(@User() user: JwtPayload) {
    return this.attendanceService.getMyAttendance(user);
  }

  // ✅ 5. Get today's attendance for all users (Admins/HR only)
  @Get('today/all')
@Permissions({ resource: 'attendance', action: 'read' })
async getTodayHistory(@User() user: JwtPayload) {
  return this.attendanceService.getTodayHistory(user);
}


  // ✅ 6. Get today’s attendance for logged-in user (explicit)
  @Get('my/today')
  @Permissions({ resource: 'attendance', action: 'read' })
  async getMyTodayAttendance(@User() user: JwtPayload) {
    return this.attendanceService.getMyTodayAttendance(user);
  }
}
