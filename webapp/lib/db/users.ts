import "server-only";
import { db } from "@/lib/db";

export interface DbUser {
  user_id: number;
  username: string;
  email: string;
  role_id: number;
  role_name: string;
  is_active: boolean;
  created_at: string;
}

export interface DbRole {
  role_id: number;
  role_name: string;
}

export async function listUsers(): Promise<DbUser[]> {
  const { rows } = await db.query<DbUser>(
    `SELECT u.user_id,
            u.username,
            u.email,
            u.role_id,
            r.role_name,
            u.is_active,
            u.created_at
       FROM users u
       JOIN roles r ON r.role_id = u.role_id
      ORDER BY u.created_at DESC, u.user_id DESC`,
  );
  return rows;
}

export async function listRoles(): Promise<DbRole[]> {
  const { rows } = await db.query<DbRole>(
    `SELECT role_id, role_name FROM roles ORDER BY role_id`,
  );
  return rows;
}

export interface CreateUserInput {
  username: string;
  email: string;
  password_hash: string;
  role_id: number;
  is_active?: boolean;
}

export async function createUser(input: CreateUserInput): Promise<DbUser> {
  try {
    await db.query("BEGIN");

    const insert = await db.query<{ user_id: number }>(
      `INSERT INTO users (role_id, username, email, password_hash, is_active)
       VALUES ($1, $2, $3, $4, COALESCE($5, TRUE))
       RETURNING user_id`,
      [
        input.role_id,
        input.username,
        input.email,
        input.password_hash,
        input.is_active ?? null,
      ],
    );

    const userId = insert.rows[0].user_id;

    const select = await db.query<DbUser>(
      `SELECT u.user_id, u.username, u.email, u.role_id,
              r.role_name, u.is_active, u.created_at
         FROM users u
         JOIN roles r ON r.role_id = u.role_id
        WHERE u.user_id = $1`,
      [userId],
    );

    await db.query("COMMIT");
    return select.rows[0];
  } catch (err) {
    await db.query("ROLLBACK");
    throw err;
  }
}

export async function deleteUser(userId: number): Promise<boolean> {
  const { rowCount } = await db.query(`DELETE FROM users WHERE user_id = $1`, [
    userId,
  ]);
  return (rowCount ?? 0) > 0;
}

export async function setUserActive(
  userId: number,
  isActive: boolean,
): Promise<boolean> {
  const { rowCount } = await db.query(
    `UPDATE users SET is_active = $2 WHERE user_id = $1`,
    [userId, isActive],
  );
  return (rowCount ?? 0) > 0;
}
