import { Activity } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { listRecentEvents } from "@/lib/db/audit";

export const dynamic = "force-dynamic";

const SOURCE_VARIANTS: Record<string, "default" | "secondary" | "outline"> = {
  user: "default",
  budget: "secondary",
  film: "outline",
};

function formatWhen(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AuditLogsPage() {
  const events = await listRecentEvents(40);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit Logs"
        description="Recent activity reconstructed from users, budget, and films tables."
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent events ({events.length})
          </CardTitle>
          <CardDescription>
            <code>
              SELECT … FROM users UNION ALL SELECT … FROM budget UNION ALL SELECT
              … FROM films ORDER BY occurred_at DESC
            </code>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {events.length === 0 ? (
            <p className="text-sm text-muted-foreground">No events to show.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-xs uppercase text-muted-foreground">
                    <th className="py-2 pr-3 font-medium">Source</th>
                    <th className="py-2 pr-3 font-medium">When</th>
                    <th className="py-2 pr-3 font-medium">Actor</th>
                    <th className="py-2 pr-3 font-medium">Summary</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((e, i) => (
                    <tr key={i} className="border-b last:border-b-0">
                      <td className="py-3 pr-3">
                        <Badge variant={SOURCE_VARIANTS[e.source] ?? "outline"}>
                          {e.source}
                        </Badge>
                      </td>
                      <td className="py-3 pr-3 text-muted-foreground">
                        {formatWhen(e.occurred_at)}
                      </td>
                      <td className="py-3 pr-3 font-medium">{e.actor}</td>
                      <td className="py-3 pr-3 text-muted-foreground">
                        {e.summary}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
