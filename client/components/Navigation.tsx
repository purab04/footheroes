import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthModal } from "@/components/auth/AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Menu,
  X,
  Trophy,
  Users,
  Calendar,
  BarChart3,
  User,
  Zap,
  Target,
  LogOut,
  Settings,
} from "lucide-react";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">(
    "login",
  );
  const { user, isAuthenticated, logout } = useAuth();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Matches", href: "/matches", icon: Calendar },
    { name: "Teams", href: "/teams", icon: Users },
    { name: "Players", href: "/players", icon: User },
    { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  ];

  return (
    <>
      <nav className="bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sporty sticky top-0 z-50 glass-morphism-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 gradient-sporty-primary rounded-xl flex items-center justify-center shadow-sporty transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                {/* Animated ring around logo */}
                <div className="absolute inset-0 w-10 h-10 border-2 border-primary/30 rounded-xl animate-ping"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-foreground tracking-tight">
                  FootHeroes
                </span>
                <span className="text-xs text-muted-foreground font-medium -mt-1">
                  Pro Sports Platform
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="group relative px-4 py-2 rounded-lg transition-all duration-300 hover:bg-primary/10"
                  >
                    <div className="flex items-center space-x-2 text-foreground/80 group-hover:text-primary dark:group-hover:text-primary-foreground transition-colors duration-300">
                      <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                      <span className="font-semibold">{item.name}</span>
                    </div>
                    {/* Hover indicator */}
                    <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-football-green to-football-blue transition-all duration-300 group-hover:w-8 group-hover:-translate-x-1/2"></div>
                    {/* Active state background */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 to-football-blue/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-3">
              <ThemeToggle />

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {user?.firstName?.[0]}
                          {user?.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setAuthModalTab("login");
                      setAuthModalOpen(true);
                    }}
                    className="border-2 border-primary/20 hover:border-primary/40 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 font-semibold"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => {
                      setAuthModalTab("register");
                      setAuthModalOpen(true);
                    }}
                    className="bg-green-600 hover:bg-green-700 hover:shadow-lg transition-all duration-300 hover:scale-105 font-bold text-white border-0"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Get Started
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 hover:bg-primary/10 transition-all duration-300"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-foreground" />
                ) : (
                  <Menu className="w-6 h-6 text-foreground" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-border/50 py-4 glass-morphism-dark rounded-b-xl mt-2 animate-slide-in-diagonal">
              <div className="flex flex-col space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="group flex items-center space-x-3 px-4 py-3 rounded-lg text-foreground/80 hover:text-primary dark:hover:text-primary-foreground hover:bg-primary/10 transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-semibold">{item.name}</span>
                      <Target className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  );
                })}

                <div className="pt-4 border-t border-border/30 flex flex-col space-y-3">
                  <div className="flex justify-center">
                    <ThemeToggle />
                  </div>

                  {isAuthenticated ? (
                    <div className="space-y-2">
                      <div className="px-4 py-2 text-center">
                        <p className="text-sm font-medium">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={logout}
                        className="w-full"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Log out
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setAuthModalTab("login");
                          setAuthModalOpen(true);
                          setIsMenuOpen(false);
                        }}
                        className="w-full border-2 border-primary/20 hover:border-primary/40 bg-background/50 backdrop-blur-sm font-semibold"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Sign In
                      </Button>

                      <Button
                        size="sm"
                        onClick={() => {
                          setAuthModalTab("register");
                          setAuthModalOpen(true);
                          setIsMenuOpen(false);
                        }}
                        className="w-full bg-green-600 hover:bg-green-700 hover:shadow-lg font-bold text-white border-0"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Get Started
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Animated bottom border */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      </nav>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
    </>
  );
}
