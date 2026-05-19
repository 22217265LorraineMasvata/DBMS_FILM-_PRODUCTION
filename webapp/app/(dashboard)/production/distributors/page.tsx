import { Truck } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { listDistributors } from "@/lib/db/production";
import { PartnersTable } from "@/components/production/partners-table";

export const dynamic = "force-dynamic";

export default async function DistributorsPage() {
  const distributors = await listDistributors();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Distributors"
        description="Distribution partners with their film slate and total budget."
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Distributors ({distributors.length})
          </CardTitle>
          <CardDescription>
            <code>
              SELECT distributor, COUNT(film_id), SUM(budget) FROM production
              LEFT JOIN budget … GROUP BY distributor
            </code>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PartnersTable rows={distributors} label="Distributor" />
        </CardContent>
      </Card>
    </div>
  );
}
