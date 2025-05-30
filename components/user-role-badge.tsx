import { Badge } from "@/components/ui/badge"
import type { UserRole } from "@/types/user"

interface UserRoleBadgeProps {
  role: UserRole
}

export function UserRoleBadge({ role }: UserRoleBadgeProps) {
  if (role === "authority") {
    return (
      <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">
        Authority
      </Badge>
    )
  }

  return <Badge variant="outline">Driver</Badge>
}

