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
import {
  Trophy,
  Users,
  Calendar,
  BarChart3,
  Target,
  Share2,
  Star,
  ArrowRight,
  CheckCircle,
  Play,
  TrendingUp,
  Medal,
  Clock,
} from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: Calendar,
      title: "Match Scheduling",
      description:
        "Organize and schedule matches with your local football community",
      color: "text-football-blue",
    },
    {
      icon: Users,
      title: "Team Management",
      description:
        "Create teams, manage rosters, and track player availability",
      color: "text-primary",
    },
    {
      icon: BarChart3,
      title: "Performance Stats",
      description: "Track goals, assists, cards, and detailed match statistics",
      color: "text-football-orange",
    },
    {
      icon: Trophy,
      title: "Leaderboards",
      description:
        "Compete with rankings for top scorers, assists, and team performance",
      color: "text-yellow-600",
    },
    {
      icon: Target,
      title: "Player Profiles",
      description:
        "Build comprehensive profiles showcasing your football journey",
      color: "text-purple-600",
    },
    {
      icon: Share2,
      title: "Social Sharing",
      description: "Share achievements and match highlights with the community",
      color: "text-pink-600",
    },
  ];

  const stats = [
    { number: "10K+", label: "Active Players" },
    { number: "2.5K+", label: "Teams Created" },
    { number: "25K+", label: "Matches Played" },
    { number: "500+", label: "Local Leagues" },
  ];

  const testimonials = [
    {
      name: "Alex Rodriguez",
      role: "Team Captain",
      content:
        "FootHeroes has transformed how we organize our local league. The stats tracking is incredible!",
      rating: 5,
    },
    {
      name: "Sarah Johnson",
      role: "League Coordinator",
      content:
        "Managing multiple teams and tournaments has never been easier. The platform is intuitive and powerful.",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Amateur Player",
      content:
        "I love tracking my progress and competing on the leaderboards. It's addictive in the best way!",
      rating: 5,
    },
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
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content overlay */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <Badge
              variant="secondary"
              className="mb-6 bg-white/90 text-primary border-primary/20 backdrop-blur-sm"
            >
              <Trophy className="w-3 h-3 mr-1" />
              For Amateur & Local Football
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Welcome to
              <span className="block text-primary drop-shadow-lg">
                FootHeroes
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Organize matches, track performance, build teams, and connect with
              your local football community. The ultimate platform for
              grassroots football heroes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 px-8 py-3 text-lg shadow-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Get Started Free
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-3 text-lg border-2 border-white text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm"
              >
                Sign In
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                >
                  <div className="text-3xl font-bold text-white mb-1 drop-shadow-lg">
                    {stat.number}
                  </div>
                  <div className="text-sm text-white/80 drop-shadow-md">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need for Local Football
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <CardHeader>
                    <div
                      className={`w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How FootHeroes Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes and transform your local football
              experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                1. Create Your Profile
              </h3>
              <p className="text-muted-foreground">
                Set up your player profile and join or create teams in your
                area.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-football-orange rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                2. Schedule Matches
              </h3>
              <p className="text-muted-foreground">
                Organize games with other teams and manage your match calendar.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-football-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                3. Track & Improve
              </h3>
              <p className="text-muted-foreground">
                Monitor your performance, climb leaderboards, and celebrate
                achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loved by Football Communities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what players and organizers are saying about FootHeroes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-football-green text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Become a FootHero?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of players already using FootHeroes to organize,
            compete, and improve their game.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-3 text-lg bg-white text-primary hover:bg-gray-100"
              >
                <Medal className="w-5 h-5 mr-2" />
                Get Started Free
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-primary"
            >
              <Clock className="w-5 h-5 mr-2" />
              Schedule Demo
            </Button>
          </div>
          <p className="text-sm mt-6 opacity-75">
            Free to join • No credit card required • Start organizing in minutes
          </p>
        </div>
      </section>
    </div>
  );
}
