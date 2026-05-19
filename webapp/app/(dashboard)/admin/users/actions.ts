"use server"

import { revalidatePath } from "next/cache"
import { createUser, deleteUser, setUserActive } from "@/lib/db/users"

const USERS_PATH = "/admin/users"

export type ActionResult =
  | { ok: true }
  | { ok: false; error: string }

export async function createUserAction(formData: FormData): Promise<ActionResult> {
  const username = String(formData.get("username") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")
  const roleIdRaw = formData.get("role_id")
  const isActive = formData.get("is_active") === "on"

  if (!username || !email || !password || !roleIdRaw) {
    return { ok: false, error: "All fields are required." }
  }

  const role_id = Number(roleIdRaw)
  if (!Number.isInteger(role_id)) {
    return { ok: false, error: "Invalid role." }
  }

  try {
    await createUser({
      username,
      email,
      // Note: course-level demo. Replace with bcrypt in production.
      password_hash: `demo:${password}`,
      role_id,
      is_active: isActive,
    })
    revalidatePath(USERS_PATH)
    return { ok: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create user"
    return { ok: false, error: message }
  }
}

export async function deleteUserAction(userId: number): Promise<ActionResult> {
  if (!Number.isInteger(userId)) {
    return { ok: false, error: "Invalid user id." }
  }
  try {
    const ok = await deleteUser(userId)
    revalidatePath(USERS_PATH)
    return ok ? { ok: true } : { ok: false, error: "User not found." }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to delete user"
    return { ok: false, error: message }
  }
}

export async function toggleUserActiveAction(
  userId: number,
  isActive: boolean
): Promise<ActionResult> {
  try {
    const ok = await setUserActive(userId, isActive)
    revalidatePath(USERS_PATH)
    return ok ? { ok: true } : { ok: false, error: "User not found." }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update user"
    return { ok: false, error: message }
  }
}
