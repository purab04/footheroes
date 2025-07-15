/**
 * API client for FootHeroes frontend
 * Handles all HTTP requests to the backend API
 */

import {
  API_ENDPOINTS,
  ApiResponse,
  RegisterResponse,
  LoginResponse,
  GetUserResponse,
  GetUserProfileResponse,
  GetTeamsResponse,
  GetTeamResponse,
  CreateTeamResponse,
  JoinTeamResponse,
  GetMatchesResponse,
  GetMatchResponse,
  CreateMatchResponse,
  UpdateMatchResponse,
  GetPlayerStatsResponse,
  GetLeaderboardResponse,
  GetTeamLeaderboardResponse,
  GetDashboardResponse,
} from "@shared/api";
import {
  CreateUserRequest,
  LoginRequest,
  CreateTeamRequest,
  CreateMatchRequest,
  UpdateMatchRequest,
  SearchFilters,
  MatchFilters,
  UpdateUserProfileRequest,
  LiveEventRequest,
  LiveMatchData,
} from "@shared/types";
import { API_CONFIG, STORAGE_KEYS } from "./config";

// Auth token management
let authToken: string | null = null;

export function setAuthToken(token: string | null): void {
  authToken = token;
  if (token) {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  } else {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  }
}

export function getAuthToken(): string | null {
  if (authToken) return authToken;

  if (typeof window !== "undefined") {
    authToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }
  return authToken;
}

// Base API client
class ApiClient {
  private baseUrl = API_CONFIG.BASE_URL;

  private async request<T = any>(
    endpoint: string,
    options: RequestInit = {},
    retries = 3,
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const token = getAuthToken();

    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url, {
          ...options,
          headers,
          timeout: 30000, // 30 second timeout
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({
            error: `HTTP ${response.status}: ${response.statusText}`,
          }));

          // Don't retry on authentication errors
          if (response.status === 401 || response.status === 403) {
            throw new Error(errorData.error || "Authentication failed");
          }

          // Retry on server errors
          if (response.status >= 500 && attempt < retries) {
            await new Promise((resolve) =>
              setTimeout(resolve, 1000 * (attempt + 1)),
            );
            continue;
          }

          throw new Error(
            errorData.error || `Request failed with status ${response.status}`,
          );
        }

        const data = await response.json();
        return data;
      } catch (error) {
        if (attempt === retries || error instanceof TypeError) {
          // Network error or final attempt
          console.error(
            `API request failed after ${attempt + 1} attempts:`,
            error,
          );
          throw new Error(
            error instanceof Error
              ? error.message
              : "Network connection failed",
          );
        }

        // Wait before retry
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * (attempt + 1)),
        );
      }
    }

    throw new Error("Request failed after all retries");
  }

  // Auth endpoints
  async register(userData: CreateUserRequest): Promise<RegisterResponse> {
    return this.request(API_ENDPOINTS.REGISTER, {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.request(API_ENDPOINTS.LOGIN, {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async logout(): Promise<ApiResponse> {
    const response = await this.request(API_ENDPOINTS.LOGOUT, {
      method: "POST",
    });
    setAuthToken(null);
    return response;
  }

  async getCurrentUser(): Promise<GetUserResponse> {
    return this.request(API_ENDPOINTS.ME);
  }

  // User endpoints
  async getUser(id: string): Promise<GetUserResponse> {
    return this.request(API_ENDPOINTS.USER_PROFILE(id).replace("/profile", ""));
  }

  async getUserProfile(id: string): Promise<GetUserProfileResponse> {
    return this.request(API_ENDPOINTS.USER_PROFILE(id));
  }

  async updateUser(
    id: string,
    updates: Partial<CreateUserRequest>,
  ): Promise<GetUserResponse> {
    return this.request(API_ENDPOINTS.UPDATE_USER(id), {
      method: "PUT",
      body: JSON.stringify(updates),
    });
  }

  async getPlayerStats(id: string): Promise<GetPlayerStatsResponse> {
    return this.request(API_ENDPOINTS.PLAYER_STATS(id));
  }

  async getUserMatches(id: string): Promise<GetMatchesResponse> {
    return this.request(API_ENDPOINTS.USER_MATCHES(id));
  }

  // Team endpoints
  async getTeams(filters?: SearchFilters): Promise<GetTeamsResponse> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
    }

    const queryString = params.toString();
    const endpoint = queryString
      ? `${API_ENDPOINTS.TEAMS}?${queryString}`
      : API_ENDPOINTS.TEAMS;

    return this.request(endpoint);
  }

  async getTeam(id: string): Promise<GetTeamResponse> {
    return this.request(API_ENDPOINTS.TEAM(id));
  }

  async createTeam(teamData: CreateTeamRequest): Promise<CreateTeamResponse> {
    return this.request(API_ENDPOINTS.TEAMS, {
      method: "POST",
      body: JSON.stringify(teamData),
    });
  }

  async joinTeam(id: string, position: string): Promise<JoinTeamResponse> {
    return this.request(API_ENDPOINTS.JOIN_TEAM(id), {
      method: "POST",
      body: JSON.stringify({ position }),
    });
  }

  async leaveTeam(id: string): Promise<ApiResponse> {
    return this.request(API_ENDPOINTS.LEAVE_TEAM(id), {
      method: "POST",
    });
  }

  async getTeamMatches(id: string): Promise<GetMatchesResponse> {
    return this.request(API_ENDPOINTS.TEAM_MATCHES(id));
  }

  // Match endpoints
  async getMatches(filters?: MatchFilters): Promise<GetMatchesResponse> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          if (value instanceof Date) {
            params.append(key, value.toISOString());
          } else {
            params.append(key, value.toString());
          }
        }
      });
    }

    const queryString = params.toString();
    const endpoint = queryString
      ? `${API_ENDPOINTS.MATCHES}?${queryString}`
      : API_ENDPOINTS.MATCHES;

    return this.request(endpoint);
  }

  async getMatch(id: string): Promise<GetMatchResponse> {
    return this.request(API_ENDPOINTS.MATCH(id));
  }

  async createMatch(
    matchData: CreateMatchRequest,
  ): Promise<CreateMatchResponse> {
    return this.request(API_ENDPOINTS.MATCHES, {
      method: "POST",
      body: JSON.stringify(matchData),
    });
  }

  async updateMatch(
    id: string,
    updates: UpdateMatchRequest,
  ): Promise<UpdateMatchResponse> {
    return this.request(API_ENDPOINTS.MATCH(id), {
      method: "PUT",
      body: JSON.stringify(updates),
    });
  }

  async deleteMatch(id: string): Promise<ApiResponse> {
    return this.request(API_ENDPOINTS.MATCH(id), {
      method: "DELETE",
    });
  }

  // Leaderboard endpoints
  async getPlayerLeaderboard(): Promise<GetLeaderboardResponse> {
    return this.request(API_ENDPOINTS.LEADERBOARD);
  }

  async getTeamLeaderboard(): Promise<GetTeamLeaderboardResponse> {
    return this.request(API_ENDPOINTS.TEAM_LEADERBOARD);
  }

  // Dashboard endpoint
  async getDashboard(): Promise<GetDashboardResponse> {
    return this.request(API_ENDPOINTS.DASHBOARD);
  }
}

// Export singleton instance
export const api = new ApiClient();

// Auth helpers
export async function loginUser(credentials: LoginRequest): Promise<boolean> {
  try {
    const response = await api.login(credentials);
    if (response.success && response.data) {
      setAuthToken(response.data.token);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
}

export async function registerUser(
  userData: CreateUserRequest,
): Promise<boolean> {
  try {
    const response = await api.register(userData);
    if (response.success && response.data) {
      setAuthToken(response.data.token);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Registration error:", error);
    return false;
  }
}

export async function logoutUser(): Promise<void> {
  try {
    await api.logout();
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    setAuthToken(null);
  }
}

export function isAuthenticated(): boolean {
  return getAuthToken() !== null;
}
