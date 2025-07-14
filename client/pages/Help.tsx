import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Search,
  Users,
  Calendar,
  Trophy,
  Settings,
  Shield,
} from "lucide-react";

export default function Help() {
  const categories = [
    {
      icon: Users,
      title: "Getting Started",
      description: "Learn the basics of FootHeroes",
    },
    {
      icon: Calendar,
      title: "Matches & Scheduling",
      description: "Organize and join football matches",
    },
    {
      icon: Users,
      title: "Teams & Players",
      description: "Create teams and connect with players",
    },
    {
      icon: Trophy,
      title: "Stats & Leaderboards",
      description: "Track performance and rankings",
    },
    {
      icon: Settings,
      title: "Account Settings",
      description: "Manage your profile and preferences",
    },
    {
      icon: Shield,
      title: "Safety & Guidelines",
      description: "Community guidelines and safety tips",
    },
  ];

  const faqs = [
    {
      question: "How do I create an account?",
      answer:
        "Click 'Sign Up' in the top navigation, fill out your details including your position and skill level, and you'll be ready to start connecting with other players!",
    },
    {
      question: "How do I find players in my area?",
      answer:
        "Use the location filter on the Players page to find other football enthusiasts near you. You can also filter by skill level and position to find the perfect match.",
    },
    {
      question: "Can I create my own team?",
      answer:
        "Absolutely! Go to the Teams page and click 'Create Team'. You'll need to provide a team name, description, location, and set your team's skill level and maximum member count.",
    },
    {
      question: "How do I schedule a match?",
      answer:
        "From your dashboard or the Matches page, click 'Schedule Match'. You'll need to select two teams, set the date, time, location, and duration. Both team captains will be notified.",
    },
    {
      question: "How are player stats calculated?",
      answer:
        "Player statistics are updated after each match by team captains or match organizers. This includes goals, assists, cards, and overall performance ratings.",
    },
    {
      question: "What if a player doesn't show up to a match?",
      answer:
        "Team captains can mark players as no-shows in the match results. Repeated no-shows may affect a player's reliability rating on their profile.",
    },
    {
      question: "How do I join a team?",
      answer:
        "Browse teams that are recruiting on the Teams page. Click 'Join Team' on any team that matches your skill level and location. The team captain will review your request.",
    },
    {
      question: "Can I leave a team?",
      answer:
        "Yes, you can leave a team at any time from your dashboard or the team's page. Note that team captains cannot leave their own teams - they must transfer captaincy first.",
    },
    {
      question: "What happens if a match gets cancelled?",
      answer:
        "Match organizers can cancel matches, and all participants will be notified. Cancelled matches don't affect player statistics or team standings.",
    },
    {
      question: "How do I report inappropriate behavior?",
      answer:
        "You can report players or teams through their profile pages. We take community guidelines seriously and will investigate all reports promptly.",
    },
    {
      question: "Is FootHeroes free to use?",
      answer:
        "Yes! FootHeroes is completely free for all players. We believe in making football accessible to everyone in the community.",
    },
    {
      question: "How do I update my skill level?",
      answer:
        "You can update your skill level and other profile information from your account settings. This helps us match you with players of similar abilities.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find answers to common questions and learn how to make the most of
            FootHeroes
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for help articles..."
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Help Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-primary" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Still Need Help */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Still Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Can't find what you're looking for? Our support team is here to
              help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <a href="/contact">Contact Support</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:support@footheroes.com">Email Us</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
