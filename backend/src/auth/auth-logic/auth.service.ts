import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersRepository } from '../users/users.repository';
import type { LoginDto, RegisterDto } from '../../zod/zod.auth';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // Check if email already exists

    console.log('sign up details:', dto);

    const existingUser = await this.usersRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(dto.password, 12);

    // Create user
    const user = await this.usersRepository.createUser(
      dto.first_name,
      dto.last_name,
      dto.email,
      hashedPassword,
    );

    // Generate JWT
    const access_token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    console.log('user and accestoken:', user, access_token);

    return {
      user,
      access_token,
    };
  }

  async login(dto: LoginDto) {
    // Find user by email, including stored password hash
    console.log('login user:', dto);
    const user = await this.usersRepository.findCredentials(dto.email);

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Compare submitted password with stored hash
    const passwordMatch = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate access token
    const access_token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    console.log('acess_token', access_token);

    // Return user without password hash
    return {
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        email_verified: user.email_verified,
        roles: [user.roles],
      },
      access_token,
    };
  }
}
