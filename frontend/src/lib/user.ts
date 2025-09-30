import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

export function getUserFromToken(token: string | null) {
  if (!token) return null;
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded;
  } catch {
    return null;
  }
}