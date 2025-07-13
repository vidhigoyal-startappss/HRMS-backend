import { Controller, Get, Post, Body, Param, Patch, Delete, Req, UseGuards } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('payrolls')
@UseGuards(JwtAuthGuard)
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  @Post()
  async create(@Body() createPayrollDto: CreatePayrollDto) {
    return this.payrollService.createPayroll(createPayrollDto);
  }

  @Get()
  async findAll(@Req() req) {
    return this.payrollService.findAll(req.user);
  }

  @Get(':id')
  async findOne(@Req() req, @Param('id') id: string) {
    return this.payrollService.findOne(req.user, id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePayrollDto: UpdatePayrollDto) {
    return this.payrollService.updatePayroll(id, updatePayrollDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.payrollService.deletePayroll(id);
  }
}
