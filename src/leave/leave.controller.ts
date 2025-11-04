import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { LeaveService } from "./leave.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import {
  ApiBody,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiParam,
} from "@nestjs/swagger";
import {
  ApplyLeaveDto,
  applyLeaveResponse,
  LeaveResponse,
  updateResponse,
  updateStatusDTO,
} from "./dto/apply-leave.dto";
import {
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";

@Controller("leaves")
@UseGuards(JwtAuthGuard)
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @ApiBody({ type: ApplyLeaveDto })
  @ApiCreatedResponse({ type: applyLeaveResponse })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("HR", "Admin", "Employee")
  @Post("apply")
  async applyLeave(@Req() req: any, @Body() body: any) {
    return this.leaveService.applyLeave(req.user, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("HR", "Admin", "SuperAdmin", "Employee")
  @ApiOkResponse({ type: LeaveResponse })
  @Get()
  async getLeaves(@Req() req: any) {
    return this.leaveService.fetchLeaves(req.user);
  }

  @ApiOkResponse({ type: LeaveResponse })
  @Get()
  async getAllEmployeeLeaves(@Req() req: any) {
    return this.leaveService.fetchLeaves(req.user);
  }

  @ApiBody({ type: updateStatusDTO })
  @ApiParam({ name: "id" })
  @Patch("status/:id")
  @ApiOkResponse({ type: updateResponse })
  async updateStatus(
    @Req() req: any,
    @Param("id") id: string,
    @Body("status") status: string
  ) {
    return this.leaveService.updateLeaveStatus(req.user, id, status);
  }

  @ApiParam({ name: "id" })
  @ApiOkResponse({ description: "Leave deleted successfully" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("HR", "Admin", "SuperAdmin", "Employee")
  @Delete(":id")
  async deleteLeave(@Req() req: any, @Param("id") id: string) {
    console.log("Delete leave called");
    console.log("User from request:", req.user);

    const result = await this.leaveService.deleteLeave(req.user, id);

    return result;
  }
}
