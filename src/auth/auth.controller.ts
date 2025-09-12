import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  UseGuards,
  Req,
  Param,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  Delete,
  Query,
  HttpStatus,
  BadRequestException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { uploadToCloudinary } from "src/common/utils/cloudinary-upload";
import * as sharp from "sharp";
import { memoryStorage } from "multer";
import { AuthService } from "./auth.service";
import { RegisterDto,RegisterResponse } from "./dto/register.dto";
import { LoginDto, LoginResponse,MyResponse,getAllEmployeesResponse, getEmployee,userDeleteResponse,checkFirstUserResponse,FileUploadDTO,FileUploadResponse } from "./dto/login.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { UpdateCompleteProfileDto, UpdateCompleteResponse } from "./dto/update-complete-profile.dto";
import { Express } from "express";
import { Roles } from "./decorators/roles.decorator";
import { RolesGuard } from "./guards/roles.guard";
import {
  ChangePasswordResponse,
  ForgotPasswordDto,
  ForgotPasswordResponse,
  ResetPasswordDto,
  ResetPasswordResponse,
} from "./dto/forgot-reset-password.dto";
import { SelfOrRoleGuard } from "./guards/self-or-role.guard";
import { ChangePasswordDto } from "./dto/forgot-reset-password.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,ApiCreatedResponse,ApiParam ,ApiConsumes
} from "@nestjs/swagger";

@ApiBearerAuth()
@Controller("users")
@ApiTags("AuthController")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("first-user-check")
  @ApiOperation({ summary: "this is for check" })
  @ApiResponse({ status: 200, description: "Success" ,type:checkFirstUserResponse })

  async isFirstUser(): Promise<{ isFirst: boolean }> {
    const isFirst = await this.authService.isFirstUser();
    return { isFirst };
  }

  @ApiCreatedResponse({
    description:"User Creation Successfull",
    type:RegisterResponse 
  })
  @ApiBody({type:RegisterDto ,description :"user login schema should look like this"})
  @Post("register")
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  async register(@Req() req: any, @Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto, req.user?.userId);
  }


  //@ApiResponse({ status: 201, description: "User Profile successfully created" })
  @Post("complete-profile/:userId")
  @ApiParam({name : "userId" ,type:String,description:"id of user"})
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  async updateCompleteProfile(
    @Req() req: any,
    @Param("userId") userId: string,
    @Body() dto: UpdateCompleteProfileDto,
  ) {
    const targetUserId = userId || req.user.userId;
    return this.authService.updateCompleteProfile(targetUserId, dto);
  }

   @ApiOkResponse({
    description:"User login Successfull",
    type:LoginResponse
  })
  @Post("login")
  @HttpCode(200)
  @ApiBody({type:LoginDto ,description :"user login schema should look like this"})
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiOkResponse({
    description:"My User Data",
    type:MyResponse
  })
  @Get("me")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Req() req: any) {
    return {
      userId: req.user.userId,
      email: req.user.email,
      role: req.user.role,
      name: req.user.firstName,
      customPermissions: req.user.customPermissions,
      employeeId: req.user.employeeId,
    };
  }

  //@ApiResponse({ status: 200, description: "Get Employee by id" })
   @ApiOkResponse({
    description:"Get employee by Id",
    type:getEmployee
  })
  @UseGuards(JwtAuthGuard, RolesGuard, SelfOrRoleGuard)
  @Roles("Employee", "HR", "Admin", "SuperAdmin")
  @Get("employee/:id")
  @ApiParam({name:'id',type:String})
  @HttpCode(200)
  async getEmployeeById(@Param("id") id: string, @Query('archived') archived: string ) {
    const includeArchived = archived === 'true';
    return this.authService.findEmployeeById(id , includeArchived);
  }

  @Post("upload-profile/:userId")
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard)
  @ApiBody({type:FileUploadDTO})
  @ApiCreatedResponse({type:FileUploadResponse})
  @UseInterceptors(
    FileInterceptor("file", {
      storage: memoryStorage(),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
          return cb(new Error("Only image files are allowed!"), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    }),
  )
  async uploadProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
    @Param("userId") userId: string,
  ) {
    if (!file) {
      throw new BadRequestException("Image file is required");
    }

    const targetUserId = userId || req.user.userId;

    // Compress image
    const compressedBuffer = await sharp(file.buffer)
      .resize({ width: 500 })
      .jpeg({ quality: 70 })
      .toBuffer();

    // Upload to Cloudinary
    const uploadResult: any = await uploadToCloudinary(
      compressedBuffer,
      "profile-images",
    );
    const imageUrl = uploadResult.secure_url;

    await this.authService.updateProfileImage(targetUserId, imageUrl);

    return {
      message: "Profile image uploaded successfully",
      imageUrl,
    };
  }

  //@ApiResponse()
  @ApiCreatedResponse({
    description:"Update Employee by Id or Update the self details",
    type:UpdateCompleteResponse
  })
   @ApiBody({
    type:UpdateCompleteProfileDto
  })
  @UseGuards(JwtAuthGuard, RolesGuard, SelfOrRoleGuard)
  @Roles("Employee", "HR", "Admin", "SuperAdmin")
  @Patch("employee/:id")
  async updateProfile(
    @Param("id") userId: string,
    @Body() updateUserDto: UpdateCompleteProfileDto,
  ) {
    return this.authService.updateProfile(userId, updateUserDto);
  }

   @ApiOkResponse({
    description:"Get all employees",
    type:getAllEmployeesResponse
  })
  @UseGuards(JwtAuthGuard, RolesGuard, SelfOrRoleGuard)
  @Roles("HR", "Admin", "SuperAdmin")
  @Get("employees")
  async getEmployeesOnly(@Query("archived") archived: string, @Req() req) {
    const userRole = req?.user?.role;
    const showDeleted = archived === "true";
    return this.authService.findEmployeesOnly(userRole, showDeleted);
  }


  @Get("profile-image/:id")
  @ApiParam({name:"id"})
  @ApiOkResponse({type:FileUploadResponse})
  async getProfileImage(@Param("id") id: string) {
    const imageUrl = await this.authService.getProfileImage(id);
    return { imageUrl };
  }

  @ApiCreatedResponse({
    description:"reset link shared successfully",
    type:ForgotPasswordResponse,
  })

  @ApiBody({
    type:ForgotPasswordDto
  })
  @Post("forgot-password")
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.sendResetPasswordLink(body.email);
  } 
  
  
   @ApiCreatedResponse({
    description:"passsword reset successfully",
    type:ResetPasswordResponse
  })
   @ApiBody({
    type:ResetPasswordDto
  })
  @Post("reset-password")
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto.token, dto.newPassword);
  }

 @ApiCreatedResponse({
    description:"Change Password successfully Done",
    type:ChangePasswordResponse
  })
   @ApiBody({
    type:ChangePasswordDto
  })
  @Post("change-password")
  async changePassword(@Body() dto: ChangePasswordDto) {
    return this.authService.changePassword(
      dto.token,
      dto.newPassword,
      dto.oldPassword,
    );
  }


  @ApiOkResponse({type:userDeleteResponse})
  @ApiParam({name:"id"})
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SuperAdmin")
  @Delete("delete/:id")
  async softDeleteUser(@Param("id") id: string) {
    return this.authService.deleteUser(id);
  }
}
