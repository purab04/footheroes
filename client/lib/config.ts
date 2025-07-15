/**
 * Production-ready configuration for FootHeroes
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || "/api",
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// App Configuration
export const APP_CONFIG = {
  NAME: "FootHeroes",
  VERSION: "1.0.0",
  DESCRIPTION: "The ultimate platform for grassroots football heroes",
  CONTACT_EMAIL: "support@footheroes.com",
  LINKEDIN_URL: "https://www.linkedin.com/in/purab-awasthi004/",
  PHONE: "+(91) 7007502021",
  LOCATION: "Lucknow, Uttar Pradesh East",
} as const;

// Feature Flags
export const FEATURES = {
  GOOGLE_AUTH: false, // Will be enabled when Google OAuth is implemented
  OFFLINE_MODE: true,
  ERROR_REPORTING: true,
  ANALYTICS: false,
} as const;

// Environment helpers
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: "footheroes_token",
  THEME: "footheroes-ui-theme",
  USER_PREFERENCES: "footheroes_preferences",
} as const;

// API Endpoints (centralized)
export const ENDPOINTS = {
  // Health
  PING: "/ping",

  // Auth
  AUTH_REGISTER: "/auth/register",
  AUTH_LOGIN: "/auth/login",
  AUTH_LOGOUT: "/auth/logout",
  AUTH_ME: "/auth/me",

  // Users
  USERS: "/users",
  USER_PROFILE: (id: string) => `/users/${id}/profile`,
  USER_STATS: (id: string) => `/users/${id}/stats`,
  USER_MATCHES: (id: string) => `/users/${id}/matches`,

  // Teams
  TEAMS: "/teams",
  TEAM: (id: string) => `/teams/${id}`,
  TEAM_JOIN: (id: string) => `/teams/${id}/join`,
  TEAM_LEAVE: (id: string) => `/teams/${id}/leave`,
  TEAM_MATCHES: (id: string) => `/teams/${id}/matches`,

  // Matches
  MATCHES: "/matches",
  MATCH: (id: string) => `/matches/${id}`,

  // Leaderboards
  LEADERBOARD_PLAYERS: "/leaderboard",
  LEADERBOARD_TEAMS: "/leaderboard/teams",

  // Dashboard
  DASHBOARD: "/dashboard",
} as const;

export default {
  API_CONFIG,
  APP_CONFIG,
  FEATURES,
  STORAGE_KEYS,
  ENDPOINTS,
  isDevelopment,
  isProduction,
};
