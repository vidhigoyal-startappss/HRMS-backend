import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User, UserDocument } from './schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { BasicDetailsDto } from './dto/basic-details.dto';
import { EducationDetailsDto } from './dto/education-details.dto';
import { BankDetailsDto } from './dto/bank-details.dto';
import { PERMISSIONS } from './constants/permissions.constant';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userModel.findOne({ email: registerDto.email });
    if (existingUser) {
      throw new UnauthorizedException('User already exists with this email');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const role = registerDto.role || 'Employee';

    // Assign resource-based permissions
    const customPermissions = PERMISSIONS[role] || {};

    const createdUser = new this.userModel({
      ...registerDto,
      password: hashedPassword,
      role,
      customPermissions,
    });
    return createdUser.save();
  }

  async saveBasicDetails(userId: string, details: BasicDetailsDto) {
    const user = await this.userModel.findByIdAndUpdate(userId, details, { new: true });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async saveEducationAndBankDetails(
    userId: string,
    education: EducationDetailsDto,
    bank: BankDetailsDto,
  ) {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { ...education, ...bank },
      { new: true },
    );
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async validateUser(email: string, pass: string): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ email });
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role,
      customPermissions: user.customPermissions,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
