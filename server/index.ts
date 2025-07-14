import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { authRoutes } from "./routes/auth";
import { teamRoutes } from "./routes/teams";
import { matchRoutes } from "./routes/matches";
import { userRoutes } from "./routes/users";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API info endpoint (for programmatic access)
  app.get("/api/info", (_req, res) => {
    res.json({
      message: "FootHeroes API",
      version: "1.0.0",
      endpoints: {
        auth: {
          register: "POST /api/auth/register",
          login: "POST /api/auth/login",
          logout: "POST /api/auth/logout",
          me: "GET /api/auth/me",
        },
        users: {
          profile: "GET /api/users/:id/profile",
          update: "PUT /api/users/:id",
          stats: "GET /api/users/:id/stats",
          matches: "GET /api/users/:id/matches",
        },
        teams: {
          list: "GET /api/teams",
          get: "GET /api/teams/:id",
          create: "POST /api/teams",
          join: "POST /api/teams/:id/join",
          leave: "POST /api/teams/:id/leave",
          matches: "GET /api/teams/:id/matches",
        },
        matches: {
          list: "GET /api/matches",
          get: "GET /api/matches/:id",
          create: "POST /api/matches",
          update: "PUT /api/matches/:id",
          delete: "DELETE /api/matches/:id",
        },
        leaderboard: {
          players: "GET /api/leaderboard",
          teams: "GET /api/leaderboard/teams",
        },
        dashboard: "GET /api/dashboard",
      },
    });
  });

  // Basic health check endpoints
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "FootHeroes API server is running!" });
  });

  app.get("/api/demo", handleDemo);

  // FootHeroes API routes
  app.use("/api/auth", authRoutes);
  app.use("/api/teams", teamRoutes);
  app.use("/api/matches", matchRoutes);
  app.use("/api/users", userRoutes);

  // Leaderboard endpoints
  app.get("/api/leaderboard", (req, res, next) => {
    req.url = "/leaderboard/players";
    return userRoutes(req, res, next);
  });

  app.get("/api/leaderboard/teams", (req, res, next) => {
    req.url = "/leaderboard/teams";
    return userRoutes(req, res, next);
  });

  // Dashboard endpoint
  app.get("/api/dashboard", (req, res, next) => {
    req.url = "/dashboard/data";
    return userRoutes(req, res, next);
  });

  return app;
}
