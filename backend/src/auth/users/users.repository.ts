import { Inject, Injectable } from '@nestjs/common';
import { Role, User } from './users';
import { Pool } from 'pg';

interface UserRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  email_verified: boolean;
  roles: Role;
  password: string | null;
}

@Injectable()
export class UsersRepository {
  constructor(@Inject('PG_POOL') private readonly db: Pool) {}

  // CREATE USER
  async createUser(
    first_name: string,
    last_name: string,
    email: string,
    password: string | null,
  ): Promise<User> {
    const result = await this.db.query<UserRow>(
      `INSERT INTO new_users (
        first_name,
        last_name,
        email,
        password
      )
      VALUES ($1, $2, $3, $4)
      RETURNING id, first_name, last_name, email, email_verified, roles`,
      [
        first_name,
        last_name,
        email.trim().normalize('NFC').toLowerCase(),
        password,
      ],
    );

    const row = result.rows[0];

    if (result.rowCount === 0) {
      throw new Error('User could not be created');
    }

    return this.toUser(row);
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
      `SELECT id, first_name, last_name, email, email_verified, roles
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
      `SELECT id, first_name, last_name, email, email_verified, roles, password
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
