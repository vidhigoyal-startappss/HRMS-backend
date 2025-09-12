import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Sequence, User, UserDocument } from "./schemas/user.schema";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { UpdateCompleteProfileDto } from "./dto/update-complete-profile.dto";
import { PERMISSIONS } from "./constants/permissions.constant";
import { EmailService } from "src/mail/mail.service";
// import { DeleteRequest, DeleteRequestDocument } from './schemas/delete-request.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Sequence.name) private sequenceModal: Model<Sequence>,
    // @InjectModel(DeleteRequest.name) private deleteRequestModel: Model<DeleteRequestDocument>,
    private jwtService: JwtService,
    private emailService: EmailService
  ) {}

  async isFirstUser(): Promise<boolean> {
    const count = await this.userModel.countDocuments();
    return count === 0;
  }

  async genrateEmployeeid(): Promise<string> {
    const sequence = await this.sequenceModal.findOneAndUpdate(
      { collectionName: "user" },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );

    if (!sequence) {
      throw new Error("XYZ!");
    }

    const uniqueEmployeeId = `EMP${sequence.value}${Math.floor(Math.random() * 10000)}`;
    return uniqueEmployeeId;
  }

  async register(registerDto: RegisterDto, creatorId?: string) {
    const existingUser = await this.userModel.findOne({
      email: registerDto.email,
    });
    if (existingUser) {
      throw new UnauthorizedException("User already exists with this email");
    }

    const totalUsers = await this.userModel.countDocuments();
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    let role = "Employee";
    let customPermissions: Record<string, string[]> = {};

    if (totalUsers === 0) {
      role = "SuperAdmin";
      customPermissions = PERMISSIONS[role];
    } else {
      role = registerDto.role || "Employee";
      customPermissions = PERMISSIONS[role] || {};
    }

    // const employeeId = `EMP${Date.now()}${Math.floor(Math.random() * 10000)}`;
    const employeeId = await this.genrateEmployeeid();
    const createdUser = new this.userModel({
      email: registerDto.email,
      password: hashedPassword,
      role,
      createdBy: creatorId,
      customPermissions,
      employeeId,
    });

    const savedUser = await createdUser.save();
    await this.emailService.sendUserCredentials(
      registerDto.email,
      registerDto.password
    );

    return {
      message: `${savedUser.role} registered successfully`,
      userId: savedUser._id,
      createdBy: savedUser.createdBy,
      role: savedUser.role,
      employeeId: savedUser.employeeId,
    };
  }

  async validateUser(
    email: string,
    pass: string
  ): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({
      email,
      isDeleted: { $ne: true },
    });

    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }

    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials or User not exists");
    }

    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role,
      customPermissions: user.customPermissions,
      employeeId: user.employeeId,
      name: user.firstName + " " + user.lastName,
      profileImage:user.profileImage
    };

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: "8h" }),
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        customPermissions: PERMISSIONS[user.role],
        employeeId: user.employeeId,
        name: user.firstName + " " + user.lastName,
        profileImage:user.profileImage
      },
    };
  }

  async updateCompleteProfile(userId: string, dto: UpdateCompleteProfileDto) {
    const { basicDetails, educationDetails, bankDetails } = dto;

    let paidLeaveAllowed = 0;
    let wfhAllowed = 0;

    const empType = basicDetails?.employmentType?.toLowerCase();

    if (empType === "full-time") {
      paidLeaveAllowed = 1.5;
      wfhAllowed = 1;
    } else if (empType === "intern") {
      paidLeaveAllowed = 0;
      wfhAllowed = 0;
    }

    const updateData = {
      ...basicDetails,
      ...educationDetails,
      ...bankDetails,
      paidLeaveAllowed,
      wfhAllowed,
    };

    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      throw new NotFoundException("User not found");
    }

    return updatedUser;
  }

  async findEmployeesOnly(userRole: string, showDeleted = false) {
    const baseQuery: any = {
      isDeleted: showDeleted ? true : { $ne: true }, // either get deleted users or active ones
    };

    if (userRole === "SuperAdmin") {
      baseQuery.role = { $nin: ["SuperAdmin"] };
    } else if (userRole === "Admin") {
      baseQuery.role = { $nin: ["SuperAdmin", "Admin"] };
    } else if (userRole === "HR") {
      baseQuery.role = { $nin: ["SuperAdmin", "Admin", "HR"] };
    }

    return this.userModel.find(baseQuery);
  }

  async findEmployeeById(userId: string , includeArchived  = false) {
    const user = await this.userModel.findById(userId);
    if (!user || (user.isDeleted && !includeArchived)) {
      throw new NotFoundException("User not found or deleted");
    }
    return user;
  }

  async updateProfile(userId: string, updateUserDto: UpdateCompleteProfileDto) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException("User not found");

    const flatUpdate = {
      ...(updateUserDto.basicDetails || {}),
      ...(updateUserDto.bankDetails || {}),
      ...(updateUserDto.educationDetails || {}),
    };

    Object.assign(user, flatUpdate);
    await user.save();

    return { message: "Profile updated successfully", user };
  }

  async updateProfileImage(userId: string, imageUrl: string) {
    return this.userModel.findByIdAndUpdate(
      userId,
      { profileImage: imageUrl },
      { new: true }
    );
  }

  async getProfileImage(userId: string) {
    const user = await this.userModel.findById(userId);
    return user?.profileImage;
  }

  async sendResetPasswordLink(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException("User not found");

    const token = this.jwtService.sign(
      { userId: user._id },
      {
        secret: process.env.JWT_RESET_SECRET,
        expiresIn: "10m",
      }
    );

    const resetLink = `http://localhost:3001/reset-password?token=${token}`;
    await this.emailService.sendResetLinkToEmail(email, resetLink);

    return { message: "Reset link sent successfully", token: token };
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_RESET_SECRET,
      });

      const user = await this.userModel.findById(payload.userId);
      if (!user) throw new NotFoundException("User not found");

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.userModel.findByIdAndUpdate(payload.userId, {
        password: hashedPassword,
      });

      return { message: "Password reset successfully" };
    } catch (err) {
      throw new BadRequestException("Invalid or expired token");
    }
  }

  async changePassword(
    token: string,
    newPassword: string,
    oldPassword: string
  ) {
    try {
      if (!token) {
        throw new BadRequestException("Invalid token or token missing");
      }

      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.userModel.findById(payload.userId);
      if (!user) throw new NotFoundException("User not found");

      if (oldPassword) {
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
          throw new BadRequestException("Old password is incorrect");
        }
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.userModel.findByIdAndUpdate(payload.userId, {
        password: hashedPassword,
      });

      return { message: "Password updated successfully" };
    } catch (err) {
      throw new BadRequestException("Invalid or expired token");
    }
  }

  async deleteUser(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException("User not found");
    if (user.isDeleted) {
      throw new BadRequestException("User already deleted");
    }
    user.isDeleted = true;
    await user.save();
    return { message: "User soft deleted successfully" };
  }

  // async requestDelete(userId: string, requestedById: string) {
  //   const existing = await this.deleteRequestModel.findOne({
  //     userId,
  //     requestedBy: requestedById,
  //     status: 'pending',
  //   });

  //   if (existing) {
  //     throw new BadRequestException('Delete request already pending');
  //   }

  //   const newRequest = new this.deleteRequestModel({
  //     userId,
  //     requestedBy: requestedById,
  //     status: 'pending',
  //   });

  //   await newRequest.save();
  //   return { message: 'Delete request submitted for approval' };
  // }
 
}
