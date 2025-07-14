import { Request, Response, NextFunction } from "express";
import { db } from "../database";
import { User } from "@shared/types";

// Simple token-based auth (in production, use proper JWT)
export function generateToken(): string {
  return Math.random().toString(36).substr(2) + Date.now().toString(36);
}

export function hashPassword(password: string): string {
  // In production, use bcrypt or similar
  return Buffer.from(password).toString("base64");
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// Auth middleware
export interface AuthenticatedRequest extends Request {
  user?: User;
}

export function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({
      success: false,
      error: "No token provided",
    });
    return;
  }

  const user = db.getUserByToken(token);
  if (!user) {
    res.status(401).json({
      success: false,
      error: "Invalid token",
    });
    return;
  }

  req.user = user;
  next();
}

export function optionalAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (token) {
    const user = db.getUserByToken(token);
    if (user) {
      req.user = user;
    }
  }

  next();
}
