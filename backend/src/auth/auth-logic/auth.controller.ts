import { Body, Controller, Post, Res } from '@nestjs/common';

import type { Response } from 'express';

import { AuthService } from './auth.service';
import {
  registerSchema,
  loginSchema,
  type RegisterDto,
  type LoginDto,
  googleLoginSchema,
  type GoogleLoginDto,
  resetPasswordSchema,
  type ResetPasswordDto,
  forgotPasswordSchema,
  type ForgotPasswordDto,
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

  //google direct login
  @Post('google')
  async googleLogin(
    @Body(new ZodValidationPipe(googleLoginSchema))
    body: GoogleLoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.googleLogin(body);

    response.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });

    return {
      message: 'Google authentication successful',
      user: result.user,
    };
  }


  @Post('forgot-password')
async forgotPassword(
  @Body(new ZodValidationPipe(forgotPasswordSchema))
  body: ForgotPasswordDto,
) {
  return this.authService.forgotPassword(body.email);
}

@Post('reset-password')
async resetPassword(
  @Body(new ZodValidationPipe(resetPasswordSchema))
  body: ResetPasswordDto,
) {
  return this.authService.resetPassword(body);
}
}
