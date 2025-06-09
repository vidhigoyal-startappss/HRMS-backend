import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
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
      console.error('Failed to save employee:', error);
      throw new Error('Internal Server Error while creating employee');
    }
  }

  async findAll(): Promise<EmployeeSummaryDto[]> {
    return this.employeeModel
      .find()
      .select(
        '_id account.email basicDetails.firstName basicDetails.lastName basicDetails.designation basicDetails.joiningDate basicDetails.employmentType basicDetails.gender',
      )
      .lean<EmployeeSummaryDto[]>()
      .exec();
  }

  async findOneByEmail(email: string): Promise<Employee | null> {
    return this.employeeModel.findOne({ 'account.email': email }).exec();
  }

  async findById(id: string): Promise<Employee | null> {
    return this.employeeModel
      .findById(id)
      .select('-account.password') // Exclude password
      .lean<Employee>()
      .exec();
  }

  async update(id: string, updateDto: UpdateEmployeeDto): Promise<Employee> {
    const updateData: any = {
      account: {
        ...updateDto.account,
      },
      basicDetails: updateDto.basicDetails,
      educationDetails: updateDto.educationDetails,
      bankDetails: updateDto.bankDetails,
    };

    if (updateDto.account?.password) {
      updateData.account.password = await bcrypt.hash(updateDto.account.password, 10);
    } else {
      delete updateData.account.password;
    }

    const updated = await this.employeeModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .select('-account.password')
      .exec();

    if (!updated) {
      throw new Error('Employee not found for update');
    }

    return updated;
  }
}
