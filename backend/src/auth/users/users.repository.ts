import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Role, User } from './users';
import { Pool } from 'pg';

interface UserRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  email_verified: boolean;
  roles: Role;
  password_hash: string | null;
}

interface UserReturnRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  email_verified: boolean;
  role: Role;
}

interface EmailResend {
  email: string;
}

@Injectable()
export class UsersRepository {
  constructor(@Inject('PG_POOL') private readonly db: Pool) {}

  // CREATE USER
  async createUser(
    first_name: string,
    last_name: string,
    email: string,
    password_hash: string,
    verify_token_hash: string,
    verify_token_expires_at: Date,
  ) {
    try {
      const result = await this.db.query<UserReturnRow>(
        `INSERT INTO new_users (
        first_name,
        last_name,
        email,
        password_hash,
        verify_token_hash,
        verify_token_expires_at
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, first_name, last_name, email, email_verified, role`,
        [
          first_name,
          last_name,
          email,
          password_hash,
          verify_token_hash,
          verify_token_expires_at,
        ],
      );

      const user = result.rows[0];

      return {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        email_verified: user.email_verified,
        role: user.role,
      };
    } catch (error: any) {
      // 23505 = duplicate email (unique constraint)
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      }

      throw new InternalServerErrorException('Failed to create user');
    }
  }

  // verify new user email
  async verifyEmail(tokenHash: string): Promise<boolean> {
    const result = await this.db.query(
      `UPDATE new_users
     SET email_verified = TRUE,
         verify_token_hash = NULL,
         verify_token_expires_at = NULL,
         updated_at = NOW()
     WHERE verify_token_hash = $1
       AND verify_token_expires_at > NOW()
       AND email_verified = FALSE`,
      [tokenHash],
    );

    return result.rowCount === 1;
  }

  // update verification token new user

  async updateVerificationToken(
    email: string,
    tokenHash: string,
    expiresAt: Date,
  ) {
    const result = await this.db.query<EmailResend>(
      `UPDATE new_users
     SET verify_token_hash = $1,
         verify_token_expires_at = $2,
         updated_at = NOW()
     WHERE email = $3
       AND email_verified = FALSE
     RETURNING email`,
      [tokenHash, expiresAt, email],
    );

    return result.rows[0] ?? null;
  }
  // FIND USER BY ID
  async findById(id: string): Promise<User | null> {
    const result = await this.db.query<UserRow>(
      `SELECT id, first_name, last_name, email, email_verified, roles
       FROM new_users
       WHERE id = $1`,
      [id],
    );

    const row = result.rows[0];

    if (!row) {
      return null;
    }

    return this.toUser(row);
  }

  // FIND USER BY EMAIL
  async findByEmail(email: string): Promise<User | null> {
    const result = await this.db.query<UserRow>(
      `SELECT id, first_name, last_name, email, email_verified, role
       FROM new_users
       WHERE email = $1`,
      [email.trim().normalize('NFC').toLowerCase()],
    );

    const row = result.rows[0];

    if (!row) {
      return null;
    }

    return this.toUser(row);
  }

  // FIND USER CREDENTIALS FOR SIGN IN
  async findCredentials(email: string): Promise<UserRow | null> {
    const result = await this.db.query<UserRow>(
      `SELECT id, first_name, last_name, email,
       email_verified, role, password_hash
        FROM new_users
        WHERE email = $1`,
      [email.trim().normalize('NFC').toLowerCase()],
    );

    return result.rows[0] ?? null;
  }

  // UPDATE PASSWORD
  async updatePassword(id: string, password: string): Promise<boolean> {
    const result = await this.db.query(
      `UPDATE new_users
       SET password = $1
       WHERE id = $2`,
      [password, id],
    );

    return result.rowCount !== null && result.rowCount > 0;
  }

  // UPDATE EMAIL
  async updateEmail(id: string, email: string): Promise<boolean> {
    const result = await this.db.query(
      `UPDATE new_users
       SET email = $1
       WHERE id = $2`,
      [email.trim().normalize('NFC').toLowerCase(), id],
    );

    return result.rowCount !== null && result.rowCount > 0;
  }

  //reset password

  async createPasswordResetToken(
    userId: string,
    tokenHash: string,
    expiresAt: Date,
  ) {
    await this.db.query(
      `INSERT INTO password_reset_tokens
      (user_id, token_hash, expires_at)
     VALUES ($1, $2, $3)`,
      [userId, tokenHash, expiresAt],
    );
  }

  async resetPassword(tokenHash: string, passwordHash: string) {
    const client = await this.db.connect();

    try {
      await client.query('BEGIN');

      const tokenResult = await client.query(
        `SELECT user_id
       FROM password_reset_tokens
       WHERE token_hash = $1
         AND expires_at > NOW()
         AND used_at IS NULL
       FOR UPDATE`,
        [tokenHash],
      );

      const token = tokenResult.rows[0];

      if (!token) {
        await client.query('ROLLBACK');
        return false;
      }

      const updateResult = await client.query(
        `UPDATE new_users
       SET password = $1
       WHERE id = $2
         AND password IS NOT NULL`,
        [passwordHash, token.user_id],
      );

      if (updateResult.rowCount !== 1) {
        await client.query('ROLLBACK');
        return false;
      }

      await client.query(
        `UPDATE password_reset_tokens
       SET used_at = NOW()
       WHERE token_hash = $1`,
        [tokenHash],
      );

      await client.query('COMMIT');

      return true;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async invalidatePasswordResetTokens(userId: string) {
    await this.db.query(
      `UPDATE password_reset_tokens
     SET used_at = NOW()
     WHERE user_id = $1
       AND used_at IS NULL`,
      [userId],
    );
  }

  // find google user

  async findGoogleUser(googleId: string): Promise<User | null> {
    const result = await this.db.query<UserRow>(
      `SELECT u.id, u.first_name, u.last_name, u.email,
            u.email_verified, u.roles
     FROM new_users u
     INNER JOIN user_identities ui ON ui.user_id = u.id
     WHERE ui.provider = $1
     AND ui.provider_user_id = $2`,
      ['google', googleId],
    );

    const row = result.rows[0];

    if (!row) return null;

    return {
      id: row.id,
      first_name: row.first_name,
      last_name: row.last_name,
      email: row.email,
      email_verified: row.email_verified,
      roles: [row.roles],
    };
  }

  // create google user
  async createGoogleUser(
    first_name: string,
    last_name: string,
    email: string,
    googleId: string,
  ): Promise<User> {
    const client = await this.db.connect();

    try {
      await client.query('BEGIN');

      const userResult = await client.query<UserRow>(
        `INSERT INTO new_users
        (first_name, last_name, email, password, email_verified)
       VALUES ($1, $2, $3, NULL, TRUE)
       RETURNING id, first_name, last_name, email, email_verified, roles`,
        [first_name, last_name, email],
      );

      const user = userResult.rows[0];

      await client.query(
        `INSERT INTO user_identities
        (user_id, provider, provider_user_id)
       VALUES ($1, $2, $3)`,
        [user.id, 'google', googleId],
      );

      await client.query('COMMIT');

      return {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        email_verified: user.email_verified,
        roles: [user.roles],
      };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // CONVERT DATABASE ROW TO USER
  private toUser(row: UserRow): User {
    return {
      id: row.id,
      first_name: row.first_name,
      last_name: row.last_name,
      email: row.email,
      email_verified: row.email_verified,
      roles: [row.roles],
    };
  }
}
