import { RoleValue } from '@models/RoleValue'
export interface RegisterUser {
  first_name: string
  last_name: string
  avatar_url: string
  email: string
  password: string
  roles: RoleValue[]
}
