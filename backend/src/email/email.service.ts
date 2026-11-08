import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private readonly resend: Resend;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      throw new Error('RESEND_API_KEY is missing');
    }

    this.resend = new Resend(apiKey);
  }

  //sign up welcome and verify email

  async welcomeUserEmail(to: string, verifyUrl: string) {
    const { error } = await this.resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: 'samplifygigs@gmail.com',
      subject: 'Welcome to amaget',
      html: `
        <h2>Kindly verify your account</h2>
        <p>We are glad to have you here at amaget</p>
        <p>Click the link below to verify your account:</p>
        <a href="${verifyUrl}">verify</a>
        <p>This link expires in 15 minutes.</p>
        <p>If you didn't request this, you can ignore this email.</p>
      `,
    });

    if (error) {
      console.error('resend error:', error);
      throw new Error(error.message);
    }
  }

  //password reset email
  async sendPasswordResetEmail(to: string, resetUrl: string) {
    const { error } = await this.resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to,
      subject: 'Reset your Amaget password',
      html: `
        <h2>Password Reset</h2>
        <p>We received a request to reset your Amaget password.</p>
        <p>Click the link below to choose a new password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link expires in 15 minutes.</p>
        <p>If you didn't request this, you can ignore this email.</p>
      `,
    });

    if (error) {
      throw new Error(error.message);
    }
  }
}
