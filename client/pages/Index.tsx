import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WhyFootHeroes } from "@/components/WhyFootHeroes";
import {
  Trophy,
  Users,
  Calendar,
  BarChart3,
  Target,
  Share2,
  ArrowRight,
  Play,
  TrendingUp,
  Medal,
  Clock,
  Zap,
  Sparkles,
  Star,
  ChevronDown,
} from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: Calendar,
      title: "Match Scheduling",
      description:
        "Organize and schedule matches with your local football community",
      color: "text-blue-600",
      bgColor: "bg-blue-600/10",
      accent: "border-blue-600/20",
    },
    {
      icon: Users,
      title: "Team Management",
      description:
        "Create teams, manage rosters, and track player availability",
      color: "text-green-600",
      bgColor: "bg-green-600/10",
      accent: "border-green-600/20",
    },
    {
      icon: BarChart3,
      title: "Performance Stats",
      description: "Track goals, assists, cards, and detailed match statistics",
      color: "text-orange-600",
      bgColor: "bg-orange-600/10",
      accent: "border-orange-600/20",
    },
    {
      icon: Trophy,
      title: "Leaderboards",
      description:
        "Compete with rankings for top scorers, assists, and team performance",
      color: "text-yellow-600",
      bgColor: "bg-yellow-600/10",
      accent: "border-yellow-600/20",
    },
    {
      icon: Target,
      title: "Player Profiles",
      description:
        "Build comprehensive profiles showcasing your football journey",
      color: "text-purple-600",
      bgColor: "bg-purple-600/10",
      accent: "border-purple-600/20",
    },
    {
      icon: Share2,
      title: "Social Sharing",
      description: "Share achievements and match highlights with the community",
      color: "text-pink-600",
      bgColor: "bg-pink-600/10",
      accent: "border-pink-600/20",
    },
  ];

  const stats = [
    { number: "10K+", label: "Active Players", icon: Users },
    { number: "2.5K+", label: "Teams Created", icon: Trophy },
    { number: "25K+", label: "Matches Played", icon: Calendar },
    { number: "500+", label: "Local Leagues", icon: Medal },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-32 min-h-screen">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            controls={false}
            playsInline
            loop
            className="w-full h-full object-cover"
          >
            <source
              type="video/mp4"
              src="https://cdn.builder.io/o/assets%2F5864ef68dddb458fa0d50361ad4fac0e%2F3eae9c35ab7946a0ba49b9cd6ded3c0a?alt=media&token=32b672e4-46ab-4e43-9529-432c7fa02efd&apiKey=5864ef68dddb458fa0d50361ad4fac0e"
            />
          </video>
          {/* Enhanced dark overlay with sporty gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-primary/20"></div>
          {/* Athletic pattern overlay */}
          <div className="absolute inset-0 bg-hexagon-pattern opacity-20"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full gradient-sporty-primary opacity-20 animate-pulse-sporty"></div>
        <div className="absolute top-40 right-20 w-16 h-16 rounded-full gradient-sporty-secondary opacity-30 animate-bounce-in-sporty"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 rounded-full bg-football-orange/30 animate-pulse-sporty"></div>

        {/* Content overlay */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center animate-bounce-in-sporty">
            <Badge
              variant="secondary"
              className="mb-6 glass-morphism border-primary/30 text-white backdrop-blur-xl shadow-sporty animate-pulse-sporty"
            >
              <Trophy className="w-4 h-4 mr-2 text-football-green" />
              For Amateur & Local Football
              <Sparkles className="w-4 h-4 ml-2 text-football-orange" />
            </Badge>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight drop-shadow-2xl">
              Welcome to
              <span className="block text-white drop-shadow-2xl">
                FootHeroes
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-lg font-medium">
              The ultimate platform for grassroots football heroes. Organize
              matches, track performance, build teams, and connect with your
              local football community.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button
                size="lg"
                className="gradient-sporty-primary hover:shadow-sporty-lg px-10 py-4 text-lg font-bold text-white border-0 transform transition-all duration-300 hover:scale-110 shadow-2xl"
              >
                <Zap className="w-6 h-6 mr-3" />
                Get Started Free
                <Star className="w-5 h-5 ml-3" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-10 py-4 text-lg border-3 border-white/30 text-white hover:bg-white hover:text-gray-900 glass-morphism backdrop-blur-xl font-bold transform transition-all duration-300 hover:scale-105"
              >
                <Play className="w-6 h-6 mr-3" />
                Sign In
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="group glass-morphism backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-primary/40 transform transition-all duration-500 hover:scale-105 shadow-sporty animate-bounce-in-sporty"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-12 h-12 gradient-sporty-primary rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="text-3xl md:text-4xl font-black text-white mb-2 neon-sporty group-hover:text-football-green transition-colors duration-300">
                      {stat.number}
                    </div>
                    <div className="text-sm md:text-base text-white/80 font-semibold">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <ChevronDown className="w-8 h-8 text-white/60" />
            </div>
          </div>
        </div>

        {/* Athletic field lines decoration */}
        <svg
          className="absolute bottom-0 left-0 w-full h-32 opacity-20"
          viewBox="0 0 1200 100"
          fill="none"
        >
          <path
            d="M0 50 Q300 20 600 50 T1200 50"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-white animate-pulse"
          />
          <path
            d="M0 60 Q400 30 800 60 T1200 60"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            className="text-primary animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </svg>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <Badge
              variant="outline"
              className="mb-6 border-primary/30 text-primary font-bold px-6 py-2"
            >
              <Target className="w-4 h-4 mr-2" />
              Core Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 text-sporty-gradient">
              Everything You Need for Local Football
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium">
              From match organization to performance tracking, FootHeroes
              provides all the tools to elevate your grassroots football
              experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className={`group border-0 shadow-sporty-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1 glass-morphism ${feature.accent} overflow-hidden animate-slide-in-diagonal`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="relative">
                    <div className="absolute top-0 right-0 w-20 h-20 gradient-sporty-secondary rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <div
                      className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-sporty relative z-10`}
                    >
                      <Icon className={`w-8 h-8 ${feature.color}`} />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                      {feature.description}
                    </CardDescription>
                  </CardContent>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 gradient-sporty-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-lg"></div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why FootHeroes Section */}
      <WhyFootHeroes />

      {/* How It Works */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full gradient-sporty-primary opacity-10 animate-pulse-sporty"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full gradient-sporty-secondary opacity-10 animate-pulse-sporty"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <Badge
              variant="outline"
              className="mb-6 border-football-orange/30 text-football-orange font-bold px-6 py-2"
            >
              <Zap className="w-4 h-4 mr-2" />
              Simple Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 text-sporty-gradient">
              How FootHeroes Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium">
              Get started in minutes and transform your local football
              experience with our streamlined process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                icon: Users,
                title: "Create Your Profile",
                description:
                  "Set up your player profile and join or create teams in your area.",
                color: "bg-primary",
                iconColor: "text-primary-foreground",
              },
              {
                step: "02",
                icon: Calendar,
                title: "Schedule Matches",
                description:
                  "Organize games with other teams and manage your match calendar.",
                color: "bg-foreground",
                iconColor: "text-background",
              },
              {
                step: "03",
                icon: TrendingUp,
                title: "Track & Improve",
                description:
                  "Monitor your performance, climb leaderboards, and celebrate achievements.",
                color: "bg-primary",
                iconColor: "text-primary-foreground",
              },
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="text-center group animate-bounce-in-sporty"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="relative mb-8">
                    <div
                      className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center mx-auto shadow-sporty-lg group-hover:scale-110 transition-all duration-300`}
                    >
                      <Icon className={`w-10 h-10 ${step.iconColor}`} />
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-background border-2 border-primary rounded-full flex items-center justify-center text-xs font-black text-primary">
                      {step.step}
                    </div>
                    {/* Connection line */}
                    {index < 2 && (
                      <div className="hidden md:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-primary/50 to-football-blue/50 transform translate-x-4"></div>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-black via-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 bg-hexagon-pattern opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-black/10 to-black/20"></div>

        {/* Floating sports elements */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-pulse-sporty">
          ⚽
        </div>
        <div className="absolute top-40 right-20 text-4xl opacity-30 animate-bounce-in-sporty">
          🏆
        </div>
        <div className="absolute bottom-20 left-1/4 text-5xl opacity-25 animate-pulse-sporty">
          🥅
        </div>
        <div className="absolute bottom-40 right-10 text-3xl opacity-20 animate-bounce-in-sporty">
          👟
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Badge
            variant="secondary"
            className="mb-8 bg-white/20 text-white border-white/30 backdrop-blur-sm font-bold px-6 py-3"
          >
            <Star className="w-4 h-4 mr-2" />
            Join the Revolution
          </Badge>

          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            Ready to Become a <span className="neon-sporty">FootHero?</span>
          </h2>

          <p className="text-xl md:text-2xl mb-12 opacity-90 font-medium max-w-3xl mx-auto">
            Join thousands of players already using FootHeroes to organize,
            compete, and improve their game. Start your journey today!
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Link to="/dashboard">
              <Button
                size="lg"
                variant="secondary"
                className="px-12 py-4 text-lg bg-white text-primary hover:bg-gray-100 font-bold border-0 transform transition-all duration-300 hover:scale-110 shadow-2xl"
              >
                <Medal className="w-6 h-6 mr-3" />
                Get Started Free
                <Sparkles className="w-5 h-5 ml-3" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="px-12 py-4 text-lg border-2 border-white/30 text-white hover:bg-white hover:text-primary font-bold glass-morphism backdrop-blur-xl transform transition-all duration-300 hover:scale-105"
            >
              <Clock className="w-6 h-6 mr-3" />
              Schedule Demo
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="glass-morphism backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl font-black">Free</div>
              <div className="text-sm opacity-80">to join</div>
            </div>
            <div className="glass-morphism backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl font-black">No</div>
              <div className="text-sm opacity-80">credit card required</div>
            </div>
            <div className="glass-morphism backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl font-black">Start</div>
              <div className="text-sm opacity-80">in minutes</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
