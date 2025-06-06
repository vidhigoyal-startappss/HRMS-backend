// src/employee/employee.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './schemas/employee.schema';
import { EmployeeSummaryDto } from './dto/employee-summary.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private readonly employeeModel: Model<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    try {
      const { account, basicDetails, educationDetails, bankDetails } = createEmployeeDto;

      const hashedPassword = await bcrypt.hash(account.password, 10);

        account: {
        educationDetails,
        bankDetails,
      });

      return await employee.save();
    } catch (error) {
      console.error('Failed to save employee:', error);
      throw new Error('Internal Server Error while creating employee');
    }
  }

  async findAll(): Promise<EmployeeSummaryDto[]> {
    return this.employeeModel
      .find()
      .select(
        '_id account.email basicDetails.firstName basicDetails.lastName basicDetails.designation basicDetails.joiningDate basicDetails.employmentType basicDetails.gender'
      )
      .lean<EmployeeSummaryDto[]>()
      .exec();
  }

  async findOneByEmail(email: string): Promise<Employee | null> {
    return this.employeeModel.findOne({ "account.email": email }).exec();
  }

  async findById(id: string): Promise<Employee | null> {
    return this.employeeModel
      .findById(id)
      .select('-account.password') // Exclude password
      .lean<Employee>()
      .exec();
  }
}
