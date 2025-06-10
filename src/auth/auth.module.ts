import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { User, UserSchema } from "./user.schema";
import { JwtStrategy } from "./jwt.strategy";
<<<<<<< HEAD
import { Employee, EmployeeSchema } from "src/employee/schemas/employee.schema";
=======

// ✅ Import Employee model and schema
import { Employee, EmployeeSchema } from "../employee/schemas/employee.schema";

>>>>>>> 5f1b9e6f23c750f4adcac84eca3bad2ded0e3019
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Employee.name, schema: EmployeeSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || "hrms1234secret",
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
