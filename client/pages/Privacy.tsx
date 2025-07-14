import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground text-lg">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>FootHeroes Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">
                1. Information We Collect
              </h2>
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Personal Information</h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>Name, email address, and username</li>
                  <li>Profile information (position, skill level, location)</li>
                  <li>Optional bio and profile photo</li>
                </ul>
                <h3 className="text-lg font-medium">Activity Data</h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>Match statistics and performance data</li>
                  <li>Team memberships and match participation</li>
                  <li>Platform usage and interaction data</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                2. How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide and maintain the FootHeroes service</li>
                <li>Connect you with other players and teams</li>
                <li>Track and display your match statistics</li>
                <li>Send important service-related notifications</li>
                <li>Improve our platform and user experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                3. Information Sharing
              </h2>
              <p className="text-muted-foreground mb-3">
                We do not sell your personal information. We may share your data
                in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  With other users as part of the platform functionality (e.g.,
                  team rosters, match participants)
                </li>
                <li>When required by law or legal process</li>
                <li>
                  With service providers who help us operate the platform (under
                  strict confidentiality)
                </li>
                <li>
                  In the event of a business transfer or merger (with notice to
                  users)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate security measures to protect your
                personal information against unauthorized access, alteration,
                disclosure, or destruction. However, no method of transmission
                over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                5. Your Privacy Rights
              </h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Access and review your personal information</li>
                <li>Correct inaccurate or outdated information</li>
                <li>Delete your account and associated data</li>
                <li>Control privacy settings for your profile</li>
                <li>Opt out of non-essential communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Cookies</h2>
              <p className="text-muted-foreground">
                We use cookies and similar technologies to enhance your
                experience, analyze usage patterns, and provide personalized
                content. You can control cookie settings through your browser
                preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                7. Children's Privacy
              </h2>
              <p className="text-muted-foreground">
                FootHeroes is not intended for children under 13. We do not
                knowingly collect personal information from children under 13.
                If you believe we have collected such information, please
                contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">
                8. Third-Party Services
              </h2>
              <p className="text-muted-foreground">
                Our platform may contain links to third-party services. We are
                not responsible for the privacy practices of these external
                sites. Please review their privacy policies separately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">9. Policy Updates</h2>
              <p className="text-muted-foreground">
                We may update this privacy policy from time to time. We will
                notify users of significant changes via email or platform
                notification. Continued use of FootHeroes after changes
                constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">10. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions about this Privacy Policy or our data
                practices, please contact us at privacy@footheroes.com or
                through our support channels.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
