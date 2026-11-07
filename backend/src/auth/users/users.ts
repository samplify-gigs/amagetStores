export type Role = 'customer' | 'staff' | 'admin';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  email_verified: boolean;
  roles: Role[];
}
