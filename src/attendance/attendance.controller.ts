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
import { CheckInDto,CheckInResponse } from './dto/checkin.dto';
import { User } from '../auth/decorators/user.decorator';
import { JwtPayload } from '../auth/strategy/jwt-payload.interface';
import { CheckOutDto, CheckOutResponse, todayResponse,myResponse,getTodayAllResponse, myTodayResponse } from './dto/checkout.dto';
import {ApiBody ,ApiCreatedResponse,ApiOkResponse,ApiResponse} from "@nestjs/swagger"

@Controller('/attendance')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}


  @Post('check-in')
  @ApiBody({type:CheckInDto})
  @ApiResponse({type:CheckInResponse})
  @Permissions({ resource: 'attendance', action: 'write' })
  async checkIn(
    @User() user: JwtPayload,
    @Body() dto: CheckInDto,
  ) {
    return this.attendanceService.checkIn(user, dto);
  }

  @Put('check-out')
  @ApiCreatedResponse({type:CheckOutResponse})
  @Permissions({ resource: 'attendance', action: 'write' })
  async checkOut(@User() user: JwtPayload, @Body() dto: CheckOutDto) {
    return this.attendanceService.checkOut(user);
  }

  
  @Get('today')
  @ApiOkResponse({type:todayResponse})
  @Permissions({ resource: 'attendance', action: 'read' })
  async getTodayAttendance(@User() user: JwtPayload) {
    return this.attendanceService.getTodayAttendance(user);
  }


  @Get('my')
  @ApiOkResponse({type:myResponse})
  @Permissions({ resource: 'attendance', action: 'read' })
  async getMyAttendance(@User() user: JwtPayload) {
    return this.attendanceService.getMyAttendance(user);
  }

  @ApiOkResponse({type:getTodayAllResponse})
  @Get('today/all')
@Permissions({ resource: 'attendance', action: 'read' })
async getTodayHistory(@User() user: JwtPayload) {
  return this.attendanceService.getTodayHistory(user);
}

   @ApiOkResponse({type:myTodayResponse})
  @Get('my/today')
  @Permissions({ resource: 'attendance', action: 'read' })
  async getMyTodayAttendance(@User() user: JwtPayload) {
    return this.attendanceService.getMyTodayAttendance(user);
  }

  
}
