import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { BasicDetailsDto } from './dto/basic-details.dto';
import { EducationDetailsDto } from './dto/education-details.dto';
import { BankDetailsDto } from './dto/bank-details.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('basic-details')
  @UseGuards(JwtAuthGuard)
  async saveBasicDetails(@Req() req: any, @Body() basicDetailsDto: BasicDetailsDto) {
    return this.authService.saveBasicDetails(req.user.userId, basicDetailsDto);
  }

  @Post('education-bank-details')
  @UseGuards(JwtAuthGuard)
  async saveEducationAndBankDetails(
    @Req() req: any,
    @Body() educationDetailsDto: EducationDetailsDto,
    @Body() bankDetailsDto: BankDetailsDto,
  ) {
    return this.authService.saveEducationAndBankDetails(
      req.user.userId,
      educationDetailsDto,
      bankDetailsDto,
    );
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Req() req: any) {
    return {
      userId: req.user.userId,
      email: req.user.email,
      role: req.user.role,
      customPermissions: req.user.customPermissions,
    };
  }
}
