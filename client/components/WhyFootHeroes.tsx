import { useState } from "react";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";

const features = [
  {
    id: 1,
    icon: Play,
    title: "Live Scoring",
    description:
      "Get instant updates on ongoing matches with real-time scoring and match events.",
    color: "bg-football-green",
    position: { top: "10%", left: "50%" },
  },
  {
    id: 2,
    icon: BarChart3,
    title: "Match Statistics",
    description:
      "Explore detailed player performances and match outcomes with professional scorecards.",
    color: "bg-football-blue",
    position: { top: "25%", left: "80%" },
  },
  {
    id: 3,
    icon: Trophy,
    title: "Organize Tournaments",
    description:
      "Seamlessly organize tournaments and plan football events better than ever before.",
    color: "bg-football-orange",
    position: { top: "50%", left: "90%" },
  },
  {
    id: 4,
    icon: Video,
    title: "Live Streaming",
    description:
      "Get real-time football match updates with integrated live streaming capabilities.",
    color: "bg-purple-500",
    position: { top: "75%", left: "80%" },
  },
  {
    id: 5,
    icon: ShoppingBag,
    title: "The Gear Store",
    description:
      "Explore customized football merchandise and equipment with The Gear Store.",
    color: "bg-pink-500",
    position: { top: "90%", left: "50%" },
  },
  {
    id: 6,
    icon: Medal,
    title: "Leaderboards",
    description:
      "Track and compare your football stats with other players, showcasing top performances.",
    color: "bg-yellow-500",
    position: { top: "75%", left: "20%" },
  },
  {
    id: 7,
    icon: TrendingUp,
    title: "FootInsights",
    description:
      "Get in-depth analysis of matches, players and opponents with advanced analytics.",
    color: "bg-cyan-500",
    position: { top: "50%", left: "10%" },
  },
  {
    id: 8,
    icon: Sparkles,
    title: "AI Highlights",
    description:
      "Football's AI-Generated Highlights for your matches—no manual edits, just ready-to-share moments!",
    color: "bg-indigo-500",
    position: { top: "25%", left: "20%" },
  },
  {
    id: 9,
    icon: Search,
    title: "Player Finder",
    description:
      "Find players, opponent teams, referees and match officials with our advanced search.",
    color: "bg-emerald-500",
    position: { top: "15%", left: "35%" },
  },
  {
    id: 10,
    icon: Users,
    title: "Football Community",
    description:
      "Enter the world of the entire Football Community and unite with passionate players.",
    color: "bg-rose-500",
    position: { top: "15%", left: "65%" },
  },
];

export function WhyFootHeroes() {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-4 bg-primary/10 text-primary border-primary/20"
          >
            Why Choose FootHeroes?
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Everything You Need in One Platform
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the comprehensive features that make FootHeroes the
            ultimate choice for football enthusiasts and professionals alike.
          </p>
        </div>

        {/* Interactive Circular Layout */}
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Central Football Image */}
          <div className="relative w-80 h-80 md:w-96 md:h-96 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-football-green to-football-blue rounded-full p-8 shadow-2xl">
              <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                <div className="text-6xl md:text-8xl">⚽</div>
              </div>
            </div>

            {/* Animated rings */}
            <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-ping"></div>
            <div className="absolute inset-4 border border-football-green/30 rounded-full animate-pulse"></div>
          </div>

          {/* Feature Points */}
          {features.map((feature) => {
            const Icon = feature.icon;
            const isActive =
              activeFeature === feature.id || hoveredFeature === feature.id;

            return (
              <div key={feature.id} className="absolute group">
                {/* Feature Badge */}
                <div
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                    isActive ? "scale-125 z-20" : "scale-100 z-10"
                  }`}
                  style={{
                    top: feature.position.top,
                    left: feature.position.left,
                  }}
                  onMouseEnter={() => setHoveredFeature(feature.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  onClick={() =>
                    setActiveFeature(
                      activeFeature === feature.id ? null : feature.id,
                    )
                  }
                >
                  <div
                    className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-white dark:border-gray-800`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Feature Number */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-xs font-bold border-2 border-gray-200 dark:border-gray-600">
                    {String(feature.id).padStart(2, "0")}
                  </div>

                  {/* Connection Line */}
                  <div className="absolute top-1/2 left-1/2 w-px h-20 bg-gradient-to-b from-transparent via-gray-300 to-transparent transform -translate-x-1/2 pointer-events-none opacity-30"></div>
                </div>

                {/* Feature Details Popup */}
                {isActive && (
                  <div
                    className="absolute z-30 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-6 transform transition-all duration-300 animate-in slide-in-from-bottom-4"
                    style={{
                      top: `calc(${feature.position.top} + 60px)`,
                      left:
                        feature.position.left === "50%"
                          ? "50%"
                          : parseInt(feature.position.left) > 50
                            ? `calc(${feature.position.left} - 300px)`
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
                        <Icon className="w-6 h-6 text-white" />
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
                      className="absolute w-4 h-4 bg-white dark:bg-gray-800 transform rotate-45 border-l border-t border-gray-200 dark:border-gray-700"
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

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Experience all these features and more with FootHeroes
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {features.map((feature, index) => (
              <Badge
                key={feature.id}
                variant="outline"
                className={`cursor-pointer transition-all duration-200 ${
                  hoveredFeature === feature.id || activeFeature === feature.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "hover:bg-muted"
                }`}
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
                onClick={() =>
                  setActiveFeature(
                    activeFeature === feature.id ? null : feature.id,
                  )
                }
              >
                {String(feature.id).padStart(2, "0")} {feature.title}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
