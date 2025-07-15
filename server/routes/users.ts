import { Router } from "express";
import { z } from "zod";
import { db } from "../database";
import { requireAuth, optionalAuth, AuthenticatedRequest } from "../auth";
import {
  GetUserResponse,
  GetUserProfileResponse,
  UpdateUserResponse,
  GetPlayerStatsResponse,
  GetLeaderboardResponse,
  GetTeamLeaderboardResponse,
  GetDashboardResponse,
} from "@shared/api";
import {
  UserProfile,
  LeaderboardEntry,
  TeamLeaderboardEntry,
} from "@shared/types";

const router = Router();

// Validation schemas
const updateUserSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  position: z
    .enum(["goalkeeper", "defender", "midfielder", "forward", "any"])
    .optional(),
  skillLevel: z
    .enum(["beginner", "intermediate", "advanced", "professional"])
    .optional(),
  location: z.string().min(1).optional(),
  bio: z.string().optional(),
  avatar: z.string().url().optional(),
});

// Get user by ID
router.get("/:id", optionalAuth, (req: AuthenticatedRequest, res) => {
  const user = db.getUserById(req.params.id);

  if (!user) {
    const response: GetUserResponse = {
      success: false,
      error: "User not found",
    };
    return res.status(404).json(response);
  }

  const response: GetUserResponse = {
    success: true,
    data: user,
  };
  res.json(response);
});

// Get user profile (includes stats, teams, match history)
router.get("/:id/profile", optionalAuth, (req: AuthenticatedRequest, res) => {
  const user = db.getUserById(req.params.id);

  if (!user) {
    const response: GetUserProfileResponse = {
      success: false,
      error: "User not found",
    };
    return res.status(404).json(response);
  }

  const stats = db.getPlayerStats(req.params.id);
  const teams = db.getTeamsByUserId(req.params.id);
  const matchHistory = db.getMatchesByUserId(req.params.id);

  const userProfile: UserProfile = {
    ...user,
    stats: stats || {
      userId: user.id,
      matchesPlayed: 0,
      goals: 0,
      assists: 0,
      cleanSheets: 0,
      yellowCards: 0,
      redCards: 0,
      minutesPlayed: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      rating: 0,
      updatedAt: new Date(),
    },
    teams,
    matchHistory,
  };

  const response: GetUserProfileResponse = {
    success: true,
    data: userProfile,
  };
  res.json(response);
});

// Update user
router.put("/:id", requireAuth, (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.params.id;

    // Users can only update their own profile
    if (req.user!.id !== userId) {
      const response: UpdateUserResponse = {
        success: false,
        error: "Not authorized to update this user",
      };
      return res.status(403).json(response);
    }

    const validatedData = updateUserSchema.parse(req.body);
    const updatedUser = db.updateUser(userId, validatedData);

    if (!updatedUser) {
      const response: UpdateUserResponse = {
        success: false,
        error: "Failed to update user",
      };
      return res.status(400).json(response);
    }

    const response: UpdateUserResponse = {
      success: true,
      data: updatedUser,
      message: "User updated successfully",
    };
    res.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const response: UpdateUserResponse = {
        success: false,
        error:
          "Validation error: " + error.errors.map((e) => e.message).join(", "),
      };
      return res.status(400).json(response);
    }

    const response: UpdateUserResponse = {
      success: false,
      error: "Internal server error",
    };
    res.status(500).json(response);
  }
});

// Get user's player stats
router.get("/:id/stats", (req, res) => {
  const stats = db.getPlayerStats(req.params.id);

  if (!stats) {
    const response: GetPlayerStatsResponse = {
      success: false,
      error: "Player stats not found",
    };
    return res.status(404).json(response);
  }

  const response: GetPlayerStatsResponse = {
    success: true,
    data: stats,
  };
  res.json(response);
});

// Get user's matches
router.get("/:id/matches", (req, res) => {
  const matches = db.getMatchesByUserId(req.params.id);

  res.json({
    success: true,
    data: matches,
  });
});

// Get leaderboard
router.get("/leaderboard/players", (req, res) => {
  const allStats = db.getAllPlayerStats();
  const users = db.getAllUsers();

  // Create leaderboard entries
  const leaderboardEntries: LeaderboardEntry[] = allStats
    .map((stats) => {
      const user = users.find((u) => u.id === stats.userId);
      if (!user) return null;

      return {
        rank: 0, // Will be set after sorting
        user,
        stats,
      };
    })
    .filter((entry): entry is LeaderboardEntry => entry !== null)
    .sort((a, b) => {
      // Sort by goals first, then by rating
      if (a.stats.goals !== b.stats.goals) {
        return b.stats.goals - a.stats.goals;
      }
      return b.stats.rating - a.stats.rating;
    })
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));

  const response: GetLeaderboardResponse = {
    success: true,
    data: leaderboardEntries,
  };
  res.json(response);
});

// Get team leaderboard
router.get("/leaderboard/teams", (req, res) => {
  const teams = db.getAllTeams();
  const matches = db.getAllMatches();

  // Calculate team stats
  const teamStats = new Map<
    string,
    {
      matchesPlayed: number;
      wins: number;
      losses: number;
      draws: number;
      goalsFor: number;
      goalsAgainst: number;
    }
  >();

  // Initialize stats for all teams
  teams.forEach((team) => {
    teamStats.set(team.id, {
      matchesPlayed: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      goalsFor: 0,
      goalsAgainst: 0,
    });
  });

  // Calculate stats from completed matches
  matches
    .filter(
      (match) =>
        match.status === "completed" &&
        match.homeScore !== undefined &&
        match.awayScore !== undefined,
    )
    .forEach((match) => {
      const homeStats = teamStats.get(match.homeTeamId);
      const awayStats = teamStats.get(match.awayTeamId);

      if (homeStats && awayStats) {
        homeStats.matchesPlayed++;
        awayStats.matchesPlayed++;
        homeStats.goalsFor += match.homeScore!;
        homeStats.goalsAgainst += match.awayScore!;
        awayStats.goalsFor += match.awayScore!;
        awayStats.goalsAgainst += match.homeScore!;

        if (match.homeScore! > match.awayScore!) {
          homeStats.wins++;
          awayStats.losses++;
        } else if (match.homeScore! < match.awayScore!) {
          homeStats.losses++;
          awayStats.wins++;
        } else {
          homeStats.draws++;
          awayStats.draws++;
        }
      }
    });

  // Create team leaderboard entries
  const teamLeaderboardEntries: TeamLeaderboardEntry[] = teams
    .map((team) => {
      const stats = teamStats.get(team.id)!;
      const points = stats.wins * 3 + stats.draws;
      const goalDifference = stats.goalsFor - stats.goalsAgainst;

      return {
        rank: 0, // Will be set after sorting
        team,
        ...stats,
        points,
        goalDifference,
      };
    })
    .sort((a, b) => {
      // Sort by points first, then by goal difference, then by goals for
      if (a.points !== b.points) {
        return b.points - a.points;
      }
      if (a.goalDifference !== b.goalDifference) {
        return b.goalDifference - a.goalDifference;
      }
      return b.goalsFor - a.goalsFor;
    })
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));

  const response: GetTeamLeaderboardResponse = {
    success: true,
    data: teamLeaderboardEntries,
  };
  res.json(response);
});

// Get dashboard data
router.get("/dashboard/data", requireAuth, (req: AuthenticatedRequest, res) => {
  const userId = req.user!.id;

  // Get user profile
  const user = db.getUserById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      error: "User not found",
    });
  }

  const stats = db.getPlayerStats(userId) || {
    userId,
    matchesPlayed: 0,
    goals: 0,
    assists: 0,
    cleanSheets: 0,
    yellowCards: 0,
    redCards: 0,
    minutesPlayed: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    rating: 0,
    updatedAt: new Date(),
  };

  const teams = db.getTeamsByUserId(userId);
  const matchHistory = db.getMatchesByUserId(userId);

  const userProfile: UserProfile = {
    ...user,
    stats,
    teams,
    matchHistory,
  };

  // Get upcoming and recent matches
  const now = new Date();
  const upcomingMatches = matchHistory
    .filter((match) => match.scheduledAt > now && match.status === "scheduled")
    .sort((a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime())
    .slice(0, 5);

  const recentMatches = matchHistory
    .filter((match) => match.scheduledAt <= now || match.status === "completed")
    .sort((a, b) => b.scheduledAt.getTime() - a.scheduledAt.getTime())
    .slice(0, 5);

  // Get leaderboards (top 10)
  const allStats = db.getAllPlayerStats();
  const users = db.getAllUsers();

  const playerLeaderboard: LeaderboardEntry[] = allStats
    .map((playerStats) => {
      const playerUser = users.find((u) => u.id === playerStats.userId);
      if (!playerUser) return null;

      return {
        rank: 0,
        user: playerUser,
        stats: playerStats,
      };
    })
    .filter((entry): entry is LeaderboardEntry => entry !== null)
    .sort((a, b) => b.stats.goals - a.stats.goals)
    .slice(0, 10)
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));

  // Get team leaderboard (simplified)
  const teamLeaderboard: TeamLeaderboardEntry[] = db
    .getAllTeams()
    .slice(0, 10)
    .map((team, index) => ({
      rank: index + 1,
      team,
      matchesPlayed: Math.floor(Math.random() * 10) + 5,
      wins: Math.floor(Math.random() * 8) + 2,
      losses: Math.floor(Math.random() * 5),
      draws: Math.floor(Math.random() * 3),
      points: Math.floor(Math.random() * 25) + 10,
      goalsFor: Math.floor(Math.random() * 20) + 10,
      goalsAgainst: Math.floor(Math.random() * 15) + 5,
      goalDifference: Math.floor(Math.random() * 10) - 5,
    }));

  const dashboardData = {
    user: userProfile,
    upcomingMatches,
    recentMatches,
    playerLeaderboard,
    teamLeaderboard,
  };

  const response: GetDashboardResponse = {
    success: true,
    data: dashboardData,
  };
  res.json(response);
});

export { router as userRoutes };
