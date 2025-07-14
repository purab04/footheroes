import { Router } from "express";
import { z } from "zod";
import { db } from "../database";
import { requireAuth, AuthenticatedRequest } from "../auth";
import {
  GetTeamsResponse,
  GetTeamResponse,
  CreateTeamResponse,
  JoinTeamResponse,
} from "@shared/api";

const router = Router();

// Validation schemas
const createTeamSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().optional(),
  location: z.string().min(1),
  skillLevel: z.enum(["beginner", "intermediate", "advanced", "professional"]),
  maxMembers: z.number().min(5).max(30),
});

const joinTeamSchema = z.object({
  position: z.enum(["goalkeeper", "defender", "midfielder", "forward", "any"]),
});

// Get all teams
router.get("/", (req, res) => {
  const teams = db.getAllTeams();

  // Apply filters if provided
  const { location, skillLevel, isRecruiting } = req.query;
  let filteredTeams = teams;

  if (location) {
    filteredTeams = filteredTeams.filter((team) =>
      team.location.toLowerCase().includes(location.toString().toLowerCase()),
    );
  }

  if (skillLevel) {
    filteredTeams = filteredTeams.filter(
      (team) => team.skillLevel === skillLevel,
    );
  }

  if (isRecruiting !== undefined) {
    const recruiting = isRecruiting === "true";
    filteredTeams = filteredTeams.filter(
      (team) => team.isRecruiting === recruiting,
    );
  }

  const response: GetTeamsResponse = {
    success: true,
    data: filteredTeams,
  };
  res.json(response);
});

// Get team by ID
router.get("/:id", (req, res) => {
  const team = db.getTeamById(req.params.id);

  if (!team) {
    const response: GetTeamResponse = {
      success: false,
      error: "Team not found",
    };
    return res.status(404).json(response);
  }

  const response: GetTeamResponse = {
    success: true,
    data: team,
  };
  res.json(response);
});

// Create team
router.post("/", requireAuth, (req: AuthenticatedRequest, res) => {
  try {
    const validatedData = createTeamSchema.parse(req.body);

    const team = db.createTeam({
      ...validatedData,
      captainId: req.user!.id,
      isRecruiting: true,
    });

    if (!team) {
      const response: CreateTeamResponse = {
        success: false,
        error: "Failed to create team",
      };
      return res.status(400).json(response);
    }

    const response: CreateTeamResponse = {
      success: true,
      data: team,
      message: "Team created successfully",
    };
    res.status(201).json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const response: CreateTeamResponse = {
        success: false,
        error:
          "Validation error: " + error.errors.map((e) => e.message).join(", "),
      };
      return res.status(400).json(response);
    }

    const response: CreateTeamResponse = {
      success: false,
      error: "Internal server error",
    };
    res.status(500).json(response);
  }
});

// Join team
router.post("/:id/join", requireAuth, (req: AuthenticatedRequest, res) => {
  try {
    const validatedData = joinTeamSchema.parse(req.body);
    const teamId = req.params.id;
    const userId = req.user!.id;

    // Check if team exists
    const team = db.getTeamById(teamId);
    if (!team) {
      const response: JoinTeamResponse = {
        success: false,
        error: "Team not found",
      };
      return res.status(404).json(response);
    }

    // Check if user is already a member
    const isAlreadyMember = team.members.some(
      (member) => member.userId === userId,
    );
    if (isAlreadyMember) {
      const response: JoinTeamResponse = {
        success: false,
        error: "You are already a member of this team",
      };
      return res.status(400).json(response);
    }

    // Check if team is recruiting
    if (!team.isRecruiting) {
      const response: JoinTeamResponse = {
        success: false,
        error: "This team is not currently recruiting",
      };
      return res.status(400).json(response);
    }

    const success = db.addTeamMember(teamId, userId, validatedData.position);

    if (!success) {
      const response: JoinTeamResponse = {
        success: false,
        error: "Failed to join team (team may be full)",
      };
      return res.status(400).json(response);
    }

    const response: JoinTeamResponse = {
      success: true,
      data: { success: true },
      message: "Successfully joined the team",
    };
    res.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const response: JoinTeamResponse = {
        success: false,
        error:
          "Validation error: " + error.errors.map((e) => e.message).join(", "),
      };
      return res.status(400).json(response);
    }

    const response: JoinTeamResponse = {
      success: false,
      error: "Internal server error",
    };
    res.status(500).json(response);
  }
});

// Leave team
router.post("/:id/leave", requireAuth, (req: AuthenticatedRequest, res) => {
  const teamId = req.params.id;
  const userId = req.user!.id;

  // Check if team exists
  const team = db.getTeamById(teamId);
  if (!team) {
    return res.status(404).json({
      success: false,
      error: "Team not found",
    });
  }

  // Check if user is the captain
  if (team.captainId === userId) {
    return res.status(400).json({
      success: false,
      error: "Team captain cannot leave the team",
    });
  }

  const success = db.removeTeamMember(teamId, userId);

  if (!success) {
    return res.status(400).json({
      success: false,
      error: "You are not a member of this team",
    });
  }

  res.json({
    success: true,
    message: "Successfully left the team",
  });
});

// Get team matches
router.get("/:id/matches", (req, res) => {
  const teamId = req.params.id;
  const matches = db.getMatchesByTeamId(teamId);

  res.json({
    success: true,
    data: matches,
  });
});

export { router as teamRoutes };
