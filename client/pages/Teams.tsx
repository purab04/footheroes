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
  Users,
  MapPin,
  Star,
  Plus,
  Search,
  Filter,
  Trophy,
  Clock,
  Target,
  UserPlus,
  AlertCircle,
} from "lucide-react";
import { Team, SearchFilters } from "@shared/types";
import { useToast } from "@/hooks/use-toast";

export default function Teams() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({});
  const [createTeamOpen, setCreateTeamOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [newTeam, setNewTeam] = useState({
    name: "",
    description: "",
    location: "",
    skillLevel: "",
    maxMembers: 15,
  });

  useEffect(() => {
    fetchTeams();
  }, [filters]);

  const fetchTeams = async () => {
    try {
      setIsLoading(true);
      const response = await api.getTeams(filters);
      if (response.success && response.data) {
        setTeams(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch teams:", error);
      toast({
        title: "Error",
        description: "Failed to load teams",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create a team",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsCreating(true);
      const response = await api.createTeam(newTeam as any);
      if (response.success) {
        toast({
          title: "Team created!",
          description: "Your team has been created successfully",
        });
        setCreateTeamOpen(false);
        setNewTeam({
          name: "",
          description: "",
          location: "",
          skillLevel: "",
          maxMembers: 15,
        });
        fetchTeams();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create team",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoinTeam = async (teamId: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to join a team",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await api.joinTeam(teamId, user?.position || "any");
      if (response.success) {
        toast({
          title: "Joined team!",
          description: "You have successfully joined the team",
        });
        fetchTeams();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join team",
        variant: "destructive",
      });
    }
  };

  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-black text-sporty-gradient mb-2">
                Teams
              </h1>
              <p className="text-xl text-muted-foreground">
                Find and join football teams in your area
              </p>
            </div>
            <Dialog open={createTeamOpen} onOpenChange={setCreateTeamOpen}>
              <DialogTrigger asChild>
                <Button className="gradient-sporty-primary font-bold text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Team
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Team</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateTeam} className="space-y-4">
                  <div>
                    <Label htmlFor="teamName">Team Name</Label>
                    <Input
                      id="teamName"
                      value={newTeam.name}
                      onChange={(e) =>
                        setNewTeam({ ...newTeam, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="teamLocation">Location</Label>
                    <Input
                      id="teamLocation"
                      value={newTeam.location}
                      onChange={(e) =>
                        setNewTeam({ ...newTeam, location: e.target.value })
                      }
                      placeholder="e.g., London, UK"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="teamSkillLevel">Skill Level</Label>
                    <Select
                      value={newTeam.skillLevel}
                      onValueChange={(value) =>
                        setNewTeam({ ...newTeam, skillLevel: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select skill level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="professional">
                          Professional
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="maxMembers">Maximum Members</Label>
                    <Input
                      id="maxMembers"
                      type="number"
                      min="5"
                      max="30"
                      value={newTeam.maxMembers}
                      onChange={(e) =>
                        setNewTeam({
                          ...newTeam,
                          maxMembers: parseInt(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="teamDescription">
                      Description (Optional)
                    </Label>
                    <Textarea
                      id="teamDescription"
                      value={newTeam.description}
                      onChange={(e) =>
                        setNewTeam({ ...newTeam, description: e.target.value })
                      }
                      placeholder="Tell us about your team..."
                      rows={3}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={
                      isCreating ||
                      !newTeam.name ||
                      !newTeam.location ||
                      !newTeam.skillLevel
                    }
                  >
                    {isCreating ? "Creating..." : "Create Team"}
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
                placeholder="Search teams by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select
                value={filters.skillLevel || ""}
                onValueChange={(value) =>
                  setFilters({
                    ...filters,
                    skillLevel: value || undefined,
                  })
                }
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Skill Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filters.isRecruiting?.toString() || ""}
                onValueChange={(value) =>
                  setFilters({
                    ...filters,
                    isRecruiting: value ? value === "true" : undefined,
                  })
                }
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Recruiting" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Teams</SelectItem>
                  <SelectItem value="true">Recruiting</SelectItem>
                  <SelectItem value="false">Not Recruiting</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Teams Grid */}
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
        ) : filteredTeams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeams.map((team) => (
              <Card
                key={team.id}
                className="group hover:shadow-lg transition-all duration-300 border-0 glass-morphism-dark"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                        {team.name}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {team.description || "No description available"}
                      </CardDescription>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      {team.location}
                    </span>
                    <Badge className={getSkillLevelColor(team.skillLevel)}>
                      {team.skillLevel}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-muted-foreground">
                      <Users className="w-4 h-4 mr-1" />
                      {team.members.length}/{team.maxMembers} members
                    </span>
                    {team.isRecruiting ? (
                      <Badge
                        variant="default"
                        className="bg-green-500/20 text-green-400 border-green-500/30"
                      >
                        Recruiting
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Full</Badge>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Trophy className="w-4 h-4 mr-2" />
                      <span>
                        Captain: {team.captain.firstName}{" "}
                        {team.captain.lastName}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4">
                    {team.isRecruiting && isAuthenticated ? (
                      <Button
                        onClick={() => handleJoinTeam(team.id)}
                        className="w-full"
                        variant="outline"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Join Team
                      </Button>
                    ) : !team.isRecruiting ? (
                      <Button className="w-full" variant="outline" disabled>
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Not Recruiting
                      </Button>
                    ) : (
                      <Button className="w-full" variant="outline" disabled>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Sign In to Join
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No teams found</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm || Object.keys(filters).length > 0
                ? "Try adjusting your search criteria"
                : "Be the first to create a team in your area"}
            </p>
            <Dialog open={createTeamOpen} onOpenChange={setCreateTeamOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Team
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
}
