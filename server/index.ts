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
