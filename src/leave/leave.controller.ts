import { Controller, Post, Body, Get, UseGuards, Req, Param, Patch } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('leaves')
@UseGuards(JwtAuthGuard)
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Post('apply')
  async applyLeave(@Req() req: any, @Body() body: any) {
    // Pass the full user object with customPermissions to the service
    return this.leaveService.applyLeave(req.user, body);
  }

  @Get()
  async getLeaves(@Req() req: any) {
    return this.leaveService.fetchLeaves(req.user);
  }

  @Patch(':id')
  async updateStatus(
    @Req() req: any,
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.leaveService.updateLeaveStatus(req.user, id, status);
  }
}