import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
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
import { Skeleton } from "@/components/ui/skeleton";
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
  AlertCircle,
} from "lucide-react";
import { DashboardData } from "@shared/types";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const response = await api.getDashboard();
      if (response.success && response.data) {
        setDashboardData(response.data);
      } else {
        setError("Failed to load dashboard data");
      }
    } catch (err) {
      setError("Failed to connect to server");
      console.error("Dashboard error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Trophy className="w-12 h-12 mx-auto text-primary mb-4" />
            <CardTitle>Welcome to FootHeroes</CardTitle>
            <CardDescription>
              Please sign in to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground mb-4">
              Track your football journey, connect with players, and organize
              matches
            </p>
            <Button className="w-full" asChild>
              <Link to="/">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertCircle className="w-12 h-12 mx-auto text-destructive mb-4" />
            <CardTitle>Something went wrong</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full"
              onClick={fetchDashboardData}
              variant="outline"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show loading state
  if (isLoading || !dashboardData) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-12">
            <Skeleton className="h-16 w-80 mb-4" />
            <Skeleton className="h-6 w-96" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const stats = dashboardData.user.stats;
  const quickStats = [
    {
      title: "Season Goals",
      value: stats.goals.toString(),
      change: `+${Math.floor(stats.goals / 4)} this month`,
      icon: Goal,
      color: "bg-primary",
      trend: "up",
    },
    {
      title: "Match Rating",
      value: stats.rating.toFixed(1),
      subtitle: "Average",
      icon: Star,
      color: "bg-football-blue",
      trend: "stable",
    },
    {
      title: "Matches Played",
      value: stats.matchesPlayed.toString(),
      subtitle: "This season",
      icon: Activity,
      color: "bg-football-orange",
      trend: "up",
    },
    {
      title: "Win Rate",
      value: `${Math.round((stats.wins / (stats.matchesPlayed || 1)) * 100)}%`,
      subtitle: `${stats.wins}W ${stats.losses}L ${stats.draws}D`,
      icon: Trophy,
      color: "bg-green-500",
      trend: "up",
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
                Welcome back, {user?.firstName}!
              </h1>
              <p className="text-xl text-muted-foreground font-medium">
                Here's what's happening with your football journey
              </p>
            </div>
            <div className="ml-auto">
              <Badge
                variant="outline"
                className="border-primary/30 text-primary dark:text-primary-foreground font-bold px-4 py-2 animate-pulse-sporty bg-primary/5 dark:bg-primary/20"
              >
                <Flame className="w-4 h-4 mr-2" />
                {stats.rating > 8 ? "On Fire! 🔥" : "Playing Well! ⚽"}
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
                      <div
                        className="bg-primary rounded-full h-2 transition-all duration-1000"
                        style={{
                          width: `${Math.min((stats.goals / 20) * 100, 100)}%`,
                        }}
                      ></div>
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
                  asChild
                >
                  <Link to="/matches">
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule Match
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {dashboardData.upcomingMatches.length > 0 ? (
                  dashboardData.upcomingMatches.map((match, index) => (
                    <div
                      key={match.id}
                      className="group flex items-center justify-between p-6 glass-morphism backdrop-blur-sm rounded-xl hover:bg-primary/5 transition-all duration-300 cursor-pointer transform hover:scale-102 border border-border/30"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                            {match.homeTeam.name} vs {match.awayTeam.name}
                          </h4>
                          <Badge
                            variant="default"
                            className="text-sm font-bold bg-blue-500/20 text-blue-400 border-blue-500/30"
                          >
                            {match.status}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground space-x-6">
                          <span className="flex items-center font-medium">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(match.scheduledAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center font-medium">
                            <MapPin className="w-4 h-4 mr-2" />
                            {match.location}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      No upcoming matches scheduled
                    </p>
                    <Button variant="outline" className="mt-4" asChild>
                      <Link to="/matches">Schedule a Match</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Matches */}
            <Card className="border-0 shadow-sporty-lg glass-morphism-dark">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold">
                  <Activity className="w-6 h-6 mr-3 text-primary" />
                  Recent Matches
                  <Flame className="w-5 h-5 ml-2 text-football-orange" />
                </CardTitle>
                <CardDescription className="text-lg">
                  Your latest performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {dashboardData.recentMatches.length > 0 ? (
                  dashboardData.recentMatches.map((match, index) => (
                    <div
                      key={match.id}
                      className="flex items-center justify-between p-6 glass-morphism backdrop-blur-sm rounded-xl border border-border/30 hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <h4 className="font-bold text-lg text-foreground">
                            {match.homeTeam.name} vs {match.awayTeam.name}
                          </h4>
                          <Badge
                            variant={
                              match.homeScore !== undefined &&
                              match.awayScore !== undefined
                                ? match.homeScore > match.awayScore
                                  ? "default"
                                  : match.homeScore < match.awayScore
                                    ? "destructive"
                                    : "secondary"
                                : "secondary"
                            }
                            className="text-sm font-bold"
                          >
                            {match.homeScore !== undefined &&
                            match.awayScore !== undefined
                              ? `${match.homeScore}-${match.awayScore}`
                              : match.status}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground space-x-6">
                          <span className="font-medium">
                            {new Date(match.scheduledAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center font-medium">
                            <MapPin className="w-4 h-4 mr-1" />
                            {match.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Activity className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No recent matches</p>
                  </div>
                )}
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
                    <span className="font-semibold">Goals</span>
                    <span className="font-bold text-primary">
                      {stats.goals}
                    </span>
                  </div>
                  <Progress
                    value={Math.min((stats.goals / 20) * 100, 100)}
                    className="h-3 bg-muted/30"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="font-semibold">Assists</span>
                    <span className="font-bold text-orange-600 dark:text-orange-400">
                      {stats.assists}
                    </span>
                  </div>
                  <Progress
                    value={Math.min((stats.assists / 15) * 100, 100)}
                    className="h-3 bg-muted/30"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="font-semibold">Win Rate</span>
                    <span className="font-bold text-green-600 dark:text-green-400">
                      {Math.round(
                        (stats.wins / (stats.matchesPlayed || 1)) * 100,
                      )}
                      %
                    </span>
                  </div>
                  <Progress
                    value={(stats.wins / (stats.matchesPlayed || 1)) * 100}
                    className="h-3 bg-muted/30"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Top Scorers */}
            <Card className="border-0 shadow-sporty-lg glass-morphism-dark">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-bold">
                  <Medal className="w-5 h-5 mr-2 text-primary" />
                  Top Scorers
                  <Award className="w-5 h-5 ml-2 text-yellow-600 dark:text-yellow-400" />
                </CardTitle>
                <CardDescription>League leaderboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {dashboardData.playerLeaderboard.map((player, index) => (
                  <div
                    key={player.user.id}
                    className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
                      player.user.id === user?.id
                        ? "glass-morphism bg-primary/10 border border-primary/30 shadow-sporty"
                        : "glass-morphism-dark hover:bg-muted/10"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black ${
                        player.rank === 1
                          ? "bg-yellow-500 text-black"
                          : player.rank === 2
                            ? "bg-gray-400 text-black"
                            : player.rank === 3
                              ? "bg-orange-500 text-white"
                              : "bg-muted text-foreground"
                      }`}
                    >
                      {player.rank}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-foreground">
                        {player.user.id === user?.id
                          ? "You"
                          : `${player.user.firstName} ${player.user.lastName}`}
                      </p>
                      <p className="text-sm text-muted-foreground font-medium">
                        {player.user.position}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-xl text-primary">
                        {player.stats.goals}
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
                <Button
                  className="w-full justify-start bg-primary/10 hover:bg-primary/20 text-primary dark:text-primary-foreground border border-primary/20 font-semibold"
                  asChild
                >
                  <Link to="/teams">
                    <Users className="w-4 h-4 mr-3" />
                    Find Teams
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start bg-orange-600/10 hover:bg-orange-600/20 text-orange-600 dark:text-orange-400 border border-orange-600/20 dark:border-orange-400/20 font-semibold"
                  asChild
                >
                  <Link to="/matches">
                    <Calendar className="w-4 h-4 mr-3" />
                    Create Match
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-600/20 dark:border-blue-400/20 font-semibold"
                  asChild
                >
                  <Link to="/leaderboard">
                    <Trophy className="w-4 h-4 mr-3" />
                    View Leaderboards
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
