import "server-only";
import { db } from "@/lib/db";

export interface DbRoleRow {
  role_id: number;
  role_name: string;
  can_edit: boolean;
  can_delete: boolean;
  can_view_budget: boolean;
  total_users: number;
  active_users: number;
}

export async function listRolesWithCounts(): Promise<DbRoleRow[]> {
  const { rows } = await db.query<DbRoleRow>(
    `SELECT r.role_id,
            r.role_name,
            r.can_edit,
            r.can_delete,
            r.can_view_budget,
            COUNT(u.user_id)::int AS total_users,
            COUNT(CASE WHEN u.is_active THEN 1 END)::int AS active_users
       FROM roles r
       LEFT JOIN users u ON u.role_id = r.role_id
      GROUP BY r.role_id
      ORDER BY r.role_id`,
  );
  return rows;
}
