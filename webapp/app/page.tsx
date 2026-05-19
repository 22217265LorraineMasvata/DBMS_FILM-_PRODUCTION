import { redirect } from "next/navigation"

export default function HomePage() {
  // Redirect to login page - in production, check auth status first
  redirect("/login")
}
