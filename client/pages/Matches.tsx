import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Plus, Filter } from "lucide-react";

export default function Matches() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-football-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-8 h-8 text-football-blue" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Matches</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Schedule matches, track results, and manage your football calendar
            all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-football-blue hover:bg-football-blue/90">
              <Plus className="w-4 h-4 mr-2" />
              Schedule Match
            </Button>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter Matches
            </Button>
          </div>
          <Card className="max-w-md mx-auto mt-12">
            <CardHeader>
              <CardTitle className="text-lg">Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Match scheduling, result tracking, fixture management, and
                calendar integration features will be available soon.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
