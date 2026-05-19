"use client"

import { useTransition } from "react"
import { Trash2, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import {
  deleteUserAction,
  toggleUserActiveAction,
} from "@/app/(dashboard)/admin/users/actions"
import type { DbUser } from "@/lib/db/users"

interface Props {
  users: DbUser[]
}

export function UsersTable({ users }: Props) {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  function handleToggle(user: DbUser, next: boolean) {
    startTransition(async () => {
      const res = await toggleUserActiveAction(user.user_id, next)
      if (!res.ok) {
        toast({
          title: "Update failed",
          description: res.error,
          variant: "destructive",
        })
      }
    })
  }

  function handleDelete(user: DbUser) {
    startTransition(async () => {
      const res = await deleteUserAction(user.user_id)
      if (res.ok) {
        toast({ title: `Deleted ${user.username}` })
      } else {
        toast({
          title: "Delete failed",
          description: res.error,
          variant: "destructive",
        })
      }
    })
  }

  if (users.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No users found. Run <code>DML.sql</code> against your database to seed
        sample rows.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-xs uppercase text-muted-foreground">
            <th className="py-2 pr-3 font-medium">ID</th>
            <th className="py-2 pr-3 font-medium">Username</th>
            <th className="py-2 pr-3 font-medium">Email</th>
            <th className="py-2 pr-3 font-medium">Role</th>
            <th className="py-2 pr-3 font-medium">Active</th>
            <th className="py-2 pr-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.user_id} className="border-b last:border-b-0">
              <td className="py-3 pr-3 font-mono text-xs text-muted-foreground">
                {u.user_id}
              </td>
              <td className="py-3 pr-3 font-medium">{u.username}</td>
              <td className="py-3 pr-3 text-muted-foreground">{u.email}</td>
              <td className="py-3 pr-3">
                <Badge variant="outline" className="text-xs">
                  {u.role_name}
                </Badge>
              </td>
              <td className="py-3 pr-3">
                <Switch
                  checked={u.is_active}
                  onCheckedChange={(v) => handleToggle(u, v)}
                  disabled={isPending}
                />
              </td>
              <td className="py-3 pr-3 text-right">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={isPending}
                      aria-label={`Delete ${u.username}`}
                    >
                      {isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete {u.username}?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This runs <code>DELETE FROM users WHERE user_id = $1</code>.
                        Foreign keys with <code>ON DELETE CASCADE</code> will
                        propagate.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(u)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
