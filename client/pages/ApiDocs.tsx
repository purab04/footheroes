import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Database, Users, Calendar, Trophy, Shield } from "lucide-react";

export default function ApiDocs() {
  const endpoints = [
    {
      category: "Authentication",
      icon: Shield,
      endpoints: [
        {
          method: "POST",
          path: "/api/auth/register",
          description: "Register a new user account",
        },
        {
          method: "POST",
          path: "/api/auth/login",
          description: "Login with email and password",
        },
        {
          method: "POST",
          path: "/api/auth/logout",
          description: "Logout current user",
        },
        {
          method: "GET",
          path: "/api/auth/me",
          description: "Get current user information",
        },
      ],
    },
    {
      category: "Users",
      icon: Users,
      endpoints: [
        {
          method: "GET",
          path: "/api/users/:id/profile",
          description: "Get user profile with stats and teams",
        },
        {
          method: "PUT",
          path: "/api/users/:id",
          description: "Update user information",
        },
        {
          method: "GET",
          path: "/api/users/:id/stats",
          description: "Get player statistics",
        },
        {
          method: "GET",
          path: "/api/users/:id/matches",
          description: "Get user's match history",
        },
      ],
    },
    {
      category: "Teams",
      icon: Users,
      endpoints: [
        {
          method: "GET",
          path: "/api/teams",
          description: "List all teams with optional filters",
        },
        {
          method: "GET",
          path: "/api/teams/:id",
          description: "Get team details and members",
        },
        {
          method: "POST",
          path: "/api/teams",
          description: "Create a new team",
        },
        {
          method: "POST",
          path: "/api/teams/:id/join",
          description: "Join a team",
        },
        {
          method: "POST",
          path: "/api/teams/:id/leave",
          description: "Leave a team",
        },
        {
          method: "GET",
          path: "/api/teams/:id/matches",
          description: "Get team's match history",
        },
      ],
    },
    {
      category: "Matches",
      icon: Calendar,
      endpoints: [
        {
          method: "GET",
          path: "/api/matches",
          description: "List all matches with optional filters",
        },
        {
          method: "GET",
          path: "/api/matches/:id",
          description: "Get match details and participants",
        },
        {
          method: "POST",
          path: "/api/matches",
          description: "Create a new match",
        },
        {
          method: "PUT",
          path: "/api/matches/:id",
          description: "Update match score and status",
        },
        {
          method: "DELETE",
          path: "/api/matches/:id",
          description: "Cancel a match",
        },
      ],
    },
    {
      category: "Leaderboards",
      icon: Trophy,
      endpoints: [
        {
          method: "GET",
          path: "/api/leaderboard",
          description: "Get player leaderboard rankings",
        },
        {
          method: "GET",
          path: "/api/leaderboard/teams",
          description: "Get team leaderboard standings",
        },
      ],
    },
    {
      category: "Dashboard",
      icon: Database,
      endpoints: [
        {
          method: "GET",
          path: "/api/dashboard",
          description: "Get personalized dashboard data",
        },
      ],
    },
  ];

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-blue-500";
      case "POST":
        return "bg-green-500";
      case "PUT":
        return "bg-yellow-500";
      case "DELETE":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Code2 className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">FootHeroes API</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            RESTful API for the FootHeroes platform. Connect players, organize
            matches, and track football statistics.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Badge variant="outline">Version 1.0.0</Badge>
            <Badge variant="outline">REST API</Badge>
            <Badge variant="outline">JSON</Badge>
          </div>
        </div>

        {/* Base URL */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Base URL</CardTitle>
          </CardHeader>
          <CardContent>
            <code className="bg-muted px-3 py-2 rounded text-sm font-mono">
              {window.location.origin}/api
            </code>
          </CardContent>
        </Card>

        {/* Authentication */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Most endpoints require authentication using a Bearer token.
              Include the token in the Authorization header:
            </p>
            <code className="bg-muted px-3 py-2 rounded text-sm font-mono block">
              Authorization: Bearer YOUR_TOKEN_HERE
            </code>
          </CardContent>
        </Card>

        {/* Endpoints */}
        <div className="space-y-8">
          {endpoints.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-primary" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.endpoints.map((endpoint, endpointIndex) => (
                      <div
                        key={endpointIndex}
                        className="flex items-center gap-4 p-3 rounded-lg border bg-muted/30"
                      >
                        <Badge
                          className={`${getMethodColor(endpoint.method)} text-white font-mono text-xs`}
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="font-mono text-sm flex-1 bg-background px-2 py-1 rounded">
                          {endpoint.path}
                        </code>
                        <span className="text-muted-foreground text-sm">
                          {endpoint.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Response Format */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Response Format</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              All API responses follow this standard format:
            </p>
            <pre className="bg-muted p-4 rounded-lg text-sm font-mono overflow-x-auto">
              {`{
  "success": true,
  "data": { /* response data */ },
  "message": "Optional success message"
}

// Error Response
{
  "success": false,
  "error": "Error message",
  "message": "Optional error details"
}`}
            </pre>
          </CardContent>
        </Card>

        {/* Quick Start */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Start</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">1. Register a new user</h3>
                <pre className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
                  {`POST /api/auth/register
{
  "email": "player@example.com",
  "username": "footballer",
  "firstName": "John",
  "lastName": "Doe",
  "password": "securepassword",
  "position": "midfielder",
  "skillLevel": "intermediate",
  "location": "London, UK"
}`}
                </pre>
              </div>
              <div>
                <h3 className="font-semibold mb-2">2. Get all teams</h3>
                <pre className="bg-muted p-3 rounded text-sm font-mono">
                  GET /api/teams
                </pre>
              </div>
              <div>
                <h3 className="font-semibold mb-2">
                  3. Get player leaderboard
                </h3>
                <pre className="bg-muted p-3 rounded text-sm font-mono">
                  GET /api/leaderboard
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
