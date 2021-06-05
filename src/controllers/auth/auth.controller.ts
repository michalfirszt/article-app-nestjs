import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from '../../services';
import { RegisterDto, LoginDto } from './auth.validation';
import { JwtAuthGuard } from '../../modules/auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Query() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Query() loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.authService.validateUser(email, password);

    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Req() request: Request) {
    return request.user;
  }
}
