import { Client } from "pg";
import "server-only";

export const db = new Client({
  user: "postgres.ssijxetffyvstqcrgnbu",
  password: "B0BEmkE#I$5e5B",
  host: "aws-0-eu-west-1.pooler.supabase.com",
  database: "postgres",
  ssl: { rejectUnauthorized: false },
  port: 5432,
});

await db.connect();
