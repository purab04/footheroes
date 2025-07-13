import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Pause,
  RotateCcw,
  Zap,
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
    particles: "⚡",
  },
  {
    id: 2,
    icon: BarChart3,
    title: "Match Statistics",
    description:
      "Explore detailed player performances and match outcomes with professional scorecards.",
    color: "bg-football-blue",
    position: { top: "25%", left: "80%" },
    particles: "📊",
  },
  {
    id: 3,
    icon: Trophy,
    title: "Organize Tournaments",
    description:
      "Seamlessly organize tournaments and plan football events better than ever before.",
    color: "bg-football-orange",
    position: { top: "50%", left: "90%" },
    particles: "🏆",
  },
  {
    id: 4,
    icon: Video,
    title: "Live Streaming",
    description:
      "Get real-time football match updates with integrated live streaming capabilities.",
    color: "bg-purple-500",
    position: { top: "75%", left: "80%" },
    particles: "📹",
  },
  {
    id: 5,
    icon: ShoppingBag,
    title: "The Gear Store",
    description:
      "Explore customized football merchandise and equipment with The Gear Store.",
    color: "bg-pink-500",
    position: { top: "90%", left: "50%" },
    particles: "🛍️",
  },
  {
    id: 6,
    icon: Medal,
    title: "Leaderboards",
    description:
      "Track and compare your football stats with other players, showcasing top performances.",
    color: "bg-yellow-500",
    position: { top: "75%", left: "20%" },
    particles: "🥇",
  },
  {
    id: 7,
    icon: TrendingUp,
    title: "FootInsights",
    description:
      "Get in-depth analysis of matches, players and opponents with advanced analytics.",
    color: "bg-cyan-500",
    position: { top: "50%", left: "10%" },
    particles: "📈",
  },
  {
    id: 8,
    icon: Sparkles,
    title: "AI Highlights",
    description:
      "Football's AI-Generated Highlights for your matches—no manual edits, just ready-to-share moments!",
    color: "bg-indigo-500",
    position: { top: "25%", left: "20%" },
    particles: "✨",
  },
  {
    id: 9,
    icon: Search,
    title: "Player Finder",
    description:
      "Find players, opponent teams, referees and match officials with our advanced search.",
    color: "bg-emerald-500",
    position: { top: "15%", left: "35%" },
    particles: "🔍",
  },
  {
    id: 10,
    icon: Users,
    title: "Football Community",
    description:
      "Enter the world of the entire Football Community and unite with passionate players.",
    color: "bg-rose-500",
    position: { top: "15%", left: "65%" },
    particles: "👥",
  },
];

export function WhyFootHeroes() {
  const [activeFeature, setActiveFeature] = useState<number | null>(1);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [currentAutoIndex, setCurrentAutoIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; emoji: string }>
  >([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Auto-rotation effect
  useEffect(() => {
    if (isAutoRotating && isInView) {
      intervalRef.current = setInterval(() => {
        setCurrentAutoIndex((prev) => {
          const next = (prev + 1) % features.length;
          setActiveFeature(features[next].id);

          // Add particle effect when changing
          createParticleEffect(features[next].particles);

          return next;
        });
      }, 3000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isAutoRotating, isInView]);

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Create particle effects
  const createParticleEffect = (emoji: string) => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      emoji,
    }));

    setParticles((prev) => [...prev, ...newParticles]);

    // Remove particles after animation
    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !newParticles.find((np) => np.id === p.id)),
      );
    }, 2000);
  };

  const handleFeatureClick = (featureId: number) => {
    setActiveFeature(activeFeature === featureId ? null : featureId);
    setIsAutoRotating(false);

    const feature = features.find((f) => f.id === featureId);
    if (feature) {
      createParticleEffect(feature.particles);
    }
  };

  const toggleAutoRotation = () => {
    setIsAutoRotating(!isAutoRotating);
  };

  const resetToStart = () => {
    setActiveFeature(1);
    setCurrentAutoIndex(0);
    setIsAutoRotating(true);
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden relative"
    >
      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute text-2xl pointer-events-none z-10 animate-ping"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: "float 2s ease-out forwards",
          }}
        >
          {particle.emoji}
        </div>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Controls */}
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-4 bg-primary/10 text-primary border-primary/20 animate-pulse"
          >
            Why Choose FootHeroes?
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 transform transition-all duration-700 hover:scale-105">
            Everything You Need in One Platform
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover the comprehensive features that make FootHeroes the
            ultimate choice for football enthusiasts and professionals alike.
          </p>

          {/* Interactive Controls */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <Button
              variant={isAutoRotating ? "default" : "outline"}
              size="sm"
              onClick={toggleAutoRotation}
              className="transition-all duration-300 hover:scale-105"
            >
              {isAutoRotating ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause Tour
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start Tour
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetToStart}
              className="transition-all duration-300 hover:scale-105"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => createParticleEffect("🎉")}
              className="transition-all duration-300 hover:scale-105"
            >
              <Zap className="w-4 h-4 mr-2" />
              Celebrate
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-md mx-auto bg-muted rounded-full h-2 mb-4">
            <div
              className="bg-primary rounded-full h-2 transition-all duration-300 ease-out"
              style={{
                width: `${((currentAutoIndex + 1) / features.length) * 100}%`,
              }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Feature {currentAutoIndex + 1} of {features.length}
            {isAutoRotating && " (Auto-playing)"}
          </p>
        </div>

        {/* Interactive Circular Layout */}
        <div className="relative w-full max-w-5xl mx-auto">
          {/* Central Football Image with Enhanced Animations */}
          <div
            className={`relative w-80 h-80 md:w-96 md:h-96 mx-auto transition-all duration-1000 ${
              isInView ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br from-primary via-football-green to-football-blue rounded-full p-8 shadow-2xl transition-all duration-700 ${
                activeFeature ? "animate-pulse" : ""
              }`}
            >
              <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center relative overflow-hidden">
                <div
                  className={`text-6xl md:text-8xl transition-all duration-500 ${
                    activeFeature ? "animate-bounce" : "animate-pulse"
                  }`}
                >
                  ⚽
                </div>

                {/* Rotating rings */}
                <div
                  className="absolute inset-0 border-4 border-white/20 rounded-full animate-spin"
                  style={{ animationDuration: "20s" }}
                ></div>
                <div
                  className="absolute inset-8 border-2 border-primary/30 rounded-full animate-spin"
                  style={{
                    animationDuration: "15s",
                    animationDirection: "reverse",
                  }}
                ></div>
              </div>
            </div>

            {/* Pulsing rings */}
            <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-ping"></div>
            <div className="absolute inset-4 border border-football-green/30 rounded-full animate-pulse"></div>
            <div
              className="absolute inset-8 border border-football-blue/20 rounded-full animate-ping"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          {/* Enhanced Feature Points */}
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isActive =
              activeFeature === feature.id || hoveredFeature === feature.id;
            const isCurrentAuto = isAutoRotating && currentAutoIndex === index;

            return (
              <div key={feature.id} className="absolute group">
                {/* Feature Badge with Enhanced Animations */}
                <div
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 ${
                    isActive || isCurrentAuto
                      ? "scale-150 z-30"
                      : "scale-100 z-10"
                  } ${isInView ? "opacity-100" : "opacity-0"}`}
                  style={{
                    top: feature.position.top,
                    left: feature.position.left,
                    transitionDelay: `${index * 100}ms`,
                    animation: isCurrentAuto ? "pulse 1s infinite" : "",
                  }}
                  onMouseEnter={() => {
                    setHoveredFeature(feature.id);
                    createParticleEffect(feature.particles);
                  }}
                  onMouseLeave={() => setHoveredFeature(null)}
                  onClick={() => handleFeatureClick(feature.id)}
                >
                  <div
                    className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 border-4 border-white dark:border-gray-800 relative overflow-hidden group-hover:animate-bounce ${
                      isCurrentAuto
                        ? "animate-pulse ring-4 ring-primary/50"
                        : ""
                    }`}
                  >
                    <Icon
                      className={`w-8 h-8 text-white transition-all duration-300 ${
                        isActive || isCurrentAuto ? "animate-spin" : ""
                      }`}
                    />

                    {/* Glow effect */}
                    <div
                      className={`absolute inset-0 rounded-full transition-all duration-300 ${
                        isActive || isCurrentAuto
                          ? "bg-white/20 animate-pulse"
                          : ""
                      }`}
                    ></div>
                  </div>

                  {/* Enhanced Feature Number */}
                  <div
                    className={`absolute -top-2 -right-2 w-6 h-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-xs font-bold border-2 border-gray-200 dark:border-gray-600 transition-all duration-300 ${
                      isActive || isCurrentAuto
                        ? "animate-bounce bg-primary text-white border-primary"
                        : ""
                    }`}
                  >
                    {String(feature.id).padStart(2, "0")}
                  </div>

                  {/* Dynamic Connection Line */}
                  <div
                    className={`absolute top-1/2 left-1/2 w-px h-20 bg-gradient-to-b from-transparent via-gray-300 to-transparent transform -translate-x-1/2 pointer-events-none transition-all duration-500 ${
                      isActive || isCurrentAuto
                        ? "h-32 via-primary animate-pulse"
                        : "opacity-30"
                    }`}
                  ></div>
                </div>

                {/* Enhanced Feature Details Popup */}
                {(isActive || isCurrentAuto) && (
                  <div
                    className="absolute z-40 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 transform transition-all duration-500 animate-in slide-in-from-bottom-4 backdrop-blur-sm bg-white/95 dark:bg-gray-800/95"
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
                        className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center flex-shrink-0 animate-pulse`}
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

                        {/* Progress indicator for auto-playing */}
                        {isCurrentAuto && (
                          <div className="mt-3">
                            <div className="w-full bg-muted rounded-full h-1">
                              <div className="bg-primary rounded-full h-1 transition-all duration-3000 ease-linear w-full"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Enhanced Arrow */}
                    <div
                      className="absolute w-4 h-4 bg-white dark:bg-gray-800 transform rotate-45 border-l border-t border-gray-200 dark:border-gray-700 animate-pulse"
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

        {/* Enhanced Interactive Badges */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Experience all these features and more with FootHeroes
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {features.map((feature, index) => {
              const isCurrentFeature = activeFeature === feature.id;
              const isCurrentAuto =
                isAutoRotating && currentAutoIndex === index;

              return (
                <Badge
                  key={feature.id}
                  variant="outline"
                  className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    hoveredFeature === feature.id ||
                    isCurrentFeature ||
                    isCurrentAuto
                      ? "bg-primary text-primary-foreground border-primary scale-110 animate-pulse"
                      : "hover:bg-muted"
                  }`}
                  onMouseEnter={() => setHoveredFeature(feature.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  onClick={() => handleFeatureClick(feature.id)}
                >
                  {String(feature.id).padStart(2, "0")} {feature.title}
                  {(isCurrentFeature || isCurrentAuto) && (
                    <span className="ml-2 animate-bounce">✨</span>
                  )}
                </Badge>
              );
            })}
          </div>

          {/* Feature Counter */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-2xl mx-auto">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {features.slice(0, num * 2).length}+
                </div>
                <div className="text-xs text-muted-foreground">
                  {num === 1
                    ? "Core"
                    : num === 2
                      ? "Advanced"
                      : num === 3
                        ? "Pro"
                        : num === 4
                          ? "Premium"
                          : "Ultimate"}{" "}
                  Features
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(-30px) scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-60px) scale(0.8);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
