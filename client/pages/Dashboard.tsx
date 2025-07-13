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
  Zap,
  Flame,
  Award,
  Timer,
  Sparkles,
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
      priority: "high",
    },
    {
      id: 2,
      opponent: "Lightning United",
      date: "2024-01-18",
      time: "20:00",
      location: "Westside Stadium",
      type: "Friendly",
      status: "pending",
      priority: "medium",
    },
    {
      id: 3,
      opponent: "Storm Rangers",
      date: "2024-01-22",
      time: "16:30",
      location: "Riverside Grounds",
      type: "Cup Match",
      status: "confirmed",
      priority: "high",
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
      resultType: "win",
    },
    {
      id: 2,
      opponent: "Hawks United",
      result: "L 1-2",
      date: "2024-01-05",
      goals: 0,
      assists: 1,
      rating: 7.2,
      resultType: "loss",
    },
    {
      id: 3,
      opponent: "Wolves FC",
      result: "D 2-2",
      date: "2024-01-01",
      goals: 1,
      assists: 0,
      rating: 7.8,
      resultType: "draw",
    },
  ];

  const leaderboardData = [
    { name: "Alex Rodriguez", team: "Thunder FC", goals: 15, position: 1 },
    { name: "Sarah Johnson", team: "Lightning United", goals: 12, position: 2 },
    { name: "You", team: "Storm Rangers", goals: 10, position: 3 },
    { name: "Mike Chen", team: "Eagles FC", goals: 9, position: 4 },
  ];

  const quickStats = [
    {
      title: "Season Goals",
      value: "12",
      change: "+3 this month",
      icon: Goal,
      color: "bg-primary",
      trend: "up",
    },
    {
      title: "Team Ranking",
      value: "3rd",
      subtitle: "in Premier League",
      icon: Trophy,
      color: "bg-football-orange",
      trend: "up",
    },
    {
      title: "Match Rating",
      value: "8.2",
      subtitle: "Average",
      icon: Star,
      color: "bg-football-blue",
      trend: "stable",
    },
    {
      title: "Next Match",
      value: "Today",
      subtitle: "vs Thunder FC",
      icon: Timer,
      color: "bg-green-500",
      trend: "pending",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>
      <div className="absolute top-20 right-20 w-32 h-32 gradient-sporty-primary opacity-10 rounded-full blur-3xl animate-pulse-sporty"></div>
      <div className="absolute bottom-40 left-10 w-24 h-24 gradient-sporty-secondary opacity-10 rounded-full blur-2xl animate-pulse-sporty"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header */}
        <div className="mb-12 animate-bounce-in-sporty">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 gradient-sporty-primary rounded-2xl flex items-center justify-center shadow-sporty">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-sporty-gradient mb-2">
                Welcome back, Jordan!
              </h1>
              <p className="text-xl text-muted-foreground font-medium">
                Here's what's happening with your football journey
              </p>
            </div>
            <div className="ml-auto">
              <Badge
                variant="outline"
                className="border-primary/30 text-primary font-bold px-4 py-2 animate-pulse-sporty"
              >
                <Fire className="w-4 h-4 mr-2" />
                On Fire! 🔥
              </Badge>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="group border-0 shadow-sporty-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 glass-morphism-dark overflow-hidden animate-slide-in-diagonal"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 relative">
                  <div className="absolute top-0 right-0 w-20 h-20 gradient-sporty-secondary rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-1">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-black text-foreground group-hover:text-primary transition-colors duration-300">
                        {stat.value}
                      </p>
                      {stat.change && (
                        <p className="text-sm text-green-600 flex items-center mt-1 font-medium">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          {stat.change}
                        </p>
                      )}
                      {stat.subtitle && (
                        <p className="text-sm text-muted-foreground mt-1 font-medium">
                          {stat.subtitle}
                        </p>
                      )}
                    </div>
                    <div
                      className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center shadow-sporty group-hover:scale-110 transition-all duration-300`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  {/* Progress indicator for goals */}
                  {stat.title === "Season Goals" && (
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div className="bg-primary rounded-full h-2 transition-all duration-1000 w-3/5"></div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Matches */}
            <Card className="border-0 shadow-sporty-lg glass-morphism-dark">
              <CardHeader className="flex flex-row items-center justify-between pb-6">
                <div>
                  <CardTitle className="flex items-center text-2xl font-bold">
                    <Calendar className="w-6 h-6 mr-3 text-primary" />
                    Upcoming Matches
                    <Sparkles className="w-5 h-5 ml-2 text-football-orange" />
                  </CardTitle>
                  <CardDescription className="text-lg mt-2">
                    Your next scheduled games
                  </CardDescription>
                </div>
                <Button
                  size="sm"
                  className="gradient-sporty-primary hover:shadow-sporty-lg font-bold text-white border-0"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Match
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingMatches.map((match, index) => (
                  <div
                    key={match.id}
                    className="group flex items-center justify-between p-6 glass-morphism backdrop-blur-sm rounded-xl hover:bg-primary/5 transition-all duration-300 cursor-pointer transform hover:scale-102 border border-border/30"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                          vs {match.opponent}
                        </h4>
                        <Badge
                          variant={
                            match.status === "confirmed"
                              ? "default"
                              : "secondary"
                          }
                          className={`text-sm font-bold ${
                            match.priority === "high"
                              ? "bg-red-500/20 text-red-400 border-red-500/30"
                              : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                          }`}
                        >
                          {match.type}
                        </Badge>
                        {match.priority === "high" && (
                          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                            <Zap className="w-3 h-3 mr-1" />
                            High Priority
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground space-x-6">
                        <span className="flex items-center font-medium">
                          <Calendar className="w-4 h-4 mr-2" />
                          {match.date} at {match.time}
                        </span>
                        <span className="flex items-center font-medium">
                          <MapPin className="w-4 h-4 mr-2" />
                          {match.location}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Matches */}
            <Card className="border-0 shadow-sporty-lg glass-morphism-dark">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold">
                  <Activity className="w-6 h-6 mr-3 text-primary" />
                  Recent Matches
                  <Fire className="w-5 h-5 ml-2 text-football-orange" />
                </CardTitle>
                <CardDescription className="text-lg">
                  Your latest performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentMatches.map((match, index) => (
                  <div
                    key={match.id}
                    className="flex items-center justify-between p-6 glass-morphism backdrop-blur-sm rounded-xl border border-border/30 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <h4 className="font-bold text-lg text-foreground">
                          vs {match.opponent}
                        </h4>
                        <Badge
                          variant={
                            match.resultType === "win"
                              ? "default"
                              : match.resultType === "loss"
                                ? "destructive"
                                : "secondary"
                          }
                          className="text-sm font-bold"
                        >
                          {match.result}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground space-x-6">
                        <span className="font-medium">{match.date}</span>
                        <span className="flex items-center font-medium">
                          <Goal className="w-4 h-4 mr-1" />
                          {match.goals} goals
                        </span>
                        <span className="font-medium">
                          {match.assists} assists
                        </span>
                        <span className="flex items-center font-medium">
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
            <Card className="border-0 shadow-sporty-lg glass-morphism-dark">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-bold">
                  <Target className="w-5 h-5 mr-2 text-primary" />
                  Season Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="font-semibold">Goals Target</span>
                    <span className="font-bold text-primary">12/20</span>
                  </div>
                  <Progress value={60} className="h-3 bg-muted/30" />
                  <p className="text-xs text-muted-foreground mt-2">
                    60% completed
                  </p>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="font-semibold">Matches Played</span>
                    <span className="font-bold text-football-orange">8/16</span>
                  </div>
                  <Progress value={50} className="h-3 bg-muted/30" />
                  <p className="text-xs text-muted-foreground mt-2">
                    50% completed
                  </p>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="font-semibold">Win Rate</span>
                    <span className="font-bold text-green-500">75%</span>
                  </div>
                  <Progress value={75} className="h-3 bg-muted/30" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Excellent performance!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Top Scorers */}
            <Card className="border-0 shadow-sporty-lg glass-morphism-dark">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-bold">
                  <Medal className="w-5 h-5 mr-2 text-primary" />
                  Top Scorers
                  <Award className="w-5 h-5 ml-2 text-yellow-500" />
                </CardTitle>
                <CardDescription>League leaderboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {leaderboardData.map((player, index) => (
                  <div
                    key={player.position}
                    className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
                      player.name === "You"
                        ? "glass-morphism bg-primary/10 border border-primary/30 shadow-sporty"
                        : "glass-morphism-dark hover:bg-muted/10"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black ${
                        player.position === 1
                          ? "bg-yellow-500 text-black"
                          : player.position === 2
                            ? "bg-gray-400 text-black"
                            : player.position === 3
                              ? "bg-orange-500 text-white"
                              : "bg-muted text-foreground"
                      }`}
                    >
                      {player.position}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-foreground">{player.name}</p>
                      <p className="text-sm text-muted-foreground font-medium">
                        {player.team}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-xl text-primary">
                        {player.goals}
                      </p>
                      <p className="text-xs text-muted-foreground font-medium">
                        goals
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-sporty-lg glass-morphism-dark">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-bold">
                  <Zap className="w-5 h-5 mr-2 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 font-semibold">
                  <Users className="w-4 h-4 mr-3" />
                  Find Teams
                </Button>
                <Button className="w-full justify-start bg-football-orange/10 hover:bg-football-orange/20 text-football-orange border border-football-orange/20 font-semibold">
                  <Calendar className="w-4 h-4 mr-3" />
                  Create Match
                </Button>
                <Button className="w-full justify-start bg-football-blue/10 hover:bg-football-blue/20 text-football-blue border border-football-blue/20 font-semibold">
                  <Trophy className="w-4 h-4 mr-3" />
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
