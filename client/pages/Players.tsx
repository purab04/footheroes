import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, UserPlus, Search } from "lucide-react";

export default function Players() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-football-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-8 h-8 text-football-orange" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Players</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover talented players in your area, build your network, and
            connect with the football community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-football-orange hover:bg-football-orange/90">
              <UserPlus className="w-4 h-4 mr-2" />
              Invite Players
            </Button>
            <Button variant="outline">
              <Search className="w-4 h-4 mr-2" />
              Search Players
            </Button>
          </div>
          <Card className="max-w-md mx-auto mt-12">
            <CardHeader>
              <CardTitle className="text-lg">Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Player directory, detailed profiles, performance comparisons,
                and recruitment features will be available soon.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
