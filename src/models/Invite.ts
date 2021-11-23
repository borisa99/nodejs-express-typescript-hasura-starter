import { RoleValue } from './RoleValue'

export interface Invite {
  id: number
  email: string
  ticket: string
  expires_at: string
  role: RoleValue
  created_at: Date
}
