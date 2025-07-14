/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

import {
  User,
  UserProfile,
  Team,
  Match,
  PlayerStats,
  LeaderboardEntry,
  TeamLeaderboardEntry,
  DashboardData,
  SearchFilters,
  MatchFilters,
  CreateUserRequest,
  LoginRequest,
  AuthResponse,
  CreateTeamRequest,
  CreateMatchRequest,
  UpdateMatchRequest,
} from "./types";

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * FootHeroes API endpoints and response types
 */

// Common response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Auth endpoints
export interface RegisterResponse extends ApiResponse<AuthResponse> {}
export interface LoginResponse extends ApiResponse<AuthResponse> {}

// User endpoints
export interface GetUserResponse extends ApiResponse<User> {}
export interface GetUserProfileResponse extends ApiResponse<UserProfile> {}
export interface UpdateUserResponse extends ApiResponse<User> {}

// Team endpoints
export interface GetTeamsResponse extends ApiResponse<Team[]> {}
export interface GetTeamResponse extends ApiResponse<Team> {}
export interface CreateTeamResponse extends ApiResponse<Team> {}
export interface UpdateTeamResponse extends ApiResponse<Team> {}
export interface JoinTeamResponse extends ApiResponse<{ success: boolean }> {}

// Match endpoints
export interface GetMatchesResponse extends ApiResponse<Match[]> {}
export interface GetMatchResponse extends ApiResponse<Match> {}
export interface CreateMatchResponse extends ApiResponse<Match> {}
export interface UpdateMatchResponse extends ApiResponse<Match> {}

// Stats and Leaderboard endpoints
export interface GetPlayerStatsResponse extends ApiResponse<PlayerStats> {}
export interface GetLeaderboardResponse
  extends ApiResponse<LeaderboardEntry[]> {}
export interface GetTeamLeaderboardResponse
  extends ApiResponse<TeamLeaderboardEntry[]> {}

// Dashboard endpoint
export interface GetDashboardResponse extends ApiResponse<DashboardData> {}

// API endpoint constants
export const API_ENDPOINTS = {
  // Auth
  REGISTER: "/api/auth/register",
  LOGIN: "/api/auth/login",
  LOGOUT: "/api/auth/logout",
  ME: "/api/auth/me",

  // Users
  USERS: "/api/users",
  USER_PROFILE: (id: string) => `/api/users/${id}/profile`,
  UPDATE_USER: (id: string) => `/api/users/${id}`,

  // Teams
  TEAMS: "/api/teams",
  TEAM: (id: string) => `/api/teams/${id}`,
  JOIN_TEAM: (id: string) => `/api/teams/${id}/join`,
  LEAVE_TEAM: (id: string) => `/api/teams/${id}/leave`,

  // Matches
  MATCHES: "/api/matches",
  MATCH: (id: string) => `/api/matches/${id}`,
  USER_MATCHES: (userId: string) => `/api/users/${userId}/matches`,
  TEAM_MATCHES: (teamId: string) => `/api/teams/${teamId}/matches`,

  // Stats and Leaderboards
  PLAYER_STATS: (userId: string) => `/api/users/${userId}/stats`,
  LEADERBOARD: "/api/leaderboard",
  TEAM_LEADERBOARD: "/api/leaderboard/teams",

  // Dashboard
  DASHBOARD: "/api/dashboard",
} as const;
