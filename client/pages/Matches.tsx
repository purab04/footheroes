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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  MapPin,
  Clock,
  Plus,
  Search,
  Filter,
  Trophy,
  Users,
  Target,
  Activity,
  Timer,
  AlertCircle,
} from "lucide-react";
import { Match, Team, MatchFilters } from "@shared/types";
import { useToast } from "@/hooks/use-toast";

export default function Matches() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<MatchFilters>({});
  const [createMatchOpen, setCreateMatchOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [newMatch, setNewMatch] = useState({
    title: "",
    description: "",
    homeTeamId: "",
    awayTeamId: "",
    scheduledAt: "",
    duration: 90,
    location: "",
  });

  useEffect(() => {
    fetchMatches();
    fetchTeams();
  }, [filters]);

  const fetchMatches = async () => {
    try {
      setIsLoading(true);
      const response = await api.getMatches(filters);
      if (response.success && response.data) {
        setMatches(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch matches:", error);
      toast({
        title: "Error",
        description: "Failed to load matches",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await api.getTeams();
      if (response.success && response.data) {
        setTeams(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch teams:", error);
    }
  };

  const handleCreateMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create a match",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsCreating(true);
      const response = await api.createMatch({
        ...newMatch,
        scheduledAt: new Date(newMatch.scheduledAt),
      });
      if (response.success) {
        toast({
          title: "Match created!",
          description: "Your match has been scheduled successfully",
        });
        setCreateMatchOpen(false);
        setNewMatch({
          title: "",
          description: "",
          homeTeamId: "",
          awayTeamId: "",
          scheduledAt: "",
          duration: 90,
          location: "",
        });
        fetchMatches();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create match",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const filteredMatches = matches.filter(
    (match) =>
      match.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.homeTeam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.awayTeam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "live":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "completed":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const upcomingMatches = filteredMatches.filter(
    (match) =>
      match.status === "scheduled" && new Date(match.scheduledAt) > new Date(),
  );
  const recentMatches = filteredMatches.filter(
    (match) =>
      match.status === "completed" || new Date(match.scheduledAt) <= new Date(),
  );
  const liveMatches = filteredMatches.filter(
    (match) => match.status === "live",
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-black text-sporty-gradient mb-2">
                Matches
              </h1>
              <p className="text-xl text-muted-foreground">
                Schedule and track football matches
              </p>
            </div>
            <Dialog open={createMatchOpen} onOpenChange={setCreateMatchOpen}>
              <DialogTrigger asChild>
                <Button className="gradient-sporty-primary font-bold text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Match
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Schedule New Match</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateMatch} className="space-y-4">
                  <div>
                    <Label htmlFor="matchTitle">Match Title</Label>
                    <Input
                      id="matchTitle"
                      value={newMatch.title}
                      onChange={(e) =>
                        setNewMatch({ ...newMatch, title: e.target.value })
                      }
                      placeholder="e.g., Sunday League Final"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="homeTeam">Home Team</Label>
                      <Select
                        value={newMatch.homeTeamId}
                        onValueChange={(value) =>
                          setNewMatch({ ...newMatch, homeTeamId: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select home team" />
                        </SelectTrigger>
                        <SelectContent>
                          {teams.map((team) => (
                            <SelectItem key={team.id} value={team.id}>
                              {team.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="awayTeam">Away Team</Label>
                      <Select
                        value={newMatch.awayTeamId}
                        onValueChange={(value) =>
                          setNewMatch({ ...newMatch, awayTeamId: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select away team" />
                        </SelectTrigger>
                        <SelectContent>
                          {teams
                            .filter((team) => team.id !== newMatch.homeTeamId)
                            .map((team) => (
                              <SelectItem key={team.id} value={team.id}>
                                {team.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="scheduledAt">Date & Time</Label>
                    <Input
                      id="scheduledAt"
                      type="datetime-local"
                      value={newMatch.scheduledAt}
                      onChange={(e) =>
                        setNewMatch({
                          ...newMatch,
                          scheduledAt: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={newMatch.location}
                      onChange={(e) =>
                        setNewMatch({ ...newMatch, location: e.target.value })
                      }
                      placeholder="e.g., Central Park Field A"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="30"
                      max="180"
                      value={newMatch.duration}
                      onChange={(e) =>
                        setNewMatch({
                          ...newMatch,
                          duration: parseInt(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="matchDescription">
                      Description (Optional)
                    </Label>
                    <Textarea
                      id="matchDescription"
                      value={newMatch.description}
                      onChange={(e) =>
                        setNewMatch({
                          ...newMatch,
                          description: e.target.value,
                        })
                      }
                      placeholder="Additional details about the match..."
                      rows={3}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={
                      isCreating ||
                      !newMatch.title ||
                      !newMatch.homeTeamId ||
                      !newMatch.awayTeamId ||
                      !newMatch.scheduledAt ||
                      !newMatch.location
                    }
                  >
                    {isCreating ? "Creating..." : "Schedule Match"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search matches by title, team, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select
                value={filters.status || "all"}
                onValueChange={(value) =>
                  setFilters({
                    ...filters,
                    status: value === "all" ? undefined : (value as any),
                  })
                }
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Matches</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="live">Live</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-sporty-lg glass-morphism-dark">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-foreground">
                      {upcomingMatches.length}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">
                      Upcoming
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sporty-lg glass-morphism-dark">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-600/10 rounded-lg flex items-center justify-center">
                    <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-foreground">
                      {liveMatches.length}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">
                      Live Now
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sporty-lg glass-morphism-dark">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-600/10 rounded-lg flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-foreground">
                      {recentMatches.length}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">
                      Completed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sporty-lg glass-morphism-dark">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-foreground">
                      {filteredMatches.length}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">
                      Total Matches
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Matches List */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-24 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredMatches.length > 0 ? (
          <div className="space-y-6">
            {/* Live Matches */}
            {liveMatches.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Activity className="w-6 h-6 mr-2 text-green-500" />
                  Live Matches
                </h2>
                <div className="space-y-4">
                  {liveMatches.map((match) => (
                    <Card
                      key={match.id}
                      className="border-0 shadow-sporty-lg glass-morphism-dark ring-2 ring-green-500/20"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-3">
                              <h3 className="text-xl font-bold text-foreground">
                                {match.title}
                              </h3>
                              <Badge className={getStatusColor(match.status)}>
                                <Activity className="w-3 h-3 mr-1" />
                                {match.status.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-8">
                              <div className="text-center">
                                <p className="font-bold text-lg">
                                  {match.homeTeam.name}
                                </p>
                                <p className="text-2xl font-black text-primary">
                                  {match.homeScore ?? 0}
                                </p>
                              </div>
                              <div className="text-center">
                                <p className="text-sm text-muted-foreground">
                                  VS
                                </p>
                              </div>
                              <div className="text-center">
                                <p className="font-bold text-lg">
                                  {match.awayTeam.name}
                                </p>
                                <p className="text-2xl font-black text-primary">
                                  {match.awayScore ?? 0}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                              <MapPin className="w-4 h-4 mr-1" />
                              {match.location}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Timer className="w-4 h-4 mr-1" />
                              {match.duration} minutes
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Matches */}
            {upcomingMatches.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-blue-500" />
                  Upcoming Matches
                </h2>
                <div className="space-y-4">
                  {upcomingMatches.map((match) => (
                    <Card
                      key={match.id}
                      className="group hover:shadow-lg transition-all duration-300 border-0 glass-morphism-dark"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-3">
                              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                {match.title}
                              </h3>
                              <Badge className={getStatusColor(match.status)}>
                                {match.status.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-8">
                              <div className="text-center">
                                <p className="font-bold text-lg">
                                  {match.homeTeam.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Home
                                </p>
                              </div>
                              <div className="text-center">
                                <p className="text-sm text-muted-foreground">
                                  VS
                                </p>
                              </div>
                              <div className="text-center">
                                <p className="font-bold text-lg">
                                  {match.awayTeam.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Away
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(
                                match.scheduledAt,
                              ).toLocaleDateString()}{" "}
                              at{" "}
                              {new Date(match.scheduledAt).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4 mr-1" />
                              {match.location}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Matches */}
            {recentMatches.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Trophy className="w-6 h-6 mr-2 text-gray-500" />
                  Recent Matches
                </h2>
                <div className="space-y-4">
                  {recentMatches.slice(0, 10).map((match) => (
                    <Card
                      key={match.id}
                      className="group hover:shadow-lg transition-all duration-300 border-0 glass-morphism-dark"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-3">
                              <h3 className="text-xl font-bold text-foreground">
                                {match.title}
                              </h3>
                              <Badge className={getStatusColor(match.status)}>
                                {match.status.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-8">
                              <div className="text-center">
                                <p className="font-bold text-lg">
                                  {match.homeTeam.name}
                                </p>
                                <p className="text-2xl font-black text-primary">
                                  {match.homeScore ?? "-"}
                                </p>
                              </div>
                              <div className="text-center">
                                <p className="text-sm text-muted-foreground">
                                  VS
                                </p>
                              </div>
                              <div className="text-center">
                                <p className="font-bold text-lg">
                                  {match.awayTeam.name}
                                </p>
                                <p className="text-2xl font-black text-primary">
                                  {match.awayScore ?? "-"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(match.scheduledAt).toLocaleDateString()}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4 mr-1" />
                              {match.location}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No matches found</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm || Object.keys(filters).length > 0
                ? "Try adjusting your search criteria"
                : "Be the first to schedule a match"}
            </p>
            <Dialog open={createMatchOpen} onOpenChange={setCreateMatchOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Match
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
}
