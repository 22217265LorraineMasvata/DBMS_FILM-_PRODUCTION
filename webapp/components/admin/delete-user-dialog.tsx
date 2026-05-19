"use client"

import * as React from "react"
import { useState } from "react"
import { Trash2, Loader2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface User {
  id: string
  name: string
  email: string
  role: string
  department: string
}

interface DeleteUserDialogProps {
  users: User[]
  onUserDeleted?: (userId: string) => void
  trigger?: React.ReactNode
}

export function DeleteUserDialog({ users, onUserDeleted, trigger }: DeleteUserDialogProps) {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string>("")
  const [confirmText, setConfirmText] = useState("")
  const [error, setError] = useState("")

  const selectedUser = users.find((u) => u.id === selectedUserId)
  const confirmPhrase = "DELETE"
  const isConfirmed = confirmText === confirmPhrase

  const handleDelete = async () => {
    if (!selectedUserId) {
      setError("Please select a user to delete")
      return
    }

    if (!isConfirmed) {
      setError(`Please type "${confirmPhrase}" to confirm deletion`)
      return
    }

    setIsDeleting(true)
    setError("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onUserDeleted?.(selectedUserId)
    
    // Reset form
    setSelectedUserId("")
    setConfirmText("")
    setIsDeleting(false)
    setOpen(false)
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      // Reset state when closing
      setSelectedUserId("")
      setConfirmText("")
      setError("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete User
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Delete User
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. The user will be permanently removed from the system.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="select-user">Select User to Delete</Label>
            <Select value={selectedUserId} onValueChange={setSelectedUserId}>
              <SelectTrigger id="select-user" className="w-full">
                <SelectValue placeholder="Choose a user..." />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    <span className="flex flex-col items-start">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedUser && (
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
              <h4 className="mb-2 font-medium">User Details</h4>
              <dl className="grid grid-cols-2 gap-2 text-sm">
                <dt className="text-muted-foreground">Name:</dt>
                <dd>{selectedUser.name}</dd>
                <dt className="text-muted-foreground">Email:</dt>
                <dd>{selectedUser.email}</dd>
                <dt className="text-muted-foreground">Role:</dt>
                <dd className="capitalize">{selectedUser.role}</dd>
                <dt className="text-muted-foreground">Department:</dt>
                <dd className="capitalize">{selectedUser.department}</dd>
              </dl>
            </div>
          )}

          {selectedUserId && (
            <div className="grid gap-2">
              <Label htmlFor="confirm-delete">
                Type <span className="font-mono font-bold text-destructive">{confirmPhrase}</span> to confirm
              </Label>
              <Input
                id="confirm-delete"
                placeholder={confirmPhrase}
                value={confirmText}
                onChange={(e) => {
                  setConfirmText(e.target.value.toUpperCase())
                  setError("")
                }}
                className="font-mono"
              />
            </div>
          )}

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting || !selectedUserId || !isConfirmed}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete User
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
