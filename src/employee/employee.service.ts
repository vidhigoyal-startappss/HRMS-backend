// src/employee/employee.service.ts
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcryptjs";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { Employee, EmployeeDocument } from "./schemas/employee.schema";

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    try {
      const { account, basicDetails, educationDetails, bankDetails } =
        createEmployeeDto;

      const hashedPassword = await bcrypt.hash(account.password, 10);

      const employee = new this.employeeModel({
        account: {
          ...account,
          password: hashedPassword,
        },
        basicDetails,
        educationDetails,
        bankDetails,
      });

      return await employee.save();
    } catch (error) {
      console.error("Failed to save employee:", error);
      throw new Error("Internal Server Error while creating employee");
    }
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  async findOneByEmail(email: string): Promise<Employee | null> {
    return this.employeeModel.findOne({ "account.email": email }).exec();
  }
}
