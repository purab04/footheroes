import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  Trophy,
  Target,
  TrendingUp,
  Users,
  Clock,
  MapPin,
  Star,
  Medal,
  ChevronRight,
  Plus,
  Activity,
  Goal,
  AlertCircle,
} from "lucide-react";

export default function Dashboard() {
  const upcomingMatches = [
    {
      id: 1,
      opponent: "Thunder FC",
      date: "2024-01-15",
      time: "18:00",
      location: "Central Park Field A",
      type: "League Match",
      status: "confirmed",
    },
    {
      id: 2,
      opponent: "Lightning United",
      date: "2024-01-18",
      time: "20:00",
      location: "Westside Stadium",
      type: "Friendly",
      status: "pending",
    },
    {
      id: 3,
      opponent: "Storm Rangers",
      date: "2024-01-22",
      time: "16:30",
      location: "Riverside Grounds",
      type: "Cup Match",
      status: "confirmed",
    },
  ];

  const recentMatches = [
    {
      id: 1,
      opponent: "Eagles FC",
      result: "W 3-1",
      date: "2024-01-08",
      goals: 2,
      assists: 1,
      rating: 8.5,
    },
    {
      id: 2,
      opponent: "Hawks United",
      result: "L 1-2",
      date: "2024-01-05",
      goals: 0,
      assists: 1,
      rating: 7.2,
    },
    {
      id: 3,
      opponent: "Wolves FC",
      result: "D 2-2",
      date: "2024-01-01",
      goals: 1,
      assists: 0,
      rating: 7.8,
    },
  ];

  const leaderboardData = [
    { name: "Alex Rodriguez", team: "Thunder FC", goals: 15, position: 1 },
    { name: "Sarah Johnson", team: "Lightning United", goals: 12, position: 2 },
    { name: "You", team: "Storm Rangers", goals: 10, position: 3 },
    { name: "Mike Chen", team: "Eagles FC", goals: 9, position: 4 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, Jordan!
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your football journey
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Season Goals
                  </p>
                  <p className="text-3xl font-bold text-primary">12</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +3 this month
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Goal className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Team Ranking
                  </p>
                  <p className="text-3xl font-bold text-football-orange">3rd</p>
                  <p className="text-sm text-gray-500 mt-1">
                    in Premier League
                  </p>
                </div>
                <div className="w-12 h-12 bg-football-orange/10 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-football-orange" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Match Rating
                  </p>
                  <p className="text-3xl font-bold text-football-blue">8.2</p>
                  <p className="text-sm text-gray-500 mt-1">Average</p>
                </div>
                <div className="w-12 h-12 bg-football-blue/10 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-football-blue" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Next Match
                  </p>
                  <p className="text-lg font-bold text-gray-900">Today</p>
                  <p className="text-sm text-gray-500 mt-1">vs Thunder FC</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Matches */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-primary" />
                    Upcoming Matches
                  </CardTitle>
                  <CardDescription>Your next scheduled games</CardDescription>
                </div>
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Match
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingMatches.map((match) => (
                  <div
                    key={match.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-gray-900">
                          vs {match.opponent}
                        </h4>
                        <Badge
                          variant={
                            match.status === "confirmed"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {match.type}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 space-x-4">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {match.date} at {match.time}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {match.location}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Matches */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-primary" />
                  Recent Matches
                </CardTitle>
                <CardDescription>Your latest performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentMatches.map((match) => (
                  <div
                    key={match.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-gray-900">
                          vs {match.opponent}
                        </h4>
                        <Badge
                          variant={
                            match.result.startsWith("W")
                              ? "default"
                              : match.result.startsWith("L")
                                ? "destructive"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {match.result}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 space-x-4">
                        <span>{match.date}</span>
                        <span>{match.goals} goals</span>
                        <span>{match.assists} assists</span>
                        <span className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-500" />
                          {match.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Season Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-primary" />
                  Season Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Goals Target</span>
                    <span>12/20</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Matches Played</span>
                    <span>8/16</span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Win Rate</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Top Scorers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Medal className="w-5 h-5 mr-2 text-primary" />
                  Top Scorers
                </CardTitle>
                <CardDescription>League leaderboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {leaderboardData.map((player) => (
                  <div
                    key={player.position}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      player.name === "You"
                        ? "bg-primary/10 border border-primary/20"
                        : "bg-gray-50"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                        player.position === 1
                          ? "bg-yellow-100 text-yellow-800"
                          : player.position === 2
                            ? "bg-gray-100 text-gray-800"
                            : player.position === 3
                              ? "bg-orange-100 text-orange-800"
                              : "bg-gray-50 text-gray-600"
                      }`}
                    >
                      {player.position}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{player.name}</p>
                      <p className="text-sm text-gray-600">{player.team}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{player.goals}</p>
                      <p className="text-xs text-gray-500">goals</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Find Teams
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Create Match
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Trophy className="w-4 h-4 mr-2" />
                  View Stats
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
