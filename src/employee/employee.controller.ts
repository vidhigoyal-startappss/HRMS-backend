// src/employee/employee.controller.ts
import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Employee } from './schemas/employee.schema';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateEmployeeDto): Promise<Employee> {
    return this.employeeService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }
}
