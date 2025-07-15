/**
 * Simple in-memory database for FootHeroes
 * In production, this would be replaced with a proper database (PostgreSQL, MongoDB, etc.)
 */

import {
  User,
  Team,
  Match,
  PlayerStats,
  TeamMember,
  MatchParticipant,
  MatchEvent,
  PlayerPosition,
  SkillLevel,
  MatchStatus,
  GameMode,
  LiveMatchData,
  ShareableMatchLink,
} from "@shared/types";

// In-memory storage
class FootHeroesDatabase {
  private users: Map<string, User> = new Map();
  private teams: Map<string, Team> = new Map();
  private matches: Map<string, Match> = new Map();
  private playerStats: Map<string, PlayerStats> = new Map();
  private teamMembers: Map<string, TeamMember[]> = new Map();
  private matchParticipants: Map<string, MatchParticipant[]> = new Map();
  private matchEvents: Map<string, MatchEvent[]> = new Map();
  private shareableLinks: Map<string, ShareableMatchLink> = new Map(); // shareCode -> link data
  private liveMatchData: Map<string, LiveMatchData> = new Map(); // matchId -> live data
  private userSessions: Map<string, string> = new Map(); // token -> userId

  constructor() {
    this.seedData();
  }

  // User operations
  createUser(userData: Omit<User, "id" | "createdAt" | "updatedAt">): User {
    const id = this.generateId();
    const user: User = {
      ...userData,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(id, user);

    // Initialize player stats
    const stats: PlayerStats = {
      userId: id,
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
    this.playerStats.set(id, stats);

    return user;
  }

  getUserById(id: string): User | undefined {
    return this.users.get(id);
  }

  getUserByEmail(email: string): User | undefined {
    return Array.from(this.users.values()).find((user) => user.email === email);
  }

  getUserByUsername(username: string): User | undefined {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  updateUser(id: string, updates: Partial<User>): User | undefined {
    const user = this.users.get(id);
    if (!user) return undefined;

    const updatedUser = {
      ...user,
      ...updates,
      id,
      updatedAt: new Date(),
    };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  // Team operations
  createTeam(
    teamData: Omit<
      Team,
      "id" | "captain" | "members" | "createdAt" | "updatedAt"
    >,
  ): Team | undefined {
    const captain = this.users.get(teamData.captainId);
    if (!captain) return undefined;

    const id = this.generateId();
    const team: Team = {
      ...teamData,
      id,
      captain,
      members: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.teams.set(id, team);

    // Add captain as team member
    const captainMember: TeamMember = {
      userId: teamData.captainId,
      user: captain,
      teamId: id,
      role: "captain",
      position: captain.position,
      joinedAt: new Date(),
    };
    this.teamMembers.set(id, [captainMember]);

    return this.getTeamById(id);
  }

  getTeamById(id: string): Team | undefined {
    const team = this.teams.get(id);
    if (!team) return undefined;

    const members = this.teamMembers.get(id) || [];
    return {
      ...team,
      members,
    };
  }

  getAllTeams(): Team[] {
    return Array.from(this.teams.keys()).map((id) => this.getTeamById(id)!);
  }

  addTeamMember(
    teamId: string,
    userId: string,
    position: PlayerPosition,
  ): boolean {
    const team = this.teams.get(teamId);
    const user = this.users.get(userId);
    if (!team || !user) return false;

    const members = this.teamMembers.get(teamId) || [];
    if (members.length >= team.maxMembers) return false;

    const newMember: TeamMember = {
      userId,
      user,
      teamId,
      role: "member",
      position,
      joinedAt: new Date(),
    };

    members.push(newMember);
    this.teamMembers.set(teamId, members);
    return true;
  }

  removeTeamMember(teamId: string, userId: string): boolean {
    const members = this.teamMembers.get(teamId) || [];
    const filteredMembers = members.filter((m) => m.userId !== userId);
    this.teamMembers.set(teamId, filteredMembers);
    return filteredMembers.length < members.length;
  }

  getTeamsByUserId(userId: string): Team[] {
    const userTeams: Team[] = [];
    for (const [teamId, members] of this.teamMembers.entries()) {
      if (members.some((m) => m.userId === userId)) {
        const team = this.getTeamById(teamId);
        if (team) userTeams.push(team);
      }
    }
    return userTeams;
  }

  // Match operations
  createMatch(
    matchData: Omit<
      Match,
      | "id"
      | "homeTeam"
      | "awayTeam"
      | "createdBy"
      | "participants"
      | "events"
      | "shareableLink"
      | "liveData"
      | "createdAt"
      | "updatedAt"
    >,
  ): Match | undefined {
    const homeTeam = this.getTeamById(matchData.homeTeamId);
    const awayTeam = this.getTeamById(matchData.awayTeamId);
    const createdBy = this.users.get(matchData.createdById);

    if (!homeTeam || !awayTeam || !createdBy) return undefined;

    const id = this.generateId();
    const match: Match = {
      ...matchData,
      id,
      homeTeam,
      awayTeam,
      createdBy,
      participants: [],
      events: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.matches.set(id, match);
    this.matchParticipants.set(id, []);
    this.matchEvents.set(id, []);

    return this.getMatchById(id);
  }

  getMatchById(id: string): Match | undefined {
    const match = this.matches.get(id);
    if (!match) return undefined;

    const participants = this.matchParticipants.get(id) || [];
    const events = this.matchEvents.get(id) || [];

    return {
      ...match,
      participants,
      events,
    };
  }

  getAllMatches(): Match[] {
    return Array.from(this.matches.keys()).map((id) => this.getMatchById(id)!);
  }

  updateMatch(id: string, updates: Partial<Match>): Match | undefined {
    const match = this.matches.get(id);
    if (!match) return undefined;

    const updatedMatch = {
      ...match,
      ...updates,
      id,
      updatedAt: new Date(),
    };
    this.matches.set(id, updatedMatch);
    return this.getMatchById(id);
  }

  getMatchesByUserId(userId: string): Match[] {
    const userMatches: Match[] = [];
    for (const [matchId, participants] of this.matchParticipants.entries()) {
      if (participants.some((p) => p.userId === userId)) {
        const match = this.getMatchById(matchId);
        if (match) userMatches.push(match);
      }
    }
    return userMatches;
  }

  getMatchesByTeamId(teamId: string): Match[] {
    return this.getAllMatches().filter(
      (match) => match.homeTeamId === teamId || match.awayTeamId === teamId,
    );
  }

  // Stats operations
  getPlayerStats(userId: string): PlayerStats | undefined {
    return this.playerStats.get(userId);
  }

  updatePlayerStats(userId: string, updates: Partial<PlayerStats>): void {
    const stats = this.playerStats.get(userId);
    if (stats) {
      const updatedStats = {
        ...stats,
        ...updates,
        updatedAt: new Date(),
      };
      this.playerStats.set(userId, updatedStats);
    }
  }

  getAllPlayerStats(): PlayerStats[] {
    return Array.from(this.playerStats.values());
  }

  // Session management
  createSession(token: string, userId: string): void {
    this.userSessions.set(token, userId);
  }

  getUserByToken(token: string): User | undefined {
    const userId = this.userSessions.get(token);
    return userId ? this.users.get(userId) : undefined;
  }

  deleteSession(token: string): void {
    this.userSessions.delete(token);
  }

  // Utility methods
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Seed data for development
  private seedData(): void {
    // Create some sample users
    const users = [
      {
        email: "john@example.com",
        username: "johnsmith",
        firstName: "John",
        lastName: "Smith",
        position: "midfielder" as PlayerPosition,
        skillLevel: "intermediate" as SkillLevel,
        location: "London, UK",
        bio: "Love playing football on weekends!",
      },
      {
        email: "sarah@example.com",
        username: "sarahj",
        firstName: "Sarah",
        lastName: "Johnson",
        position: "forward" as PlayerPosition,
        skillLevel: "advanced" as SkillLevel,
        location: "Manchester, UK",
        bio: "Striker with 5 years experience",
      },
      {
        email: "mike@example.com",
        username: "mikebrown",
        firstName: "Mike",
        lastName: "Brown",
        position: "goalkeeper" as PlayerPosition,
        skillLevel: "intermediate" as SkillLevel,
        location: "Birmingham, UK",
        bio: "Goalkeeper looking for a regular team",
      },
      {
        email: "emma@example.com",
        username: "emmaw",
        firstName: "Emma",
        lastName: "Wilson",
        position: "defender" as PlayerPosition,
        skillLevel: "beginner" as SkillLevel,
        location: "Liverpool, UK",
        bio: "New to football but eager to learn",
      },
    ];

    const createdUsers = users.map((userData) => this.createUser(userData));

    // Create some sample teams
    if (createdUsers.length >= 2) {
      const team1 = this.createTeam({
        name: "London Lions",
        description: "Competitive team in London",
        captainId: createdUsers[0].id,
        location: "London, UK",
        skillLevel: "intermediate",
        maxMembers: 15,
        isRecruiting: true,
      });

      const team2 = this.createTeam({
        name: "Manchester United FC",
        description: "Local Manchester team",
        captainId: createdUsers[1].id,
        location: "Manchester, UK",
        skillLevel: "advanced",
        maxMembers: 20,
        isRecruiting: false,
      });

      // Add some members to teams
      if (team1 && createdUsers[2]) {
        this.addTeamMember(team1.id, createdUsers[2].id, "goalkeeper");
      }
      if (team2 && createdUsers[3]) {
        this.addTeamMember(team2.id, createdUsers[3].id, "defender");
      }

      // Create a sample match
      if (team1 && team2) {
        const match = this.createMatch({
          title: "London Lions vs Manchester United FC",
          description: "Friendly match",
          homeTeamId: team1.id,
          awayTeamId: team2.id,
          scheduledAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
          duration: 90,
          location: "Wembley Stadium",
          status: "scheduled",
          createdById: createdUsers[0].id,
        });
      }
    }

    // Update some player stats for demo
    createdUsers.forEach((user, index) => {
      this.updatePlayerStats(user.id, {
        matchesPlayed: Math.floor(Math.random() * 20) + 5,
        goals: Math.floor(Math.random() * 15),
        assists: Math.floor(Math.random() * 10),
        wins: Math.floor(Math.random() * 15),
        losses: Math.floor(Math.random() * 8),
        draws: Math.floor(Math.random() * 5),
        rating: Math.random() * 3 + 7, // 7-10 rating
      });
    });
  }
}

// Export singleton instance
export const db = new FootHeroesDatabase();
