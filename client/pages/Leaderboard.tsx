import { useEffect, useState } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy,
  Medal,
  Star,
  Users,
  Target,
  TrendingUp,
  Award,
  Crown,
  Zap,
} from "lucide-react";
import { LeaderboardEntry, TeamLeaderboardEntry } from "@shared/types";
import { useToast } from "@/hooks/use-toast";

export default function Leaderboard() {
  const { toast } = useToast();
  const [playerLeaderboard, setPlayerLeaderboard] = useState<
    LeaderboardEntry[]
  >([]);
  const [teamLeaderboard, setTeamLeaderboard] = useState<
    TeamLeaderboardEntry[]
  >([]);
  const [isLoadingPlayers, setIsLoadingPlayers] = useState(true);
  const [isLoadingTeams, setIsLoadingTeams] = useState(true);

  useEffect(() => {
    fetchPlayerLeaderboard();
    fetchTeamLeaderboard();
  }, []);

  const fetchPlayerLeaderboard = async () => {
    try {
      setIsLoadingPlayers(true);
      const response = await api.getPlayerLeaderboard();
      if (response.success && response.data) {
        setPlayerLeaderboard(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch player leaderboard:", error);
      toast({
        title: "Error",
        description: "Failed to load player leaderboard",
        variant: "destructive",
      });
    } finally {
      setIsLoadingPlayers(false);
    }
  };

  const fetchTeamLeaderboard = async () => {
    try {
      setIsLoadingTeams(true);
      const response = await api.getTeamLeaderboard();
      if (response.success && response.data) {
        setTeamLeaderboard(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch team leaderboard:", error);
      toast({
        title: "Error",
        description: "Failed to load team leaderboard",
        variant: "destructive",
      });
    } finally {
      setIsLoadingTeams(false);
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-black font-black text-lg shadow-lg">
          <Crown className="w-6 h-6" />
        </div>
      );
    } else if (rank === 2) {
      return (
        <div className="w-12 h-12 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg">
          {rank}
        </div>
      );
    } else if (rank === 3) {
      return (
        <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg">
          {rank}
        </div>
      );
    } else {
      return (
        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-foreground font-black text-lg">
          {rank}
        </div>
      );
    }
  };

  const PlayerLeaderboardContent = () => (
    <div className="space-y-4">
      {isLoadingPlayers ? (
        [...Array(10)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
        ))
      ) : playerLeaderboard.length > 0 ? (
        playerLeaderboard.map((entry, index) => (
          <Card
            key={entry.user.id}
            className={`group hover:shadow-lg transition-all duration-300 border-0 glass-morphism-dark ${
              entry.rank <= 3 ? "ring-2 ring-primary/20" : ""
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-6">
                {getRankBadge(entry.rank)}

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {entry.user.firstName} {entry.user.lastName}
                  </h3>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge
                      variant="outline"
                      className="capitalize text-sm font-medium"
                    >
                      {entry.user.position}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="capitalize text-sm font-medium"
                    >
                      {entry.user.skillLevel}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {entry.user.location}
                    </span>
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-2xl font-black text-primary">
                        {entry.stats.goals}
                      </p>
                      <p className="text-xs text-muted-foreground font-medium">
                        Goals
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-black text-orange-600 dark:text-orange-400">
                        {entry.stats.assists}
                      </p>
                      <p className="text-xs text-muted-foreground font-medium">
                        Assists
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-black text-blue-600 dark:text-blue-400">
                        {entry.stats.matchesPlayed}
                      </p>
                      <p className="text-xs text-muted-foreground font-medium">
                        Matches
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-xl font-black text-yellow-600 dark:text-yellow-400">
                          {entry.stats.rating.toFixed(1)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground font-medium">
                        Rating
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center py-12">
          <Trophy className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No players yet</h3>
          <p className="text-muted-foreground">
            Be the first to play and get on the leaderboard!
          </p>
        </div>
      )}
    </div>
  );

  const TeamLeaderboardContent = () => (
    <div className="space-y-4">
      {isLoadingTeams ? (
        [...Array(10)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
        ))
      ) : teamLeaderboard.length > 0 ? (
        teamLeaderboard.map((entry, index) => (
          <Card
            key={entry.team.id}
            className={`group hover:shadow-lg transition-all duration-300 border-0 glass-morphism-dark ${
              entry.rank <= 3 ? "ring-2 ring-primary/20" : ""
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-6">
                {getRankBadge(entry.rank)}

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {entry.team.name}
                  </h3>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge
                      variant="outline"
                      className="capitalize text-sm font-medium"
                    >
                      {entry.team.skillLevel}
                    </Badge>
                    <span className="text-sm text-muted-foreground flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {entry.team.members.length} members
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {entry.team.location}
                    </span>
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-2xl font-black text-primary">
                        {entry.points}
                      </p>
                      <p className="text-xs text-muted-foreground font-medium">
                        Points
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-foreground">
                        {entry.wins}-{entry.draws}-{entry.losses}
                      </p>
                      <p className="text-xs text-muted-foreground font-medium">
                        W-D-L
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">
                        {entry.goalsFor}
                      </p>
                      <p className="text-xs text-muted-foreground font-medium">
                        Goals For
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-red-600 dark:text-red-400">
                        {entry.goalsAgainst}
                      </p>
                      <p className="text-xs text-muted-foreground font-medium">
                        Goals Against
                      </p>
                    </div>
                    <div className="text-center">
                      <p
                        className={`text-lg font-bold ${
                          entry.goalDifference >= 0
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {entry.goalDifference >= 0 ? "+" : ""}
                        {entry.goalDifference}
                      </p>
                      <p className="text-xs text-muted-foreground font-medium">
                        Goal Diff
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center py-12">
          <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No teams yet</h3>
          <p className="text-muted-foreground">
            Create a team and start playing to appear on the leaderboard!
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 gradient-sporty-primary rounded-2xl flex items-center justify-center shadow-sporty">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-sporty-gradient mb-2">
                Leaderboards
              </h1>
              <p className="text-xl text-muted-foreground">
                See who's dominating the football scene
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-0 shadow-sporty-lg glass-morphism-dark">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-foreground">
                      {playerLeaderboard.length}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">
                      Active Players
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sporty-lg glass-morphism-dark">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-600/10 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-foreground">
                      {teamLeaderboard.length}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">
                      Teams Competing
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sporty-lg glass-morphism-dark">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-600/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-foreground">
                      {playerLeaderboard.reduce(
                        (acc, player) => acc + player.stats.goals,
                        0,
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">
                      Total Goals Scored
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Leaderboard Tabs */}
        <Card className="border-0 shadow-sporty-lg glass-morphism-dark">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-bold">
              <Medal className="w-6 h-6 mr-3 text-primary" />
              Rankings
              <Award className="w-5 h-5 ml-2 text-yellow-600 dark:text-yellow-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="players" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="players" className="flex items-center">
                  <Star className="w-4 h-4 mr-2" />
                  Player Rankings
                </TabsTrigger>
                <TabsTrigger value="teams" className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Team Standings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="players" className="mt-6">
                <PlayerLeaderboardContent />
              </TabsContent>

              <TabsContent value="teams" className="mt-6">
                <TeamLeaderboardContent />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
