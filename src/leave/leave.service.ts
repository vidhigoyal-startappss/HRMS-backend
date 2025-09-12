import {
  Injectable,
  ForbiddenException,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Leave, LeaveDocument } from "./schemas/leave.schema";
import { User, UserDocument } from "../auth/schemas/user.schema";
import mongoose from "mongoose";
import { NotificationService } from "src/notification/notification.service";
import { Cron, CronExpression } from "@nestjs/schedule";
import { Logger } from "@nestjs/common";
import { Types } from "mongoose";
@Injectable()
export class LeaveService {
  private readonly logger = new Logger(LeaveService.name);
  constructor(
    @InjectModel(Leave.name) private leaveModel: Model<LeaveDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly notificationService: NotificationService
  ) {}
  private calculateLeaveDays(
    startDate: Date,
    endDate: Date,
    dayType: string
  ): number {
    if (dayType?.toLowerCase() === "halfday") return 0.5;

    const start = new Date(startDate);
    const end = new Date(endDate);
    let count = 0;
    const current = new Date(start);

    while (current <= end) {
      const day = current.getDay();
      if (day !== 0 && day !== 6) {
        count++;
      }
      current.setDate(current.getDate() + 1);
    }

    return count;
  }
  async applyLeave(
    user: {
      userId: string;
      name: string;
      customPermissions: Record<string, string[]>;
    },
    data: any
  ) {
    const { startDate, endDate, dayType, leaveType } = data;

    const overlappingLeave = await this.leaveModel.findOne({
      userId: user.userId,
      $or: [
        {
          startDate: { $lte: endDate },
          endDate: { $gte: startDate },
        },
      ],
    });

    if (overlappingLeave) {
      throw new BadRequestException(
        "You already have a leave request for this date range"
      );
    }

    const noOfDays =
      dayType?.toLowerCase() === "halfday"
        ? 0.5
        : this.calculateLeaveDays(startDate, endDate, dayType);

    const leave = new this.leaveModel({
      ...data,
      endDate: dayType === "halfday" ? null : endDate,
      noOfDays,
      userId: user.userId,
      status: "Pending",
    });

    const savedLeave = await leave.save();
    await this.notificationService.notifyRoles(["HR", "Admin"], {
      title: "New Leave Request",
      message: `${user.name} has submitted a leave request from ${startDate} to ${endDate}.`,
      type: "action",
      relatedModule: "Leave",
    });

    return savedLeave;
  }

  async fetchLeaves(user: {
    userId: string;
    customPermissions: Record<string, string[]>;
  }) {
    if (!user.customPermissions["leaves"]?.includes("read")) {
      throw new ForbiddenException("You do not have permission to view leaves");
    }
    if (user.customPermissions["leaves"].includes("readAll")) {
      return this.leaveModel
        .find()
        .populate("userId", "firstName lastName email")
        .populate("approvedBy", "firstName lastName email")
        .sort({ createdAt: -1 })
        .exec();
    }
    return this.leaveModel
      .find({ userId: user.userId })
      .populate([
        { path: "approvedBy", select: "firstName lastName" },
        { path: "userId", select: "firstName lastName leaves" },
      ])
      .sort({ createdAt: -1 })
      .exec();
  }
z
  async updateLeaveStatus(
    user: { userId: string; customPermissions: Record<string, string[]> },
    id: string,
    status: string
  ) {
    const validStatuses = ["Pending", "Approved", "Rejected"];
    if (!validStatuses.includes(status)) {
      throw new BadRequestException(
        `Invalid status. Allowed values are: ${validStatuses.join(", ")}`
      );
    }

    if (!user.customPermissions["leaves"]?.includes("update")) {
      throw new ForbiddenException(
        "You do not have permission to update leave status"
      );
    }

    const leave = await this.leaveModel.findById(id);
    if (!leave) {
      throw new NotFoundException("Leave request not found");
    }

    let noOfDays = leave?.noOfDays;
    let paidDays = 0;
    let unpaidDays = 0;

    if (status === "Approved" && leave.status !== "Approved") {
      const userDoc = await this.userModel.findById(leave.userId);
      if (!userDoc) {
        throw new NotFoundException("User not found");
      }

      if (leave.leaveType === "work") {
        paidDays = 0;
        unpaidDays = 0;
      } else {
        const currentPlLeft = userDoc.leaves?.plLeft ?? 0;
        paidDays = Math.min(noOfDays, currentPlLeft);
        unpaidDays = noOfDays - paidDays;

        await this.userModel.updateOne(
          { _id: leave.userId },
          { $set: { "leaves.plLeft": currentPlLeft - paidDays } }
        );
      }

      leave.set({
        status: "Approved",
        noOfDays,
        paidDays,
        unpaidDays,
        approvedBy: new mongoose.Types.ObjectId(user.userId),
      });
    } else {
      leave.status = status;
    }

    await leave.save();
    const employee = await this.userModel.findById(leave.userId);
    const employeeName =
      employee?.firstName + " " + employee?.lastName || "an employee";
    await this.notificationService.create({
      recipient: new mongoose.Types.ObjectId(leave.userId),
      title: `Leave ${status}`,
      message: `Your leave request from ${leave.startDate ? leave.startDate.toDateString() : "N/A"} to ${leave.endDate ? leave.endDate.toDateString() : "N/A"} has been ${status.toLowerCase()}.`,
      type: "Leave",
    });
    await this.notificationService.notifyRoles(
      ["HR", "Admin"],
      {
        title: `Leave ${status} for ${employeeName}`,
        message: `Leave request for ${employeeName} from ${
          leave.startDate ? leave.startDate.toDateString() : "N/A"
        } to ${
          leave.endDate ? leave.endDate.toDateString() : "N/A"
        } was ${status.toLowerCase()} by another admin.`,
        type: "Leave",
      },
      user.userId
    );

    return leave;
  }
  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  async creditMonthlyLeaves() {
    this.logger.log("Running Monthly Leave Credit Cron");

    try {
      const users = await this.userModel.find({ role: "Employee" });
      const monthlyCredit = 1.5;
      const maxCarryForward = 30;

      for (const user of users) {
        const currentPlLeft = user.leaves?.plLeft ?? 0;
        const updatedBalance = Math.min(
          currentPlLeft + monthlyCredit,
          maxCarryForward
        );

        await this.userModel.updateOne(
          { _id: user._id },
          { $set: { "leaves.plLeft": updatedBalance } }
        );
        await this.notificationService.create({
          recipient: user._id as Types.ObjectId,
          title: "Monthly Leave Credit",
          message: `${monthlyCredit} paid leaves credited. New balance: ${updatedBalance}.`,
          type: "Leave",
        });
      }

      this.logger.log("Monthly Leave Credit Completed Successfully");
    } catch (error) {
      this.logger.error("Monthly Leave Credit Cron Failed", error);
    }
  }
}
