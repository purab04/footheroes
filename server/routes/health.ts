import { Router } from "express";
import { db } from "../database";

const router = Router();

// Basic health check
router.get("/ping", (_req, res) => {
  res.json({
    success: true,
    message: "FootHeroes API is running!",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Comprehensive health check
router.get("/health", (_req, res) => {
  try {
    // Test database connectivity
    const users = db.getAllUsers();
    const teams = db.getAllTeams();
    const matches = db.getAllMatches();

    res.json({
      success: true,
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: "1.0.0",
      services: {
        database: {
          status: "operational",
          users: users.length,
          teams: teams.length,
          matches: matches.length,
        },
        api: {
          status: "operational",
        },
      },
      memory: {
        used:
          Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) /
          100,
        total:
          Math.round((process.memoryUsage().heapTotal / 1024 / 1024) * 100) /
          100,
      },
    });
  } catch (error) {
    console.error("Health check failed:", error);
    res.status(503).json({
      success: false,
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Database status
router.get("/status", (_req, res) => {
  try {
    const stats = db.getAllPlayerStats();
    const users = db.getAllUsers();
    const teams = db.getAllTeams();
    const matches = db.getAllMatches();

    res.json({
      success: true,
      data: {
        users: users.length,
        teams: teams.length,
        matches: matches.length,
        totalGoals: stats.reduce((acc, stat) => acc + stat.goals, 0),
        totalMatches: stats.reduce((acc, stat) => acc + stat.matchesPlayed, 0),
        activeTeams: teams.filter((team) => team.isRecruiting).length,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export { router as healthRoutes };
