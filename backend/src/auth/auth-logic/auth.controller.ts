import { Body, Controller, Post, Res } from '@nestjs/common';

import type { Response } from 'express';

import { AuthService } from './auth.service';
import {
  registerSchema,
  loginSchema,
  type RegisterDto,
  type LoginDto,
} from '../../zod/zod.auth';

import { ZodValidationPipe } from '../../zod/zod.validation';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body(new ZodValidationPipe(registerSchema))
    body: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.register(body);

    response.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });

    return {
      message: 'Registration successful',
      user: result.user,
    };
  }

  @Post('login')
  async login(
    @Body(new ZodValidationPipe(loginSchema))
    body: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.login(body);

    response.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });

    return {
      message: 'Login successful',
      user: result.user,
    };
  }
}
