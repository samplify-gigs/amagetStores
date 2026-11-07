import { z } from 'zod';

export const registerSchema = z.object({
  first_name: z.string().min(2).max(100),
  last_name: z.string().min(2).max(100),
  email: z.email(),
  password: z.string().min(12).max(128),
});

export type RegisterDto = z.infer<typeof registerSchema>;


export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1, 'Password is required'),
});

export type LoginDto = z.infer<typeof loginSchema>;