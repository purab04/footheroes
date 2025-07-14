import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
} from "lucide-react";

const features = [
  {
    id: 1,
    icon: Play,
    title: "Live Scoring",
    description:
      "Get instant updates on ongoing matches with real-time scoring and match events.",
    color: "bg-green-600",
    iconColor: "text-white",
    position: { top: "10%", left: "50%" }, // 12 o'clock
  },
  {
    id: 2,
    icon: BarChart3,
    title: "Match Statistics",
    description:
      "Explore detailed player performances and match outcomes with professional scorecards.",
    color: "bg-gray-800 dark:bg-gray-200",
    iconColor: "text-white dark:text-black",
    position: { top: "25%", left: "75%" }, // 2 o'clock
  },
  {
    id: 3,
    icon: Trophy,
    title: "Organize Tournaments",
    description:
      "Seamlessly organize tournaments and plan football events better than ever before.",
    color: "bg-yellow-600",
    iconColor: "text-white",
    position: { top: "50%", left: "90%" }, // 3 o'clock
  },
  {
    id: 4,
    icon: Video,
    title: "Live Streaming",
    description:
      "Get real-time football match updates with integrated live streaming capabilities.",
    color: "bg-gray-600 dark:bg-gray-400",
    iconColor: "text-white dark:text-black",
    position: { top: "75%", left: "75%" }, // 4 o'clock
  },
  {
    id: 5,
    icon: ShoppingBag,
    title: "The Gear Store",
    description:
      "Explore customized football merchandise and equipment with The Gear Store.",
    color: "bg-blue-600",
    iconColor: "text-white",
    position: { top: "90%", left: "50%" }, // 6 o'clock
  },
  {
    id: 6,
    icon: Medal,
    title: "Leaderboards",
    description:
      "Track and compare your football stats with other players, showcasing top performances.",
    color: "bg-gray-800 dark:bg-gray-200",
    iconColor: "text-white dark:text-black",
    position: { top: "75%", left: "25%" }, // 8 o'clock
  },
  {
    id: 7,
    icon: TrendingUp,
    title: "FootInsights",
    description:
      "Get in-depth analysis of matches, players and opponents with advanced analytics.",
    color: "bg-orange-600",
    iconColor: "text-white",
    position: { top: "50%", left: "10%" }, // 9 o'clock
  },
  {
    id: 8,
    icon: Sparkles,
    title: "AI Highlights",
    description:
      "Football's AI-Generated Highlights for your matches—no manual edits, just ready-to-share moments!",
    color: "bg-gray-600 dark:bg-gray-400",
    iconColor: "text-white dark:text-black",
    position: { top: "25%", left: "25%" }, // 10 o'clock
  },
  {
    id: 9,
    icon: Search,
    title: "Player Finder",
    description:
      "Find players, opponent teams, referees and match officials with our advanced search.",
    color: "bg-purple-600",
    iconColor: "text-white",
    position: { top: "15%", left: "35%" }, // 11 o'clock
  },
  {
    id: 10,
    icon: Users,
    title: "Football Community",
    description:
      "Enter the world of the entire Football Community and unite with passionate players.",
    color: "bg-gray-800 dark:bg-gray-200",
    iconColor: "text-white dark:text-black",
    position: { top: "15%", left: "65%" }, // 1 o'clock
  },
];

export function WhyFootHeroes() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <Badge
            variant="outline"
            className="mb-6 border-green-500/30 text-green-600 dark:text-green-400 font-semibold px-6 py-2 bg-green-50 dark:bg-green-950/50"
          >
            <Target className="w-4 h-4 mr-2" />
            Why Choose FootHeroes?
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Everything You Need in{" "}
            <span className="text-green-600 dark:text-green-400">
              One Platform
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover the comprehensive features that make FootHeroes the
            ultimate choice for football enthusiasts and professionals alike.
          </p>
        </div>

        {/* Interactive Football Layout */}
        <div className="relative w-full max-w-5xl mx-auto mb-20">
          {/* Central Football */}
          <div className="relative w-80 h-80 md:w-96 md:h-96 mx-auto">
            {/* Modern Football Design */}
            <div className="absolute inset-0 rounded-full shadow-2xl overflow-hidden">
              {/* 3D Football Effect */}
              <div className="w-full h-full relative">
                {/* Base gradient background */}
                <div
                  className="w-full h-full rounded-full relative"
                  style={{
                    background: `
                    radial-gradient(circle at 30% 30%, #fff 0%, #f0f0f0 35%, #e0e0e0 70%, #d0d0d0 100%),
                    radial-gradient(circle at 70% 70%, rgba(0,0,0,0.1) 0%, transparent 50%)
                  `,
                    boxShadow: `
                    inset -20px -20px 40px rgba(0,0,0,0.1),
                    inset 20px 20px 40px rgba(255,255,255,0.9),
                    0 20px 40px rgba(0,0,0,0.2)
                  `,
                  }}
                >
                  {/* Classic football pentagon patterns */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `
                      radial-gradient(circle at 40% 25%, black 12%, transparent 13%),
                      radial-gradient(circle at 60% 25%, black 12%, transparent 13%),
                      radial-gradient(circle at 30% 50%, black 12%, transparent 13%),
                      radial-gradient(circle at 70% 50%, black 12%, transparent 13%),
                      radial-gradient(circle at 50% 70%, black 12%, transparent 13%)
                    `,
                    }}
                  ></div>

                  {/* Hexagon pattern overlay */}
                  <div
                    className="absolute inset-0 rounded-full opacity-60"
                    style={{
                      background: `
                      conic-gradient(from 0deg at 50% 50%, 
                        transparent 0deg, 
                        black 60deg, 
                        transparent 72deg,
                        transparent 108deg,
                        black 168deg,
                        transparent 180deg,
                        transparent 216deg,
                        black 276deg,
                        transparent 288deg,
                        transparent 324deg
                      )
                    `,
                      clipPath: "circle(35% at 50% 50%)",
                    }}
                  ></div>

                  {/* Football center highlight */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-8xl md:text-9xl transform transition-all duration-500 hover:scale-110 hover:rotate-12 filter drop-shadow-lg">
                      ⚽
                    </div>
                  </div>

                  {/* Shine effect */}
                  <div
                    className="absolute top-4 left-4 w-16 h-16 rounded-full opacity-30"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Animated rings with colors */}
            <div className="absolute inset-0 border-2 border-green-500/20 rounded-full animate-pulse"></div>
            <div
              className="absolute inset-4 border border-blue-500/20 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute inset-8 border border-orange-500/20 rounded-full animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          {/* Feature Points */}
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isHovered = hoveredFeature === feature.id;
            const isSelected = selectedFeature === feature.id;

            return (
              <div key={feature.id} className="absolute">
                {/* Feature Point */}
                <div
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 ${
                    isHovered || isSelected
                      ? "scale-150 z-30"
                      : "scale-100 z-10"
                  }`}
                  style={{
                    top: feature.position.top,
                    left: feature.position.left,
                  }}
                  onMouseEnter={() => setHoveredFeature(feature.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  onClick={() =>
                    setSelectedFeature(
                      selectedFeature === feature.id ? null : feature.id,
                    )
                  }
                >
                  <div
                    className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center shadow-xl border-4 border-white dark:border-gray-800 relative transition-all duration-500 ${
                      isHovered || isSelected
                        ? "shadow-2xl ring-4 ring-current/30"
                        : ""
                    }`}
                  >
                    <Icon
                      className={`w-8 h-8 ${feature.iconColor} transition-all duration-500 ${
                        isHovered || isSelected ? "scale-110" : ""
                      }`}
                    />

                    {/* Glow effect */}
                    <div
                      className={`absolute inset-0 rounded-full transition-all duration-500 ${
                        isHovered || isSelected
                          ? "bg-white/20 dark:bg-black/20 animate-pulse"
                          : ""
                      }`}
                    ></div>
                  </div>

                  {/* Feature Number */}
                  <div
                    className={`absolute -top-2 -right-2 w-7 h-7 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-xs font-bold border-2 border-gray-200 dark:border-gray-600 transition-all duration-500 ${
                      isHovered || isSelected
                        ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white scale-110"
                        : ""
                    }`}
                  >
                    {String(feature.id).padStart(2, "0")}
                  </div>

                  {/* Connection Line to Center */}
                  <div
                    className={`absolute top-1/2 left-1/2 w-px h-24 bg-gradient-to-b from-transparent via-border to-transparent transform -translate-x-1/2 pointer-events-none transition-all duration-500 ${
                      isHovered || isSelected
                        ? "h-32 via-current"
                        : "opacity-30"
                    }`}
                  ></div>
                </div>

                {/* Feature Details Popup */}
                {(isHovered || isSelected) && (
                  <div
                    className="absolute z-40 w-80 bg-background/95 backdrop-blur-xl rounded-xl shadow-2xl border border-border p-6 transform transition-all duration-500 animate-in slide-in-from-bottom-4"
                    style={{
                      top: `calc(${feature.position.top} + 80px)`,
                      left:
                        feature.position.left === "50%"
                          ? "50%"
                          : parseInt(feature.position.left) > 50
                            ? `calc(${feature.position.left} - 320px)`
                            : feature.position.left,
                      transform:
                        feature.position.left === "50%"
                          ? "translateX(-50%)"
                          : "none",
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-foreground">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>

                    {/* Arrow pointing to feature */}
                    <div
                      className="absolute w-4 h-4 bg-background/95 transform rotate-45 border-l border-t border-border"
                      style={{
                        top: "-8px",
                        left:
                          feature.position.left === "50%"
                            ? "50%"
                            : parseInt(feature.position.left) > 50
                              ? "280px"
                              : "20px",
                        transform:
                          feature.position.left === "50%"
                            ? "translateX(-50%) rotate(45deg)"
                            : "rotate(45deg)",
                      }}
                    ></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Stats Section */}
        <div className="text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
            <div className="group">
              <div className="text-3xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                10+
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                Core Features
              </div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                Support
              </div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-orange-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                100%
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                Reliable
              </div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                Free
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                To Start
              </div>
            </div>
          </div>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hover over any feature point to learn more.{" "}
            <span className="text-green-600 font-semibold">
              Click to pin details.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
