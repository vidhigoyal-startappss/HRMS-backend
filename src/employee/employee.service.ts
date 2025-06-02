import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Employee, EmployeeDocument } from "./employee.schema";
import { CreateEmployeeDto } from "./dto/create-employee.dto";

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  ) {}

  async upsert(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const { email, password, role, employeeDetails } = createEmployeeDto;

    if (!employeeDetails) {
      throw new BadRequestException("Employee details are required");
    }

    const { accountCreationDetails, bankDetails, educationDetails } = employeeDetails;

    if (!accountCreationDetails || !bankDetails || !educationDetails) {
      throw new BadRequestException(
        "Account creation, bank, and education details are required"
      );
    }

    const existing = await this.employeeModel.findOne({ email });

    if (existing) {
      existing.password = password;
      if (role) existing.role = role;

      // Ensure nested employeeDetails object exists
      if (!existing.employeeDetails) existing.employeeDetails = {} as any;

      // Update nested employeeDetails safely
      existing.employeeDetails.accountCreationDetails = accountCreationDetails;
      existing.employeeDetails.bankDetails = bankDetails;
      existing.employeeDetails.educationDetails = educationDetails;

      return await existing.save();
    }

    // Create new employee with nested employeeDetails
    return await this.employeeModel.create({
      email,
      password,
      role: role ?? "employee",
      employeeDetails: {
        accountCreationDetails,
        bankDetails,
        educationDetails,
      },
    });
  }
}
