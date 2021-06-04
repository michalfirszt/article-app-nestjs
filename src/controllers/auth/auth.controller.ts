import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from '../../services';
import { JwtAuthGuard } from '../../modules/auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Request() req) {
    const userData = {
      name: req.query.name,
      email: req.query.email,
      password: req.query.password,
    };

    return this.authService.register(userData);
  }

  @Post('login')
  async login(@Request() req) {
    const { email, password } = req.query;
    const user = await this.authService.validateUser(email, password);

    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Request() req) {
    return req.user;
  }
}
