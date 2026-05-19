import { Shield, Check, X } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { listRolesWithCounts } from "@/lib/db/roles";

export const dynamic = "force-dynamic";

function Flag({ value }: { value: boolean }) {
  return value ? (
    <Check className="h-4 w-4 text-emerald-500" />
  ) : (
    <X className="h-4 w-4 text-muted-foreground" />
  );
}

export default async function AdminRolesPage() {
  const roles = await listRolesWithCounts();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Roles & Permissions"
        description="Roles defined in the database and their capabilities."
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            All roles ({roles.length})
          </CardTitle>
          <CardDescription>
            <code>SELECT … FROM roles LEFT JOIN users …</code>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs uppercase text-muted-foreground">
                  <th className="py-2 pr-3 font-medium">ID</th>
                  <th className="py-2 pr-3 font-medium">Role</th>
                  <th className="py-2 pr-3 font-medium">Users</th>
                  <th className="py-2 pr-3 font-medium">Active</th>
                  <th className="py-2 pr-3 font-medium">Edit</th>
                  <th className="py-2 pr-3 font-medium">Delete</th>
                  <th className="py-2 pr-3 font-medium">Budget</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((r) => (
                  <tr key={r.role_id} className="border-b last:border-b-0">
                    <td className="py-3 pr-3 font-mono text-xs text-muted-foreground">
                      {r.role_id}
                    </td>
                    <td className="py-3 pr-3 font-medium">
                      <Badge variant="outline">{r.role_name}</Badge>
                    </td>
                    <td className="py-3 pr-3">{r.total_users}</td>
                    <td className="py-3 pr-3 text-muted-foreground">
                      {r.active_users}
                    </td>
                    <td className="py-3 pr-3">
                      <Flag value={r.can_edit} />
                    </td>
                    <td className="py-3 pr-3">
                      <Flag value={r.can_delete} />
                    </td>
                    <td className="py-3 pr-3">
                      <Flag value={r.can_view_budget} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
