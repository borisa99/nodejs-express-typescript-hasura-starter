import { RoleValue } from './RoleValue'

export interface Invite {
  id: number
  email: string
  ticket: string
  expires_at: Date
  role: RoleValue
  created_at: Date
}
