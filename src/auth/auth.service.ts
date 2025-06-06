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
import { Employee, EmployeeDocument } from "../employee/employee.schema";

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

    let user = await this.userModel.findOne({ email: normalizedEmail });
    if (!user) {
      user = await this.employeeModel.findOne({ email: normalizedEmail });
    }

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user?.password);
    console.log("<<<<<<<<", password);
    console.log("<<<<<<<<<<<", user?.password);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      console.log("<<<<<<inside password");
      throw new UnauthorizedException("Invalid credentials");
    }

    // ✅ Sign the JWT with sub, email, and role (if needed)
    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtService.sign(payload); // you can also use signAsync

    // ✅ This is important — the frontend expects a `token`
    return {
      message: `${user.role} login successful`,
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
