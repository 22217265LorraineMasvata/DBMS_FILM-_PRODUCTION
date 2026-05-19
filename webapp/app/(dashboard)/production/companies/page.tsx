import { Building2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { listCompanies } from "@/lib/db/production";
import { PartnersTable } from "@/components/production/partners-table";

export const dynamic = "force-dynamic";

export default async function CompaniesPage() {
  const companies = await listCompanies();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Production Companies"
        description="Companies producing films, aggregated from the production table."
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Companies ({companies.length})
          </CardTitle>
          <CardDescription>
            <code>
              SELECT company_name, COUNT(film_id), SUM(budget) FROM production
              LEFT JOIN budget … GROUP BY company_name
            </code>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PartnersTable rows={companies} label="Company" />
        </CardContent>
      </Card>
    </div>
  );
}
