import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
  Inject,
  ForbiddenException,
} from '@nestjs/common';
import { randomBytes, createHash } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { UsersRepository } from '../users/users.repository';
import type {
  GoogleLoginDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
} from '../../zod/zod.auth';
import { OAuth2Client } from 'google-auth-library';
import { EmailService } from 'src/email/email.service';
import { Pool } from 'pg';

@Injectable()
export class AuthService {
  private readonly googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
  );
  constructor(
    @Inject('PG_POOL') private readonly db: Pool,
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  //register user
  async register(dto: RegisterDto) {
    // 1. Check if email already exists
    const existingUser = await this.usersRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(dto.password, 12);

    // 3. Generate secure verification token
    const verifyToken = randomBytes(32).toString('hex');

    // 4. Hash token before storing it
    const tokenHash = createHash('sha256').update(verifyToken).digest('hex');

    // 5. Set token expiry to 15 minutes
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // 6. Create user and save verification token
    const user = await this.usersRepository.createUser(
      dto.first_name,
      dto.last_name,
      dto.email,
      hashedPassword,
      tokenHash,
      expiresAt,
    );

    // 7. Generate verification URL
    const verifyUrl = `${process.env.FRONTEND_URL}/verify-acct?token=${encodeURIComponent(verifyToken)}`;

    // 8. Send welcome email
    await this.emailService.welcomeUserEmail(user.email, verifyUrl);

    return {
      message:
        'Registration successful. Please check your email to verify your account.',
      user,
    };
  }

  //login

  async login(dto: LoginDto) {
    // 1. Find user
    const user = await this.usersRepository.findCredentials(dto.email);

    if (!user || !user.password_hash) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // 2. Compare passwords
    const passwordMatch = await bcrypt.compare(
      dto.password,
      user.password_hash,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // 3. Check email verification
    if (!user.email_verified) {
      throw new ForbiddenException(
        'Please verify your email before logging in',
      );
    }

    // 4. Generate JWT
    const access_token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    return {
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        email_verified: user.email_verified,
        role: user.roles,
      },
      access_token,
    };
  }

  // verify email

  async verifyEmail(token: string) {
    const tokenHash = createHash('sha256').update(token).digest('hex');

    const verified = await this.usersRepository.verifyEmail(tokenHash);

    if (!verified) {
      throw new BadRequestException('Verification link is invalid or expired');
    }

    return {
      message: 'Email verified successfully. You can now log in.',
    };
  }

  //resend verification token

  async resendVerification(email: string) {
    const verifyToken = randomBytes(32).toString('hex');

    const tokenHash = createHash('sha256').update(verifyToken).digest('hex');

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    const user = await this.usersRepository.updateVerificationToken(
      email,
      tokenHash,
      expiresAt,
    );

    if (!user) {
      return {
        message: 'Account not found or email already verified.',
      };
    }

    const verifyUrl = `${process.env.FRONTEND_URL}/verify-acct?token=${encodeURIComponent(verifyToken)}`;

    await this.emailService.welcomeUserEmail(user.email, verifyUrl);

    return {
      message: 'A new verification link has been sent to your email.',
    };
  }

  //google direct login or signup
  private async verifyGoogleToken(credential: string) {
    console.log('google details:', credential);
    const ticket = await this.googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.sub || !payload.email) {
      throw new UnauthorizedException('Invalid Google account');
    }

    if (!payload.email_verified) {
      throw new UnauthorizedException('Google email is not verified');
    }

    return {
      google_id: payload.sub,
      email: payload.email,
      first_name: payload.given_name ?? '',
      last_name: payload.family_name ?? '',
      picture: payload.picture ?? null,
    };
  }

  async googleLogin(dto: GoogleLoginDto) {
    // 1. Verify Google's ID token
    const googleUser = await this.verifyGoogleToken(dto.credential);

    // 2. Check whether this Google account already exists
    let user = await this.usersRepository.findGoogleUser(googleUser.google_id);

    // 3. If it's a first-time user, create an account
    if (!user) {
      const existingEmail = await this.usersRepository.findByEmail(
        googleUser.email,
      );

      if (existingEmail) {
        throw new ConflictException(
          'An account with this email already exists. Please use your original sign-in method.',
        );
      }

      user = await this.usersRepository.createGoogleUser(
        googleUser.first_name,
        googleUser.last_name,
        googleUser.email,
        googleUser.google_id,
      );
    }

    // 4. Generate Amaget's JWT
    const access_token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    return {
      user,
      access_token,
    };
  }

  //forgot password

  async forgotPassword(email: string) {
    const user = await this.usersRepository.findCredentials(email);

    // Don't issue reset tokens for unknown or Google-only accounts.
    if (!user || !user.password_hash) {
      return {
        message: 'If an eligible account exists, a reset link will be sent.',
      };
    }

    // Generate a secure random token.
    const resetToken = randomBytes(32).toString('hex');

    // Store only its SHA-256 hash.
    const tokenHash = createHash('sha256').update(resetToken).digest('hex');

    // Token expires in 15 minutes.
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // Save the new token hash.
    await this.usersRepository.createPasswordResetToken(
      user.id,
      tokenHash,
      expiresAt,
    );

    // We'll send resetToken to the user's email in the next step.

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${encodeURIComponent(resetToken)}`;

    await this.emailService.sendPasswordResetEmail(user.email, resetUrl);

    return {
      message: 'If an eligible account exists, a reset link will be sent.',
    };
  }

  async createPasswordResetToken(
    userId: string,
    tokenHash: string,
    expiresAt: Date,
  ) {
    const client = await this.db.connect();

    try {
      await client.query('BEGIN');

      await client.query(
        `UPDATE password_reset_tokens
       SET used_at = NOW()
       WHERE user_id = $1
         AND used_at IS NULL`,
        [userId],
      );

      await client.query(
        `INSERT INTO password_reset_tokens
       (user_id, token_hash, expires_at)
       VALUES ($1, $2, $3)`,
        [userId, tokenHash, expiresAt],
      );

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async resetPassword(dto: ResetPasswordDto) {
    const tokenHash = createHash('sha256').update(dto.token).digest('hex');

    const passwordHash = await bcrypt.hash(dto.newPassword, 12);

    const success = await this.usersRepository.resetPassword(
      tokenHash,
      passwordHash,
    );

    if (!success) {
      throw new BadRequestException(
        'Password reset link is invalid, expired or already used',
      );
    }

    return {
      message: 'Password reset successful. You can now log in.',
    };
  }
}
