import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Plus, Search } from "lucide-react";

export default function Teams() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Teams</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Manage your teams, discover new ones to join, and connect with the
            local football community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Create Team
            </Button>
            <Button variant="outline">
              <Search className="w-4 h-4 mr-2" />
              Find Teams
            </Button>
          </div>
          <Card className="max-w-md mx-auto mt-12">
            <CardHeader>
              <CardTitle className="text-lg">Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Team management features including roster management, team
                stats, and recruitment tools will be available soon.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
