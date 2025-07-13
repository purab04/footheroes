import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Play,
  BarChart3,
  Trophy,
  Video,
  ShoppingBag,
  Medal,
  TrendingUp,
  Sparkles,
  Search,
  Users,
  Target,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    id: 1,
    icon: Play,
    title: "Live Scoring",
    description:
      "Get instant updates on ongoing matches with real-time scoring and match events.",
    color: "text-football-green",
    bgColor: "bg-football-green/10",
    borderColor: "border-football-green/20",
  },
  {
    id: 2,
    icon: BarChart3,
    title: "Match Statistics",
    description:
      "Explore detailed player performances and match outcomes with professional scorecards.",
    color: "text-football-blue",
    bgColor: "bg-football-blue/10",
    borderColor: "border-football-blue/20",
  },
  {
    id: 3,
    icon: Trophy,
    title: "Organize Tournaments",
    description:
      "Seamlessly organize tournaments and plan football events better than ever before.",
    color: "text-football-orange",
    bgColor: "bg-football-orange/10",
    borderColor: "border-football-orange/20",
  },
  {
    id: 4,
    icon: Video,
    title: "Live Streaming",
    description:
      "Get real-time football match updates with integrated live streaming capabilities.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
  },
  {
    id: 5,
    icon: ShoppingBag,
    title: "The Gear Store",
    description:
      "Explore customized football merchandise and equipment with The Gear Store.",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/20",
  },
  {
    id: 6,
    icon: Medal,
    title: "Leaderboards",
    description:
      "Track and compare your football stats with other players, showcasing top performances.",
    color: "text-yellow-600",
    bgColor: "bg-yellow-600/10",
    borderColor: "border-yellow-600/20",
  },
  {
    id: 7,
    icon: TrendingUp,
    title: "FootInsights",
    description:
      "Get in-depth analysis of matches, players and opponents with advanced analytics.",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
  },
  {
    id: 8,
    icon: Sparkles,
    title: "AI Highlights",
    description:
      "Football's AI-Generated Highlights for your matches—no manual edits, just ready-to-share moments!",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
  },
  {
    id: 9,
    icon: Search,
    title: "Player Finder",
    description:
      "Find players, opponent teams, referees and match officials with our advanced search.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
  },
  {
    id: 10,
    icon: Users,
    title: "Football Community",
    description:
      "Enter the world of the entire Football Community and unite with passionate players.",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/20",
  },
];

export function WhyFootHeroes() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <Badge
            variant="outline"
            className="mb-6 border-primary/30 text-primary font-semibold px-6 py-2"
          >
            <Target className="w-4 h-4 mr-2" />
            Why Choose FootHeroes?
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Everything You Need in{" "}
            <span className="text-primary">One Platform</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover the comprehensive features that make FootHeroes the
            ultimate choice for football enthusiasts and professionals alike.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isHovered = hoveredFeature === feature.id;

            return (
              <Card
                key={feature.id}
                className={`group border-0 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-card/50 backdrop-blur-sm ${
                  isHovered ? "scale-105" : ""
                }`}
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110`}
                    >
                      <Icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-muted-foreground">
                        {String(feature.id).padStart(2, "0")}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {feature.description}
                  </p>
                  <div className="flex items-center mt-4 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span>Learn more</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom Stats Section */}
        <div className="text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
            <div className="group">
              <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                10+
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                Core Features
              </div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-football-orange mb-2 group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                Support
              </div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-football-blue mb-2 group-hover:scale-110 transition-transform duration-300">
                100%
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                Reliable
              </div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-green-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                Free
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                To Start
              </div>
            </div>
          </div>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience all these features and more with FootHeroes.{" "}
            <span className="text-primary font-semibold">
              Start your journey today.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
