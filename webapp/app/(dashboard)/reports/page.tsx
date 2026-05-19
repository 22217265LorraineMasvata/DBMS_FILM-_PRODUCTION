import {
  BarChart3,
  Film,
  Users,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  getTotals,
  getFilmsByStatus,
  getFilmFinancials,
} from "@/lib/db/reports";

export const dynamic = "force-dynamic";

function money(value: string | null) {
  if (!value) return "$0";
  const n = Number(value);
  if (!Number.isFinite(n)) return value;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

export default async function ReportsPage() {
  const [totals, byStatus, financials] = await Promise.all([
    getTotals(),
    getFilmsByStatus(),
    getFilmFinancials(),
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Cross-table aggregates pulled directly from the database."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Films"
          value={totals.total_films}
          description={`${totals.active_films} active`}
          icon={Film}
        />
        <StatCard
          title="Users"
          value={totals.total_users}
          description={`${totals.active_users} active`}
          icon={Users}
        />
        <StatCard
          title="Total Budget"
          value={money(totals.total_budget)}
          description={`${money(totals.total_spent)} spent`}
          icon={DollarSign}
        />
        <StatCard
          title="Revenue"
          value={money(totals.total_revenue)}
          description="Sum of budget.revenue"
          icon={TrendingUp}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Films by status
            </CardTitle>
            <CardDescription>
              <code>SELECT status, COUNT(*) FROM films GROUP BY status</code>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs uppercase text-muted-foreground">
                  <th className="py-2 pr-3 font-medium">Status</th>
                  <th className="py-2 pr-3 font-medium text-right">Films</th>
                </tr>
              </thead>
              <tbody>
                {byStatus.map((row) => (
                  <tr key={row.status} className="border-b last:border-b-0">
                    <td className="py-3 pr-3">
                      <Badge variant="outline">{row.status}</Badge>
                    </td>
                    <td className="py-3 pr-3 text-right font-mono text-xs">
                      {row.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Film financials</CardTitle>
            <CardDescription>
              <code>SELECT … FROM films LEFT JOIN budget …</code>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-xs uppercase text-muted-foreground">
                    <th className="py-2 pr-3 font-medium">Film</th>
                    <th className="py-2 pr-3 font-medium text-right">Budget</th>
                    <th className="py-2 pr-3 font-medium text-right">Spent</th>
                    <th className="py-2 pr-3 font-medium text-right">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {financials.map((row) => (
                    <tr key={row.film_id} className="border-b last:border-b-0">
                      <td className="py-3 pr-3">
                        <div className="font-medium">{row.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {row.status}
                        </div>
                      </td>
                      <td className="py-3 pr-3 text-right font-mono text-xs">
                        {money(row.total_budget)}
                      </td>
                      <td className="py-3 pr-3 text-right font-mono text-xs text-muted-foreground">
                        {money(row.amount_spent)}
                      </td>
                      <td className="py-3 pr-3 text-right font-mono text-xs">
                        {money(row.revenue)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
