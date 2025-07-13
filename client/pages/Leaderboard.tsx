import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, TrendingUp, Award } from "lucide-react";

export default function Leaderboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-8 h-8 text-yellow-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Leaderboard</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Compete with players across leagues, track your rankings, and climb
            to the top of the leaderboards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-yellow-600 hover:bg-yellow-600/90 text-white">
              <TrendingUp className="w-4 h-4 mr-2" />
              View Rankings
            </Button>
            <Button variant="outline">
              <Award className="w-4 h-4 mr-2" />
              My Achievements
            </Button>
          </div>
          <Card className="max-w-md mx-auto mt-12">
            <CardHeader>
              <CardTitle className="text-lg">Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Comprehensive leaderboards for goals, assists, clean sheets,
                team rankings, and achievement systems will be available soon.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
