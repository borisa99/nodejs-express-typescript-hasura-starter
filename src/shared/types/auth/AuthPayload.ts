import { RoleValue } from '@/models/RoleValue'

export interface AuthPayload {
  id: string
  account_id: string
  email: string
  roles: RoleValue[]
}
