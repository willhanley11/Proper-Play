import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PlayerProfiles() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Player Profiles</CardTitle>
          <CardDescription>View detailed player statistics and information</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This feature is coming soon. Check back later for detailed player profiles.</p>
        </CardContent>
      </Card>
    </div>
  )
}
