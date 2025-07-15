import { Router } from "express";
import { z } from "zod";
import { db } from "../database";
import { requireAuth, AuthenticatedRequest } from "../auth";
import { LiveEventRequest } from "@shared/types";

const router = Router();

// Validation schemas
const liveEventSchema = z.object({
  type: z.enum([
    "goal",
    "assist",
    "yellow_card",
    "red_card",
    "substitution",
    "corner",
    "free_kick",
    "penalty",
    "offside",
    "foul",
    "save",
    "shot_on_target",
    "shot_off_target",
  ]),
  playerId: z.string(),
  teamId: z.string(),
  minute: z.number().min(0).max(120),
  description: z.string().optional(),
  additionalData: z.record(z.any()).optional(),
});

const liveDataSchema = z.object({
  currentMinute: z.number().min(0).max(120).optional(),
  period: z
    .enum(["first-half", "half-time", "second-half", "extra-time", "penalties"])
    .optional(),
  isActive: z.boolean().optional(),
  possession: z
    .object({
      home: z.number().min(0).max(100),
      away: z.number().min(0).max(100),
    })
    .optional(),
  shots: z
    .object({
      home: z.number().min(0),
      away: z.number().min(0),
    })
    .optional(),
  corners: z
    .object({
      home: z.number().min(0),
      away: z.number().min(0),
    })
    .optional(),
  fouls: z
    .object({
      home: z.number().min(0),
      away: z.number().min(0),
    })
    .optional(),
});

// Get live match data
router.get("/matches/:id/live", (req, res) => {
  const matchId = req.params.id;
  const match = db.getMatchById(matchId);

  if (!match) {
    return res.status(404).json({
      success: false,
      error: "Match not found",
    });
  }

  const liveData = db.getLiveMatchData(matchId);

  res.json({
    success: true,
    data: {
      match: {
        id: match.id,
        title: match.title,
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
        homeScore: match.homeScore,
        awayScore: match.awayScore,
        status: match.status,
        gameMode: match.gameMode,
      },
      liveData: liveData || null,
      events: match.events.sort((a, b) => b.minute - a.minute), // Latest first
    },
  });
});

// Update live match data (for referees/organizers)
router.put(
  "/matches/:id/live",
  requireAuth,
  (req: AuthenticatedRequest, res) => {
    try {
      const matchId = req.params.id;
      const validatedData = liveDataSchema.parse(req.body);

      const match = db.getMatchById(matchId);
      if (!match) {
        return res.status(404).json({
          success: false,
          error: "Match not found",
        });
      }

      // Check if user is authorized (match creator or team captain)
      const isAuthorized =
        match.createdById === req.user!.id ||
        match.homeTeam.captainId === req.user!.id ||
        match.awayTeam.captainId === req.user!.id;

      if (!isAuthorized) {
        return res.status(403).json({
          success: false,
          error: "Not authorized to update this match",
        });
      }

      db.updateLiveMatchData(matchId, validatedData);

      res.json({
        success: true,
        message: "Live data updated successfully",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error:
            "Validation error: " +
            error.errors.map((e) => e.message).join(", "),
        });
      }

      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  },
);

// Add live event
router.post(
  "/matches/:id/events",
  requireAuth,
  (req: AuthenticatedRequest, res) => {
    try {
      const matchId = req.params.id;
      const validatedData = liveEventSchema.parse(req.body);

      const match = db.getMatchById(matchId);
      if (!match) {
        return res.status(404).json({
          success: false,
          error: "Match not found",
        });
      }

      // Check if user is authorized
      const isAuthorized =
        match.createdById === req.user!.id ||
        match.homeTeam.captainId === req.user!.id ||
        match.awayTeam.captainId === req.user!.id;

      if (!isAuthorized) {
        return res.status(403).json({
          success: false,
          error: "Not authorized to add events to this match",
        });
      }

      // Get player info
      const player = db.getUserById(validatedData.playerId);
      if (!player) {
        return res.status(400).json({
          success: false,
          error: "Player not found",
        });
      }

      const event = db.addLiveEvent(matchId, {
        ...validatedData,
        matchId,
        player,
      });

      res.json({
        success: true,
        data: event,
        message: "Event added successfully",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error:
            "Validation error: " +
            error.errors.map((e) => e.message).join(", "),
        });
      }

      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  },
);

// Create shareable link
router.post(
  "/matches/:id/share",
  requireAuth,
  (req: AuthenticatedRequest, res) => {
    const matchId = req.params.id;
    const { allowJoin = false, allowView = true } = req.body;

    const match = db.getMatchById(matchId);
    if (!match) {
      return res.status(404).json({
        success: false,
        error: "Match not found",
      });
    }

    // Check if user is authorized
    const isAuthorized =
      match.createdById === req.user!.id ||
      match.homeTeam.captainId === req.user!.id ||
      match.awayTeam.captainId === req.user!.id;

    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        error: "Not authorized to create share link for this match",
      });
    }

    const shareCode = db.createShareableLink(matchId, allowJoin, allowView);

    res.json({
      success: true,
      data: {
        shareCode,
        shareUrl: `${req.protocol}://${req.get("host")}/match/share/${shareCode}`,
        allowJoin,
        allowView,
      },
      message: "Shareable link created successfully",
    });
  },
);

// Access match via shareable link
router.get("/share/:shareCode", (req, res) => {
  const shareCode = req.params.shareCode;
  const link = db.getShareableLink(shareCode);

  if (!link) {
    return res.status(404).json({
      success: false,
      error: "Share link not found or expired",
    });
  }

  const match = db.getMatchById(link.matchId);
  if (!match) {
    return res.status(404).json({
      success: false,
      error: "Match not found",
    });
  }

  const liveData = db.getLiveMatchData(link.matchId);

  res.json({
    success: true,
    data: {
      match: {
        id: match.id,
        title: match.title,
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
        homeScore: match.homeScore,
        awayScore: match.awayScore,
        status: match.status,
        gameMode: match.gameMode,
        scheduledAt: match.scheduledAt,
        location: match.location,
        duration: match.duration,
      },
      liveData,
      events: match.events.sort((a, b) => b.minute - a.minute),
      permissions: {
        allowJoin: link.allowJoin,
        allowView: link.allowView,
      },
    },
  });
});

export { router as liveRoutes };
