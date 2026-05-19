import { Warehouse } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { listStudios } from "@/lib/db/production";
import { PartnersTable } from "@/components/production/partners-table";

export const dynamic = "force-dynamic";

export default async function StudiosPage() {
  const studios = await listStudios();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Studios"
        description="Studios used across all productions, with aggregated budgets."
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Warehouse className="h-5 w-5" />
            Studios ({studios.length})
          </CardTitle>
          <CardDescription>
            <code>
              SELECT studio, COUNT(film_id), SUM(budget) FROM production LEFT JOIN
              budget … GROUP BY studio
            </code>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PartnersTable rows={studios} label="Studio" />
        </CardContent>
      </Card>
    </div>
  );
}
