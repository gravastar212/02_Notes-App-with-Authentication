import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(password: string, hashed: string): Promise<boolean> {
  return await bcrypt.compare(password, hashed);
}

export function generateToken(payload: object): string {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not set in .env");
  }
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });
}

export function verifyToken(token: string): any {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not set in .env");
  }
  return jwt.verify(token, process.env.JWT_SECRET);
}