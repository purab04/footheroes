import { Router } from "express";
import { z } from "zod";
import { db } from "../database";
import {
  generateToken,
  hashPassword,
  verifyPassword,
  requireAuth,
  AuthenticatedRequest,
} from "../auth";
import {
  CreateUserRequest,
  LoginRequest,
  AuthResponse,
  RegisterResponse,
  LoginResponse,
  GetUserResponse,
} from "@shared/api";

const router = Router();

// Validation schemas
const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(20),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  password: z.string().min(6),
  position: z.enum(["goalkeeper", "defender", "midfielder", "forward", "any"]),
  skillLevel: z.enum(["beginner", "intermediate", "advanced", "professional"]),
  location: z.string().min(1),
  bio: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Register
router.post("/register", async (req, res) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    // Check if user already exists
    const existingEmail = db.getUserByEmail(validatedData.email);
    if (existingEmail) {
      const response: RegisterResponse = {
        success: false,
        error: "User with this email already exists",
      };
      return res.status(400).json(response);
    }

    const existingUsername = db.getUserByUsername(validatedData.username);
    if (existingUsername) {
      const response: RegisterResponse = {
        success: false,
        error: "Username already taken",
      };
      return res.status(400).json(response);
    }

    // Create user
    const { password, ...userData } = validatedData;
    const hashedPassword = hashPassword(password);

    const user = db.createUser({
      ...userData,
      // Store hashed password in a real implementation
      // For now, we'll just store it in the user object (not recommended)
    });

    // Generate token
    const token = generateToken();
    db.createSession(token, user.id);

    const authData: AuthResponse = {
      user,
      token,
    };

    const response: RegisterResponse = {
      success: true,
      data: authData,
      message: "User registered successfully",
    };

    res.status(201).json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const response: RegisterResponse = {
        success: false,
        error:
          "Validation error: " + error.errors.map((e) => e.message).join(", "),
      };
      return res.status(400).json(response);
    }

    const response: RegisterResponse = {
      success: false,
      error: "Internal server error",
    };
    res.status(500).json(response);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const user = db.getUserByEmail(validatedData.email);
    if (!user) {
      const response: LoginResponse = {
        success: false,
        error: "Invalid email or password",
      };
      return res.status(401).json(response);
    }

    // In a real implementation, verify the hashed password
    // For now, we'll accept any password for demo purposes
    const isValidPassword = true; // verifyPassword(validatedData.password, user.hashedPassword);

    if (!isValidPassword) {
      const response: LoginResponse = {
        success: false,
        error: "Invalid email or password",
      };
      return res.status(401).json(response);
    }

    // Generate token
    const token = generateToken();
    db.createSession(token, user.id);

    const authData: AuthResponse = {
      user,
      token,
    };

    const response: LoginResponse = {
      success: true,
      data: authData,
      message: "Login successful",
    };

    res.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const response: LoginResponse = {
        success: false,
        error:
          "Validation error: " + error.errors.map((e) => e.message).join(", "),
      };
      return res.status(400).json(response);
    }

    const response: LoginResponse = {
      success: false,
      error: "Internal server error",
    };
    res.status(500).json(response);
  }
});

// Logout
router.post("/logout", requireAuth, (req: AuthenticatedRequest, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (token) {
    db.deleteSession(token);
  }

  res.json({
    success: true,
    message: "Logged out successfully",
  });
});

// Get current user
router.get("/me", requireAuth, (req: AuthenticatedRequest, res) => {
  const response: GetUserResponse = {
    success: true,
    data: req.user!,
  };
  res.json(response);
});

export { router as authRoutes };
