import { Users } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { listRoles, listUsers } from "@/lib/db/users";
import { CreateUserForm } from "@/components/admin/users/create-user-form";
import { UsersTable } from "@/components/admin/users/users-table";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const [users, roles] = await Promise.all([listUsers(), listRoles()]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Management"
        description="Create, deactivate, and remove user accounts."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Add user</CardTitle>
            <CardDescription>
              Runs <code>INSERT INTO users</code> inside a transaction and
              returns the joined row.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreateUserForm roles={roles} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              All users ({users.length})
            </CardTitle>
            <CardDescription>
              <code>SELECT … FROM users JOIN roles …</code>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UsersTable users={users} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
