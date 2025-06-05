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

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
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
    const user = new this.userModel({ email, password: hashedPassword });
    await user.save();

    return { message: "SuperAdmin created successfully" };
  }

  async login(email: string, password: string) {
    console.log("login called inside");
    const user = await this.userModel.findOne({ email });
    console.log(user);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
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
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
