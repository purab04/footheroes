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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  MapPin,
  Star,
  Search,
  Trophy,
  Target,
  Users,
  MessageCircle,
} from "lucide-react";
import { LeaderboardEntry } from "@shared/types";
import { useToast } from "@/hooks/use-toast";

export default function Players() {
  const { toast } = useToast();
  const [players, setPlayers] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [skillLevelFilter, setSkillLevelFilter] = useState("");

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      setIsLoading(true);
      const response = await api.getPlayerLeaderboard();
      if (response.success && response.data) {
        setPlayers(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch players:", error);
      toast({
        title: "Error",
        description: "Failed to load players",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPlayers = players.filter((player) => {
    const matchesSearch =
      `${player.user.firstName} ${player.user.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      player.user.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPosition =
      !positionFilter || player.user.position === positionFilter;

    const matchesSkillLevel =
      !skillLevelFilter || player.user.skillLevel === skillLevelFilter;

    return matchesSearch && matchesPosition && matchesSkillLevel;
  });

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "intermediate":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "advanced":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "professional":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case "goalkeeper":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "defender":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "midfielder":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "forward":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 gradient-sporty-primary rounded-2xl flex items-center justify-center shadow-sporty">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-sporty-gradient mb-2">
                Players
              </h1>
              <p className="text-xl text-muted-foreground">
                Connect with football players in your community
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search players by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select
                value={positionFilter || "all"}
                onValueChange={(value) =>
                  setPositionFilter(value === "all" ? "" : value)
                }
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  <SelectItem value="goalkeeper">Goalkeeper</SelectItem>
                  <SelectItem value="defender">Defender</SelectItem>
                  <SelectItem value="midfielder">Midfielder</SelectItem>
                  <SelectItem value="forward">Forward</SelectItem>
                  <SelectItem value="any">Any Position</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={skillLevelFilter || "all"}
                onValueChange={(value) =>
                  setSkillLevelFilter(value === "all" ? "" : value)
                }
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Skill Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-sporty-lg glass-morphism-dark">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-foreground">
                      {players.length}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">
                      Total Players
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
                      {players.reduce(
                        (acc, player) => acc + player.stats.goals,
                        0,
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">
                      Goals Scored
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sporty-lg glass-morphism-dark">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-600/10 rounded-lg flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-foreground">
                      {players.reduce(
                        (acc, player) => acc + player.stats.matchesPlayed,
                        0,
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">
                      Matches Played
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sporty-lg glass-morphism-dark">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-foreground">
                      {players.length > 0
                        ? (
                            players.reduce(
                              (acc, player) => acc + player.stats.rating,
                              0,
                            ) / players.length
                          ).toFixed(1)
                        : "0.0"}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">
                      Avg Rating
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Players Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-32 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredPlayers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlayers.map((player) => (
              <Card
                key={player.user.id}
                className="group hover:shadow-lg transition-all duration-300 border-0 glass-morphism-dark"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                        {player.user.firstName} {player.user.lastName}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {player.user.bio || "No bio available"}
                      </CardDescription>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      {player.user.location}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-bold text-yellow-600 dark:text-yellow-400">
                        {player.stats.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge className={getPositionColor(player.user.position)}>
                      {player.user.position}
                    </Badge>
                    <Badge
                      className={getSkillLevelColor(player.user.skillLevel)}
                    >
                      {player.user.skillLevel}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-border/30">
                    <div className="text-center">
                      <p className="text-lg font-bold text-primary">
                        {player.stats.goals}
                      </p>
                      <p className="text-xs text-muted-foreground">Goals</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                        {player.stats.assists}
                      </p>
                      <p className="text-xs text-muted-foreground">Assists</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {player.stats.matchesPlayed}
                      </p>
                      <p className="text-xs text-muted-foreground">Matches</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>League Rank</span>
                      <span className="font-bold">#{player.rank}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Win Rate</span>
                      <span className="font-bold text-green-600 dark:text-green-400">
                        {Math.round(
                          (player.stats.wins /
                            (player.stats.matchesPlayed || 1)) *
                            100,
                        )}
                        %
                      </span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full" variant="outline">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No players found</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm || positionFilter || skillLevelFilter
                ? "Try adjusting your search criteria"
                : "No players have joined yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
