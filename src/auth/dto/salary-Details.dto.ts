import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SalaryDetailsDto {
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 30000 })
  basicFixedMonthly?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 360000 })
  basicFixedYearly?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 15000 })
  hraFixedMonthly?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 180000 })
  hraFixedYearly?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 2000 })
  conveyanceMonthly?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 24000 })
  conveyanceYearly?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 5000 })
  dearnessAllowancesMonthly?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 60000 })
  dearnessAllowancesYearly?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 3000 })
  otherAllowancesMonthly?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 36000 })
  otherAllowancesYearly?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 55000 })
  annualGrossSalaryMonthly?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 660000 })
  annualGrossSalaryYearly?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 1800 })
  employerPFMonthly?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 21600 })
  employerPFYearly?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 65000 })
  totalFixedPayMonthly?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 780000 })
  totalFixedPayYearly?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 10000 })
  individualVariablePayMonthly?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 120000 })
  individualVariablePayYearly?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 900000 })
  totalCTCYearly?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 75000 })
  totalCTCMonthly?: number;
}
