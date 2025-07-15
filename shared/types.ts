/**
 * FootHeroes shared types and interfaces
 * Used by both client and server for type safety
 */

// User types
export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  position: PlayerPosition;
  skillLevel: SkillLevel;
  location: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  stats: PlayerStats;
  teams: Team[];
  matchHistory: Match[];
}

export type PlayerPosition =
  | "goalkeeper"
  | "defender"
  | "midfielder"
  | "forward"
  | "any";
export type SkillLevel =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "professional";

// Team types
export interface Team {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  captainId: string;
  captain: User;
  members: TeamMember[];
  location: string;
  skillLevel: SkillLevel;
  maxMembers: number;
  isRecruiting: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  userId: string;
  user: User;
  teamId: string;
  role: "captain" | "member";
  position: PlayerPosition;
  joinedAt: Date;
}

// Match types
export interface Match {
  id: string;
  title: string;
  description?: string;
  homeTeamId: string;
  homeTeam: Team;
  awayTeamId: string;
  awayTeam: Team;
  scheduledAt: Date;
  duration: number; // in minutes
  location: string;
  status: MatchStatus;
  gameMode: GameMode;
  homeScore?: number;
  awayScore?: number;
  createdById: string;
  createdBy: User;
  participants: MatchParticipant[];
  events: MatchEvent[];
  shareableLink?: string;
  liveData?: LiveMatchData;
  createdAt: Date;
  updatedAt: Date;
}

export type MatchStatus = "scheduled" | "live" | "completed" | "cancelled";

export type GameMode = "5v5" | "7v7" | "9v9" | "10v10" | "11v11" | "custom";

export interface GameModeConfig {
  mode: GameMode;
  playersPerTeam: number;
  fieldSize: "small" | "medium" | "large" | "full";
  duration: number; // default duration in minutes
  maxSubstitutions?: number;
}

export interface LiveMatchData {
  currentMinute: number;
  period:
    | "first-half"
    | "half-time"
    | "second-half"
    | "extra-time"
    | "penalties";
  isActive: boolean;
  lastUpdate: Date;
  possession?: {
    home: number;
    away: number;
  };
  shots?: {
    home: number;
    away: number;
  };
  corners?: {
    home: number;
    away: number;
  };
  fouls?: {
    home: number;
    away: number;
  };
}

export interface MatchParticipant {
  id: string;
  matchId: string;
  userId: string;
  user: User;
  teamId: string;
  team: Team;
  position: PlayerPosition;
  isStarter: boolean;
  minutesPlayed: number;
  stats: MatchPlayerStats;
}

export interface MatchEvent {
  id: string;
  matchId: string;
  playerId: string;
  player: User;
  type: MatchEventType;
  minute: number;
  description?: string;
  createdAt: Date;
}

export type MatchEventType =
  | "goal"
  | "assist"
  | "yellow_card"
  | "red_card"
  | "substitution";

// Stats types
export interface PlayerStats {
  userId: string;
  matchesPlayed: number;
  goals: number;
  assists: number;
  cleanSheets: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  rating: number; // average rating
  updatedAt: Date;
}

export interface MatchPlayerStats {
  goals: number;
  assists: number;
  saves?: number; // for goalkeepers
  yellowCards: number;
  redCards: number;
  rating: number;
}

// API Request/Response types
export interface CreateUserRequest {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  position: PlayerPosition;
  skillLevel: SkillLevel;
  location: string;
  bio?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface CreateTeamRequest {
  name: string;
  description?: string;
  location: string;
  skillLevel: SkillLevel;
  maxMembers: number;
}

export interface CreateMatchRequest {
  title: string;
  description?: string;
  homeTeamId: string;
  awayTeamId: string;
  scheduledAt: Date;
  duration: number;
  location: string;
}

export interface UpdateMatchRequest {
  homeScore?: number;
  awayScore?: number;
  status?: MatchStatus;
}

// Leaderboard types
export interface LeaderboardEntry {
  rank: number;
  user: User;
  stats: PlayerStats;
}

export interface TeamLeaderboardEntry {
  rank: number;
  team: Team;
  matchesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  points: number; // 3 for win, 1 for draw
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

// Dashboard types
export interface DashboardData {
  user: UserProfile;
  upcomingMatches: Match[];
  recentMatches: Match[];
  playerLeaderboard: LeaderboardEntry[];
  teamLeaderboard: TeamLeaderboardEntry[];
}

// Search and filter types
export interface SearchFilters {
  location?: string;
  skillLevel?: SkillLevel;
  position?: PlayerPosition;
  isRecruiting?: boolean;
}

export interface MatchFilters {
  status?: MatchStatus;
  dateFrom?: Date;
  dateTo?: Date;
  teamId?: string;
}
