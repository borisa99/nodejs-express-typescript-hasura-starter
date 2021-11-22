import { RoleValue } from './RoleValue'

export interface AccountRole {
  id: string
  account_id: string
  role: RoleValue
  created_at: string
  updated_at: string
}
