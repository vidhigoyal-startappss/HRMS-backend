import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  UseGuards,
  Param,
} from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Employee } from "./schemas/employee.schema";

@Controller("employee")
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  // 🔐 Create new employee
  @UseGuards(JwtAuthGuard)
  @Post("create")
  async create(@Body() dto: CreateEmployeeDto): Promise<Employee> {
    return this.employeeService.create(dto);
  }

  // 🔐 Fetch all employees (summary)
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<
    {
      _id: string;
      account: { email: string };
      basicDetails: {
        firstName: string;
        lastName: string;
        designation: string;
        joiningDate: string;
        employmentType: string;
        gender: string;
      };
    }[]
  > {
    return this.employeeService.findAll();
  }

  // 🔐 Get employee by ID (full details except password)
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async getById(@Param("id") id: string): Promise<Employee> {
    const employee = await this.employeeService.findById(id);
    if (!employee) {
      throw new Error("Employee not found");
    }
    return employee;
  }

  // 🔐 Update employee by ID
  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  async update(
    @Param("id") id: string,
    @Body() dto: UpdateEmployeeDto
  ): Promise<Employee> {
    return this.employeeService.update(id, dto);
  }
}
