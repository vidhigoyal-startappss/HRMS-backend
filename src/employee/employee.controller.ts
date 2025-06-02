import { Controller, Post, Body } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeService } from './employee.service';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('create')
  async createEmployee(@Body() dto: CreateEmployeeDto) {
    const employee = await this.employeeService.upsert(dto);
    return { message: 'Employee created/updated successfully', employee };
  }
}
