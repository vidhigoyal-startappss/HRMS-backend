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
    let user: any = await this.userModel.findOne({ email: email });
    let isEmployee = false;
    console.log(user);

    if (!user) {
      user = await this.employeeModel.findOne({
        "account.email": email,
      });
      isEmployee = true;
      console.log(user);
    }

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const hashedPassword = isEmployee ? user.account.password : user.password;
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

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
}
