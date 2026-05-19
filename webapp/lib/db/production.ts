import "server-only";
import { db } from "@/lib/db";

export interface PartnerRow {
  name: string;
  total_films: number;
  active_films: number;
  total_budget: string | null;
}

export async function listCompanies(): Promise<PartnerRow[]> {
  const { rows } = await db.query<PartnerRow>(
    `SELECT p.company_name AS name,
            COUNT(DISTINCT p.film_id)::int AS total_films,
            COUNT(DISTINCT CASE WHEN p.status IN ('Active','Scheduled','Pre Production') THEN p.film_id END)::int AS active_films,
            SUM(b.total_budget) AS total_budget
       FROM production p
       LEFT JOIN budget b ON b.film_id = p.film_id
      WHERE p.company_name IS NOT NULL
      GROUP BY p.company_name
      ORDER BY total_films DESC, p.company_name`,
  );
  return rows;
}

export async function listStudios(): Promise<PartnerRow[]> {
  const { rows } = await db.query<PartnerRow>(
    `SELECT p.studio AS name,
            COUNT(DISTINCT p.film_id)::int AS total_films,
            COUNT(DISTINCT CASE WHEN p.status IN ('Active','Scheduled','Pre Production') THEN p.film_id END)::int AS active_films,
            SUM(b.total_budget) AS total_budget
       FROM production p
       LEFT JOIN budget b ON b.film_id = p.film_id
      WHERE p.studio IS NOT NULL
      GROUP BY p.studio
      ORDER BY total_films DESC, p.studio`,
  );
  return rows;
}

export async function listDistributors(): Promise<PartnerRow[]> {
  const { rows } = await db.query<PartnerRow>(
    `SELECT p.distributor AS name,
            COUNT(DISTINCT p.film_id)::int AS total_films,
            COUNT(DISTINCT CASE WHEN p.status IN ('Active','Scheduled','Pre Production') THEN p.film_id END)::int AS active_films,
            SUM(b.total_budget) AS total_budget
       FROM production p
       LEFT JOIN budget b ON b.film_id = p.film_id
      WHERE p.distributor IS NOT NULL
      GROUP BY p.distributor
      ORDER BY total_films DESC, p.distributor`,
  );
  return rows;
}
