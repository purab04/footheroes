import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground text-lg">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>FootHeroes Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground">
                By accessing and using FootHeroes, you accept and agree to be
                bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                2. Description of Service
              </h2>
              <p className="text-muted-foreground">
                FootHeroes is a platform designed for amateur and local football
                players to organize matches, track performance, create teams,
                and build community connections.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                3. User Responsibilities
              </h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  Provide accurate and truthful information when creating your
                  profile
                </li>
                <li>Respect other players and maintain good sportsmanship</li>
                <li>
                  Use the platform responsibly and in accordance with local laws
                </li>
                <li>
                  Not engage in any form of harassment, discrimination, or
                  inappropriate behavior
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                4. Match Organization
              </h2>
              <p className="text-muted-foreground">
                Users are responsible for organizing matches safely and ensuring
                proper facilities and equipment. FootHeroes is not liable for
                any injuries or incidents that occur during matches organized
                through the platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                5. Privacy and Data
              </h2>
              <p className="text-muted-foreground">
                Your privacy is important to us. Please review our Privacy
                Policy to understand how we collect, use, and protect your
                personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                6. Account Termination
              </h2>
              <p className="text-muted-foreground">
                We reserve the right to terminate or suspend accounts that
                violate these terms or engage in behavior that is harmful to the
                community.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                7. Liability Disclaimer
              </h2>
              <p className="text-muted-foreground">
                FootHeroes provides a platform for connecting players but is not
                responsible for the safety, quality, or outcomes of matches
                organized through the service. Users participate at their own
                risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                8. Changes to Terms
              </h2>
              <p className="text-muted-foreground">
                We may update these terms from time to time. Users will be
                notified of significant changes, and continued use of the
                service constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                9. Contact Information
              </h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please
                contact us at support@footheroes.com.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
