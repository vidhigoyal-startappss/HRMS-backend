import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { SignupDto } from '../auth/dto/signup.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // if you have JWT setup

@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  // This endpoint should only be accessible by Super Admins
  @Post('create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('superAdmin')
  async createUser(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
}
