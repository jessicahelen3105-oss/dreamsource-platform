import { useState } from 'react'
import { BookOpen, Feather } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

type Role = 'reader' | 'author'

/**
 * Registration surface for readers and authors. Account creation is wired up
 * in the accounts milestone (PLAN.md); for now the form confirms locally.
 */
export function JoinDialog({
  children,
  defaultRole = 'reader',
}: {
  children: React.ReactNode
  defaultRole?: Role
}) {
  const [open, setOpen] = useState(false)
  const [role, setRole] = useState<Role>(defaultRole)

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o)
        if (o) setRole(defaultRole)
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="border-primary/30 bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl">Join DreamQuill</DialogTitle>
          <DialogDescription>
            Create your account to build a reading library — or open your own writer’s desk.
          </DialogDescription>
        </DialogHeader>
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault()
            const data = new FormData(e.currentTarget)
            setOpen(false)
            toast.success(`Welcome, ${String(data.get('name') || 'storyteller')}!`, {
              description:
                role === 'author'
                  ? 'Your author desk is being prepared.'
                  : 'Your reading library is ready to fill.',
            })
          }}
        >
          <fieldset>
            <legend className="mb-2 text-sm font-medium">I’m joining as a…</legend>
            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  { id: 'reader', label: 'Reader', icon: BookOpen, hint: 'Discover & save' },
                  { id: 'author', label: 'Author', icon: Feather, hint: 'Write & publish' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setRole(opt.id)}
                  aria-pressed={role === opt.id}
                  className={cn(
                    'flex flex-col items-start gap-1 rounded-lg border p-3 text-left transition-colors focus-visible:ring-2 focus-visible:ring-ring',
                    role === opt.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50',
                  )}
                >
                  <opt.icon className="size-5 text-primary" aria-hidden />
                  <span className="font-semibold">{opt.label}</span>
                  <span className="text-xs text-muted-foreground">{opt.hint}</span>
                </button>
              ))}
            </div>
          </fieldset>
          <div className="space-y-2">
            <Label htmlFor="join-name">{role === 'author' ? 'Pen name' : 'Display name'}</Label>
            <Input id="join-name" name="name" required autoComplete="nickname" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="join-email">Email</Label>
            <Input id="join-email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="join-password">Password</Label>
            <Input
              id="join-password"
              name="password"
              type="password"
              minLength={8}
              required
              autoComplete="new-password"
            />
          </div>
          <Button type="submit" size="lg" className="w-full font-semibold">
            {role === 'author' ? 'Open my writer’s desk' : 'Start reading'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
