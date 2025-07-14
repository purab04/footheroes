import { Router } from "express";
import { z } from "zod";
import { db } from "../database";
import { requireAuth, AuthenticatedRequest } from "../auth";
import {
  GetMatchesResponse,
  GetMatchResponse,
  CreateMatchResponse,
  UpdateMatchResponse,
} from "@shared/api";

const router = Router();

// Validation schemas
const createMatchSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional(),
  homeTeamId: z.string(),
  awayTeamId: z.string(),
  scheduledAt: z.string().transform((str) => new Date(str)),
  duration: z.number().min(30).max(180),
  location: z.string().min(1),
});

const updateMatchSchema = z.object({
  homeScore: z.number().min(0).optional(),
  awayScore: z.number().min(0).optional(),
  status: z.enum(["scheduled", "live", "completed", "cancelled"]).optional(),
});

// Get all matches
router.get("/", (req, res) => {
  const matches = db.getAllMatches();

  // Apply filters if provided
  const { status, dateFrom, dateTo, teamId } = req.query;
  let filteredMatches = matches;

  if (status) {
    filteredMatches = filteredMatches.filter(
      (match) => match.status === status,
    );
  }

  if (dateFrom) {
    const fromDate = new Date(dateFrom.toString());
    filteredMatches = filteredMatches.filter(
      (match) => match.scheduledAt >= fromDate,
    );
  }

  if (dateTo) {
    const toDate = new Date(dateTo.toString());
    filteredMatches = filteredMatches.filter(
      (match) => match.scheduledAt <= toDate,
    );
  }

  if (teamId) {
    filteredMatches = filteredMatches.filter(
      (match) => match.homeTeamId === teamId || match.awayTeamId === teamId,
    );
  }

  // Sort by scheduled date
  filteredMatches.sort(
    (a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime(),
  );

  const response: GetMatchesResponse = {
    success: true,
    data: filteredMatches,
  };
  res.json(response);
});

// Get match by ID
router.get("/:id", (req, res) => {
  const match = db.getMatchById(req.params.id);

  if (!match) {
    const response: GetMatchResponse = {
      success: false,
      error: "Match not found",
    };
    return res.status(404).json(response);
  }

  const response: GetMatchResponse = {
    success: true,
    data: match,
  };
  res.json(response);
});

// Create match
router.post("/", requireAuth, (req: AuthenticatedRequest, res) => {
  try {
    const validatedData = createMatchSchema.parse(req.body);

    // Validate that both teams exist
    const homeTeam = db.getTeamById(validatedData.homeTeamId);
    const awayTeam = db.getTeamById(validatedData.awayTeamId);

    if (!homeTeam || !awayTeam) {
      const response: CreateMatchResponse = {
        success: false,
        error: "One or both teams not found",
      };
      return res.status(400).json(response);
    }

    // Validate that teams are different
    if (validatedData.homeTeamId === validatedData.awayTeamId) {
      const response: CreateMatchResponse = {
        success: false,
        error: "Home and away teams must be different",
      };
      return res.status(400).json(response);
    }

    // Validate scheduled time is in the future
    if (validatedData.scheduledAt <= new Date()) {
      const response: CreateMatchResponse = {
        success: false,
        error: "Match must be scheduled for a future date",
      };
      return res.status(400).json(response);
    }

    const match = db.createMatch({
      ...validatedData,
      status: "scheduled",
      createdById: req.user!.id,
    });

    if (!match) {
      const response: CreateMatchResponse = {
        success: false,
        error: "Failed to create match",
      };
      return res.status(400).json(response);
    }

    const response: CreateMatchResponse = {
      success: true,
      data: match,
      message: "Match created successfully",
    };
    res.status(201).json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const response: CreateMatchResponse = {
        success: false,
        error:
          "Validation error: " + error.errors.map((e) => e.message).join(", "),
      };
      return res.status(400).json(response);
    }

    const response: CreateMatchResponse = {
      success: false,
      error: "Internal server error",
    };
    res.status(500).json(response);
  }
});

// Update match (mainly for scores and status)
router.put("/:id", requireAuth, (req: AuthenticatedRequest, res) => {
  try {
    const validatedData = updateMatchSchema.parse(req.body);
    const matchId = req.params.id;

    const existingMatch = db.getMatchById(matchId);
    if (!existingMatch) {
      const response: UpdateMatchResponse = {
        success: false,
        error: "Match not found",
      };
      return res.status(404).json(response);
    }

    // Only allow match creator or team captains to update
    const isAuthorized =
      existingMatch.createdById === req.user!.id ||
      existingMatch.homeTeam.captainId === req.user!.id ||
      existingMatch.awayTeam.captainId === req.user!.id;

    if (!isAuthorized) {
      const response: UpdateMatchResponse = {
        success: false,
        error: "Not authorized to update this match",
      };
      return res.status(403).json(response);
    }

    const updatedMatch = db.updateMatch(matchId, validatedData);

    if (!updatedMatch) {
      const response: UpdateMatchResponse = {
        success: false,
        error: "Failed to update match",
      };
      return res.status(400).json(response);
    }

    const response: UpdateMatchResponse = {
      success: true,
      data: updatedMatch,
      message: "Match updated successfully",
    };
    res.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const response: UpdateMatchResponse = {
        success: false,
        error:
          "Validation error: " + error.errors.map((e) => e.message).join(", "),
      };
      return res.status(400).json(response);
    }

    const response: UpdateMatchResponse = {
      success: false,
      error: "Internal server error",
    };
    res.status(500).json(response);
  }
});

// Delete match
router.delete("/:id", requireAuth, (req: AuthenticatedRequest, res) => {
  const matchId = req.params.id;

  const existingMatch = db.getMatchById(matchId);
  if (!existingMatch) {
    return res.status(404).json({
      success: false,
      error: "Match not found",
    });
  }

  // Only allow match creator to delete
  if (existingMatch.createdById !== req.user!.id) {
    return res.status(403).json({
      success: false,
      error: "Not authorized to delete this match",
    });
  }

  // For simplicity, we won't implement actual deletion in the in-memory DB
  // In a real app, you'd call db.deleteMatch(matchId)
  const updatedMatch = db.updateMatch(matchId, { status: "cancelled" });

  res.json({
    success: true,
    message: "Match cancelled successfully",
  });
});

export { router as matchRoutes };
