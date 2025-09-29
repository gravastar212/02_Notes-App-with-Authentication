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
  const secret = process.env.JWT_SECRET || 'fallback-secret-for-testing';
  return jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  } as jwt.SignOptions);
}

export function verifyToken(token: string): any {
  const secret = process.env.JWT_SECRET || 'fallback-secret-for-testing';
  return jwt.verify(token, secret);
}