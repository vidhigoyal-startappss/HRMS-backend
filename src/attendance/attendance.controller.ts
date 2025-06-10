import { Body, Controller, Get, Post, Put, Query, Param } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly service: AttendanceService) {}

  @Post('mark')
  async mark(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.service.markAttendance(createAttendanceDto);
  }

  @Get('all')
  async getAll(
    @Query('role') role: string,
    @Query('userId') userId: string,
  ) {
    return this.service.getAllAttendance();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ) {
    return this.service.updateAttendance(id, updateAttendanceDto);
  }
}
