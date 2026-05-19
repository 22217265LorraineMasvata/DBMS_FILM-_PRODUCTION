import "server-only";
import { db } from "@/lib/db";

export interface AuditEvent {
  source: string;
  occurred_at: string;
  actor: string;
  summary: string;
}

export async function listRecentEvents(limit = 30): Promise<AuditEvent[]> {
  const { rows } = await db.query<AuditEvent>(
    `SELECT 'user' AS source,
            u.created_at AS occurred_at,
            u.username   AS actor,
            'New ' || r.role_name || ' account created' AS summary
       FROM users u
       JOIN roles r ON r.role_id = u.role_id
     UNION ALL
     SELECT 'budget' AS source,
            b.last_updated::timestamp AS occurred_at,
            f.title AS actor,
            'Budget updated: ' || b.currency || ' ' || b.amount_spent::text
              || ' of ' || b.total_budget::text AS summary
       FROM budget b
       JOIN films f ON f.film_id = b.film_id
      WHERE b.last_updated IS NOT NULL
     UNION ALL
     SELECT 'film' AS source,
            f.release_date::timestamp AS occurred_at,
            f.title AS actor,
            'Film ' || f.status || ' (' || COALESCE(f.genre, 'n/a') || ')' AS summary
       FROM films f
      WHERE f.release_date IS NOT NULL
      ORDER BY occurred_at DESC NULLS LAST
      LIMIT $1`,
    [limit],
  );
  return rows;
}
