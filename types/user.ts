export type UserRole = "driver" | "authority"

export interface UserData {
  uid: string
  email: string
  displayName: string
  role: UserRole
  createdAt: Date
}

