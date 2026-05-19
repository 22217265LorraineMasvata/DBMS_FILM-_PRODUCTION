"use client"

import { useState, useTransition } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { createUserAction } from "@/app/(dashboard)/admin/users/actions"
import type { DbRole } from "@/lib/db/users"

interface Props {
  roles: DbRole[]
}

export function CreateUserForm({ roles }: Props) {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [roleId, setRoleId] = useState<string>(roles[0]?.role_id.toString() ?? "")
  const [isActive, setIsActive] = useState(true)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    data.set("role_id", roleId)
    if (isActive) data.set("is_active", "on")

    startTransition(async () => {
      const res = await createUserAction(data)
      if (res.ok) {
        toast({ title: "User created" })
        form.reset()
        setIsActive(true)
        setRoleId(roles[0]?.role_id.toString() ?? "")
      } else {
        toast({
          title: "Could not create user",
          description: res.error,
          variant: "destructive",
        })
      }
    })
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" name="username" required autoComplete="off" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required autoComplete="off" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required minLength={4} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="role_id">Role</Label>
        <Select value={roleId} onValueChange={setRoleId}>
          <SelectTrigger id="role_id">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((r) => (
              <SelectItem key={r.role_id} value={r.role_id.toString()}>
                {r.role_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between rounded-lg border p-3">
        <div className="space-y-0.5">
          <Label htmlFor="is_active">Active</Label>
          <p className="text-xs text-muted-foreground">
            Inactive accounts cannot log in.
          </p>
        </div>
        <Switch
          id="is_active"
          checked={isActive}
          onCheckedChange={setIsActive}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating…
          </>
        ) : (
          "Create user"
        )}
      </Button>
    </form>
  )
}
