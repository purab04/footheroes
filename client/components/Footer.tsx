import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Users,
  Calendar,
  BarChart3,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Heart,
  Zap,
  Target,
  Star,
} from "lucide-react";

export function Footer() {
  const footerLinks = {
    Platform: [
      { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
      { name: "Matches", href: "/matches", icon: Calendar },
      { name: "Teams", href: "/teams", icon: Users },
      { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
    ],
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Blog", href: "/blog" },
    ],
    Support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
    Connect: [
      { name: "Community", href: "/community" },
      { name: "Events", href: "/events" },
      { name: "Partners", href: "/partners" },
      { name: "API", href: "/api" },
    ],
  };

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-blue-400" },
    {
      name: "Facebook",
      icon: Facebook,
      href: "#",
      color: "hover:text-blue-600",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "#",
      color: "hover:text-pink-500",
    },
    { name: "YouTube", icon: Youtube, href: "#", color: "hover:text-red-500" },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "#",
      color: "hover:text-blue-700",
    },
  ];

  const achievements = [
    { number: "10K+", label: "Active Users", icon: Users },
    { number: "500+", label: "Teams", icon: Trophy },
    { number: "25K+", label: "Matches", icon: Target },
    { number: "98%", label: "Satisfaction", icon: Star },
  ];

  return (
    <footer className="bg-background border-t border-border/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-1 gradient-sporty-primary"></div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
        {/* Top Section */}
        <div className="grid lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="relative">
                <div className="w-12 h-12 gradient-sporty-primary rounded-xl flex items-center justify-center shadow-sporty transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Trophy className="w-7 h-7 text-white" />
                </div>
                <div className="absolute inset-0 w-12 h-12 border-2 border-primary/30 rounded-xl animate-ping"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-sporty-gradient">
                  FootHeroes
                </span>
                <span className="text-sm text-muted-foreground font-medium -mt-1">
                  Pro Sports Platform
                </span>
              </div>
            </Link>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
              The ultimate platform for grassroots football heroes. Connect,
              compete, and celebrate your football journey with players
              worldwide.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors duration-300">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="font-medium">hello@footheroes.com</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors duration-300">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="font-medium">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors duration-300">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="font-medium">Global Sports HQ</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-bold text-foreground mb-6 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-primary" />
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="group flex items-center space-x-2 text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1"
                      >
                        {Icon && (
                          <Icon className="w-4 h-4 opacity-60 group-hover:opacity-100" />
                        )}
                        <span className="font-medium">{link.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div
                key={index}
                className="group glass-morphism-dark backdrop-blur-sm rounded-xl p-6 border border-border/30 hover:border-primary/40 transform transition-all duration-500 hover:scale-105 text-center"
              >
                <div className="w-12 h-12 gradient-sporty-primary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-black text-primary mb-1">
                  {achievement.number}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {achievement.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Newsletter Section */}
        <div className="mb-16">
          <div className="max-w-2xl mx-auto text-center glass-morphism-dark backdrop-blur-sm rounded-2xl p-8 border border-border/30">
            <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center justify-center">
              <Star className="w-6 h-6 mr-2 text-football-orange" />
              Stay in the Game
            </h3>
            <p className="text-muted-foreground mb-6 text-lg">
              Get the latest updates, match insights, and exclusive features
              delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 backdrop-blur-sm"
              />
              <Button className="bg-green-600 hover:bg-green-700 hover:shadow-lg font-bold text-white border-0 px-6 py-3">
                <Zap className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="text-center mb-12">
          <h3 className="text-lg font-bold text-foreground mb-6">
            Join Our Community
          </h3>
          <div className="flex justify-center space-x-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  className={`w-12 h-12 bg-muted/50 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${social.color} group`}
                  aria-label={social.name}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <span>© 2024 FootHeroes. Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>for football lovers worldwide.</span>
            </div>

            <div className="flex items-center space-x-6">
              <Link
                to="/privacy"
                className="text-muted-foreground hover:text-primary dark:hover:text-primary-foreground transition-colors duration-300 font-medium"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-muted-foreground hover:text-primary dark:hover:text-primary-foreground transition-colors duration-300 font-medium"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="text-muted-foreground hover:text-primary dark:hover:text-primary-foreground transition-colors duration-300 font-medium"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <Button
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-green-600 hover:bg-green-700 hover:shadow-lg rounded-full w-14 h-14 shadow-2xl transform transition-all duration-300 hover:scale-110"
            title="Scroll to top"
          >
            <Zap className="w-6 h-6 text-white" />
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 gradient-sporty-primary opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 gradient-sporty-secondary opacity-5 rounded-full blur-2xl"></div>

      {/* Athletic field lines decoration */}
      <svg
        className="absolute bottom-0 left-0 w-full h-16 opacity-10"
        viewBox="0 0 1200 50"
        fill="none"
      >
        <path
          d="M0 25 Q300 10 600 25 T1200 25"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          className="text-primary"
        />
        <path
          d="M0 35 Q400 20 800 35 T1200 35"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          className="text-football-green"
        />
      </svg>
    </footer>
  );
}
