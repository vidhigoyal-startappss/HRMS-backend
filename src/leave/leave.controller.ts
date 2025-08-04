import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Param,
  Patch,
} from '@nestjs/common';
import { LeaveService } from './leave.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('leaves')
@UseGuards(JwtAuthGuard)
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('HR', 'Admin', 'SuperAdmin')
  @Post('apply')
  async applyLeave(@Req() req: any, @Body() body: any) {
    // Pass the full user object with customPermissions to the service
    return this.leaveService.applyLeave(req.user, body);
  }

  // employee will get all his leaves
  @Get()
  async getLeaves(@Req() req: any) {
    return this.leaveService.fetchLeaves(req.user);
  }

  // Hr will get all employees leave
  @Get()
  async getAllEmployeeLeaves(@Req() req: any) {
    return this.leaveService.fetchLeaves(req.user);
  }

  @Patch('status/:id')
  async updateStatus(
    @Req() req: any,
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.leaveService.updateLeaveStatus(req.user, id, status);
  }
}
