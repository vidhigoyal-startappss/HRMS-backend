import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class UsersController {
  @Post('signup')
  signup(@Body() body: any) {
    return {
      message: 'Signup successful',
      user: body,
    };
  }
}
