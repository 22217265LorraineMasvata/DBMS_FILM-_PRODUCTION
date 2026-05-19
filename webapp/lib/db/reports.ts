import "server-only";
import { db } from "@/lib/db";

export interface ReportTotals {
  total_films: number;
  active_films: number;
  total_users: number;
  active_users: number;
  total_budget: string | null;
  total_spent: string | null;
  total_revenue: string | null;
}

export async function getTotals(): Promise<ReportTotals> {
  const { rows } = await db.query<ReportTotals>(
    `SELECT (SELECT COUNT(*)::int FROM films) AS total_films,
            (SELECT COUNT(*)::int FROM films WHERE status IN ('In Production','Pre Production','Post Production')) AS active_films,
            (SELECT COUNT(*)::int FROM users) AS total_users,
            (SELECT COUNT(*)::int FROM users WHERE is_active) AS active_users,
            (SELECT SUM(total_budget) FROM budget) AS total_budget,
            (SELECT SUM(amount_spent) FROM budget) AS total_spent,
            (SELECT SUM(revenue)      FROM budget) AS total_revenue`,
  );
  return rows[0];
}

export interface FilmsByStatusRow {
  status: string;
  total: number;
}

export async function getFilmsByStatus(): Promise<FilmsByStatusRow[]> {
  const { rows } = await db.query<FilmsByStatusRow>(
    `SELECT status, COUNT(*)::int AS total
       FROM films
      GROUP BY status
      ORDER BY total DESC`,
  );
  return rows;
}

export interface FilmFinancialRow {
  film_id: number;
  title: string;
  status: string;
  currency: string;
  total_budget: string | null;
  amount_spent: string | null;
  revenue: string | null;
}

export async function getFilmFinancials(): Promise<FilmFinancialRow[]> {
  const { rows } = await db.query<FilmFinancialRow>(
    `SELECT f.film_id,
            f.title,
            f.status,
            COALESCE(b.currency, 'USD') AS currency,
            b.total_budget,
            b.amount_spent,
            b.revenue
       FROM films f
       LEFT JOIN budget b ON b.film_id = f.film_id
      ORDER BY b.revenue DESC NULLS LAST, f.film_id`,
  );
  return rows;
}
