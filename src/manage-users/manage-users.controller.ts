import { Controller, Post, Delete, Get, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ManageUsersService } from './manage-users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('manage-users')
@UseGuards(JwtAuthGuard)
export class ManageUsersController {
  constructor(private readonly manageUsersService: ManageUsersService) {}

  @Post()
  async createUser(@Req() req, @Body() body: any) {
    // req.user is expected to have customPermissions & role properties
    return this.manageUsersService.createUser(req.user, body);
  }

  @Delete(':id')
  async removeUser(@Req() req, @Param('id') id: string) {
    return this.manageUsersService.removeUser(req.user, id);
  }

  @Get()
  async getAllUsers(@Req() req) {
    return this.manageUsersService.findAll(req.user);
  }
}
