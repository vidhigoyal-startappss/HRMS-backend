import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { User, UserDocument } from "./user.schema";
import {
  Employee,
  EmployeeDocument,
} from "src/employee/schemas/employee.schema";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Employee.name)
    private employeeModel: Model<EmployeeDocument>,
    private jwtService: JwtService,
  ) {}

  async signup(email: string, password: string) {
    const users = await this.userModel.find();
    if (users.length > 0) {
      throw new BadRequestException(
        "Signup disabled. SuperAdmin already exists.",
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "superadmin",
    });
    await user.save();

    return { message: "SuperAdmin created successfully" };
  }

  async login(email: string, password: string) {
  const normalizedEmail = email.toLowerCase();

  // 1. Try logging in as superadmin/admin from User model
  let user = await this.userModel.findOne({ email: normalizedEmail });

  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = {
      sub: user._id,
      email: isEmployee ? user.account.email : user.email,
      role: isEmployee ? user.account.role : user.role,
    };

    const token = this.jwtService.sign(payload);
    return {
      message: `${payload.role} login successful`,
      token,
      user: {
        id: user._id,
        email: payload.email,
        role: payload.role,
      },
    };
  }

  // 2. Try logging in as employee
  const employee = await this.employeeModel.findOne({ 'account.email': normalizedEmail });
  if (!employee) {
    throw new UnauthorizedException("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, employee.account.password);
  if (!isPasswordValid) {
    throw new UnauthorizedException("Invalid credentials");
  }

  const payload = {
    sub: employee._id,
    email: employee.account.email,
    role: employee.account.role,
  };

  const token = this.jwtService.sign(payload);

  return {
    message: `${employee.account.role} login successful`,
    token,
    user: {
      id: employee._id,
      email: employee.account.email,
      role: employee.account.role,
    },
  };
}